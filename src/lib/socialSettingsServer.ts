import { SocialMediaSettings, getDefaultSocialSettings } from "./socialSettings";

const SERVER_API_URL = process.env.NEXT_PUBLIC_API_URL || "https://supkem-drf.onrender.com";

/**
 * Premium Next.js Data Cache fetch for Social Settings.
 * This function fetches the settings directly from the DRF backend, caching the response globally.
 * It uses the 'social-settings' tag, which can be instantly revalidated when settings are updated.
 */
export async function fetchSocialSettings(): Promise<SocialMediaSettings> {
  try {
    const res = await fetch(
      `${SERVER_API_URL}/api/v1/configurations/system-parameters/SOCIAL_MEDIA_SETTINGS/`,
      {
        headers: {
          Accept: "application/json",
        },
        next: { tags: ["social-settings"] },
        cache: "force-cache", // Ensures it stays cached until explicitly revalidated
      }
    );

    if (res.ok) {
      const data = await res.json();
      if (data?.value) {
        const parsed = typeof data.value === "string" ? JSON.parse(data.value) : data.value;
        const defaults = getDefaultSocialSettings();
        return {
          ...defaults,
          ...parsed,
          metaApi: {
            ...defaults.metaApi,
            ...(parsed.metaApi || {}),
            facebookPageId: (parsed.metaApi?.facebookPageId || defaults.metaApi?.facebookPageId || "").trim(),
            facebookAccessToken: (parsed.metaApi?.facebookAccessToken || defaults.metaApi?.facebookAccessToken || "").trim(),
            instagramBusinessId: (parsed.metaApi?.instagramBusinessId || defaults.metaApi?.instagramBusinessId || "").trim(),
          },
          youtubeApi: {
            ...defaults.youtubeApi,
            ...(parsed.youtubeApi || {}),
            apiKey: (parsed.youtubeApi?.apiKey || defaults.youtubeApi?.apiKey || "").trim(),
            channelId: (parsed.youtubeApi?.channelId || defaults.youtubeApi?.channelId || "").trim(),
            searchQuery: (parsed.youtubeApi?.searchQuery || defaults.youtubeApi?.searchQuery || "SUPKEM Kenya").trim(),
          },
          twitterApi: {
            ...defaults.twitterApi,
            ...(parsed.twitterApi || {}),
            bearerToken: (parsed.twitterApi?.bearerToken || defaults.twitterApi?.bearerToken || "").trim(),
            username: (parsed.twitterApi?.username || defaults.twitterApi?.username || "SUPKEM1").trim(),
          },
        };
      }
    }
  } catch (err) {
    console.error("Failed to fetch social settings from DRF backend:", err);
  }

  // If DRF is completely down or returns 404, we safely fall back to the defaults
  return getDefaultSocialSettings();
}
