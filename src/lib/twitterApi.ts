import { SocialPost } from "@/components/social/types";
import { formatRelativeTime } from "./metaGraphApi";

/**
 * Fetch tweets from X (Twitter) API v2 by username.
 * Requires a Bearer Token with read access.
 */
export async function fetchTwitterFeed(
  bearerToken: string,
  username: string,
  limit: number = 6
): Promise<SocialPost[]> {
  try {
    // 1. Get User ID from username
    const userRes = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}?user.fields=profile_image_url`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        next: { revalidate: 3600 }, // Cache user ID mapping
      }
    );

    if (!userRes.ok) {
      throw new Error(`Twitter User API failed: ${userRes.statusText}`);
    }

    const userData = await userRes.json();
    if (!userData?.data?.id) {
      throw new Error(`User @${username} not found on Twitter.`);
    }

    const userId = userData.data.id;
    const authorName = userData.data.name;
    const authorProfileImageUrl = userData.data.profile_image_url?.replace("_normal", ""); // get higher res

    // 2. Get User's Tweets
    const tweetsRes = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=${Math.min(limit, 100)}&expansions=attachments.media_keys&media.fields=url,preview_image_url,type&tweet.fields=created_at,public_metrics,entities`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        next: { revalidate: 60 * 5 }, // 5 minutes cache
      }
    );

    if (!tweetsRes.ok) {
      throw new Error(`Twitter Tweets API failed: ${tweetsRes.statusText}`);
    }

    const tweetsData = await tweetsRes.json();
    const tweets = tweetsData.data || [];
    const includesMedia = tweetsData.includes?.media || [];

    // Helper to find media URLs
    const getMediaUrls = (mediaKeys?: string[]): string[] => {
      if (!mediaKeys || !includesMedia) return [];
      return mediaKeys
        .map((key) => {
          const media = includesMedia.find((m: any) => m.media_key === key);
          return media?.url || media?.preview_image_url || null;
        })
        .filter(Boolean) as string[];
    };

    return tweets.map((tweet: any): SocialPost => {
      const images = getMediaUrls(tweet.attachments?.media_keys);
      let mediaType: "text" | "image" | "video" | "gallery" | "link" = "text";
      if (images.length > 1) mediaType = "gallery";
      else if (images.length === 1) mediaType = "image";

      const createdAt = new Date(tweet.created_at).toISOString();

      return {
        id: `tw-${tweet.id}`,
        platform: "x",
        author: {
          name: authorName,
          handle: `@${username}`,
          avatar: authorProfileImageUrl || "/logo.png",
          profileUrl: `https://x.com/${username}`,
          isVerified: true,
        },
        content: tweet.text || "",
        publishedAt: createdAt,
        relativeTime: formatRelativeTime(createdAt),
        mediaType,
        images: images.length > 0 ? images : undefined,
        likes: tweet.public_metrics?.like_count || 0,
        shares: tweet.public_metrics?.retweet_count || 0,
        comments: tweet.public_metrics?.reply_count || 0,
        postUrl: `https://x.com/${username}/status/${tweet.id}`,
        tags: ["SUPKEM"],
      };
    });
  } catch (error) {
    console.error("Error fetching Twitter feed:", error);
    throw error; // Return empty array or throw, handled upstream
  }
}
