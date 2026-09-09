import { NextResponse } from "next/server";
import {
  SocialMediaSettings,
  getDefaultSocialSettings,
  setRuntimeSocialSettings,
} from "@/lib/socialSettings";
import {
  readPersistedSocialSettings,
  writePersistedSocialSettings,
} from "@/lib/socialSettingsServer";

const SERVER_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://supkem-drf.onrender.com";

export async function GET(request: Request) {
  try {
    // 1. Try to fetch from backend SystemParameter
    try {
      const headers: Record<string, string> = {
        Accept: "application/json",
      };
      
      const authHeader = request.headers.get("authorization");
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }

      const res = await fetch(
        `${SERVER_API_URL}/api/v1/configurations/system-parameters/SOCIAL_MEDIA_SETTINGS/`,
        {
          headers,
          next: { revalidate: 30 },
        }
      );

      if (res.ok) {
        const data = await res.json();
        if (data?.value) {
          const parsed = typeof data.value === "string" ? JSON.parse(data.value) : data.value;
          const persisted = readPersistedSocialSettings();
          
          const drfDate = new Date(parsed.updatedAt || 0).getTime();
          const localDate = new Date(persisted.updatedAt || 0).getTime();

          // Only overwrite local state with DRF state if DRF state is equal or newer
          if (drfDate >= localDate || !persisted.updatedAt) {
            const merged = {
              ...getDefaultSocialSettings(),
              ...parsed,
            };
            writePersistedSocialSettings(merged);
            return NextResponse.json({
              success: true,
              source: "database",
              settings: merged,
            });
          } else {
             // Local file is newer! (Likely a previous DRF sync failed)
             // Let's return the local file to avoid reverting UI state
             return NextResponse.json({
                success: true,
                source: "persisted (newer than db)",
                settings: persisted,
             });
          }
        }
      }
    } catch {
      // Backend request fallback
    }

    // 2. Check local file persistence (fallback, resilient across dev/prod)
    const persisted = readPersistedSocialSettings();
    if (persisted && (persisted.updatedAt || persisted.channels)) {
      return NextResponse.json({
        success: true,
        source: "persisted",
        settings: persisted,
      });
    }

    // 3. Fall back to environment defaults
    const defaults = getDefaultSocialSettings();
    return NextResponse.json({
      success: true,
      source: "defaults",
      settings: defaults,
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
    const currentSettings = readPersistedSocialSettings();

    const updatedSettings: SocialMediaSettings = {
      channels: Array.isArray(body.channels) ? body.channels : currentSettings.channels,
      metaApi: body.metaApi || currentSettings.metaApi,
      youtubeApi: body.youtubeApi || currentSettings.youtubeApi,
      twitterApi: body.twitterApi || currentSettings.twitterApi,
      updatedAt: new Date().toISOString(),
    };

    // Write to disk and update runtime cache
    writePersistedSocialSettings(updatedSettings);
    setRuntimeSocialSettings(updatedSettings);

    // Extract access_token from Authorization header or Cookie
    let authToken = request.headers.get("authorization");
    if (!authToken) {
      const cookieHeader = request.headers.get("cookie") || "";
      const match = cookieHeader.match(/access_token=([^;]+)/);
      if (match && match[1]) {
        authToken = `Bearer ${match[1].trim()}`;
      }
    }

    // Attempt to persist to DRF backend SystemParameter ONLY if user is authenticated
    if (authToken) {
      try {
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
        console.log("DRF PATCH status:", patchRes.status);
        if (!patchRes.ok) {
           console.log("DRF PATCH failed:", await patchRes.text());
        }

        // If not existing, try creating via POST
        if (!patchRes.ok && patchRes.status === 404) {
          const postRes = await fetch(
            `${SERVER_API_URL}/api/v1/configurations/system-parameters/`,
            {
              method: "POST",
              headers,
              body: JSON.stringify(payload),
            }
          );
          console.log("DRF POST status:", postRes.status);
          if (!postRes.ok) {
            console.log("DRF POST failed:", await postRes.text());
          }
        }
      } catch (err) {
        console.error("DRF sync error:", err);
        // Backend persistence is non-blocking
      }
    }

    return NextResponse.json({
      success: true,
      message: "Social settings updated successfully",
      settings: updatedSettings,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Failed to update social settings",
      },
      { status: 500 }
    );
  }
}
