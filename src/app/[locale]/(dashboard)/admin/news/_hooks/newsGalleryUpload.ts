import { NewsGalleryService, NewsGalleryItem } from "@/services/news-service";
import { compressImage } from "@/lib/upload";

export interface GalleryUploadProgress {
  total: number;
  uploaded: number;
  failed: number;
  percent: number;
  phase: "saving" | "optimizing" | "uploading";
}

const GALLERY_CONCURRENCY = 3;

export async function uploadNewsGalleryBatch(
  slug: string,
  files: File[],
  onProgress: (progress: GalleryUploadProgress) => void
): Promise<{ uploaded: number; failedFiles: File[]; newItems: NewsGalleryItem[] }> {
  const total = files.length;
  const perFile = new Array(total).fill(0);
  let uploaded = 0;
  const failedFiles: File[] = [];
  const newItems: NewsGalleryItem[] = [];

  const publish = (phase: GalleryUploadProgress["phase"]) =>
    onProgress({
      total,
      uploaded,
      failed: failedFiles.length,
      percent: Math.round(perFile.reduce((a, b) => a + b, 0) / total),
      phase,
    });

  publish("optimizing");
  let cursor = 0;
  const worker = async () => {
    while (cursor < total) {
      const i = cursor++;
      const original = files[i];
      try {
        const compressed = await compressImage(original);
        const result = await NewsGalleryService.addImage(slug, compressed, (p) => {
          perFile[i] = p;
          publish("uploading");
        });
        perFile[i] = 100;
        uploaded++;
        newItems.push(...(Array.isArray(result) ? result : []));
      } catch (galleryError) {
        console.error("Gallery upload failed", galleryError);
        perFile[i] = 100;
        failedFiles.push(original);
      }
      publish("uploading");
    }
  };

  await Promise.all(Array.from({ length: Math.min(GALLERY_CONCURRENCY, total) }, worker));
  return { uploaded, failedFiles, newItems };
}
