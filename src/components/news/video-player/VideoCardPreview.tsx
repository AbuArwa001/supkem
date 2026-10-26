"use client";

import React from "react";

interface VideoCardPreviewProps {
  src: string;
  poster?: string;
}

export function VideoCardPreview({ src, poster }: VideoCardPreviewProps) {
  return (
    <div className="absolute inset-0 bg-slate-950 flex items-center justify-center overflow-hidden group">
      <video
        src={src}
        poster={poster}
        preload="none"
        playsInline
        muted
        className="w-full h-full object-cover pointer-events-none opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
    </div>
  );
}
