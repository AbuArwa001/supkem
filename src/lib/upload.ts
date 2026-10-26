import { API_BASE_URL } from "@/lib/api";
import { ProgressCallback, xhrRequest, authHeaders } from "./upload/uploadCore";
import { compressImage } from "./upload/imageCompression";
import { uploadVideoDirect } from "./upload/directS3Upload";

export type { ProgressCallback };
export { xhrRequest, compressImage, uploadVideoDirect };

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
