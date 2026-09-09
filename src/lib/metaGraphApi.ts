import { SocialPost } from "@/components/social/types";
import { OFFICIAL_CHANNELS } from "@/components/social/socialData";

const META_GRAPH_VERSION = "v19.0";
const META_BASE_URL = `https://graph.facebook.com/${META_GRAPH_VERSION}`;

interface CachedData {
  posts: SocialPost[];
  cachedAt: number;
}

// In-memory cache to prevent excessive Meta Graph API rate-limit consumption
const memoryCache: Record<string, CachedData> = {};

/**
 * Format relative time string (e.g. "2h ago", "Yesterday", "3d ago")
 */
export function formatRelativeTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSec < 60) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "Recently";
  }
}

/**
 * Extract hashtags from text
 */
function extractHashtags(text?: string): string[] {
  if (!text) return ["SUPKEM", "Community"];
  const matches = text.match(/#[a-zA-Z0-9_]+/g);
  if (!matches || matches.length === 0) {
    return ["SUPKEM", "Official"];
  }
  return matches.map((tag) => tag.replace("#", "")).slice(0, 4);
}

/**
 * Fetch Facebook Page Feed directly via Meta Graph API
 */
export async function fetchFacebookPageFeed(
  pageId: string,
  accessToken: string,
  limit = 10,
  cacheDurationMinutes = 30
): Promise<SocialPost[]> {
  if (!pageId || !accessToken) return [];

  const cacheKey = `fb-${pageId}`;
  const cached = memoryCache[cacheKey];
  const now = Date.now();
  if (cached && now - cached.cachedAt < cacheDurationMinutes * 60 * 1000) {
    return cached.posts;
  }

  try {
    const fields = [
      "id",
      "message",
      "created_time",
      "full_picture",
      "permalink_url",
      "shares",
      "reactions.summary(total_count)",
      "comments.summary(total_count)",
      "attachments{media,type,url,subattachments}",
    ].join(",");

    const url = `${META_BASE_URL}/${encodeURIComponent(pageId)}/feed?fields=${fields}&limit=${limit}&access_token=${encodeURIComponent(accessToken)}`;

    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: cacheDurationMinutes * 60 },
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      console.warn("Meta Graph Facebook fetch warning:", errJson?.error?.message || res.statusText);
      return cached ? cached.posts : [];
    }

    const json = await res.json();
    const rawData = Array.isArray(json?.data) ? json.data : [];

    const posts: SocialPost[] = rawData.map((item: any) => {
      // Collect all images from attachments or fallback to full_picture
      const images: string[] = [];
      const subAttachments = item.attachments?.data?.[0]?.subattachments?.data;
      if (Array.isArray(subAttachments) && subAttachments.length > 0) {
        subAttachments.forEach((sub: any) => {
          if (sub?.media?.image?.src) {
            images.push(sub.media.image.src);
          }
        });
      } else if (item.attachments?.data?.[0]?.media?.image?.src) {
        images.push(item.attachments.data[0].media.image.src);
      } else if (item.full_picture) {
        images.push(item.full_picture);
      }

      const mediaType = images.length > 1 ? "gallery" : images.length === 1 ? "image" : "text";

      return {
        id: `meta-fb-${item.id}`,
        platform: "facebook",
        author: {
          name: "Supreme Council of Kenya Muslims",
          handle: "Supreme Council of Kenya Muslims",
          avatar: "/logo.png",
          profileUrl: OFFICIAL_CHANNELS.facebook.url,
          isVerified: true,
        },
        content: item.message || "SUPKEM Official Facebook Update",
        publishedAt: item.created_time || new Date().toISOString(),
        relativeTime: formatRelativeTime(item.created_time),
        mediaType,
        images: images.length > 0 ? images : undefined,
        likes: item.reactions?.summary?.total_count ?? 0,
        shares: item.shares?.count ?? 0,
        comments: item.comments?.summary?.total_count ?? 0,
        postUrl: item.permalink_url || OFFICIAL_CHANNELS.facebook.url,
        tags: extractHashtags(item.message),
      };
    });

    memoryCache[cacheKey] = { posts, cachedAt: now };
    return posts;
  } catch (error) {
    console.error("Failed to query Facebook via Meta Graph API:", error);
    return cached ? cached.posts : [];
  }
}

/**
 * Fetch Instagram Business Media directly via Meta Graph API
 */
