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

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
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
      className="group relative flex flex-col justify-between rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1"
    >
      {/* Top Banner / Platform Accent */}
      <div className="p-5 pb-3">
        <div className="flex items-center justify-between gap-3">
          {/* Author info */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-emerald-50 flex-shrink-0">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-slate-900 truncate">
                  {post.author.name}
                </span>
                {post.author.isVerified && (
                  <VerifiedBadge className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-slate-500 truncate">{post.author.handle}</p>
            </div>
          </div>

          {/* Platform Badge */}
          <div
            className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border shadow-sm flex-shrink-0 ${
              channel?.badgeClass || "bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            <PlatformIcon platform={post.platform} className="w-3 h-3" />
            <span className="hidden sm:inline capitalize">{post.platform}</span>
          </div>
        </div>

        {/* Post Text */}
        <p className="mt-3.5 text-slate-800 text-sm leading-relaxed line-clamp-4 font-normal">
          {post.content}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-semibold text-emerald-700 bg-emerald-50/90 px-2 py-0.5 rounded-md border border-emerald-100"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Media Section */}
      {images.length > 0 && (
        <div className="relative w-full h-56 bg-slate-100 overflow-hidden mt-2">
          <Image
            src={images[0]}
            alt="SUPKEM Social Media Update"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {images.length > 1 && (
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-xl bg-black/75 backdrop-blur-sm text-white text-xs font-semibold flex items-center gap-1.5 border border-white/20">
              <Layers className="w-3.5 h-3.5" />
              <span>+{images.length - 1} photos</span>
            </div>
          )}
        </div>
      )}

      {/* Video Thumbnail */}
      {post.mediaType === "video" && post.videoThumbnail && (
        <div className="relative w-full h-56 bg-black overflow-hidden mt-2">
          <Image
            src={post.videoThumbnail}
            alt="Video update"
            fill
            className="object-cover opacity-85 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </div>
          </div>
          {post.videoDuration && (
            <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-lg bg-black/80 text-white text-xs font-bold border border-white/20">
              {post.videoDuration}
            </div>
          )}
        </div>
      )}

      {/* Bottom Engagements & Action */}
      <div className="p-4 pt-3 mt-auto border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
          {/* Like button */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 transition-colors ${
              isLiked ? "text-red-500 font-bold" : "hover:text-red-500"
            }`}
            title="Like"
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current text-red-500" : ""}`} />
            <span>{likesCount}</span>
          </button>

          {/* Comments */}
          <div className="flex items-center gap-1 hover:text-slate-700">
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments}</span>
          </div>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1 hover:text-emerald-600 transition-colors"
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
                <span>{post.shares}</span>
              </>
            )}
          </button>
        </div>

        {/* Direct Link */}
        <a
          href={post.postUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
          title={`View on ${channel?.name || "platform"}`}
        >
          <span>View</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </article>
  );
}
