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

export interface TwitterApiSettings {
  enabled: boolean;
  bearerToken: string;
  username: string;
  maxResults?: number;
  lastSyncedAt?: string;
}

export interface SocialMediaSettings {
  channels: SocialChannelConfig[];
  metaApi?: MetaApiSettings;
  youtubeApi?: YouTubeApiSettings;
  twitterApi?: TwitterApiSettings;
  updatedAt: string;
}
