"use client";

import React from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Minimize2 } from "lucide-react";

interface VideoControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  isFullscreen: boolean;
  showSpeedMenu: boolean;
  onTogglePlay: () => void;
  onRewind: () => void;
  onToggleMute: () => void;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleSpeedMenu: () => void;
  onSelectSpeed: (speed: number) => void;
  onToggleFullscreen: () => void;
}

const PLAYBACK_SPEEDS = [0.75, 1, 1.25, 1.5, 2];

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds <= 0) return "0:00";
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  if (hrs > 0) return `${hrs}:${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export function VideoControls({
  isPlaying, currentTime, duration, volume, isMuted, playbackRate,
  isFullscreen, showSpeedMenu, onTogglePlay, onRewind, onToggleMute,
  onVolumeChange, onToggleSpeedMenu, onSelectSpeed, onToggleFullscreen,
}: VideoControlsProps) {
  return (
    <div className="flex items-center justify-between text-white text-sm">
      <div className="flex items-center gap-4">
        <button onClick={onTogglePlay} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white" aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button onClick={onRewind} className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white text-xs flex items-center gap-0.5" title="Rewind 10 seconds">
          <RotateCcw size={16} />
          <span className="text-[10px] font-bold">10s</span>
        </button>
        <div className="flex items-center gap-2">
          <button onClick={onToggleMute} className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white" aria-label={isMuted ? "Unmute" : "Mute"}>
            {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <input type="range" min={0} max={1} step={0.05} value={isMuted ? 0 : volume} onChange={onVolumeChange} className="w-16 h-1 accent-primary bg-white/20 rounded-full cursor-pointer hidden sm:block opacity-70 hover:opacity-100 transition-opacity" />
        </div>
        <div className="text-xs font-mono font-medium text-white/70">
          <span className="text-white font-bold">{formatTime(currentTime)}</span>
          <span className="mx-1">/</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 relative">
        <div className="relative">
          <button onClick={onToggleSpeedMenu} className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold text-white transition-colors">{playbackRate}x</button>
          {showSpeedMenu && (
            <div className="absolute bottom-10 right-0 bg-slate-900/95 border border-white/10 rounded-xl p-1.5 shadow-2xl backdrop-blur-md flex flex-col gap-1 min-w-[70px] z-50">
              {PLAYBACK_SPEEDS.map((speed) => (
                <button key={speed} onClick={() => onSelectSpeed(speed)} className={`px-3 py-1 text-xs rounded-lg font-bold text-left transition-colors ${playbackRate === speed ? "bg-primary text-white" : "text-white/70 hover:bg-white/10 hover:text-white"}`}>{speed}x</button>
              ))}
            </div>
          )}
        </div>
        <button onClick={onToggleFullscreen} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white" aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}>
          {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>
      </div>
    </div>
  );
}
