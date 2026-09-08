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
} from "lucide-react";

interface SocialMediaLightboxProps {
  post: SocialPost | null;
  onClose: () => void;
}

export function SocialMediaLightbox({ post, onClose }: SocialMediaLightboxProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!post) return null;

  const channel = (OFFICIAL_CHANNELS as any)[post.platform];
  const images = post.images || (post.videoThumbnail ? [post.videoThumbnail] : []);
  const hasMultipleImages = images.length > 1;

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center border border-white/20 transition-all hover:scale-105"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Preview Column */}
        <div className="relative w-full md:w-3/5 min-h-[300px] md:min-h-[520px] bg-black flex items-center justify-center overflow-hidden select-none">
          {images.length > 0 ? (
            <div className="relative w-full h-full min-h-[350px] md:min-h-[520px] flex items-center justify-center">
              <Image
                src={images[activeImageIndex]}
                alt={post.content.slice(0, 50)}
                fill
                className="object-contain"
                priority
              />

              {hasMultipleImages && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-transform hover:scale-110"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-transform hover:scale-110"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 border border-white/20 text-xs font-semibold text-white/90">
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

        {/* Content & Metadata Column */}
        <div className="w-full md:w-2/5 flex flex-col justify-between p-6 md:p-8 bg-slate-900 overflow-y-auto max-h-[50vh] md:max-h-none">
          {/* Header */}
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/20 bg-emerald-900/50 flex-shrink-0">
                  <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-white">{post.author.name}</span>
                    {post.author.isVerified && <VerifiedBadge className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <p className="text-xs text-slate-400">{post.author.handle}</p>
                </div>
              </div>

              <div
                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border ${channel?.badgeClass || "border-slate-700 bg-slate-800 text-white"}`}
              >
                <PlatformIcon platform={post.platform} className="w-3.5 h-3.5" />
                <span>{channel?.name || post.platform}</span>
              </div>
            </div>

            {/* Post Text */}
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-slate-200 whitespace-pre-line">
                {post.content}
              </p>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="text-xs text-slate-400 font-medium pt-2">
                Posted {post.relativeTime}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-6 border-t border-slate-800 space-y-4 mt-6">
            <div className="flex items-center justify-between text-slate-300 text-sm">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 transition-colors ${
                  isLiked ? "text-red-500" : "hover:text-red-400 text-slate-400"
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current text-red-500" : ""}`} />
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
                <span className="font-semibold text-xs">{copied ? "Copied!" : post.shares}</span>
              </button>
            </div>

            <a
              href={post.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all hover:scale-[1.02]"
            >
              <span>View Official Post on {channel?.name || "Platform"}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
