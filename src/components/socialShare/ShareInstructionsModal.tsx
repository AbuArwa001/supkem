import React from "react";
import { InstagramIcon, TikTokIcon } from "./SocialSharePlatformIcons";

interface ShareInstructionsModalProps {
  type: "instagram" | "tiktok";
  onClose: () => void;
}

export function ShareInstructionsModal({ type, onClose }: ShareInstructionsModalProps) {
  const isInstagram = type === "instagram";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-4 text-center">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg ${
            isInstagram
              ? "bg-gradient-to-tr from-purple-500 to-pink-500"
              : "bg-cyan-500/20 border border-cyan-500/30 text-cyan-400"
          }`}
        >
          {isInstagram ? <InstagramIcon /> : <TikTokIcon />}
        </div>
        <h4 className="text-lg font-bold font-outfit text-white">
          Share on {isInstagram ? "Instagram" : "TikTok"}
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed">
          {isInstagram
            ? "The article link has been copied to your clipboard! Open Instagram and paste it directly into your Story sticker or bio link."
            : "The article link has been copied to your clipboard! You can now paste it into your TikTok video comments, profile bio, or direct messages."}
        </p>
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
        >
          Got It
        </button>
      </div>
    </div>
  );
}
