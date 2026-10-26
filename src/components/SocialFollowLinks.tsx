"use client";

import React from "react";
import { useSocialFollowChannels } from "./socialFollow/useSocialFollowChannels";

export interface SocialFollowLinksProps {
  className?: string;
  variant?: "pills" | "icons" | "card";
}

export function SocialFollowLinks({ className = "", variant = "pills" }: SocialFollowLinksProps) {
  const activeChannels = useSocialFollowChannels();

  if (variant === "icons") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {activeChannels.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2.5 rounded-xl border transition-all hover:scale-110 shadow-lg ${item.color}`}
            title={`Follow SUPKEM on ${item.name}`}
          >
            {item.icon}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
        Follow SUPKEM Official Channels:
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        {activeChannels.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all shadow-lg hover:scale-105 ${item.color}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
