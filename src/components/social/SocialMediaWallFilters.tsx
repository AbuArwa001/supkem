import React from "react";
import { Search } from "lucide-react";
import { SocialPlatform, SocialPost } from "./types";
import { PlatformIcon } from "./SocialPlatformIcons";

interface SocialMediaWallFiltersProps {
  selectedPlatform: SocialPlatform;
  onSelectPlatform: (platform: SocialPlatform) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  posts: SocialPost[];
}

const PLATFORMS: { id: SocialPlatform; label: string }[] = [
  { id: "all", label: "All Feeds" },
  { id: "x", label: "X (Twitter)" },
  { id: "facebook", label: "Facebook" },
  { id: "instagram", label: "Instagram" },
  { id: "tiktok", label: "TikTok" },
  { id: "youtube", label: "YouTube" },
];

export function SocialMediaWallFilters({
  selectedPlatform,
  onSelectPlatform,
  searchQuery,
  onSearchChange,
  posts,
}: SocialMediaWallFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200/80 overflow-x-auto w-full md:w-auto scrollbar-none">
        {PLATFORMS.map((item) => {
          const count = item.id === "all" ? posts.length : posts.filter((p) => p.platform === item.id).length;
          const isSelected = selectedPlatform === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectPlatform(item.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                isSelected ? "bg-white text-slate-900 shadow-md border border-slate-200/60" : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              {item.id !== "all" && <PlatformIcon platform={item.id} className="w-3.5 h-3.5" />}
              <span>{item.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-emerald-100 text-emerald-800" : "bg-slate-200/70 text-slate-600"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative w-full md:w-72">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search posts or #hashtags..."
          className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-sm transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
