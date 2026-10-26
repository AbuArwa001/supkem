import { useState } from "react";
import { SocialMediaSettings, SocialChannelConfig } from "@/lib/socialSettings";

export function useSocialChannelsManager(
  settings: SocialMediaSettings,
  setSettings: React.Dispatch<React.SetStateAction<SocialMediaSettings>>,
  persistSettings: (updated: SocialMediaSettings, msg?: string) => Promise<boolean>
) {
  const [togglingChannelId, setTogglingChannelId] = useState<string | null>(null);

  const toggleChannel = async (id: string) => {
    const target = settings.channels.find((ch) => ch.id === id);
    if (!target) return;
    const nextEnabled = !target.enabled;
    setTogglingChannelId(id);
    const updated = {
      ...settings,
      channels: settings.channels.map((ch) => ch.id === id ? { ...ch, enabled: nextEnabled } : ch),
    };
    setSettings(updated);
    await persistSettings(updated, nextEnabled ? `✅ ${target.name} channel enabled!` : `⏸️ ${target.name} channel disabled!`);
    setTogglingChannelId(null);
  };

  const updateChannel = (id: string, updates: Partial<SocialChannelConfig>) => {
    setSettings((prev) => ({
      ...prev,
      channels: prev.channels.map((ch) => ch.id === id ? { ...ch, ...updates } : ch),
    }));
  };

  const deleteChannel = async (id: string) => {
    const target = settings.channels.find((ch) => ch.id === id);
    if (!confirm(`Are you sure you want to remove "${target?.name || id}"?`)) return;
    const updated = { ...settings, channels: settings.channels.filter((ch) => ch.id !== id) };
    setSettings(updated);
    await persistSettings(updated, `🗑️ ${target?.name || id} channel has been removed.`);
  };

  const addCustomChannel = async (name: string, handle: string, url: string) => {
    if (!name.trim() || !url.trim()) return;
    const id = name.toLowerCase().replace(/[^a-z0-9]/g, "-") || `custom-${Date.now()}`;
    const newChan: SocialChannelConfig = {
      id, name: name.trim(), handle: handle.trim() || name.trim(), url: url.trim(),
      enabled: true, color: "#059669", bgClass: "bg-emerald-600 text-white",
      badgeClass: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
    };
    const updated = { ...settings, channels: [...settings.channels, newChan] };
    setSettings(updated);
    await persistSettings(updated, `✅ New channel "${newChan.name}" added successfully!`);
  };

  return { togglingChannelId, toggleChannel, updateChannel, deleteChannel, addCustomChannel };
}
