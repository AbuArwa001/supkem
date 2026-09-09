import fs from "fs";
import path from "path";
import { SocialMediaSettings, getDefaultSocialSettings } from "./socialSettings";

const SETTINGS_FILE = path.join(process.cwd(), "src/data/social-settings.json");

export function readPersistedSocialSettings(): SocialMediaSettings {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const content = fs.readFileSync(SETTINGS_FILE, "utf-8");
      if (content.trim()) {
        const parsed = JSON.parse(content);
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
        };
      }
    }
  } catch (err) {
    console.error("Failed to read social settings file:", err);
  }
  return getDefaultSocialSettings();
}

export function writePersistedSocialSettings(settings: SocialMediaSettings): void {
  try {
    const dir = path.dirname(SETTINGS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to persist social settings file:", err);
  }
}
