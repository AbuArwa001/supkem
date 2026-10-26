import React from "react";
import { Facebook, Instagram, Youtube, Link as LinkIcon } from "lucide-react";

export interface SocialChannel {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
}

export const DEFAULT_CHANNELS: SocialChannel[] = [
  { id: "x", name: "X (Twitter)", url: "https://x.com/SUPKEM1", enabled: true },
  { id: "facebook", name: "Facebook", url: "https://www.facebook.com/p/Supreme-Council-of-Kenya-Muslims-100079747610399/", enabled: true },
  { id: "instagram", name: "Instagram", url: "https://www.instagram.com/supkem_kenya/", enabled: true },
  { id: "youtube", name: "YouTube", url: "https://youtube.com/@SUPKEM", enabled: true },
  { id: "tiktok", name: "TikTok", url: "https://www.tiktok.com/@supkem_kenya", enabled: true },
];

export const getHeroSocialChannelConfig = (id: string) => {
  switch (id) {
    case "x":
      return {
        icon: (
          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        ),
        hoverStyle: "hover:text-white hover:bg-white/20 hover:border-white/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]",
      };
    case "facebook":
      return {
        icon: <Facebook className="w-3 h-3 sm:w-3.5 sm:h-3.5" />,
        hoverStyle: "hover:text-blue-400 hover:bg-blue-600/20 hover:border-blue-400/40 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]",
      };
    case "instagram":
      return {
        icon: <Instagram className="w-3 h-3 sm:w-3.5 sm:h-3.5" />,
        hoverStyle: "hover:text-pink-400 hover:bg-pink-600/20 hover:border-pink-400/40 hover:shadow-[0_0_15px_rgba(236,72,153,0.4)]",
      };
    case "youtube":
      return {
        icon: <Youtube className="w-3 h-3 sm:w-3.5 sm:h-3.5" />,
        hoverStyle: "hover:text-red-400 hover:bg-red-600/20 hover:border-red-400/40 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]",
      };
    case "tiktok":
      return {
        icon: (
          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.02c0 2.45-.82 4.84-2.39 6.64-1.57 1.8-3.8 2.87-6.17 2.98-2.37.11-4.73-.72-6.42-2.34-1.69-1.62-2.58-3.92-2.48-6.3.1-2.38 1.11-4.63 2.86-6.14 1.75-1.51 4.12-2.22 6.44-1.95v4.06c-1.19-.15-2.41.19-3.32.96-.91.77-1.43 1.94-1.41 3.14.02 1.2.58 2.34 1.51 3.08.93.74 2.18 1.01 3.33.72 1.15-.29 2.12-1.12 2.61-2.23.23-.52.34-1.09.34-1.67V.02z" />
          </svg>
        ),
        hoverStyle: "hover:text-cyan-400 hover:bg-cyan-600/20 hover:border-cyan-400/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]",
      };
    default:
      return {
        icon: <LinkIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />,
        hoverStyle: "hover:text-amber-300 hover:bg-amber-500/20 hover:border-amber-400/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)]",
      };
  }
};
