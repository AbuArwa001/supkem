/**
 * Pre-inlines any external or relative <img> sources as Base64 data URLs.
 * This guarantees the canvas remains completely untainted by cross-origin images.
 */
export async function inlineImages(root: HTMLElement): Promise<() => void> {
  const images = Array.from(root.querySelectorAll<HTMLImageElement>("img"));
  const originalSources = new Map<HTMLImageElement, string>();

  await Promise.all(
    images.map(async (img) => {
      const src = img.currentSrc || img.src;
      if (!src || src.startsWith("data:")) return;

      originalSources.set(img, src);
      try {
        const response = await fetch(src, { mode: "cors" });
        const blob = await response.blob();
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
        img.src = base64;
        if (img.decode) {
          try {
            await img.decode();
          } catch {
            // ignore decode error if already cached/rendered
          }
        }
      } catch (err) {
        console.warn("Could not inline image for PDF capture:", src, err);
      }
    })
  );

  return () => {
    originalSources.forEach((src, img) => {
      img.src = src;
    });
  };
}
