"use client";

import React, { useState } from "react";

interface VideoCardPreviewProps {
  src: string;
  poster?: string;
}

export function VideoCardPreview({ src, poster }: VideoCardPreviewProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="absolute inset-0 bg-slate-950 flex items-center justify-center overflow-hidden group">
      {poster && !imgError ? (
        <img
          src={poster}
          alt="Video briefing thumbnail"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
      ) : (
        <video
          src={src ? `${src}#t=0.001` : undefined}
          poster={poster}
          preload="metadata"
          playsInline
          muted
          className="w-full h-full object-cover pointer-events-none opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
