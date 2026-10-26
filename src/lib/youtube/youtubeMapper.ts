import { SocialPost } from "@/components/social/types";
import { formatRelativeTime } from "../metaGraphApi";

export function mapYouTubeVideoToPost(
  item: any,
  channelInfo: any,
  stat: any
): SocialPost {
  const vId = item.id.videoId;
  const snip = item.snippet;

  const thumbnail =
    snip.thumbnails?.high?.url ||
    snip.thumbnails?.medium?.url ||
    snip.thumbnails?.default?.url ||
    `https://i.ytimg.com/vi/${vId}/hqdefault.jpg`;

  const avatar =
    channelInfo?.thumbnails?.default?.url ||
    channelInfo?.thumbnails?.medium?.url ||
    "/logo.png";

  const viewCount = stat?.viewCount ? parseInt(stat.viewCount, 10) : 0;
  const likeCount = stat?.likeCount ? parseInt(stat.likeCount, 10) : Math.max(12, Math.round(viewCount * 0.04));
  const commentCount = stat?.commentCount ? parseInt(stat.commentCount, 10) : 0;

  return {
    id: `yt-${vId}`,
    platform: "youtube" as const,
    author: {
      name: snip.channelTitle || channelInfo?.title || "SUPKEM Kenya",
      handle: `@${(snip.channelTitle || "SUPKEM").replace(/\s+/g, "")}`,
      avatar,
      profileUrl: `https://www.youtube.com/channel/${snip.channelId}`,
      isVerified: true,
    },
    content: `${snip.title}\n\n${snip.description || "Official video broadcast from SUPKEM Kenya."}`,
    publishedAt: snip.publishedAt || new Date().toISOString(),
    relativeTime: formatRelativeTime(snip.publishedAt),
    mediaType: "video" as const,
    videoThumbnail: thumbnail,
    videoUrl: `https://www.youtube.com/watch?v=${vId}`,
    likes: likeCount,
    shares: Math.max(5, Math.round(viewCount * 0.02)),
    comments: commentCount,
    postUrl: `https://www.youtube.com/watch?v=${vId}`,
    tags: ["SUPKEM", "OfficialVideo", "KenyaMuslims"],
  };
}
