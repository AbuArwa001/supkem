import React from "react";

interface PaperViewerProps {
  pdfUrl: string;
  title: string;
}

export function PaperViewer({ pdfUrl, title }: PaperViewerProps) {
  return (
    <div className="bg-white border border-border/50 rounded-[20px] p-2 md:p-6 shadow-2xl shadow-black/5 h-[80vh] min-h-[600px] flex overflow-hidden">
      <iframe
        src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
        className="w-full h-full rounded-[16px]"
        title={title}
      />
    </div>
  );
}