export async function fetchInstagramBusinessMedia(
  igUserId: string,
  accessToken: string,
  limit = 10,
  cacheDurationMinutes = 30
): Promise<SocialPost[]> {
  if (!igUserId || !accessToken) return [];

  const cacheKey = `ig-${igUserId}`;
  const cached = memoryCache[cacheKey];
  const now = Date.now();
  if (cached && now - cached.cachedAt < cacheDurationMinutes * 60 * 1000) {
    return cached.posts;
  }

  try {
    const fields = [
      "id",
      "caption",
      "media_type",
      "media_url",
      "thumbnail_url",
      "permalink",
      "timestamp",
      "like_count",
      "comments_count",
      "children{media_url,media_type}",
    ].join(",");

    const url = `${META_BASE_URL}/${encodeURIComponent(igUserId)}/media?fields=${fields}&limit=${limit}&access_token=${encodeURIComponent(accessToken)}`;

    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: cacheDurationMinutes * 60 },
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      console.warn("Meta Graph Instagram fetch warning:", errJson?.error?.message || res.statusText);
      return cached ? cached.posts : [];
    }

    const json = await res.json();
    const rawData = Array.isArray(json?.data) ? json.data : [];

    const posts: SocialPost[] = rawData.map((item: any) => {
      const isVideo = item.media_type === "VIDEO";
      const isCarousel = item.media_type === "CAROUSEL_ALBUM";

      const images: string[] = [];
      if (isCarousel && Array.isArray(item.children?.data)) {
        item.children.data.forEach((child: any) => {
          if (child.media_url) images.push(child.media_url);
        });
      } else if (!isVideo && item.media_url) {
        images.push(item.media_url);
      }

      return {
        id: `meta-ig-${item.id}`,
        platform: "instagram",
        author: {
          name: "SUPKEM Kenya",
          handle: "@supkem_kenya",
          avatar: "/logo.png",
          profileUrl: OFFICIAL_CHANNELS.instagram.url,
          isVerified: true,
        },
        content: item.caption || "SUPKEM Official Instagram Update",
        publishedAt: item.timestamp || new Date().toISOString(),
        relativeTime: formatRelativeTime(item.timestamp),
        mediaType: isVideo ? "video" : images.length > 1 ? "gallery" : "image",
        images: images.length > 0 ? images : undefined,
        videoUrl: isVideo ? item.media_url : undefined,
        videoThumbnail: isVideo ? item.thumbnail_url || item.media_url : undefined,
        likes: item.like_count ?? 0,
        shares: Math.max(1, Math.round((item.like_count || 10) * 0.15)),
        comments: item.comments_count ?? 0,
        postUrl: item.permalink || OFFICIAL_CHANNELS.instagram.url,
        tags: extractHashtags(item.caption),
      };
    });

    memoryCache[cacheKey] = { posts, cachedAt: now };
    return posts;
  } catch (error) {
    console.error("Failed to query Instagram via Meta Graph API:", error);
    return cached ? cached.posts : [];
  }
}

/**
 * Diagnostic test tool to verify Meta token, Facebook Page access, and connected Instagram account
 */
export async function testMetaCredentials(
  pageId: string,
  accessToken: string,
  igUserId?: string
): Promise<{
  success: boolean;
  message: string;
  page?: { id: string; name: string; username?: string; fanCount?: number };
  instagram?: { id: string; username: string; name?: string };
}> {
  if (!accessToken.trim()) {
    return {
      success: false,
      message: "Access Token is missing. Please provide a Meta Page Access Token.",
    };
  }

  try {
    // 1. Inspect Token / Facebook Page
    const pageFields = "id,name,username,fan_count,instagram_business_account{id,username,name}";
    const pageUrl = pageId.trim()
      ? `${META_BASE_URL}/${encodeURIComponent(pageId.trim())}?fields=${pageFields}&access_token=${encodeURIComponent(accessToken.trim())}`
      : `${META_BASE_URL}/me?fields=${pageFields}&access_token=${encodeURIComponent(accessToken.trim())}`;

    const pageRes = await fetch(pageUrl, { headers: { Accept: "application/json" } });
    const pageData = await pageRes.json();

    if (!pageRes.ok || pageData.error) {
      return {
        success: false,
        message: `Meta API Error: ${pageData?.error?.message || "Invalid credentials or unauthorized."}`,
      };
    }

    const connectedIg = pageData.instagram_business_account;
    let igInfo = undefined;

    // 2. If Instagram ID is supplied or linked, check it
    const targetIgId = igUserId?.trim() || connectedIg?.id;
    if (targetIgId) {
      const igUrl = `${META_BASE_URL}/${encodeURIComponent(targetIgId)}?fields=id,username,name&access_token=${encodeURIComponent(accessToken.trim())}`;
      const igRes = await fetch(igUrl, { headers: { Accept: "application/json" } });
      const igData = await igRes.json();
      if (igRes.ok && !igData.error) {
        igInfo = {
          id: igData.id,
          username: igData.username,
          name: igData.name,
        };
      }
    }

    return {
      success: true,
      message: "Successfully connected to Meta Graph API!",
      page: {
        id: pageData.id,
        name: pageData.name,
        username: pageData.username,
        fanCount: pageData.fan_count,
      },
      instagram: igInfo || (connectedIg ? { id: connectedIg.id, username: connectedIg.username, name: connectedIg.name } : undefined),
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Connection failed: ${err?.message || "Network error"}`,
    };
  }
}
