import React from "react";
import { Heart, MessageCircle, Share2, Check, ExternalLink } from "lucide-react";
import { SocialPost } from "./types";

interface SocialPostEngagementsBarProps {
  post: SocialPost;
  isLiked: boolean;
  likesCount: number;
  onLike: (e: React.MouseEvent) => void;
  isCopied: boolean;
  onShare: (e: React.MouseEvent) => void;
}

export function SocialPostEngagementsBar({
  post,
  isLiked,
  likesCount,
  onLike,
  isCopied,
  onShare,
}: SocialPostEngagementsBarProps) {
  return (
    <div className="p-4 px-5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
      <div className="flex items-center gap-4">
        <button
          onClick={onLike}
          className={`flex items-center gap-1.5 transition-colors ${
            isLiked ? "text-rose-500" : "hover:text-rose-500 text-slate-600"
          }`}
          title="Like post"
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-current text-rose-500" : ""}`} />
          <span>{likesCount}</span>
        </button>

        {post.comments !== undefined && (
          <div className="flex items-center gap-1.5 text-slate-600">
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onShare}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
          title="Share post"
        >
          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
        </button>

        <a
          href={post.postUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
          title="Open in official app"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
