"use client";

import React, { useEffect, useState } from "react";
import { Facebook, Instagram, Youtube, Link as LinkIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SocialChannel {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
}

const DEFAULT_CHANNELS: SocialChannel[] = [
  {
    id: "x",
    name: "X (Twitter)",
    url: "https://x.com/SUPKEM1",
    enabled: true,
  },
  {
    id: "facebook",
    name: "Facebook",
    url: "https://www.facebook.com/p/Supreme-Council-of-Kenya-Muslims-100079747610399/",
    enabled: true,
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com/supkem_kenya/",
    enabled: true,
  },
  {
    id: "youtube",
    name: "YouTube",
    url: "https://youtube.com/@SUPKEM",
    enabled: true,
  },
  {
    id: "tiktok",
    name: "TikTok",
    url: "https://www.tiktok.com/@supkem_kenya",
    enabled: true,
  },
];

export const HeroSocialBadge = ({ className }: { className?: string }) => {
  const [channels, setChannels] = useState<SocialChannel[]>(DEFAULT_CHANNELS);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/social-settings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!isMounted) return;
        if (data?.settings?.channels && Array.isArray(data.settings.channels)) {
          setChannels(data.settings.channels);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const activeChannels = channels.filter((c) => c.enabled !== false);

  const getChannelConfig = (id: string) => {
    switch (id) {
      case "x":
        return {
          icon: (
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          ),
          hoverStyle:
            "hover:text-white hover:bg-white/20 hover:border-white/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]",
        };
      case "facebook":
        return {
          icon: <Facebook className="w-3.5 h-3.5" />,
          hoverStyle:
            "hover:text-blue-400 hover:bg-blue-600/20 hover:border-blue-400/40 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]",
        };
      case "instagram":
        return {
          icon: <Instagram className="w-3.5 h-3.5" />,
          hoverStyle:
            "hover:text-pink-400 hover:bg-pink-600/20 hover:border-pink-400/40 hover:shadow-[0_0_15px_rgba(236,72,153,0.4)]",
        };
      case "youtube":
        return {
          icon: <Youtube className="w-3.5 h-3.5" />,
          hoverStyle:
            "hover:text-red-400 hover:bg-red-600/20 hover:border-red-400/40 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]",
        };
      case "tiktok":
        return {
          icon: (
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.02c0 2.45-.82 4.84-2.39 6.64-1.57 1.8-3.8 2.87-6.17 2.98-2.37.11-4.73-.72-6.42-2.34-1.69-1.62-2.58-3.92-2.48-6.3.1-2.38 1.11-4.63 2.86-6.14 1.75-1.51 4.12-2.22 6.44-1.95v4.06c-1.19-.15-2.41.19-3.32.96-.91.77-1.43 1.94-1.41 3.14.02 1.2.58 2.34 1.51 3.08.93.74 2.18 1.01 3.33.72 1.15-.29 2.12-1.12 2.61-2.23.23-.52.34-1.09.34-1.67V.02z" />
            </svg>
          ),
          hoverStyle:
            "hover:text-cyan-400 hover:bg-cyan-600/20 hover:border-cyan-400/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]",
        };
      default:
        return {
          icon: <LinkIcon className="w-3.5 h-3.5" />,
          hoverStyle:
            "hover:text-amber-300 hover:bg-amber-500/20 hover:border-amber-400/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)]",
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -15, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      className={cn("relative group/executive", className)}
    >
      {/* Ambient background glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-teal-500/20 rounded-full blur-md opacity-70 group-hover/executive:opacity-100 transition duration-500" />

      {/* Main glass badge chassis */}
      <div className="relative flex items-center gap-3 px-4 py-2 rounded-full bg-slate-950/75 backdrop-blur-2xl border border-white/20 shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover/executive:border-amber-400/40">
        
        {/* Executive Live / Official Label */}
        <div className="flex items-center gap-2 pr-2 border-r border-white/15">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-100 font-outfit select-none">
            Official Desk
          </span>
        </div>

        {/* Social Icons Strip */}
        <div className="flex items-center gap-1.5">
          {activeChannels.map((ch) => {
            const config = getChannelConfig(ch.id);
            return (
              <a
                key={ch.id}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Official SUPKEM ${ch.name}`}
                title={`Follow SUPKEM on ${ch.name}`}
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-slate-300 bg-white/[0.06] border border-white/10 transition-all duration-300 hover:scale-115 active:scale-95",
                  config.hoverStyle
                )}
              >
                {config.icon}
              </a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
