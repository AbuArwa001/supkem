"use client";

import React from "react";
import { Play, Film, Loader2, AlertCircle, RefreshCw } from "lucide-react";

interface VideoOverlaysProps {
  isPlaying: boolean;
  isBuffering: boolean;
  errorMsg: string | null;
  bufferedPercent: number;
  showControls: boolean;
  onTogglePlay: () => void;
  onRetry: () => void;
}

export function VideoOverlays({
  isPlaying,
  isBuffering,
  errorMsg,
  bufferedPercent,
  showControls,
  onTogglePlay,
  onRetry,
}: VideoOverlaysProps) {
  return (
    <>
      {isBuffering && !errorMsg && (
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-30 transition-opacity">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
            <Film size={22} className="text-white absolute" />
          </div>
          <div className="mt-4 px-4 py-1.5 rounded-full bg-black/60 border border-white/10 text-white/90 text-xs font-bold tracking-wider uppercase flex items-center gap-2">
            <Loader2 size={12} className="animate-spin text-primary" />
            Buffering Stream ({Math.round(bufferedPercent)}%)
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-40 p-6 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <AlertCircle size={28} />
          </div>
          <div className="space-y-1">
            <h4 className="text-white font-bold text-lg font-outfit">Stream Interrupted</h4>
            <p className="text-white/60 text-sm max-w-sm">{errorMsg}</p>
          </div>
          <button
            onClick={onRetry}
            className="px-6 py-2.5 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-primary-dark transition-all flex items-center gap-2 shadow-lg shadow-primary/30 hover:scale-105"
          >
            <RefreshCw size={14} /> Resume Stream
          </button>
        </div>
      )}

      {!isPlaying && !isBuffering && !errorMsg && (
        <button
          onClick={onTogglePlay}
          className="absolute z-20 w-20 h-20 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-primary transition-all duration-300 backdrop-blur-md border border-white/20"
          aria-label="Play video"
        >
          <Play size={36} className="ml-1" />
        </button>
      )}

      <div
        className={`absolute top-4 right-4 z-20 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-black/60 border border-white/10 text-white/80 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Chunked Stream · Fast Seek
        </span>
      </div>
    </>
  );
}
