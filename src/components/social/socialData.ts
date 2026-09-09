import { SocialPost } from "./types";

export const OFFICIAL_CHANNELS = {
  x: {
    name: "X (Twitter)",
    handle: "@SUPKEM1",
    url: "https://x.com/SUPKEM1",
    color: "#000000",
    bgClass: "bg-slate-900 text-white hover:bg-black",
    badgeClass: "bg-slate-900 text-white border-slate-700",
  },
  facebook: {
    name: "Facebook",
    handle: "Supreme Council of Kenya Muslims",
    url: "https://www.facebook.com/p/Supreme-Council-of-Kenya-Muslims-100079747610399/",
    color: "#1877F2",
    bgClass: "bg-[#1877F2] text-white hover:bg-[#166fe5]",
    badgeClass: "bg-[#1877F2]/15 text-[#1877F2] border-[#1877F2]/30",
  },
  instagram: {
    name: "Instagram",
    handle: "@supkem_kenya",
    url: "https://www.instagram.com/supkem_kenya/",
    color: "#E1306C",
    bgClass: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white",
    badgeClass: "bg-pink-500/15 text-pink-600 border-pink-500/30",
  },
  tiktok: {
    name: "TikTok",
    handle: "@supkem_kenya",
    url: "https://www.tiktok.com/@supkem_kenya",
    color: "#000000",
    bgClass: "bg-black text-white hover:bg-neutral-800",
    badgeClass: "bg-cyan-500/15 text-cyan-600 border-cyan-500/30",
  },
  youtube: {
    name: "YouTube",
    handle: "SUPKEM Kenya",
    url: "https://youtube.com/@SUPKEM",
    color: "#FF0000",
    bgClass: "bg-red-600 text-white hover:bg-red-700",
    badgeClass: "bg-red-500/15 text-red-600 border-red-500/30",
  },
};

export const INITIAL_SOCIAL_POSTS: SocialPost[] = [];
