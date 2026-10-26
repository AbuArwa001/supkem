import { API_BASE_URL } from "./api";

interface VideoLike {
  id?: string | number;
  video_file?: string;
  stream_url?: string;
  [key: string]: any;
}

/**
 * Resolves the primary streaming URL for a video briefing.
 * Prioritizes the HTTP 206 chunked byte-range streaming endpoint (/api/v1/videos/{id}/stream/)
 * so that large files (e.g. 500MB+) begin playback instantaneously in ~200ms
 * without requiring the browser to buffer the entire file upfront.
 */
export function resolveVideoStreamUrl(video: VideoLike | null | undefined): string {
  if (!video) return "";

  // 1. Explicit stream_url provided by backend
  if (video.stream_url) {
    if (video.stream_url.startsWith("http")) return video.stream_url;
    return `${API_BASE_URL}${video.stream_url.startsWith("/") ? "" : "/"}${video.stream_url}`;
  }

  // 2. Dedicated byte-range streaming endpoint via ID
  if (video.id) {
    return `${API_BASE_URL}/api/v1/videos/${video.id}/stream/`;
  }

  // 3. Fallback to direct video_file
  return resolveVideoFallbackUrl(video);
}

/**
 * Resolves direct media file URL (used as fallback if range streaming fails).
 */
export function resolveVideoFallbackUrl(video: VideoLike | null | undefined): string {
  if (!video?.video_file) return "";
  if (video.video_file.startsWith("http")) return video.video_file;
  return `${API_BASE_URL}${video.video_file.startsWith("/") ? "" : "/"}${video.video_file}`;
}
