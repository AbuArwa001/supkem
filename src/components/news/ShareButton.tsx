"use client";

import { Share2, Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  title: string;
  text?: string;
  className?: string;
}

export default function ShareButton({ title, text, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title,
      text: text || `Check out this briefing: ${title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className={cn(
        "w-full py-4 bg-primary text-white rounded-[10px] font-bold text-sm hover-lift flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all",
        copied && "bg-emerald-600 shadow-emerald-600/20",
        className
      )}
    >
      {copied ? (
        <>
          <Check size={18} /> Copied to Clipboard
        </>
      ) : (
        <>
          <Share2 size={18} /> Share Briefing
        </>
      )}
    </button>
  );
}
