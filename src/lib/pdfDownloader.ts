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

export interface PdfDownloadOptions {
  orientation?: "landscape" | "portrait" | "auto";
  margin?: number;
}

/**
 * Downloads a DOM element as a high-resolution, standard A4 PDF document.
 * Supports landscape and portrait orientations with automatic aspect-ratio scaling
 * and perfect horizontal and vertical centering.
 */
export async function downloadElementAsPdf(
  element: HTMLElement,
  filename: string,
  options?: PdfDownloadOptions
): Promise<void> {
  let restoreImages: (() => void) | null = null;
  let canvas: HTMLCanvasElement | null = null;

  try {
    // 1. Pre-inline images to avoid canvas tainting
    restoreImages = await inlineImages(element);

    // 2. Render canvas using html2canvas-pro at high print resolution (scale 3)
    canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#ffffff",
      logging: false,
      imageTimeout: 15000,
      scrollX: 0,
      scrollY: 0,
      onclone: (clonedDoc, clonedElement) => {
        clonedElement.style.transform = "none";
        clonedElement.style.margin = "0";
        clonedElement.style.opacity = "1";
        clonedElement.style.visibility = "visible";
        let parent = clonedElement.parentElement;
        while (parent && parent !== clonedDoc.body) {
          parent.style.transform = "none";
          parent.style.overflow = "visible";
          parent = parent.parentElement;
        }
      },
    });
  } catch (canvasErr) {
    console.warn("html2canvas-pro failed, trying modern-screenshot fallback:", canvasErr);
    try {
      canvas = await domToCanvas(element, {
        scale: 3,
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

  // Determine standard A4 orientation:
  // Certificates default to landscape; letters default to portrait.
  const isLandscape = options?.orientation && options.orientation !== "auto"
    ? options.orientation === "landscape"
    : canvas.width >= canvas.height;

  const pdf = new jsPDF({
    orientation: isLandscape ? "landscape" : "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();   // 297mm (landscape) or 210mm (portrait)
  const pageHeight = pdf.internal.pageSize.getHeight(); // 210mm (landscape) or 297mm (portrait)

  // Use high-quality JPEG format to guarantee clean signature & avoid corrupt PNG header issues
  let imgData = canvas.toDataURL("image/jpeg", 0.98);
  let format: "JPEG" | "PNG" = "JPEG";

  if (!imgData || imgData === "data:," || !imgData.startsWith("data:image/jpeg;base64,")) {
    imgData = canvas.toDataURL("image/png");
    format = "PNG";
  }

  // Calculate proportional dimensions to fit standard A4 with clean margins and perfect centering
  const margin = options?.margin ?? (isLandscape ? 6 : 10);
  const printableWidth = Math.max(pageWidth - (margin * 2), 10);
  const printableHeight = Math.max(pageHeight - (margin * 2), 10);

  const canvasRatio = canvas.width / canvas.height;
  let renderWidth = printableWidth;
  let renderHeight = printableWidth / canvasRatio;

  if (renderHeight > printableHeight) {
    renderHeight = printableHeight;
    renderWidth = printableHeight * canvasRatio;
  }

  // Perfectly center on the page horizontally and vertically
  const offsetX = margin + ((printableWidth - renderWidth) / 2);
  const offsetY = margin + ((printableHeight - renderHeight) / 2);

  pdf.addImage(
    imgData,
    format,
    offsetX,
    offsetY,
    renderWidth,
    renderHeight,
    undefined,
    "FAST"
  );

  pdf.save(filename);
}
