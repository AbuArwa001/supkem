export interface VideoPlayerProps {
  url: string;
  fallbackUrl?: string;
  poster?: string;
  title?: string;
  isCardPreview?: boolean;
}

export interface VideoPlayerState {
  activeSrc: string;
  hasTriedFallback: boolean;
  isPlaying: boolean;
  isBuffering: boolean;
  currentTime: number;
  duration: number;
  bufferedPercent: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  isFullscreen: boolean;
  errorMsg: string | null;
  showControls: boolean;
  showSpeedMenu: boolean;
}
