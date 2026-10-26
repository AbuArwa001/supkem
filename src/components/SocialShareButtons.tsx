"use client";

import { Share2, Check, Link as LinkIcon, MessageCircle } from "lucide-react";
import { useSocialShare } from "./socialShare/useSocialShare";
import { ShareInstructionsModal } from "./socialShare/ShareInstructionsModal";
import { XTwitterIcon, FacebookShareIcon, InstagramIcon, TikTokIcon } from "./socialShare/SocialSharePlatformIcons";

interface SocialShareProps {
  title: string;
  url?: string;
  className?: string;
  variant?: "compact" | "full" | "bar";
}

export function SocialShareButtons({ title, url, className = "", variant = "full" }: SocialShareProps) {
  const {
    copied, showTikTokModal, setShowTikTokModal, showInstagramModal, setShowInstagramModal,
    handleCopy, handleNativeShare, shareLinks,
  } = useSocialShare(title, url);

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <button
          onClick={handleNativeShare}
          className="p-2 rounded-full bg-slate-800 hover:bg-emerald-500 text-slate-300 hover:text-white transition-all border border-slate-700"
          title="Share Article"
        >
          <Share2 size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
        <span className="flex items-center gap-2 text-slate-300">
          <Share2 size={14} className="text-emerald-400" /> Share Announcement:
        </span>
        {copied && (
          <span className="text-emerald-400 text-xs font-medium flex items-center gap-1">
            <Check size={12} /> Link Copied!
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <a href={shareLinks.x} target="_blank" rel="noopener noreferrer" className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-black text-slate-200 hover:text-white border border-slate-700 hover:border-white/30 text-xs font-bold flex items-center gap-2 transition-all shadow-md group" title="Share on X">
          <XTwitterIcon /><span>X</span>
        </a>

        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="px-3.5 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-xs font-bold flex items-center gap-2 transition-all shadow-md" title="Share on Facebook">
          <FacebookShareIcon /><span>Facebook</span>
        </a>

        <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-bold flex items-center gap-2 transition-all shadow-md" title="Share on WhatsApp">
          <MessageCircle size={14} /><span>WhatsApp</span>
        </a>

        <button onClick={() => { handleCopy(); setShowInstagramModal(true); }} className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-amber-500/20 hover:from-purple-600 hover:to-pink-600 text-pink-300 hover:text-white border border-pink-500/30 text-xs font-bold flex items-center gap-2 transition-all shadow-md" title="Share to Instagram Stories">
          <InstagramIcon className="w-3.5 h-3.5 fill-current" /><span>Instagram</span>
        </button>

        <button onClick={() => { handleCopy(); setShowTikTokModal(true); }} className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-600 text-cyan-300 hover:text-white border border-cyan-500/30 text-xs font-bold flex items-center gap-2 transition-all shadow-md" title="Share to TikTok">
          <TikTokIcon className="w-3.5 h-3.5 fill-current" /><span>TikTok</span>
        </button>

        <button onClick={handleCopy} className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all shadow-md ${copied ? "bg-emerald-500 text-white border-emerald-400" : "bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700"}`}>
          {copied ? <Check size={14} /> : <LinkIcon size={14} />}
          <span>{copied ? "Copied!" : "Copy Link"}</span>
        </button>
      </div>

      {showInstagramModal && <ShareInstructionsModal type="instagram" onClose={() => setShowInstagramModal(false)} />}
      {showTikTokModal && <ShareInstructionsModal type="tiktok" onClose={() => setShowTikTokModal(false)} />}
    </div>
  );
}
