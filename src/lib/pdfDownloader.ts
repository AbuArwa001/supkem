import html2canvas from "html2canvas-pro";
import { domToCanvas } from "modern-screenshot";
import jsPDF from "jspdf";

/**
 * Downloads a DOM element as a high-resolution PDF document.
 * Uses html2canvas-pro for robust modern CSS color (oklab/oklch) support,
 * with modern-screenshot domToCanvas as a fallback.
 */
export async function downloadElementAsPdf(
  element: HTMLElement,
  filename: string
): Promise<void> {
  let imgData = "";
  let imgWidth = 0;
  let imgHeight = 0;

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
    });
    imgData = canvas.toDataURL("image/png");
    imgWidth = canvas.width;
    imgHeight = canvas.height;
  } catch (canvasErr) {
    console.warn("html2canvas-pro failed, attempting domToCanvas fallback:", canvasErr);
    try {
      const fallbackCanvas = await domToCanvas(element, {
        scale: 2,
        font: false,
        timeout: 5000,
      });
      imgData = fallbackCanvas.toDataURL("image/png");
      imgWidth = fallbackCanvas.width;
      imgHeight = fallbackCanvas.height;
    } catch (domErr) {
      const canvasMsg = canvasErr instanceof Error ? canvasErr.message : String(canvasErr);
      const domMsg = domErr instanceof Error ? domErr.message : String(domErr);
      throw new Error(`Failed to generate PDF: ${canvasMsg} | ${domMsg}`);
    }
  }

  const isLandscape = imgWidth > imgHeight;
  const pdf = new jsPDF({
    orientation: isLandscape ? "landscape" : "portrait",
    unit: "px",
    format: [imgWidth / 2, imgHeight / 2],
  });

  pdf.addImage(
    imgData,
    "PNG",
    0,
    0,
    imgWidth / 2,
    imgHeight / 2,
    undefined,
    "FAST"
  );

  pdf.save(filename);
}
