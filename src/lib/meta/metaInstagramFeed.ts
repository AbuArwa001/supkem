import { SocialPost } from "@/components/social/types";
import { OFFICIAL_CHANNELS } from "@/components/social/socialData";
import { META_BASE_URL, formatRelativeTime, extractHashtags } from "./metaUtils";

const memoryCache: Record<string, { posts: SocialPost[]; cachedAt: number }> = {};

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
