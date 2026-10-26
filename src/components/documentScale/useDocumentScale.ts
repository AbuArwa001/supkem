import { useState, useEffect, useRef } from "react";

export function useDocumentScale(baseWidth: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1);
  const [isFullZoom, setIsFullZoom] = useState<boolean>(false);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const availableWidth = containerRef.current.clientWidth;
      if (availableWidth <= 0) return;

      if (isFullZoom) {
        setScale(1);
      } else {
        const padding = availableWidth < 640 ? 16 : 32;
        const targetScale = Math.min(1, (availableWidth - padding) / baseWidth);
        setScale(targetScale);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [baseWidth, isFullZoom]);

  return { containerRef, scale, isFullZoom, setIsFullZoom };
}
