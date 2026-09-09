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

    // Extract access_token and refresh_token from Authorization header or Cookies
    let authToken = request.headers.get("authorization");
    let refreshToken = "";

    const cookieHeader = request.headers.get("cookie") || "";
    const accessMatch = cookieHeader.match(/access_token=([^;]+)/);
    if (!authToken && accessMatch && accessMatch[1]) {
      authToken = `Bearer ${accessMatch[1].trim()}`;
    }
    const refreshMatch = cookieHeader.match(/refresh_token=([^;]+)/);
    if (refreshMatch && refreshMatch[1]) {
      refreshToken = refreshMatch[1].trim();
    }

    if (!authToken && !refreshToken) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Missing authentication credentials" },
        { status: 401 }
      );
    }

    let headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: authToken } : {}),
    };

    const payload = {
      key: "SOCIAL_MEDIA_SETTINGS",
      name: "Social Media Settings",
      description: "Configuration for official social media handles and API integrations.",
      category: "general",
      data_type: "json",
      value: JSON.stringify(updatedSettings),
    };

    // Helper to perform the PATCH/POST operation
    const executeSave = async (reqHeaders: Record<string, string>) => {
      let res = await fetch(
        `${SERVER_API_URL}/api/v1/configurations/system-parameters/SOCIAL_MEDIA_SETTINGS/`,
        {
          method: "PATCH",
          headers: reqHeaders,
          body: JSON.stringify({ value: JSON.stringify(updatedSettings) }),
        }
      );

      if (!res.ok && res.status === 404) {
        res = await fetch(
          `${SERVER_API_URL}/api/v1/configurations/system-parameters/`,
          {
            method: "POST",
            headers: reqHeaders,
            body: JSON.stringify(payload),
          }
        );
      }
      return res;
    };

    let saveRes = await executeSave(headers);

    // If 401 Unauthorized, attempt token refresh with refresh_token if present
    let newAccessToken = "";
    if (saveRes.status === 401 && refreshToken) {
      try {
        const refreshRes = await fetch(`${SERVER_API_URL}/api/v1/token/refresh/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: refreshToken }),
        });
        if (refreshRes.ok) {
          const tokenData = await refreshRes.json();
          if (tokenData?.access) {
            newAccessToken = tokenData.access;
            headers["Authorization"] = `Bearer ${newAccessToken}`;
            saveRes = await executeSave(headers);
          }
        }
      } catch (refreshErr) {
        console.warn("Token refresh attempt failed:", refreshErr);
      }
    }

    if (!saveRes.ok) {
      throw new Error(`DRF Backend request failed with status: ${saveRes.status}`);
    }

    // Instantly invalidate the Next.js Data Cache globally across all nodes
    // @ts-expect-error Next.js 16 requires a second argument in typings but not at runtime
    revalidateTag("social-settings");
    
    // Update local runtime cache just in case
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
      {
        success: false,
        error: err?.message || "Failed to update social settings to backend database",
      },
      { status: 500 }
    );
  }
}
