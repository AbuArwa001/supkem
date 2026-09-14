import { domToPng } from "modern-screenshot";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Downloads a DOM element as a high-resolution PDF document.
 * Disables remote font network re-fetching in modern-screenshot to ensure
 * instantaneous generation without hanging on network requests.
 * Falls back to html2canvas if modern-screenshot fails.
 */
export async function downloadElementAsPdf(
  element: HTMLElement,
  filename: string
): Promise<void> {
  let dataUrl = "";

  try {
    // Fast capture with font downloading disabled (browser will use in-memory fonts)
    dataUrl = await domToPng(element, {
      scale: 2,
      font: false,
      timeout: 5000,
    });
  } catch (err) {
    console.warn("domToPng failed, falling back to html2canvas:", err);
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });
    dataUrl = canvas.toDataURL("image/png");
  }

  const img = new Image();
  img.src = dataUrl;
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = (e) => reject(new Error("Failed to load rendered image into memory: " + e));
  });

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [img.width / 2, img.height / 2],
  });

  pdf.addImage(
    dataUrl,
    "PNG",
    0,
    0,
    img.width / 2,
    img.height / 2,
    undefined,
    "FAST"
  );

  pdf.save(filename);
}
