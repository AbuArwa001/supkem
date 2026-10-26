import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { SocialMediaSettings, getDefaultSocialSettings, setRuntimeSocialSettings } from "@/lib/socialSettings";
import { fetchSocialSettings } from "@/lib/socialSettingsServer";
import { extractAuthTokens, saveSocialSettingsBackend } from "./socialSettingsBackend";

export async function GET() {
  try {
    const settings = await fetchSocialSettings();
    return NextResponse.json({ success: true, source: "drf-cache", settings });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Failed to retrieve social settings",
        settings: getDefaultSocialSettings(),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const currentSettings = await fetchSocialSettings();

    const updatedSettings: SocialMediaSettings = {
      channels: Array.isArray(body.channels) ? body.channels : currentSettings.channels,
      metaApi: body.metaApi || currentSettings.metaApi,
      youtubeApi: body.youtubeApi || currentSettings.youtubeApi,
      twitterApi: body.twitterApi || currentSettings.twitterApi,
      updatedAt: new Date().toISOString(),
    };

    const { authToken, refreshToken } = extractAuthTokens(request);
    if (!authToken && !refreshToken) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Missing authentication credentials" },
        { status: 401 }
      );
    }

    const { newAccessToken } = await saveSocialSettingsBackend(updatedSettings, authToken, refreshToken);

    // @ts-expect-error Next.js 16 requires a second argument in typings but not at runtime
    revalidateTag("social-settings");
    setRuntimeSocialSettings(updatedSettings);

    const response = NextResponse.json({
      success: true,
      message: "Social settings synced successfully to database",
      settings: updatedSettings,
    });

    if (newAccessToken) {
      response.cookies.set("access_token", newAccessToken, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    }

    return response;
  } catch (err: any) {
    console.error("DRF settings sync error:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to update social settings to backend database" },
      { status: 500 }
    );
  }
}
