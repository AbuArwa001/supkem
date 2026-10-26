"use client";

import React from "react";

interface VideoProgressBarProps {
  currentTime: number;
  duration: number;
  bufferedPercent: number;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function VideoProgressBar({
  currentTime,
  duration,
  bufferedPercent,
  onSeek,
}: VideoProgressBarProps) {
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative group/progress flex items-center h-4 cursor-pointer">
      <div className="absolute inset-x-0 h-1.5 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-white/40 transition-all duration-300 rounded-full"
          style={{ width: `${bufferedPercent}%` }}
          title={`Buffered: ${Math.round(bufferedPercent)}%`}
        />
      </div>

      <div
        className="absolute left-0 h-1.5 bg-primary rounded-full pointer-events-none group-hover/progress:h-2 transition-all"
        style={{ width: `${progressPercent}%` }}
      />

      <input
        type="range"
        min={0}
        max={100}
        step={0.1}
        value={progressPercent}
        onChange={onSeek}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label="Seek progress"
      />
    </div>
  );
}
