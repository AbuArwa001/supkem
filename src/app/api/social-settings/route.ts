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
    // 1. Check local file persistence (instant, resilient across dev/prod)
    const persisted = readPersistedSocialSettings();
    if (persisted && (persisted.updatedAt || persisted.channels)) {
      return NextResponse.json({
        success: true,
        source: "persisted",
        settings: persisted,
      });
    }

    // 2. Try to fetch from backend SystemParameter ONLY if Authorization is available
    const authHeader = request.headers.get("authorization");
    if (authHeader) {
      try {
        const res = await fetch(
          `${SERVER_API_URL}/api/v1/configurations/system-parameters/SOCIAL_MEDIA_SETTINGS/`,
          {
            headers: {
              Accept: "application/json",
              Authorization: authHeader,
            },
            next: { revalidate: 30 },
          }
        );

        if (res.ok) {
          const data = await res.json();
          if (data?.value) {
            const parsed = typeof data.value === "string" ? JSON.parse(data.value) : data.value;
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
          }
        }
      } catch {
        // Backend request fallback
      }
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
      provider: body.provider || currentSettings.provider,
      widgetId: typeof body.widgetId === "string" ? body.widgetId.trim() : currentSettings.widgetId,
      widgetUrl: typeof body.widgetUrl === "string" ? body.widgetUrl.trim() : currentSettings.widgetUrl,
      isEnabled: typeof body.isEnabled === "boolean" ? body.isEnabled : currentSettings.isEnabled,
      defaultView: body.defaultView === "grid" ? "grid" : (body.defaultView === "widget" ? "widget" : currentSettings.defaultView),
      channels: Array.isArray(body.channels) ? body.channels : currentSettings.channels,
      metaApi: body.metaApi || currentSettings.metaApi,
      youtubeApi: body.youtubeApi || currentSettings.youtubeApi,
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
          name: "Social Media & Tagembed Settings",
          description: "Configuration for Tagembed live wall, aggregator provider, and official handles.",
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

        // If not existing, try creating via POST
        if (!patchRes.ok && patchRes.status === 404) {
          await fetch(
            `${SERVER_API_URL}/api/v1/configurations/system-parameters/`,
            {
              method: "POST",
              headers,
              body: JSON.stringify(payload),
            }
          );
        }
      } catch {
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
