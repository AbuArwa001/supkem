import { useState, useEffect } from "react";
import { SocialMediaSettings, getDefaultSocialSettings } from "@/lib/socialSettings";
import { saveSocialSettingsApi } from "./socialApiHelpers";
import { useSocialChannelsManager } from "./useSocialChannelsManager";
import { useSocialApiTests } from "./useSocialApiTests";

export function useSocialSettingsLogic() {
  const [settings, setSettings] = useState<SocialMediaSettings>(getDefaultSocialSettings());
  const [initialSettings, setInitialSettings] = useState<SocialMediaSettings>(getDefaultSocialSettings());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isTogglingYt, setIsTogglingYt] = useState(false);
  const [isTogglingMeta, setIsTogglingMeta] = useState(false);
  const [isTogglingTwitter, setIsTogglingTwitter] = useState(false);

  useEffect(() => {
    fetch("/api/social-settings")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.settings) {
          setSettings(d.settings);
          setInitialSettings(d.settings);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const persistSettings = async (updated: SocialMediaSettings, msg?: string): Promise<boolean> => {
    try {
      const data = await saveSocialSettingsApi(updated);
      setSettings(data.settings);
      setInitialSettings(data.settings);
      if (msg) setStatusMessage({ type: "success", text: msg });
      return true;
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err?.message || "Failed to save settings." });
      return false;
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setStatusMessage(null);
    await persistSettings(settings, "Social media settings saved successfully!");
    setIsSaving(false);
  };

  const handleReset = () => {
    if (confirm("Reset social settings back to defaults?")) setSettings(getDefaultSocialSettings());
  };

  const handleToggleTwitterApi = async (enabled: boolean) => {
    setIsTogglingTwitter(true);
    const updated = { ...settings, twitterApi: { ...(settings.twitterApi || { enabled: false, bearerToken: "", username: "SUPKEM1", maxResults: 6 }), enabled } };
    setSettings(updated);
    await persistSettings(updated, enabled ? "✅ Twitter API Ingestion is now ACTIVE!" : "⏸️ Twitter API Ingestion is DISABLED.");
    setIsTogglingTwitter(false);
  };

  const handleToggleYoutubeApi = async (enabled: boolean) => {
    setIsTogglingYt(true);
    const updated = { ...settings, youtubeApi: { ...(settings.youtubeApi || { apiKey: "", channelId: "", searchQuery: "SUPKEM Kenya", maxResults: 6 }), enabled } };
    setSettings(updated);
    await persistSettings(updated, enabled ? "✅ YouTube Stream is ACTIVE!" : "⏸️ YouTube Stream is DISABLED.");
    setIsTogglingYt(false);
  };

  const handleToggleMetaApi = async (enabled: boolean) => {
    setIsTogglingMeta(true);
    const updated = { ...settings, metaApi: { ...(settings.metaApi || { facebookPageId: "100079747610399", facebookAccessToken: "", instagramBusinessId: "", cacheDurationMinutes: 30 }), enabled } };
    setSettings(updated);
    await persistSettings(updated, enabled ? "✅ Direct Meta API is ACTIVE!" : "⏸️ Direct Meta API is DISABLED.");
    setIsTogglingMeta(false);
  };

  const channelsMgr = useSocialChannelsManager(settings, setSettings, persistSettings);
  const apiTests = useSocialApiTests(settings);

  return {
    settings, setSettings, initialSettings, isLoading, isSaving, statusMessage, setStatusMessage,
    isTogglingYt, isTogglingMeta, isTogglingTwitter, handleSave, handleReset, persistSettings,
    handleToggleTwitterApi, handleToggleYoutubeApi, handleToggleMetaApi,
    ...channelsMgr,
    ...apiTests,
  };
}
