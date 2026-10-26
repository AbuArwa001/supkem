import { SocialMediaSettings } from "@/lib/socialSettings";

const SERVER_API_URL = process.env.NEXT_PUBLIC_API_URL || "https://supkem-drf.onrender.com";

export function extractAuthTokens(request: Request) {
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

  return { authToken, refreshToken };
}

export async function saveSocialSettingsBackend(
  updatedSettings: SocialMediaSettings,
  authToken: string | null,
  refreshToken: string
): Promise<{ success: boolean; newAccessToken?: string }> {
  const headers: Record<string, string> = {
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
      res = await fetch(`${SERVER_API_URL}/api/v1/configurations/system-parameters/`, {
        method: "POST",
        headers: reqHeaders,
        body: JSON.stringify(payload),
      });
    }
    return res;
  };

  let saveRes = await executeSave(headers);
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

  return { success: true, newAccessToken: newAccessToken || undefined };
}
