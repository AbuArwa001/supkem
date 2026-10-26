"use client";

import React from "react";
import { VideoPlayerProps } from "./video-player/types";
import { useVideoPlayerLogic } from "./video-player/useVideoPlayerLogic";
import { VideoProgressBar } from "./video-player/VideoProgressBar";
import { VideoControls } from "./video-player/VideoControls";
import { VideoOverlays } from "./video-player/VideoOverlays";
import { VideoCardPreview } from "./video-player/VideoCardPreview";

export default function VideoPlayer({
  url, fallbackUrl, poster, isCardPreview = false,
}: VideoPlayerProps) {
  const p = useVideoPlayerLogic(url, fallbackUrl);

  if (isCardPreview) {
    return <VideoCardPreview src={p.activeSrc} poster={poster} />;
  }

  return (
    <div
      ref={p.containerRef}
      onMouseMove={p.handleMouseMove}
      tabIndex={0}
      className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden select-none focus:outline-none"
    >
      <video
        ref={p.videoRef}
        src={p.activeSrc}
        poster={poster}
        preload="metadata"
        playsInline
        className="w-full h-full object-contain cursor-pointer"
        onClick={p.togglePlay}
        onPlay={() => { p.setIsPlaying(true); p.setIsBuffering(false); }}
        onPause={() => p.setIsPlaying(false)}
        onWaiting={() => p.setIsBuffering(true)}
        onPlaying={() => { p.setIsBuffering(false); p.setIsPlaying(true); }}
        onCanPlay={() => p.setIsBuffering(false)}
        onTimeUpdate={() => {
          if (p.videoRef.current) p.setCurrentTime(p.videoRef.current.currentTime);
          p.updateBufferProgress();
        }}
        onDurationChange={() => {
          if (p.videoRef.current) p.setDuration(p.videoRef.current.duration);
        }}
        onProgress={p.updateBufferProgress}
        onError={p.handleStreamError}
      >
        Your browser does not support the video tag.
      </video>

      <VideoOverlays
        isPlaying={p.isPlaying}
        isBuffering={p.isBuffering}
        errorMsg={p.errorMsg}
        bufferedPercent={p.bufferedPercent}
        showControls={p.showControls}
        onTogglePlay={p.togglePlay}
        onRetry={p.handleRetryPlayback}
      />

      <div
        className={`absolute bottom-0 left-0 right-0 z-20 p-4 md:p-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent transition-opacity duration-300 flex flex-col gap-3 ${
          p.showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <VideoProgressBar
          currentTime={p.currentTime}
          duration={p.duration}
          bufferedPercent={p.bufferedPercent}
          onSeek={p.handleSeek}
        />
        <VideoControls
          isPlaying={p.isPlaying}
          currentTime={p.currentTime}
          duration={p.duration}
          volume={p.volume}
          isMuted={p.isMuted}
          playbackRate={p.playbackRate}
          isFullscreen={p.isFullscreen}
          showSpeedMenu={p.showSpeedMenu}
          onTogglePlay={p.togglePlay}
          onRewind={() => {
            if (p.videoRef.current) p.videoRef.current.currentTime = Math.max(0, p.videoRef.current.currentTime - 10);
          }}
          onToggleMute={p.toggleMute}
          onVolumeChange={p.handleVolumeChange}
          onToggleSpeedMenu={() => p.setShowSpeedMenu(!p.showSpeedMenu)}
          onSelectSpeed={p.setSpeed}
          onToggleFullscreen={p.toggleFullscreen}
        />
      </div>
    </div>
  );
}
