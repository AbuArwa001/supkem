export { type WidgetProvider } from "@/components/social/types";
import { WidgetProvider } from "@/components/social/types";

export interface SocialChannelConfig {
  id: string; // "x" | "facebook" | "instagram" | "tiktok" | "youtube" | custom
  name: string;
  handle: string;
  url: string;
  enabled: boolean;
  color?: string;
  bgClass?: string;
  badgeClass?: string;
}

export interface MetaApiSettings {
  enabled: boolean;
  facebookPageId: string;
  facebookAccessToken: string;
  instagramBusinessId: string;
  cacheDurationMinutes?: number;
  lastSyncedAt?: string;
}

export interface YouTubeApiSettings {
  enabled: boolean;
  apiKey: string;
  channelId?: string;
  searchQuery?: string;
  maxResults?: number;
  lastSyncedAt?: string;
}

export interface SocialMediaSettings {
  provider: WidgetProvider;
  widgetId: string;
  widgetUrl: string;
  isEnabled: boolean; // Master toggle for the live social aggregator widget
  defaultView: "widget" | "grid";
  channels: SocialChannelConfig[];
  metaApi?: MetaApiSettings;
  youtubeApi?: YouTubeApiSettings;
  updatedAt: string;
}

export const DEFAULT_SOCIAL_CHANNELS: SocialChannelConfig[] = [
  {
    id: "x",
    name: "X (Twitter)",
    handle: "@SUPKEM1",
    url: "https://x.com/SUPKEM1",
    enabled: true,
    color: "#000000",
    bgClass: "bg-slate-900 text-white hover:bg-black",
    badgeClass: "bg-slate-900 text-white border-slate-700",
  },
  {
    id: "facebook",
    name: "Facebook",
    handle: "Supreme Council of Kenya Muslims",
    url: "https://www.facebook.com/p/Supreme-Council-of-Kenya-Muslims-100079747610399/",
    enabled: true,
    color: "#1877F2",
    bgClass: "bg-[#1877F2] text-white hover:bg-[#166fe5]",
    badgeClass: "bg-[#1877F2]/15 text-[#1877F2] border-[#1877F2]/30",
  },
  {
    id: "instagram",
    name: "Instagram",
    handle: "@supkem_kenya",
    url: "https://www.instagram.com/supkem_kenya/",
    enabled: true,
    color: "#E1306C",
    bgClass: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white",
    badgeClass: "bg-pink-500/15 text-pink-600 border-pink-500/30",
  },
  {
    id: "tiktok",
    name: "TikTok",
    handle: "@supkem_kenya",
    url: "https://www.tiktok.com/@supkem_kenya",
    enabled: true,
    color: "#000000",
    bgClass: "bg-black text-white hover:bg-neutral-800",
    badgeClass: "bg-cyan-500/15 text-cyan-600 border-cyan-500/30",
  },
  {
    id: "youtube",
    name: "YouTube",
    handle: "SUPKEM Kenya",
    url: "https://youtube.com/@SUPKEM",
    enabled: true,
    color: "#FF0000",
    bgClass: "bg-red-600 text-white hover:bg-red-700",
    badgeClass: "bg-red-500/15 text-red-600 border-red-500/30",
  },
];

export const getDefaultMetaApiSettings = (): MetaApiSettings => ({
  enabled: process.env.META_API_ENABLED === "true" || false,
  facebookPageId: (process.env.META_FACEBOOK_PAGE_ID || "").trim(),
  facebookAccessToken: (process.env.META_FACEBOOK_ACCESS_TOKEN || "").trim(),
  instagramBusinessId: (process.env.META_INSTAGRAM_BUSINESS_ID || "").trim(),
  cacheDurationMinutes: 30,
});

export const getDefaultYouTubeApiSettings = (): YouTubeApiSettings => ({
  enabled:
    process.env.YOUTUBE_API_ENABLED === "true" ||
    !!(process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY),
  apiKey: (
    process.env.YOUTUBE_API_KEY ||
    process.env.NEXT_PUBLIC_YOUTUBE_API_KEY ||
    ""
  ).trim(),
  channelId: (
    process.env.YOUTUBE_CHANNEL_ID ||
    process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID ||
    ""
  ).trim(),
  searchQuery: (process.env.YOUTUBE_SEARCH_QUERY || "SUPKEM Kenya").trim(),
  maxResults: 6,
});

export const getDefaultSocialSettings = (): SocialMediaSettings => ({
  provider: ((process.env.NEXT_PUBLIC_SOCIAL_WALL_PROVIDER || "tagembed").trim() as WidgetProvider) || "tagembed",
  widgetId: (process.env.NEXT_PUBLIC_SOCIAL_WALL_ID || "").trim(),
  widgetUrl: (process.env.NEXT_PUBLIC_SOCIAL_WALL_URL || "").trim(),
  isEnabled: true,
  defaultView: "widget",
  channels: DEFAULT_SOCIAL_CHANNELS,
  metaApi: getDefaultMetaApiSettings(),
  youtubeApi: getDefaultYouTubeApiSettings(),
  updatedAt: new Date().toISOString(),
});

let runtimeCachedSettings: SocialMediaSettings | null = null;

export function getRuntimeSocialSettings(): SocialMediaSettings {
  return runtimeCachedSettings || getDefaultSocialSettings();
}

export function setRuntimeSocialSettings(settings: SocialMediaSettings): void {
  runtimeCachedSettings = settings;
}

