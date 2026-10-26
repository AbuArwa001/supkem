"use client";

import React, { useState } from "react";
import { SocialPost } from "./types";
import { OFFICIAL_CHANNELS } from "./socialData";
import { SocialPostAuthorHeader } from "./SocialPostAuthorHeader";
import { SocialPostMedia } from "./SocialPostMedia";
import { SocialPostEngagementsBar } from "./SocialPostEngagementsBar";

interface SocialPostCardProps {
  post: SocialPost;
  onOpenLightbox: (post: SocialPost) => void;
}

export function SocialPostCard({ post, onOpenLightbox }: SocialPostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [isCopied, setIsCopied] = useState(false);

  const channel = (OFFICIAL_CHANNELS as any)[post.platform];
  const isInstagram = post.platform === "instagram";
  const isFacebook = post.platform === "facebook";
  const isYouTube = post.platform === "youtube";

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? Math.max(0, prev - 1) : prev + 1));
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `SUPKEM on ${channel?.name || "Social Media"}`,
          text: post.content.slice(0, 120),
          url: post.postUrl,
        });
        return;
      } catch {}
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(post.postUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <article
      onClick={() => onOpenLightbox(post)}
      className="group relative flex flex-col justify-between rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-slate-300 transition-all duration-500 overflow-hidden cursor-pointer hover:-translate-y-1.5 transform-gpu"
    >
      <div className={`h-1.5 w-full ${
        isInstagram ? "bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888]" :
        isFacebook ? "bg-[#1877F2]" :
        isYouTube ? "bg-[#FF0000]" :
        "bg-gradient-to-r from-emerald-600 to-teal-600"
      }`} />

      <div className="p-5 pb-3">
        <SocialPostAuthorHeader post={post} channel={channel} />

        <p className="mt-3.5 text-slate-800 text-sm leading-relaxed line-clamp-4 font-normal select-text">
          {post.content}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-semibold px-2 py-0.5 rounded-lg border transition-colors bg-emerald-50 text-emerald-700 border-emerald-100 group-hover:bg-emerald-100/70"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <SocialPostMedia post={post} />

      <SocialPostEngagementsBar
        post={post}
        isLiked={isLiked}
        likesCount={likesCount}
        onLike={handleLike}
        isCopied={isCopied}
        onShare={handleShare}
      />
    </article>
  );
}
