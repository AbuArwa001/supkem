import { ProgressCallback, xhrRequest } from "./uploadCore";
import { postJson, InitResponse } from "./uploadHttpUtils";

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
          throw new Error("S3 did not expose the ETag header. Add ETag to ExposeHeaders in the bucket CORS rules.");
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
