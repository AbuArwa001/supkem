import { SocialMediaSettings } from "./socialSettingsTypes";
import { getDefaultSocialSettings } from "./socialSettingsDefaults";

export * from "./socialSettingsTypes";
export * from "./socialSettingsDefaults";

let runtimeCachedSettings: SocialMediaSettings | null = null;

export function getRuntimeSocialSettings(): SocialMediaSettings {
  return runtimeCachedSettings || getDefaultSocialSettings();
}

export function setRuntimeSocialSettings(settings: SocialMediaSettings): void {
  runtimeCachedSettings = settings;
}
