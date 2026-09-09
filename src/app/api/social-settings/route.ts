import { NextResponse } from "next/server";
import {
  SocialMediaSettings,
  getDefaultSocialSettings,
} from "@/lib/socialSettings";

const SERVER_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://supkem-drf.onrender.com";

// In-memory runtime cache for quick edge resolution and local persistence fallback
let cachedSettings: SocialMediaSettings | null = null;

export async function GET() {
  try {
    // 1. Try to fetch from backend SystemParameter if available
    try {
      const res = await fetch(
        `${SERVER_API_URL}/api/v1/configurations/system-parameters/SOCIAL_MEDIA_SETTINGS/`,
        {
          headers: { Accept: "application/json" },
          next: { revalidate: 30 },
        }
      );

      if (res.ok) {
        const data = await res.json();
        if (data?.value) {
          const parsed = typeof data.value === "string" ? JSON.parse(data.value) : data.value;
          cachedSettings = {
            ...getDefaultSocialSettings(),
            ...parsed,
          };
          return NextResponse.json({
            success: true,
            source: "database",
            settings: cachedSettings,
          });
        }
      }
    } catch {
      // Backend request fallback to cache or defaults
    }

    // 2. Return cached runtime settings if already modified
    if (cachedSettings) {
      return NextResponse.json({
        success: true,
        source: "cache",
        settings: cachedSettings,
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
    const currentDefaults = getDefaultSocialSettings();

    const updatedSettings: SocialMediaSettings = {
      provider: body.provider || currentDefaults.provider,
      widgetId: typeof body.widgetId === "string" ? body.widgetId.trim() : currentDefaults.widgetId,
      widgetUrl: typeof body.widgetUrl === "string" ? body.widgetUrl.trim() : currentDefaults.widgetUrl,
      isEnabled: typeof body.isEnabled === "boolean" ? body.isEnabled : true,
      defaultView: body.defaultView === "grid" ? "grid" : "widget",
      channels: Array.isArray(body.channels) ? body.channels : currentDefaults.channels,
      updatedAt: new Date().toISOString(),
    };

    // Update in-memory runtime cache
    cachedSettings = updatedSettings;

    // Attempt to persist to Django REST Framework backend SystemParameter
    const authHeader = request.headers.get("authorization");
    const cookieHeader = request.headers.get("cookie");

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (authHeader) headers["Authorization"] = authHeader;
      if (cookieHeader) headers["Cookie"] = cookieHeader;

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
      // Backend persistence is non-blocking for local/demo flexibility
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
      { status: 400 }
    );
  }
}
