import { NextResponse } from "next/server";
import { INITIAL_SOCIAL_POSTS, OFFICIAL_CHANNELS } from "@/components/social/socialData";
import { SocialPost } from "@/components/social/types";
import { fetchSocialSettings } from "@/lib/socialSettingsServer";
import {
  fetchFacebookPageFeed,
  fetchInstagramBusinessMedia,
  formatRelativeTime,
} from "@/lib/metaGraphApi";

const SERVER_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://supkem-drf.onrender.com";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get("platform");
    const limit = parseInt(searchParams.get("limit") || "25", 10);
    const search = searchParams.get("search")?.toLowerCase();

    const currentSettings = await fetchSocialSettings();

    // Dynamically build active channel map from settings
    const dynamicChannels: Record<string, any> = { ...OFFICIAL_CHANNELS };
    currentSettings.channels.forEach((ch) => {
      if (ch.enabled) {
        dynamicChannels[ch.id] = {
          name: ch.name,
          handle: ch.handle,
          url: ch.url,
          color: ch.color || "#000000",
          bgClass: ch.bgClass || "bg-slate-900 text-white",
          badgeClass: ch.badgeClass || "bg-slate-900 text-white border-slate-700",
        };
      } else {
        delete dynamicChannels[ch.id];
      }
    });

    const liveSocialPosts: SocialPost[] = [];

    // 1. Direct Meta Graph API Ingestion (Facebook & Instagram)
    const metaConfig = currentSettings.metaApi;
    if (metaConfig?.enabled && metaConfig?.facebookAccessToken) {
      try {
        const [fbPosts, igPosts] = await Promise.all([
          metaConfig.facebookPageId
            ? fetchFacebookPageFeed(
                metaConfig.facebookPageId,
                metaConfig.facebookAccessToken,
                10,
                metaConfig.cacheDurationMinutes || 30
              )
            : Promise.resolve([]),
          metaConfig.instagramBusinessId
            ? fetchInstagramBusinessMedia(
                metaConfig.instagramBusinessId,
                metaConfig.facebookAccessToken,
                10,
                metaConfig.cacheDurationMinutes || 30
              )
            : Promise.resolve([]),
        ]);

        liveSocialPosts.push(...fbPosts, ...igPosts);
      } catch (metaErr) {
        console.warn("Meta Graph ingestion notice:", metaErr);
      }
    }

    // 2. Direct YouTube Data API Ingestion
    const ytConfig = currentSettings.youtubeApi;
    if (ytConfig?.enabled && ytConfig?.apiKey) {
      try {
        const { fetchYouTubeVideos } = await import("@/lib/youtubeApi");
        const ytPosts = await fetchYouTubeVideos(ytConfig.apiKey, {
          channelId: ytConfig.channelId,
          searchQuery: ytConfig.searchQuery || "SUPKEM Kenya",
          limit: ytConfig.maxResults || 6,
        });
        liveSocialPosts.push(...ytPosts);
      } catch (ytErr) {
        console.warn("YouTube ingestion notice:", ytErr);
      }
    }

    // 3. Direct Twitter (X) API Ingestion
    const twConfig = currentSettings.twitterApi;
    if (twConfig?.enabled && twConfig?.bearerToken) {
      try {
        const { fetchTwitterFeed } = await import("@/lib/twitterApi");
        const twPosts = await fetchTwitterFeed(
          twConfig.bearerToken,
          twConfig.username || "SUPKEM1",
          twConfig.maxResults || 6
        );
        liveSocialPosts.push(...twPosts);
      } catch (twErr) {
        console.warn("Twitter ingestion notice:", twErr);
      }
    }

    // 3. Fallback to curated baseline posts if live feeds are currently empty
    let allPosts: SocialPost[] = [...liveSocialPosts];

    if (allPosts.length < 3) {
      // Deduplicate fallback posts
      INITIAL_SOCIAL_POSTS.forEach((fallback) => {
        if (!allPosts.some((p) => p.id === fallback.id)) {
          allPosts.push(fallback);
        }
      });
    }

    // Exclude posts from channels that have been disabled by administrators
    const disabledChannelIds = new Set<string>();
    if (Array.isArray(currentSettings.channels)) {
      currentSettings.channels.forEach((ch) => {
        if (ch.enabled === false) {
          disabledChannelIds.add(ch.id.toLowerCase());
        }
      });
    }
    if (currentSettings.youtubeApi && currentSettings.youtubeApi.enabled === false) {
      disabledChannelIds.add("youtube");
    }
    if (currentSettings.twitterApi && currentSettings.twitterApi.enabled === false) {
      disabledChannelIds.add("x");
    }

    allPosts = allPosts.filter((p) => !disabledChannelIds.has(p.platform.toLowerCase()));

    // Filter by platform
    if (platform && platform !== "all") {
      allPosts = allPosts.filter((p) => p.platform === platform);
    }

    // Filter by search query
    if (search) {
      allPosts = allPosts.filter(
        (p) =>
          p.content.toLowerCase().includes(search) ||
          p.tags.some((tag) => tag.toLowerCase().includes(search)) ||
          p.author.name.toLowerCase().includes(search)
      );
    }

    // Deduplicate and sort by date descending
    const seenIds = new Set<string>();
    const uniquePosts = allPosts.filter((p) => {
      if (seenIds.has(p.id)) return false;
      seenIds.add(p.id);
      return true;
    });

    uniquePosts.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    const finalPosts = limit > 0 ? uniquePosts.slice(0, limit) : uniquePosts;

    return NextResponse.json({
      success: true,
      channels: dynamicChannels,
      settings: currentSettings,
      total: finalPosts.length,
      hasLiveMetaPosts: liveSocialPosts.length > 0,
      posts: finalPosts,
      syncedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Social feed API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch dynamic social feed" },
      { status: 500 }
    );
  }
}
