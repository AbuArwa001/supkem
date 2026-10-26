import { SocialPost } from "@/components/social/types";
import { testYouTubeApiKey } from "./youtube/youtubeDiagnostics";
import { mapYouTubeVideoToPost } from "./youtube/youtubeMapper";
import {
  fetchChannelSnippet,
  searchYouTubeVideos,
  fetchVideoStatistics,
} from "./youtube/youtubeFetcher";

export { testYouTubeApiKey };

interface CachedYouTubeData {
  posts: SocialPost[];
  cachedAt: number;
}

const youtubeCache: Record<string, CachedYouTubeData> = {};

export async function fetchYouTubeVideos(
  apiKey: string,
  options: {
    channelId?: string;
    searchQuery?: string;
    limit?: number;
    cacheDurationMinutes?: number;
  } = {}
): Promise<SocialPost[]> {
  const {
    channelId = "UCNbBcq2UNZahLtzrnyabhow",
    searchQuery = "SUPKEM Kenya",
    limit = 6,
    cacheDurationMinutes = 30,
  } = options;

  if (!apiKey?.trim()) return [];

  const cacheKey = `yt-${channelId || searchQuery}-${limit}`;
  const cached = youtubeCache[cacheKey];
  const now = Date.now();
  if (cached && now - cached.cachedAt < cacheDurationMinutes * 60 * 1000) {
    return cached.posts;
  }

  try {
    const revalidateSec = cacheDurationMinutes * 60;
    const channelInfo = channelId ? await fetchChannelSnippet(channelId, apiKey, revalidateSec) : null;
    const videoItems = await searchYouTubeVideos(apiKey, channelId, searchQuery, limit, revalidateSec);

    if (videoItems.length === 0) {
      return cached ? cached.posts : [];
    }

    const videoIds = videoItems.map((item) => item?.id?.videoId).filter(Boolean).join(",");
    const statisticsMap = await fetchVideoStatistics(videoIds, apiKey, revalidateSec);

    const posts: SocialPost[] = videoItems
      .filter((item) => item?.id?.videoId)
      .map((item) => mapYouTubeVideoToPost(item, channelInfo, statisticsMap[item.id.videoId]?.stats));

    youtubeCache[cacheKey] = { posts, cachedAt: now };
    return posts;
  } catch (err) {
    console.error("Failed to query YouTube Data API:", err);
    return cached ? cached.posts : [];
  }
}
