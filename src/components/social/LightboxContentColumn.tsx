"use client";

import Image from "next/image";
import { Heart, MessageCircle, Share2, Check, ExternalLink, Calendar } from "lucide-react";
import { SocialPost } from "./types";
import { PlatformIcon, VerifiedBadge } from "./SocialPlatformIcons";

interface LightboxContentColumnProps {
  post: SocialPost;
  channel?: { name: string; badgeClass?: string };
  isLiked: boolean;
  copied: boolean;
  avatarSrc: string;
  onLikeToggle: () => void;
  onCopyLink: () => void;
  onAvatarError: () => void;
}

export function LightboxContentColumn({
  post,
  channel,
  isLiked,
  copied,
  avatarSrc,
  onLikeToggle,
  onCopyLink,
  onAvatarError,
}: LightboxContentColumnProps) {
  return (
    <div className="w-full md:w-2/5 flex flex-col justify-between p-6 md:p-8 bg-slate-950 border-t md:border-t-0 md:border-l border-slate-800/80 overflow-y-auto max-h-[50vh] md:max-h-none">
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-slate-900 bg-slate-800 flex-shrink-0">
              <Image src={avatarSrc} alt={post.author.name} fill unoptimized onError={onAvatarError} className="object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white tracking-tight">{post.author.name}</span>
                {post.author.isVerified && <VerifiedBadge className="w-4 h-4 text-emerald-400" />}
              </div>
              <p className="text-xs text-slate-400">{post.author.handle}</p>
            </div>
          </div>

          <div className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-slate-700 bg-slate-800 text-white">
            <PlatformIcon platform={post.platform} className="w-3.5 h-3.5" />
            <span>{channel?.name || post.platform}</span>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-slate-200 whitespace-pre-line select-text">{post.content}</p>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium">#{tag}</span>
              ))}
            </div>
          )}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium pt-2">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Posted {post.relativeTime}</span>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-800/80 space-y-4 mt-6">
        <div className="flex items-center justify-between text-slate-300 text-sm">
          <button onClick={onLikeToggle} className={`flex items-center gap-2 transition-colors ${isLiked ? "text-rose-500" : "hover:text-rose-400 text-slate-400"}`}>
            <Heart className={`w-5 h-5 ${isLiked ? "fill-current text-rose-500" : ""}`} />
            <span className="font-semibold text-xs">{post.likes + (isLiked ? 1 : 0)}</span>
          </button>
          <div className="flex items-center gap-2 text-slate-400">
            <MessageCircle className="w-5 h-5" /><span className="font-semibold text-xs">{post.comments}</span>
          </div>
          <button onClick={onCopyLink} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors" title="Copy post link">
            {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
            <span className="font-semibold text-xs">{copied ? "Copied!" : post.shares > 0 ? post.shares : "Share"}</span>
          </button>
        </div>

        <a
          href={post.postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02] text-white bg-gradient-to-r from-emerald-600 to-teal-600 shadow-emerald-900/30 hover:from-emerald-500 hover:to-teal-500"
        >
          <span>{post.platform === "youtube" ? "Watch on YouTube" : `View Official Post on ${channel?.name || "Platform"}`}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
