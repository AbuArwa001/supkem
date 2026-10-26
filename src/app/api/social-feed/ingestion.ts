import { SocialPost } from "@/components/social/types";
import { fetchFacebookPageFeed, fetchInstagramBusinessMedia } from "@/lib/metaGraphApi";

export async function fetchLiveSocialPosts(currentSettings: any): Promise<SocialPost[]> {
  const livePosts: SocialPost[] = [];

  const metaConfig = currentSettings.metaApi;
  if (metaConfig?.enabled && metaConfig?.facebookAccessToken) {
    try {
      const [fbPosts, igPosts] = await Promise.all([
        metaConfig.facebookPageId
          ? fetchFacebookPageFeed(metaConfig.facebookPageId, metaConfig.facebookAccessToken, 10, metaConfig.cacheDurationMinutes || 30)
          : Promise.resolve([]),
        metaConfig.instagramBusinessId
          ? fetchInstagramBusinessMedia(metaConfig.instagramBusinessId, metaConfig.facebookAccessToken, 10, metaConfig.cacheDurationMinutes || 30)
          : Promise.resolve([]),
      ]);
      livePosts.push(...fbPosts, ...igPosts);
    } catch (err) {
      console.warn("Meta Graph ingestion notice:", err);
    }
  }

  const ytConfig = currentSettings.youtubeApi;
  if (ytConfig?.enabled && ytConfig?.apiKey) {
    try {
      const { fetchYouTubeVideos } = await import("@/lib/youtubeApi");
      const ytPosts = await fetchYouTubeVideos(ytConfig.apiKey, {
        channelId: ytConfig.channelId,
        searchQuery: ytConfig.searchQuery || "SUPKEM Kenya",
        limit: ytConfig.maxResults || 6,
      });
      livePosts.push(...ytPosts);
    } catch (err) {
      console.warn("YouTube ingestion notice:", err);
    }
  }

  const twConfig = currentSettings.twitterApi;
  if (twConfig?.enabled && twConfig?.bearerToken) {
    try {
      const { fetchTwitterFeed } = await import("@/lib/twitterApi");
      const twPosts = await fetchTwitterFeed(twConfig.bearerToken, twConfig.username || "SUPKEM1", twConfig.maxResults || 6);
      livePosts.push(...twPosts);
    } catch (err) {
      console.warn("Twitter ingestion notice:", err);
    }
  }

  return livePosts;
}
