"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SocialPost } from "./types";
import { PlatformIcon, VerifiedBadge } from "./SocialPlatformIcons";
import { OFFICIAL_CHANNELS } from "./socialData";
import {
  X,
  Heart,
  Share2,
  MessageCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Check,
  Calendar,
} from "lucide-react";

interface SocialMediaLightboxProps {
  post: SocialPost | null;
  onClose: () => void;
}

export function SocialMediaLightbox({ post, onClose }: SocialMediaLightboxProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(post?.author?.avatar || "/logo.png");

  React.useEffect(() => {
    if (post) {
      setAvatarSrc(post.author.avatar || "/logo.png");
      setActiveImageIndex(0);
      setIsLiked(false);
      setCopied(false);
    }
  }, [post]);

  if (!post) return null;

  const channel = (OFFICIAL_CHANNELS as any)[post.platform];
  const images = post.images || (post.videoThumbnail ? [post.videoThumbnail] : []);
  const hasMultipleImages = images.length > 1;

  const isInstagram = post.platform === "instagram";
  const isFacebook = post.platform === "facebook";
  const isYouTube = post.platform === "youtube";

  let youtubeVideoId: string | null = null;
  if (isYouTube && post.videoUrl) {
    const match = post.videoUrl.match(/(?:v=|youtu\.be\/|\/embed\/)([a-zA-Z0-9_-]{11})/);
    youtubeVideoId = match ? match[1] : post.id.replace("yt-", "");
  }

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(post.postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300 select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row text-white animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Brand Accent Top Stripe */}
        {isInstagram ? (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] z-30" />
        ) : isFacebook ? (
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#1877F2] z-30" />
        ) : isYouTube ? (
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF0000] z-30" />
        ) : (
          <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500 z-30" />
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all hover:scale-105"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Column */}
        <div className="relative w-full md:w-3/5 min-h-[320px] md:min-h-[540px] bg-black flex items-center justify-center overflow-hidden">
          {youtubeVideoId ? (
            <div className="relative w-full h-full min-h-[360px] md:min-h-[540px] flex items-center justify-center bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=1&rel=0`}
                title={post.content.slice(0, 50)}
                className="w-full h-full min-h-[360px] md:min-h-[540px] border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : images.length > 0 ? (
            <div className="relative w-full h-full min-h-[360px] md:min-h-[540px] flex items-center justify-center">
              <Image
                src={images[activeImageIndex]}
                alt={post.content.slice(0, 50)}
                fill
                unoptimized
                className="object-contain"
                priority
              />

              {hasMultipleImages && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-transform hover:scale-110 shadow-xl"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-transform hover:scale-110 shadow-xl"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-xl">
                    {activeImageIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400">
              <PlatformIcon platform={post.platform} className="w-16 h-16 mx-auto mb-4 opacity-40" />
              <p className="text-sm font-medium">Text Announcement</p>
            </div>
          )}
        </div>

        {/* Content Column */}
        <div className="w-full md:w-2/5 flex flex-col justify-between p-6 md:p-8 bg-slate-950 border-t md:border-t-0 md:border-l border-slate-800/80 overflow-y-auto max-h-[50vh] md:max-h-none">
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`relative flex-shrink-0 ${
                    isInstagram
                      ? "p-[2px] rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]"
                      : isFacebook
                      ? "p-[2px] rounded-full bg-[#1877F2]"
                      : isYouTube
                      ? "p-[2px] rounded-full bg-red-600"
                      : "p-[1px] rounded-full bg-slate-700"
                  }`}
                >
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border border-slate-900 bg-slate-800 flex-shrink-0">
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

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-white tracking-tight">{post.author.name}</span>
                    {post.author.isVerified && (
                      <VerifiedBadge
                        className={`w-4 h-4 ${
                          isFacebook ? "text-[#1877F2]" : isInstagram ? "text-[#dc2743]" : "text-emerald-400"
                        }`}
                      />
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{post.author.handle}</p>
                </div>
              </div>

              <div
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border ${
                  isInstagram
                    ? "bg-gradient-to-r from-pink-500/20 to-amber-500/20 text-[#dc2743] border-pink-500/30"
                    : isFacebook
                    ? "bg-[#1877F2]/20 text-[#1877F2] border-[#1877F2]/30"
                    : channel?.badgeClass || "border-slate-700 bg-slate-800 text-white"
                }`}
              >
                <PlatformIcon platform={post.platform} className="w-3.5 h-3.5" />
                <span>{channel?.name || post.platform}</span>
              </div>
            </div>

            {/* Post Content */}
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-slate-200 whitespace-pre-line select-text">
                {post.content}
              </p>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium pt-2">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>Posted {post.relativeTime}</span>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-6 border-t border-slate-800/80 space-y-4 mt-6">
            <div className="flex items-center justify-between text-slate-300 text-sm">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 transition-colors ${
                  isLiked ? "text-rose-500" : "hover:text-rose-400 text-slate-400"
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current text-rose-500" : ""}`} />
                <span className="font-semibold text-xs">{post.likes + (isLiked ? 1 : 0)}</span>
              </button>

              <div className="flex items-center gap-2 text-slate-400">
                <MessageCircle className="w-5 h-5" />
                <span className="font-semibold text-xs">{post.comments}</span>
              </div>

              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                title="Copy post link"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
                <span className="font-semibold text-xs">{copied ? "Copied!" : post.shares > 0 ? post.shares : "Share"}</span>
              </button>
            </div>

            {/* Branded Launch Button */}
            <a
              href={post.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02] text-white ${
                isInstagram
                  ? "bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-pink-900/30 hover:opacity-95"
                  : isFacebook
                  ? "bg-[#1877F2] shadow-blue-900/40 hover:bg-[#166fe5]"
                  : isYouTube
                  ? "bg-red-600 shadow-red-900/40 hover:bg-red-700"
                  : "bg-gradient-to-r from-emerald-600 to-teal-600 shadow-emerald-900/30 hover:from-emerald-500 hover:to-teal-500"
              }`}
            >
              <span>{isYouTube ? "Watch on YouTube" : `View Official Post on ${channel?.name || "Platform"}`}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
