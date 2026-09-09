import { NextResponse } from "next/server";
import { testYouTubeApiKey } from "@/lib/youtubeApi";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { apiKey, channelId } = body || {};

    if (!apiKey?.trim()) {
      return NextResponse.json(
        { success: false, message: "YouTube API Key is required." },
        { status: 400 }
      );
    }

    const result = await testYouTubeApiKey(
      apiKey.trim(),
      channelId?.trim() || "UCNbBcq2UNZahLtzrnyabhow"
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
