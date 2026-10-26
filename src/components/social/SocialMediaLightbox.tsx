"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { SocialPost } from "./types";
import { OFFICIAL_CHANNELS } from "./socialData";
import { LightboxMediaColumn } from "./LightboxMediaColumn";
import { LightboxContentColumn } from "./LightboxContentColumn";

interface SocialMediaLightboxProps {
  post: SocialPost | null;
  onClose: () => void;
}

export function SocialMediaLightbox({ post, onClose }: SocialMediaLightboxProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(post?.author?.avatar || "/logo.png");

  useEffect(() => {
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

  let youtubeVideoId: string | null = null;
  if (post.platform === "youtube" && post.videoUrl) {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300 select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row text-white animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`absolute top-0 left-0 right-0 h-1 z-30 ${
          post.platform === "instagram" ? "bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888]" :
          post.platform === "facebook" ? "bg-[#1877F2]" :
          post.platform === "youtube" ? "bg-[#FF0000]" : "bg-emerald-500"
        }`} />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all hover:scale-105"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <LightboxMediaColumn
          post={post}
          images={images}
          activeImageIndex={activeImageIndex}
          hasMultipleImages={hasMultipleImages}
          youtubeVideoId={youtubeVideoId}
          onPrevImage={() => setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length)}
          onNextImage={() => setActiveImageIndex((prev) => (prev + 1) % images.length)}
        />

        <LightboxContentColumn
          post={post}
          channel={channel}
          isLiked={isLiked}
          copied={copied}
          avatarSrc={avatarSrc}
          onLikeToggle={() => setIsLiked(!isLiked)}
          onCopyLink={handleCopyLink}
          onAvatarError={() => setAvatarSrc("/logo.png")}
        />
      </div>
    </div>
  );
}
