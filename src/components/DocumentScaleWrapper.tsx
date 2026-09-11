"use client";

import React, { useState, useEffect, useRef } from "react";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

interface DocumentScaleWrapperProps {
  children: React.ReactNode;
  baseWidth?: number; // default A4 portrait width in px at 96dpi ~ 794
  baseHeight?: number; // default A4 portrait height in px at 96dpi ~ 1123
  isLandscape?: boolean;
}

export function DocumentScaleWrapper({
  children,
  baseWidth: customBaseWidth,
  baseHeight: customBaseHeight,
  isLandscape = false,
}: DocumentScaleWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1);
  const [isFullZoom, setIsFullZoom] = useState<boolean>(false);

  const baseWidth = customBaseWidth || (isLandscape ? 1123 : 794);
  const baseHeight = customBaseHeight || (isLandscape ? 794 : 1123);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const availableWidth = containerRef.current.clientWidth;
      if (availableWidth <= 0) return;

      if (isFullZoom) {
        setScale(1);
      } else {
        // Leave 16px padding on mobile screens
        const padding = availableWidth < 640 ? 16 : 32;
        const targetScale = Math.min(1, (availableWidth - padding) / baseWidth);
        setScale(targetScale);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [baseWidth, isFullZoom]);

  const scaledWidth = Math.round(baseWidth * scale);
  const scaledHeight = Math.round(baseHeight * scale);

  return (
    <div className="w-full flex flex-col items-center select-none" ref={containerRef}>
      {/* Mobile/Tablet zoom indicator & toggle button */}
      <div className="flex items-center justify-end w-full max-w-4xl mb-3 px-2 no-print">
        {scale < 1 && (
          <button
            type="button"
            onClick={() => setIsFullZoom((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs transition-all active:scale-95"
            title={isFullZoom ? "Fit to screen" : "View at 100% zoom"}
          >
            {isFullZoom ? (
              <>
                <ZoomOut size={14} className="text-emerald-700" />
                <span>Fit Screen</span>
              </>
            ) : (
              <>
                <ZoomIn size={14} className="text-emerald-700" />
                <span>100% Zoom ({Math.round(scale * 100)}%)</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Overflow container */}
      <div
        className={`w-full flex justify-center no-print ${
          isFullZoom ? "overflow-x-auto pb-4 justify-start sm:justify-center" : ""
        }`}
      >
        <div
          style={{
            width: isFullZoom ? `${baseWidth}px` : `${scaledWidth}px`,
            height: isFullZoom ? `${baseHeight}px` : `${scaledHeight}px`,
            transition: "width 0.2s ease, height 0.2s ease",
          }}
          className="relative shrink-0 overflow-hidden"
        >
          <div
            style={{
              width: `${baseWidth}px`,
              minHeight: `${baseHeight}px`,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              transition: "transform 0.2s ease",
            }}
          >
            {children}
          </div>
        </div>
      </div>

      {/* Printable version that ignores scaling */}
      <div className="hidden print:block print:w-full print:transform-none">
        {children}
      </div>
    </div>
  );
}
