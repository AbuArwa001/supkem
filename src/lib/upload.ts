import Cookies from "js-cookie";
import { API_BASE_URL } from "@/lib/api";

export type ProgressCallback = (percent: number) => void;

/** Sends a request via XHR so upload progress can be reported (fetch cannot). */
export function xhrRequest<T = unknown>(opts: {
  url: string;
  method: "POST" | "PATCH" | "PUT";
  body: XMLHttpRequestBodyInit;
  headers?: Record<string, string>;
  onProgress?: ProgressCallback;
  signal?: AbortSignal;
  parse?: boolean;
}): Promise<{ data: T; headers: XMLHttpRequest }> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(opts.method, opts.url);
    Object.entries(opts.headers || {}).forEach(([k, v]) => xhr.setRequestHeader(k, v));

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) opts.onProgress?.(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        let data: unknown = null;
        if (opts.parse !== false && xhr.responseText) {
          try {
            data = JSON.parse(xhr.responseText);
          } catch {
            data = xhr.responseText;
          }
        }
        opts.onProgress?.(100);
        resolve({ data: data as T, headers: xhr });
      } else {
        let msg = `HTTP Error ${xhr.status}`;
        try {
          const json = JSON.parse(xhr.responseText);
          msg = json.detail || JSON.stringify(json);
        } catch {
          /* keep default message */
        }
        const err = new Error(msg) as Error & { status?: number };
        err.status = xhr.status;
        reject(err);
      }
    };
    xhr.onerror = () => reject(new Error("Network error. Check your connection and try again."));
    xhr.onabort = () => reject(new Error("Upload cancelled."));
    opts.signal?.addEventListener("abort", () => xhr.abort());
    xhr.send(opts.body);
  });
}

function authHeaders(): Record<string, string> {
  const token = Cookies.get("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Shrinks large photos (typically 3-12MB from phone cameras) before upload.
 * Falls back to the original file if anything goes wrong.
 */
export async function compressImage(
  file: File,
  maxDimension = 1920,
  quality = 0.82
): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/gif" || file.type === "image/svg+xml") {
    return file;
  }
  // Small files are not worth re-encoding.
  if (file.size < 400 * 1024) return file;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close?.();

    const blob: Blob | null = await new Promise((res) =>
      canvas.toBlob(res, "image/jpeg", quality)
    );
    if (!blob || blob.size >= file.size) return file;

    const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], name, { type: "image/jpeg", lastModified: Date.now() });
  } catch {
    return file;
  }
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE_URL}/api/v1${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = new Error(`HTTP Error ${res.status}`) as Error & { status?: number };
    err.status = res.status;
    try {
      const json = await res.json();
      err.message = json.detail || err.message;
    } catch {
      /* ignore */
    }
    throw err;
  }
  return res.status === 204 ? (undefined as T) : res.json();
}

interface InitResponse {
  key: string;
  upload_id: string;
  part_size: number;
  parts: { part_number: number; url: string }[];
}

const PART_RETRIES = 3;
const PART_CONCURRENCY = 3;

/**
 * Uploads a large file straight to S3 in chunks (resilient on flaky mobile
 * connections, with accurate progress). Resolves with the S3 object key, or
 * `null` when the server has no direct-upload support (caller should fall back).
 */
export async function uploadVideoDirect(
  file: File,
  onProgress?: ProgressCallback,
  signal?: AbortSignal
): Promise<string | null> {
  let init: InitResponse;
  try {
    init = await postJson<InitResponse>("/news/uploads/init/", {
      filename: file.name,
      content_type: file.type || "video/mp4",
      size: file.size,
    });
  } catch (err) {
    if ((err as { status?: number }).status === 501) return null;
    throw err;
  }

  const loaded = new Array(init.parts.length).fill(0);
  const etags: { part_number: number; etag: string }[] = [];
  const report = () => {
    const sum = loaded.reduce((a, b) => a + b, 0);
    onProgress?.(Math.min(99, Math.round((sum / file.size) * 100)));
  };

  const uploadPart = async (idx: number) => {
    const part = init.parts[idx];
    const start = idx * init.part_size;
    const chunk = file.slice(start, Math.min(start + init.part_size, file.size));

    for (let attempt = 1; ; attempt++) {
      try {
        const { headers } = await xhrRequest({
          url: part.url,
          method: "PUT",
          body: chunk,
          parse: false,
          signal,
          onProgress: (p) => {
            loaded[idx] = (p / 100) * chunk.size;
            report();
          },
        });
        const etag = headers.getResponseHeader("ETag");
        if (!etag) {
          throw new Error(
            "S3 did not expose the ETag header. Add ETag to ExposeHeaders in the bucket CORS rules."
          );
        }
        loaded[idx] = chunk.size;
        report();
        etags.push({ part_number: part.part_number, etag });
        return;
      } catch (err) {
        if (signal?.aborted || attempt >= PART_RETRIES || /ETag/.test((err as Error).message)) {
          throw err;
        }
        loaded[idx] = 0;
      }
    }
  };

  try {
    let next = 0;
    const worker = async () => {
      while (next < init.parts.length) {
        const idx = next++;
        await uploadPart(idx);
      }
    };
    await Promise.all(
      Array.from({ length: Math.min(PART_CONCURRENCY, init.parts.length) }, worker)
    );
    await postJson("/news/uploads/complete/", {
      key: init.key,
      upload_id: init.upload_id,
      parts: etags,
    });
    onProgress?.(100);
    return init.key;
  } catch (err) {
    postJson("/news/uploads/abort/", { key: init.key, upload_id: init.upload_id }).catch(() => {});
    throw err;
  }
}

/** Multipart POST/PATCH to the API with progress reporting. */
export async function apiMultipartWithProgress<T>(
  method: "POST" | "PATCH",
  endpoint: string,
  data: FormData,
  onProgress?: ProgressCallback
): Promise<T> {
  const { data: result } = await xhrRequest<T>({
    url: `${API_BASE_URL}/api/v1${endpoint}`,
    method,
    body: data,
    headers: authHeaders(),
    onProgress,
  });
  return result;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
}
