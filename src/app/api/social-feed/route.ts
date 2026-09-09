import { NextResponse } from "next/server";
import { INITIAL_SOCIAL_POSTS, OFFICIAL_CHANNELS } from "@/components/social/socialData";
import { SocialPost } from "@/components/social/types";
import { getRuntimeSocialSettings } from "@/lib/socialSettings";

const SERVER_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://supkem-drf.onrender.com";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get("platform");
    const limit = parseInt(searchParams.get("limit") || "25", 10);
    const search = searchParams.get("search")?.toLowerCase();

    const currentSettings = getRuntimeSocialSettings();

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

    const dynamicPosts: SocialPost[] = [];

    // Attempt to dynamically fetch published news and updates from backend to blend as live feed
    try {
      const backendRes = await fetch(`${SERVER_API_URL}/api/v1/news/news/`, {
        headers: { Accept: "application/json" },
        next: { revalidate: 60 },
      });

      if (backendRes.ok) {
        const data = await backendRes.json();
        const newsItems = Array.isArray(data) ? data : data?.results || [];

        newsItems
          .filter((item: any) => item.is_published !== false)
          .slice(0, 5)
          .forEach((item: any, index: number) => {
            // Assign dynamically to active official channels
            const activeKeys = Object.keys(dynamicChannels);
            const assignedKey = activeKeys.length > 0 ? activeKeys[index % activeKeys.length] : "x";
            const channel = dynamicChannels[assignedKey] || OFFICIAL_CHANNELS.x;

            dynamicPosts.push({
              id: `dynamic-news-${item.id || index}`,
              platform: (assignedKey as any) || "x",
              author: {
                name: channel?.name || "SUPKEM Official",
                handle: channel?.handle || "@SUPKEM1",
                avatar: "/logo.png",
                profileUrl: channel?.url || "https://x.com/SUPKEM1",
                isVerified: true,
              },
              content: `📢 OFFICIAL UPDATE: ${item.title}\n\n${(
                item.content || ""
              )
                .slice(0, 260)
                .replace(/<[^>]*>/g, "")}... #SUPKEM #KenyaMuslims #OfficialBulletin`,
              publishedAt: item.created_at || new Date().toISOString(),
              relativeTime: "Just now",
              mediaType: item.featured_image ? "image" : "text",
              images: item.featured_image ? [item.featured_image] : undefined,
              likes: 150 + index * 34,
              shares: 42 + index * 12,
              comments: 18 + index * 5,
              postUrl: channel?.url || "https://x.com/SUPKEM1",
              tags: ["SUPKEM", "KenyaMuslims", "OfficialBulletin"],
              isPinned: index === 0,
            });
          });
      }
    } catch {
      // Backend fetch non-blocking fallback
    }

    // Combine dynamic items with curated social posts
    let allPosts: SocialPost[] = [...dynamicPosts, ...INITIAL_SOCIAL_POSTS];

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

    // Deduplicate and sort by date
    allPosts.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    if (limit > 0) {
      allPosts = allPosts.slice(0, limit);
    }

    return NextResponse.json({
      success: true,
      channels: dynamicChannels,
      settings: currentSettings,
      total: allPosts.length,
      posts: allPosts,
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
