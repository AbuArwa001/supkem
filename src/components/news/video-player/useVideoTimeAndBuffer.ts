"use client";

import { useState, useCallback, RefObject } from "react";

export function useVideoTimeAndBuffer(videoRef: RefObject<HTMLVideoElement | null>) {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [bufferedPercent, setBufferedPercent] = useState<number>(0);

  const updateBufferProgress = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration || video.duration === 0) return;
    if (video.buffered.length > 0) {
      for (let i = 0; i < video.buffered.length; i++) {
        if (video.buffered.start(i) <= video.currentTime && video.currentTime <= video.buffered.end(i)) {
          setBufferedPercent(Math.min(100, Math.max(0, (video.buffered.end(i) / video.duration) * 100)));
          return;
        }
      }
      const last = video.buffered.end(video.buffered.length - 1);
      setBufferedPercent(Math.min(100, Math.max(0, (last / video.duration) * 100)));
    }
  }, [videoRef]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetPercent = parseFloat(e.target.value);
    const video = videoRef.current;
    if (video && duration > 0) {
      const newTime = (targetPercent / 100) * duration;
      video.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return { currentTime, setCurrentTime, duration, setDuration, bufferedPercent, updateBufferProgress, handleSeek };
}
