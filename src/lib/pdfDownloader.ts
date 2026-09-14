import html2canvas from "html2canvas";
import { domToPng } from "modern-screenshot";
import jsPDF from "jspdf";

/**
 * Downloads a DOM element as a high-resolution PDF document.
 * Uses html2canvas for robust DOM rasterization and proper orientation.
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
    console.warn("html2canvas failed, attempting domToPng fallback:", canvasErr);
    try {
      imgData = await domToPng(element, {
        scale: 2,
        font: false,
        timeout: 5000,
      });
      const img = new Image();
      img.src = imgData;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = (e) => reject(new Error("Failed to load rendered image into memory: " + e));
      });
      imgWidth = img.width;
      imgHeight = img.height;
    } catch (domErr) {
      throw new Error(`Failed to generate PDF: ${canvasErr} | ${domErr}`);
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
