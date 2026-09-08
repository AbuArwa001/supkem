export type SocialPlatform = "all" | "x" | "facebook" | "instagram" | "tiktok";

export type SocialMediaType = "image" | "gallery" | "video" | "text";

export interface SocialAuthor {
  name: string;
  handle: string;
  avatar: string;
  profileUrl: string;
  isVerified: boolean;
}

export interface SocialPost {
  id: string;
  platform: "x" | "facebook" | "instagram" | "tiktok";
  author: SocialAuthor;
  content: string;
  publishedAt: string;
  relativeTime: string;
  mediaType: SocialMediaType;
  images?: string[];
  videoUrl?: string;
  videoThumbnail?: string;
  videoDuration?: string;
  likes: number;
  shares: number;
  comments: number;
  postUrl: string;
  tags: string[];
  isPinned?: boolean;
}

export type WidgetProvider = "tagembed" | "taggbox" | "curator" | "juicer" | "elfsight" | "wallsio" | "iframe" | "native";

export interface SocialWallConfig {
  provider?: WidgetProvider;
  feedId?: string;
  iframeUrl?: string;
  scriptUrl?: string;
}

export interface SocialMediaWallProps {
  className?: string;
  variant?: "full" | "compact" | "feed";
  initialPlatform?: SocialPlatform;
  title?: string;
  subtitle?: string;
  limit?: number;
  showFilters?: boolean;
  showStats?: boolean;
  config?: SocialWallConfig;
}
