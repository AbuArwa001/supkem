const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

export async function testYouTubeApiKey(
  apiKey: string,
  channelId = "UCNbBcq2UNZahLtzrnyabhow"
): Promise<{
  success: boolean;
  message: string;
  channel?: { id: string; title: string; thumbnail?: string; videoCount?: number };
}> {
  if (!apiKey?.trim()) {
    return {
      success: false,
      message: "YouTube API Key is required.",
    };
  }

  try {
    const url = `${YOUTUBE_API_BASE}/channels?part=snippet,statistics&id=${encodeURIComponent(channelId)}&key=${encodeURIComponent(apiKey.trim())}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok || data.error) {
      return {
        success: false,
        message: `YouTube API Error: ${data?.error?.message || "Invalid API key or unauthorized."}`,
      };
    }

    const channel = data?.items?.[0];
    if (!channel) {
      return {
        success: true,
        message: "API Key is valid! (Channel ID not found, but YouTube API connection succeeded)",
      };
    }

    return {
      success: true,
      message: "Successfully connected to YouTube Data API v3!",
      channel: {
        id: channel.id,
        title: channel.snippet?.title || "SUPKEM",
        thumbnail: channel.snippet?.thumbnails?.default?.url,
        videoCount: channel.statistics?.videoCount ? parseInt(channel.statistics.videoCount, 10) : undefined,
      },
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Connection failed: ${err?.message || "Network error"}`,
    };
  }
}
