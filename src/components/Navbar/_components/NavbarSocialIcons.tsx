"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  DEFAULT_NAVBAR_CHANNELS,
  NavbarSocialChannel,
  renderNavbarSocialIcon,
} from "./navbarSocialData";

export const NavbarSocialIcons = ({
  scrolled = false,
  className,
}: {
  scrolled?: boolean;
  className?: string;
}) => {
  const [channels, setChannels] = useState<NavbarSocialChannel[]>(DEFAULT_NAVBAR_CHANNELS);

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
    <div
      className={cn(
        "flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-100/80 border border-slate-200/60 backdrop-blur-md",
        className
      )}
    >
      {activeChannels.map((ch) => (
        <a
          key={ch.id}
          href={ch.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`SUPKEM ${ch.name}`}
          title={`Follow SUPKEM on ${ch.name}`}
          className={cn(
            "w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110",
            scrolled
              ? "text-slate-600 hover:text-emerald-700 hover:bg-white shadow-none hover:shadow-xs"
              : "text-slate-700 hover:text-emerald-700 hover:bg-white shadow-none hover:shadow-xs"
          )}
        >
          {renderNavbarSocialIcon(ch.id)}
        </a>
      ))}
    </div>
  );
};
