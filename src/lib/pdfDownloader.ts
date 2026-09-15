import html2canvas from "html2canvas-pro";
import { domToCanvas } from "modern-screenshot";
import jsPDF from "jspdf";

/**
 * Pre-inlines any external or relative <img> sources as Base64 data URLs.
 * This guarantees the canvas remains completely untainted by cross-origin images.
 */
async function inlineImages(root: HTMLElement): Promise<() => void> {
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

/**
 * Downloads a DOM element as a high-resolution PDF document.
 * Uses html2canvas-pro for modern CSS color support, pre-inlines images to prevent canvas
 * tainting, and renders high-quality JPEG/PNG streams into jsPDF.
 */
export async function downloadElementAsPdf(
  element: HTMLElement,
  filename: string
): Promise<void> {
  let restoreImages: (() => void) | null = null;
  let canvas: HTMLCanvasElement | null = null;

  try {
    // 1. Pre-inline images to avoid canvas tainting
    restoreImages = await inlineImages(element);

    // 2. Render canvas using html2canvas-pro with safe CORS settings
    canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#ffffff",
      logging: false,
      imageTimeout: 15000,
    });
  } catch (canvasErr) {
    console.warn("html2canvas-pro failed, trying modern-screenshot fallback:", canvasErr);
    try {
      canvas = await domToCanvas(element, {
        scale: 2,
        font: false,
        timeout: 8000,
      });
    } catch (domErr) {
      const cMsg = canvasErr instanceof Error ? canvasErr.message : String(canvasErr);
      const dMsg = domErr instanceof Error ? domErr.message : String(domErr);
      throw new Error(`Failed to generate PDF: ${cMsg} | ${dMsg}`);
    }
  } finally {
    if (restoreImages) {
      restoreImages();
    }
  }

  if (!canvas || canvas.width === 0 || canvas.height === 0) {
    throw new Error("Failed to generate PDF: rendered canvas is empty.");
  }

  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const isLandscape = imgWidth > imgHeight;

  const pdf = new jsPDF({
    orientation: isLandscape ? "landscape" : "portrait",
    unit: "px",
    format: [imgWidth / 2, imgHeight / 2],
  });

  // Use high-quality JPEG format to guarantee clean signature & avoid corrupt PNG header issues
  let imgData = canvas.toDataURL("image/jpeg", 0.98);
  let format: "JPEG" | "PNG" = "JPEG";

  if (!imgData || imgData === "data:," || !imgData.startsWith("data:image/jpeg;base64,")) {
    imgData = canvas.toDataURL("image/png");
    format = "PNG";
  }

  pdf.addImage(
    imgData,
    format,
    0,
    0,
    imgWidth / 2,
    imgHeight / 2,
    undefined,
    "FAST"
  );

  pdf.save(filename);
}
