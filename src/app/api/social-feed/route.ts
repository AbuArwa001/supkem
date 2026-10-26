import { NextResponse } from "next/server";
import { fetchSocialSettings } from "@/lib/socialSettingsServer";
import { fetchLiveSocialPosts } from "./ingestion";
import { buildDynamicChannels, filterAndSortPosts } from "./filters";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get("platform");
    const limit = parseInt(searchParams.get("limit") || "25", 10);
    const search = searchParams.get("search")?.toLowerCase();

    const currentSettings = await fetchSocialSettings();
    const dynamicChannels = buildDynamicChannels(currentSettings);
    const liveSocialPosts = await fetchLiveSocialPosts(currentSettings);
    const finalPosts = filterAndSortPosts(liveSocialPosts, currentSettings, platform, search, limit);

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
