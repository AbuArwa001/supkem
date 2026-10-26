"use client";

import { useState } from "react";
import Image from "next/image";
import { SocialPost } from "./types";
import { PlatformIcon, VerifiedBadge } from "./SocialPlatformIcons";

interface SocialPostAuthorHeaderProps {
  post: SocialPost;
  channel?: { name: string; badgeClass?: string };
}

export function SocialPostAuthorHeader({ post, channel }: SocialPostAuthorHeaderProps) {
  const [avatarSrc, setAvatarSrc] = useState(post.author.avatar || "/logo.png");
  const isInstagram = post.platform === "instagram";
  const isFacebook = post.platform === "facebook";
  const isYouTube = post.platform === "youtube";

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`relative flex-shrink-0 ${
            isInstagram
              ? "p-[2.5px] rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-sm"
              : isFacebook
              ? "p-[2px] rounded-full bg-[#1877F2] shadow-sm"
              : isYouTube
              ? "p-[2px] rounded-full bg-red-600 shadow-sm"
              : "p-[1.5px] rounded-full bg-slate-200"
          }`}
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white border border-white">
            <Image
              src={avatarSrc}
              alt={post.author.name}
              fill
              unoptimized
              onError={() => setAvatarSrc("/logo.png")}
              className="object-cover"
            />
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm text-slate-900 truncate tracking-tight">
              {post.author.name}
            </span>
            {post.author.isVerified && (
              <VerifiedBadge
                className={`w-3.5 h-3.5 flex-shrink-0 ${
                  isFacebook
                    ? "text-[#1877F2]"
                    : isInstagram
                    ? "text-[#dc2743]"
                    : isYouTube
                    ? "text-red-600"
                    : "text-emerald-600"
                }`}
              />
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="truncate">{post.author.handle}</span>
            {post.relativeTime && (
              <>
                <span>•</span>
                <span className="font-medium text-slate-500 whitespace-nowrap">
                  {post.relativeTime}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div
        className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 border shadow-sm flex-shrink-0 transition-transform group-hover:scale-105 ${
          isInstagram
            ? "bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-amber-500/10 text-[#dc2743] border-pink-200"
            : isFacebook
            ? "bg-[#1877F2]/10 text-[#1877F2] border-[#1877F2]/20"
            : isYouTube
            ? "bg-red-50 text-red-600 border-red-200"
            : channel?.badgeClass || "bg-slate-100 text-slate-700 border-slate-200"
        }`}
      >
        <PlatformIcon platform={post.platform} className="w-3.5 h-3.5" />
        <span>{post.platform}</span>
      </div>
    </div>
  );
}
