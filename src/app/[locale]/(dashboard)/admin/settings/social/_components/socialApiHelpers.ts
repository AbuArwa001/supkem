import Cookies from "js-cookie";
import { SocialMediaSettings } from "@/lib/socialSettings";

export async function saveSocialSettingsApi(settings: SocialMediaSettings) {
  const token = Cookies.get("access_token");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch("/api/social-settings", {
    method: "POST",
    headers,
    body: JSON.stringify(settings),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => null);
    throw new Error(errData?.error || "Failed to persist social settings");
  }
  return await res.json();
}

export async function testMetaApi(payload: { facebookPageId: string; facebookAccessToken: string; instagramBusinessId: string }) {
  const res = await fetch("/api/meta-test", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return await res.json();
}

export async function testYouTubeApi(payload: { apiKey: string; channelId: string }) {
  const res = await fetch("/api/youtube-test", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return await res.json();
}
