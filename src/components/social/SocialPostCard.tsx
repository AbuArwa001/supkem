"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SocialPost } from "./types";
import { PlatformIcon, VerifiedBadge } from "./SocialPlatformIcons";
import { OFFICIAL_CHANNELS } from "./socialData";
import {
  Heart,
  Share2,
  MessageCircle,
  ExternalLink,
  Play,
  Layers,
  Check,
  Clock,
  Sparkles,
} from "lucide-react";

interface SocialPostCardProps {
  post: SocialPost;
  onOpenLightbox: (post: SocialPost) => void;
}

export function SocialPostCard({ post, onOpenLightbox }: SocialPostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [isCopied, setIsCopied] = useState(false);

  const channel = (OFFICIAL_CHANNELS as any)[post.platform];
  const images = post.images || [];

  const [avatarSrc, setAvatarSrc] = useState(post.author.avatar || "/logo.png");

  const isInstagram = post.platform === "instagram";
  const isFacebook = post.platform === "facebook";
  const isYouTube = post.platform === "youtube";

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      setIsLiked(false);
      setLikesCount((prev) => Math.max(0, prev - 1));
    } else {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    }
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
      } catch {
        // Fallback to clipboard
      }
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
      {/* Brand Accent Stripe */}
      {isInstagram ? (
        <div className="h-1.5 w-full bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888]" />
      ) : isFacebook ? (
        <div className="h-1.5 w-full bg-[#1877F2]" />
      ) : isYouTube ? (
        <div className="h-1.5 w-full bg-[#FF0000]" />
      ) : (
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 to-teal-600" />
      )}

      {/* Top Section / Author Header */}
      <div className="p-5 pb-3">
        <div className="flex items-center justify-between gap-3">
          {/* Author Info */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Avatar with distinctive platform ring */}
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

          {/* Platform Badge */}
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

        {/* Post Text Content */}
        <p className="mt-3.5 text-slate-800 text-sm leading-relaxed line-clamp-4 font-normal select-text">
          {post.content}
        </p>

        {/* Hashtags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg border transition-colors ${
                  isInstagram
                    ? "bg-pink-50 text-pink-700 border-pink-100 group-hover:bg-pink-100/70"
                    : isFacebook
                    ? "bg-blue-50 text-blue-700 border-blue-100 group-hover:bg-blue-100/70"
                    : isYouTube
                    ? "bg-red-50 text-red-700 border-red-100 group-hover:bg-red-100/70"
                    : "bg-emerald-50 text-emerald-700 border-emerald-100 group-hover:bg-emerald-100/70"
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Media Showcase Section */}
      {images.length > 0 && (
        <div className="relative w-full h-64 bg-slate-900 overflow-hidden mt-2">
          <Image
            src={images[0]}
            alt={post.content.slice(0, 50) || "SUPKEM Social Post"}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Multiple Photos Badge */}
          {images.length > 1 && (
            <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 border border-white/20 shadow-lg">
              <Layers className="w-3.5 h-3.5 text-amber-300" />
              <span>1 / {images.length}</span>
            </div>
          )}

          {/* Quick Expand Hint */}
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white/90 text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 border border-white/10">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Click to expand</span>
          </div>
        </div>
      )}

      {/* Video Preview */}
      {post.mediaType === "video" && (post.videoThumbnail || images.length === 0) && (
        <div className="relative w-full h-64 bg-black overflow-hidden mt-2">
          {post.videoThumbnail && (
            <Image
              src={post.videoThumbnail}
              alt="Video post"
              fill
              unoptimized
              className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-red-600/95 text-white flex items-center justify-center shadow-xl transform transition-transform group-hover:scale-110">
              <Play className="w-6 h-6 fill-current ml-0.5" />
            </div>
          </div>
          {post.videoDuration && (
            <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-lg bg-black/80 text-white text-xs font-bold border border-white/20">
              {post.videoDuration}
            </div>
          )}
        </div>
      )}

      {/* Bottom Engagements Bar */}
      <div className="p-4 pt-3 mt-auto border-t border-slate-100 bg-slate-50/60 backdrop-blur-sm flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
          {/* Like Interaction */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 transition-all active:scale-125 ${
              isLiked ? "text-rose-600 font-bold" : "hover:text-rose-600"
            }`}
            title="Like"
          >
            <Heart
              className={`w-4 h-4 transition-transform ${
                isLiked ? "fill-current text-rose-600 scale-110" : ""
              }`}
            />
            <span>{likesCount}</span>
          </button>

          {/* Comments Count */}
          <div className="flex items-center gap-1.5 hover:text-slate-800 transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments}</span>
          </div>

          {/* Share Action */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors"
            title="Share"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-600 font-bold">Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>{post.shares > 0 ? post.shares : ""}</span>
              </>
            )}
          </button>
        </div>

        {/* Direct Platform Jump Link */}
        <a
          href={post.postUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`text-xs font-bold flex items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
            isInstagram
              ? "text-[#dc2743] hover:bg-pink-50"
              : isFacebook
              ? "text-[#1877F2] hover:bg-blue-50"
              : isYouTube
              ? "text-red-600 hover:bg-red-50"
              : "text-emerald-700 hover:bg-emerald-50"
          }`}
          title={`View original post on ${channel?.name || "Platform"}`}
        >
          <span>{isYouTube ? "Watch" : "View"}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </article>
  );
}
