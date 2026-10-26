"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DEFAULT_CHANNELS, SocialChannel, getHeroSocialChannelConfig } from "./hero/heroSocialData";

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

  return (
    <motion.div
      initial={{ opacity: 0, y: -15, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      className={cn("relative group/executive max-w-full", className)}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-teal-500/20 rounded-full blur-md opacity-70 group-hover/executive:opacity-100 transition duration-500" />

      <div className="relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-slate-950/75 backdrop-blur-2xl border border-white/20 shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover/executive:border-amber-400/40 max-w-full">
        <div className="flex items-center gap-1.5 sm:gap-2 pr-2 rtl:pr-0 rtl:pl-2 border-r rtl:border-r-0 rtl:border-l border-white/15 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          </span>
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.16em] sm:tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-100 font-outfit select-none">
            Official Desk
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5">
          {activeChannels.map((ch) => {
            const config = getHeroSocialChannelConfig(ch.id);
            return (
              <a
                key={ch.id}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Official SUPKEM ${ch.name}`}
                title={`Follow SUPKEM on ${ch.name}`}
                className={cn(
                  "w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-slate-300 bg-white/[0.06] border border-white/10 transition-all duration-300 hover:scale-115 active:scale-95 shrink-0",
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
