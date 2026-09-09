import { NextResponse } from "next/server";
import { testYouTubeApiKey } from "@/lib/youtubeApi";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { apiKey, channelId } = body || {};

    const activeApiKey = (apiKey?.trim() || process.env.YOUTUBE_API_KEY || "").trim();
    const activeChannelId = (channelId?.trim() || process.env.YOUTUBE_CHANNEL_ID || "").trim();

    if (!activeApiKey) {
      return NextResponse.json(
        { success: false, message: "YouTube API Key is required (or configure YOUTUBE_API_KEY in .env.local)." },
        { status: 400 }
      );
    }

    const result = await testYouTubeApiKey(
      activeApiKey,
      activeChannelId || "UCNbBcq2UNZahLtzrnyabhow"
    );

    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (error: any) {
    console.error("YouTube test API error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Internal server error." },
      { status: 500 }
    );
  }
}
