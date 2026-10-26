"use client";

import React from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import { useDocumentScale } from "./documentScale/useDocumentScale";

interface DocumentScaleWrapperProps {
  children: React.ReactNode;
  baseWidth?: number;
  baseHeight?: number;
  isLandscape?: boolean;
}

export function DocumentScaleWrapper({
  children,
  baseWidth: customBaseWidth,
  baseHeight: customBaseHeight,
  isLandscape = false,
}: DocumentScaleWrapperProps) {
  const baseWidth = customBaseWidth || (isLandscape ? 1123 : 794);
  const baseHeight = customBaseHeight || (isLandscape ? 794 : 1123);
  const { containerRef, scale, isFullZoom, setIsFullZoom } = useDocumentScale(baseWidth);

  const scaledWidth = Math.round(baseWidth * scale);
  const scaledHeight = Math.round(baseHeight * scale);

  return (
    <div className="w-full flex flex-col items-center select-none" ref={containerRef}>
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

      <div
        className={`w-full flex justify-center print:block print:w-full ${
          isFullZoom ? "overflow-x-auto pb-4 justify-start sm:justify-center" : ""
        }`}
      >
        <div
          style={{
            width: isFullZoom ? `${baseWidth}px` : `${scaledWidth}px`,
            height: isFullZoom ? `${baseHeight}px` : `${scaledHeight}px`,
            transition: "width 0.2s ease, height 0.2s ease",
          }}
          className="relative shrink-0 overflow-hidden print:w-full print:h-auto print:overflow-visible print:transform-none"
        >
          <div
            style={{
              width: `${baseWidth}px`,
              minHeight: `${baseHeight}px`,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              transition: "transform 0.2s ease",
            }}
            className="print:transform-none print:w-full print:min-h-0"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
