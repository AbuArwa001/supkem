"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Loader2,
  RefreshCw,
  AlertCircle,
  Film
} from "lucide-react";

interface VideoPlayerProps {
  url: string;
  fallbackUrl?: string;
  poster?: string;
  title?: string;
  isCardPreview?: boolean;
}

const PLAYBACK_SPEEDS = [0.75, 1, 1.25, 1.5, 2];

export default function VideoPlayer({
  url,
  fallbackUrl,
  poster,
  title,
  isCardPreview = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Active source state (allows auto-fallback from stream to direct file or vice-versa)
  const [activeSrc, setActiveSrc] = useState<string>(url);
  const [hasTriedFallback, setHasTriedFallback] = useState<boolean>(false);

  // Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [bufferedPercent, setBufferedPercent] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [showSpeedMenu, setShowSpeedMenu] = useState<boolean>(false);

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync active source when url changes
  useEffect(() => {
    setActiveSrc(url);
    setHasTriedFallback(false);
    setErrorMsg(null);
  }, [url]);

  // If in Card Preview mode, render lightweight zero-bandwidth element
  if (isCardPreview) {
    return (
      <div className="absolute inset-0 bg-slate-950 flex items-center justify-center overflow-hidden group">
        <video
          src={activeSrc}
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

  // Update buffer progress
  const updateBufferProgress = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration || video.duration === 0) return;

    if (video.buffered.length > 0) {
      // Find the buffered range that covers the current time
      for (let i = 0; i < video.buffered.length; i++) {
        if (
          video.buffered.start(i) <= video.currentTime &&
          video.currentTime <= video.buffered.end(i)
        ) {
          const percent = (video.buffered.end(i) / video.duration) * 100;
          setBufferedPercent(Math.min(100, Math.max(0, percent)));
          return;
        }
      }
      // If beyond current time, take the latest buffered end
      const lastBufferedEnd = video.buffered.end(video.buffered.length - 1);
      setBufferedPercent(Math.min(100, (lastBufferedEnd / video.duration) * 100));
    }
  }, []);

  // Controls auto-hide
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
        setShowSpeedMenu(false);
      }, 3000);
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      video.play().catch((err) => {
        console.warn("Autoplay/play interrupted:", err);
      });
    } else {
      video.pause();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const targetTime = (parseFloat(e.target.value) / 100) * duration;
    video.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const val = parseFloat(e.target.value);
    video.volume = val;
    setVolume(val);
    if (val === 0) {
      video.muted = true;
      setIsMuted(true);
    } else if (isMuted) {
      video.muted = false;
      setIsMuted(false);
    }
  };

  const setSpeed = (speed: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = speed;
    setPlaybackRate(speed);
    setShowSpeedMenu(false);
  };

  const toggleFullscreen = async () => {
    const container = containerRef.current;
    if (!container) return;

    try {
      if (!document.fullscreenElement) {
        await container.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.warn("Fullscreen toggle error:", err);
    }
  };

  const handleRetryPlayback = () => {
    const video = videoRef.current;
    setErrorMsg(null);
    setIsBuffering(true);

    if (fallbackUrl && !hasTriedFallback && activeSrc !== fallbackUrl) {
      setHasTriedFallback(true);
      setActiveSrc(fallbackUrl);
    } else if (video) {
      const savedTime = video.currentTime;
      video.load();
      video.currentTime = savedTime;
      video.play().catch(() => {});
    }
  };

  // Keyboard navigation shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    if (e.key === " " || e.key === "k") {
      e.preventDefault();
      togglePlay();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      video.currentTime = Math.min(video.duration, video.currentTime + 10);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      video.currentTime = Math.max(0, video.currentTime - 10);
    } else if (e.key === "m") {
      e.preventDefault();
      toggleMute();
    } else if (e.key === "f") {
      e.preventDefault();
      toggleFullscreen();
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
      return `${hrs}:${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
    }
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden select-none focus:outline-none"
    >
      {/* HTML5 Video Element with Metadata Preload & HTTP 206 Streaming */}
      <video
        ref={videoRef}
        src={activeSrc}
        poster={poster}
        preload="metadata"
        playsInline
        className="w-full h-full object-contain cursor-pointer"
        onClick={togglePlay}
        onPlay={() => {
          setIsPlaying(true);
          setIsBuffering(false);
        }}
        onPause={() => setIsPlaying(false)}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => {
          setIsBuffering(false);
          setIsPlaying(true);
        }}
        onCanPlay={() => setIsBuffering(false)}
        onTimeUpdate={() => {
          if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
          }
          updateBufferProgress();
        }}
        onDurationChange={() => {
          if (videoRef.current) {
            setDuration(videoRef.current.duration);
          }
        }}
        onProgress={updateBufferProgress}
        onError={() => {
          const target = videoRef.current;
          console.error("Video Stream Event Error:", {
            src: target?.src,
            error: target?.error,
            code: target?.error?.code,
            message: target?.error?.message,
          });

          // Automatic fallback to direct file if streaming URL hits a hitch
          if (fallbackUrl && !hasTriedFallback && activeSrc !== fallbackUrl) {
            setHasTriedFallback(true);
            setActiveSrc(fallbackUrl);
          } else {
            setErrorMsg("Stream buffering timed out. Click below to reconnect.");
            setIsBuffering(false);
          }
        }}
      >
        Your browser does not support the video tag.
      </video>

      {/* Buffering Indicator Overlay (Crucial for 500MB+ chunk loading) */}
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

      {/* Error / Reconnect Overlay */}
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
            onClick={handleRetryPlayback}
            className="px-6 py-2.5 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-primary-dark transition-all flex items-center gap-2 shadow-lg shadow-primary/30 hover:scale-105"
          >
            <RefreshCw size={14} /> Resume Stream
          </button>
        </div>
      )}

      {/* Big Play Button on Initial / Paused State */}
      {!isPlaying && !isBuffering && !errorMsg && (
        <button
          onClick={togglePlay}
          className="absolute z-20 w-20 h-20 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-primary transition-all duration-300 backdrop-blur-md border border-white/20"
          aria-label="Play video"
        >
          <Play size={36} className="ml-1" />
        </button>
      )}

      {/* Stream Quality Badge Top-Right */}
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

      {/* Custom Video Controls Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-20 p-4 md:p-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent transition-opacity duration-300 flex flex-col gap-3 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Progress & Buffer Bar */}
        <div className="relative group/progress flex items-center h-4 cursor-pointer">
          {/* Background Track */}
          <div className="absolute inset-x-0 h-1.5 bg-white/20 rounded-full overflow-hidden">
            {/* Downloaded / Buffered Range Bar (Visual feedback for 500MB chunk loading) */}
            <div
              className="h-full bg-white/40 transition-all duration-300 rounded-full"
              style={{ width: `${bufferedPercent}%` }}
              title={`Buffered: ${Math.round(bufferedPercent)}%`}
            />
          </div>

          {/* Current Played Bar */}
          <div
            className="absolute left-0 h-1.5 bg-primary rounded-full pointer-events-none group-hover/progress:h-2 transition-all"
            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
          />

          {/* Scrubber Input Range */}
          <input
            type="range"
            min={0}
            max={100}
            step={0.1}
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={handleSeek}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        {/* Action Controls Bar */}
        <div className="flex items-center justify-between text-white text-sm">
          {/* Left: Play/Pause, Volume, Timestamps */}
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <button
              onClick={() => {
                const video = videoRef.current;
                if (video) video.currentTime = Math.max(0, video.currentTime - 10);
              }}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white text-xs flex items-center gap-0.5"
              title="Rewind 10 seconds"
            >
              <RotateCcw size={16} />
              <span className="text-[10px] font-bold">10s</span>
            </button>

            {/* Volume */}
            <div className="flex items-center gap-2 group/vol">
              <button
                onClick={toggleMute}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 accent-primary bg-white/20 rounded-full cursor-pointer hidden sm:block opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>

            {/* Timestamps */}
            <div className="text-xs font-mono font-medium text-white/70">
              <span className="text-white font-bold">{formatTime(currentTime)}</span>
              <span className="mx-1">/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right: Speed, Buffer stats, Fullscreen */}
          <div className="flex items-center gap-3 relative">
            {/* Speed Selector */}
            <div className="relative">
              <button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold text-white transition-colors"
              >
                {playbackRate}x
              </button>
              {showSpeedMenu && (
                <div className="absolute bottom-10 right-0 bg-slate-900/95 border border-white/10 rounded-xl p-1.5 shadow-2xl backdrop-blur-md flex flex-col gap-1 min-w-[70px] z-50">
                  {PLAYBACK_SPEEDS.map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setSpeed(speed)}
                      className={`px-3 py-1 text-xs rounded-lg font-bold text-left transition-colors ${
                        playbackRate === speed
                          ? "bg-primary text-white"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white"
              aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
