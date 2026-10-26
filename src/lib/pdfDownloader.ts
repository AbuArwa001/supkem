import jsPDF from "jspdf";
import { inlineImages } from "./pdf/inlineImages";
import { renderElementToCanvas } from "./pdf/canvasRenderer";

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
    restoreImages = await inlineImages(element);
    canvas = await renderElementToCanvas(element);
  } finally {
    if (restoreImages) {
      restoreImages();
    }
  }

  if (!canvas || canvas.width === 0 || canvas.height === 0) {
    throw new Error("Failed to generate PDF: rendered canvas is empty.");
  }

  const isLandscape = options?.orientation && options.orientation !== "auto"
    ? options.orientation === "landscape"
    : canvas.width >= canvas.height;

  const pdf = new jsPDF({
    orientation: isLandscape ? "landscape" : "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  let imgData = canvas.toDataURL("image/jpeg", 0.98);
  let format: "JPEG" | "PNG" = "JPEG";

  if (!imgData || imgData === "data:," || !imgData.startsWith("data:image/jpeg;base64,")) {
    imgData = canvas.toDataURL("image/png");
    format = "PNG";
  }

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

  const offsetX = margin + ((printableWidth - renderWidth) / 2);
  const offsetY = margin + ((printableHeight - renderHeight) / 2);

  pdf.addImage(imgData, format, offsetX, offsetY, renderWidth, renderHeight, undefined, "FAST");
  pdf.save(filename);
}
