import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { SocialMediaSettings, getDefaultSocialSettings, setRuntimeSocialSettings } from "@/lib/socialSettings";
import { fetchSocialSettings } from "@/lib/socialSettingsServer";

const SERVER_API_URL = process.env.NEXT_PUBLIC_API_URL || "https://supkem-drf.onrender.com";

export async function GET() {
  try {
    const settings = await fetchSocialSettings();
    
    return NextResponse.json({
      success: true,
      source: "drf-cache",
      settings,
    });
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

    // Extract access_token from Authorization header or Cookie
    let authToken = request.headers.get("authorization");
    if (!authToken) {
      const cookieHeader = request.headers.get("cookie") || "";
      const match = cookieHeader.match(/access_token=([^;]+)/);
      if (match && match[1]) {
        authToken = `Bearer ${match[1].trim()}`;
      }
    }

    if (!authToken) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Missing authentication token" },
        { status: 401 }
      );
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: authToken,
    };

    const payload = {
      key: "SOCIAL_MEDIA_SETTINGS",
      name: "Social Media Settings",
      description: "Configuration for official social media handles and API integrations.",
      category: "general",
      data_type: "json",
      value: JSON.stringify(updatedSettings),
    };

    // Try PATCH first
    const patchRes = await fetch(
      `${SERVER_API_URL}/api/v1/configurations/system-parameters/SOCIAL_MEDIA_SETTINGS/`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify({ value: JSON.stringify(updatedSettings) }),
      }
    );

    if (!patchRes.ok) {
      if (patchRes.status === 404) {
        // If not existing, try creating via POST
        const postRes = await fetch(
          `${SERVER_API_URL}/api/v1/configurations/system-parameters/`,
          {
            method: "POST",
            headers,
            body: JSON.stringify(payload),
          }
        );
        if (!postRes.ok) {
          throw new Error(`DRF Backend POST failed: ${postRes.status}`);
        }
      } else {
        throw new Error(`DRF Backend PATCH failed: ${patchRes.status}`);
      }
    }

    // Instantly invalidate the Next.js Data Cache globally across all nodes
    // @ts-expect-error Next.js 16 requires a second argument in typings but not at runtime
    revalidateTag("social-settings");
    
    // Update local runtime cache just in case
    setRuntimeSocialSettings(updatedSettings);

    return NextResponse.json({
      success: true,
      message: "Social settings synced successfully to database",
      settings: updatedSettings,
    });
  } catch (err: any) {
    console.error("DRF settings sync error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Failed to update social settings to backend database",
      },
      { status: 500 }
    );
  }
}
