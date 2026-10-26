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

/**
 * Resolves the display thumbnail image for a video briefing.
 * 1. Checks explicit thumbnail fields from the API (`thumbnail`, `thumbnail_url`, `poster`, `cover_image`).
 * 2. If it's a YouTube-derived video (detected via 11-char ID in the filename or URL),
 *    uses YouTube's high-res CDN thumbnail (instant, lightweight ~15KB).
 * 3. If it's an S3 direct upload (`video_briefings/direct/{upload_id}/...`), checks for the matching `thumbnail.jpg`.
 */
export function resolveVideoThumbnail(video: VideoLike | null | undefined): string {
  if (!video) return "";

  // 1. Explicit thumbnail or poster URL provided
  const explicitThumb =
    video.thumbnail_url || video.thumbnail || video.poster || video.cover_image;
  if (explicitThumb && typeof explicitThumb === "string") {
    if (explicitThumb.startsWith("http")) return explicitThumb;
    return `${API_BASE_URL}${explicitThumb.startsWith("/") ? "" : "/"}${explicitThumb}`;
  }

  const rawUrl = String(video.video_file || video.stream_url || "");
  if (!rawUrl) return "";

  // 2. YouTube video ID pattern (e.g. "vfvB5mI1ZAM.mp4" or direct YT links)
  const ytMatch =
    rawUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=)|[a-zA-Z0-9_-]+\/)([a-zA-Z0-9_-]{11})\.(?:mp4|webm|mkv|mov)/i) ||
    rawUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([a-zA-Z0-9_-]{11})/i) ||
    rawUrl.match(/\/([a-zA-Z0-9_-]{11})\.mp4/i);

  if (ytMatch && ytMatch[1]) {
    return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
  }

  // 3. S3 direct uploads where thumbnail.jpg is placed in the direct folder
  // e.g., video_briefings/direct/<folder_uuid>/<filename>
  const directMatch = rawUrl.match(/(video_briefings\/direct\/[a-zA-Z0-9_-]+)\//);
  if (directMatch && directMatch[1]) {
    return `https://supkem.s3.eu-north-1.amazonaws.com/${directMatch[1]}/thumbnail.jpg`;
  }

  return "";
}

/**
 * Extracts a representative frame from a Video File object in the browser
 * using an offscreen video and canvas element.
 */
export function extractVideoThumbnail(file: File): Promise<Blob | null> {
  return new Promise((resolve) => {
    try {
      if (typeof window === "undefined" || !file.type.startsWith("video/")) {
        return resolve(null);
      }
      const video = document.createElement("video");
      const url = URL.createObjectURL(file);
      video.src = url;
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";

      const cleanUp = () => {
        URL.revokeObjectURL(url);
        video.remove();
      };

      video.onloadeddata = () => {
        video.currentTime = Math.min(1, Math.max(0, video.duration / 2));
      };

      video.onseeked = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth || 640;
          canvas.height = video.videoHeight || 360;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(
              (blob) => {
                cleanUp();
                resolve(blob);
              },
              "image/jpeg",
              0.85
            );
            return;
          }
        } catch {
          // ignore
        }
        cleanUp();
        resolve(null);
      };

      video.onerror = () => {
        cleanUp();
        resolve(null);
      };

      setTimeout(() => {
        cleanUp();
        resolve(null);
      }, 5000);
    } catch {
      resolve(null);
    }
  });
}
