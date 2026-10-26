export const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

export async function fetchChannelSnippet(channelId: string, apiKey: string, revalidateSec: number) {
  try {
    const channelRes = await fetch(
      `${YOUTUBE_API_BASE}/channels?part=snippet&id=${encodeURIComponent(channelId)}&key=${encodeURIComponent(apiKey)}`,
      { next: { revalidate: revalidateSec } }
    );
    if (channelRes.ok) {
      const cData = await channelRes.json();
      return cData?.items?.[0]?.snippet || null;
    }
  } catch (err) {
    console.warn("YouTube channel info fetch notice:", err);
  }
  return null;
}

export async function searchYouTubeVideos(
  apiKey: string,
  channelId: string | undefined,
  searchQuery: string | undefined,
  limit: number,
  revalidateSec: number
): Promise<any[]> {
  const searchParams = new URLSearchParams({
    part: "snippet",
    maxResults: String(Math.min(limit, 12)),
    order: "date",
    type: "video",
    key: apiKey,
  });

  if (channelId) searchParams.set("channelId", channelId);
  else if (searchQuery) searchParams.set("q", searchQuery);

  const searchRes = await fetch(`${YOUTUBE_API_BASE}/search?${searchParams.toString()}`, {
    next: { revalidate: revalidateSec },
  });

  if (!searchRes.ok) return [];

  const searchData = await searchRes.json();
  let videoItems = Array.isArray(searchData?.items) ? searchData.items : [];

  if (videoItems.length === 0 && channelId && searchQuery) {
    const fallbackParams = new URLSearchParams({
      part: "snippet",
      maxResults: String(limit),
      order: "date",
      type: "video",
      q: searchQuery,
      key: apiKey,
    });
    const fbRes = await fetch(`${YOUTUBE_API_BASE}/search?${fallbackParams.toString()}`);
    if (fbRes.ok) {
      const fbData = await fbRes.json();
      videoItems = Array.isArray(fbData?.items) ? fbData.items : [];
    }
  }

  return videoItems;
}

export async function fetchVideoStatistics(videoIds: string, apiKey: string, revalidateSec: number) {
  const statisticsMap: Record<string, any> = {};
  if (!videoIds) return statisticsMap;

  try {
    const statsRes = await fetch(
      `${YOUTUBE_API_BASE}/videos?part=statistics,contentDetails&id=${videoIds}&key=${encodeURIComponent(apiKey)}`,
      { next: { revalidate: revalidateSec } }
    );
    if (statsRes.ok) {
      const statsData = await statsRes.json();
      (statsData?.items || []).forEach((v: any) => {
        statisticsMap[v.id] = { stats: v.statistics, contentDetails: v.contentDetails };
      });
    }
  } catch (err) {
    console.warn("YouTube video stats notice:", err);
  }
  return statisticsMap;
}
