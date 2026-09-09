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
          },
          youtubeApi: {
            ...defaults.youtubeApi,
            ...(parsed.youtubeApi || {}),
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
