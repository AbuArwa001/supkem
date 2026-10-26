import { SocialPost } from "@/components/social/types";
import { formatRelativeTime } from "./metaGraphApi";

export function mapTweetToSocialPost(
  tweet: any,
  username: string,
  authorName: string,
  authorProfileImageUrl: string | undefined,
  includesMedia: any[]
): SocialPost {
  const mediaKeys: string[] = tweet.attachments?.media_keys || [];
  const images = mediaKeys
    .map((key) => {
      const media = includesMedia.find((m: any) => m.media_key === key);
      return media?.url || media?.preview_image_url || null;
    })
    .filter(Boolean) as string[];

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
}
