import { SocialPost } from "@/components/social/types";
import { OFFICIAL_CHANNELS } from "@/components/social/socialData";
import { META_BASE_URL, formatRelativeTime, extractHashtags } from "./metaUtils";

const memoryCache: Record<string, { posts: SocialPost[]; cachedAt: number }> = {};

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
      const images: string[] = [];
      const subAttachments = item.attachments?.data?.[0]?.subattachments?.data;
      if (Array.isArray(subAttachments) && subAttachments.length > 0) {
        subAttachments.forEach((sub: any) => {
          if (sub?.media?.image?.src) images.push(sub.media.image.src);
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
