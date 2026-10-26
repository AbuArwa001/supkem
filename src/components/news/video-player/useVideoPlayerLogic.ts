"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useVideoTimeAndBuffer } from "./useVideoTimeAndBuffer";

export function useVideoPlayerLogic(url: string, fallbackUrl?: string) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [activeSrc, setActiveSrc] = useState(url);
  const [hasTriedFallback, setHasTriedFallback] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showControls, setShowControls] = useState(true);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const tb = useVideoTimeAndBuffer(videoRef);

  useEffect(() => {
    setActiveSrc(url);
    setHasTriedFallback(false);
    setErrorMsg(null);
  }, [url]);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => setErrorMsg("Playback blocked. Click to retry."));
    } else {
      videoRef.current.pause();
    }
  }, []);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (videoRef.current) videoRef.current.volume = val;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) videoRef.current.muted = !isMuted;
  };

  const setSpeed = (spd: number) => {
    setPlaybackRate(spd);
    if (videoRef.current) videoRef.current.playbackRate = spd;
    setShowSpeedMenu(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleRetryPlayback = () => {
    setErrorMsg(null);
    setIsBuffering(true);
    if (fallbackUrl && activeSrc !== fallbackUrl) setActiveSrc(fallbackUrl);
    else if (videoRef.current) { videoRef.current.load(); videoRef.current.play().catch(() => {}); }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => { if (isPlaying) setShowControls(false); }, 3000);
  };

  const handleStreamError = () => {
    if (fallbackUrl && !hasTriedFallback && activeSrc !== fallbackUrl) {
      setHasTriedFallback(true);
      setActiveSrc(fallbackUrl);
    } else {
      setErrorMsg("Stream buffering timed out. Click below to reconnect.");
      setIsBuffering(false);
    }
  };

  return {
    videoRef, containerRef, activeSrc, isPlaying, isBuffering, volume, isMuted, playbackRate,
    isFullscreen, errorMsg, showControls, showSpeedMenu, setShowSpeedMenu, togglePlay,
    handleVolumeChange, toggleMute, setSpeed, toggleFullscreen, handleRetryPlayback,
    handleMouseMove, handleStreamError, setIsPlaying, setIsBuffering, ...tb,
  };
}
