import html2canvas from "html2canvas-pro";
import { domToCanvas } from "modern-screenshot";

export async function renderElementToCanvas(element: HTMLElement): Promise<HTMLCanvasElement> {
  try {
    return await html2canvas(element, {
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
      return await domToCanvas(element, {
        scale: 3,
        font: false,
        timeout: 8000,
      });
    } catch (domErr) {
      const cMsg = canvasErr instanceof Error ? canvasErr.message : String(canvasErr);
      const dMsg = domErr instanceof Error ? domErr.message : String(domErr);
      throw new Error(`Failed to generate PDF: ${cMsg} | ${dMsg}`);
    }
  }
}
