"use client";

import { ArrowLeft, Printer, Download } from "lucide-react";

interface CertificateHeaderProps {
  onBack: () => void;
  onPrint: () => void;
  onDownload: () => void;
  isDownloading: boolean;
}

export function CertificateHeader({
  onBack,
  onPrint,
  onDownload,
  isDownloading,
}: CertificateHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-3 bg-white border border-border/50 rounded-2xl hover:bg-slate-50 hover:shadow-sm transition-all group no-print"
        >
          <ArrowLeft
            size={20}
            className="text-slate-600 group-hover:-translate-x-1 transition-transform"
          />
        </button>
        <div>
          <h1 className="text-3xl font-black font-outfit text-primary tracking-tight">
            Digital Certificate
          </h1>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mt-1">
            Official Document View
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 no-print">
        <button
          onClick={onPrint}
          className="p-4 bg-white border border-border/50 rounded-2xl text-slate-600 hover:text-primary hover:border-primary/20 hover:shadow-lg transition-all active:scale-95 group"
        >
          <Printer
            size={20}
            className="group-hover:scale-110 transition-transform"
          />
        </button>
        <button
          onClick={onDownload}
          disabled={isDownloading}
          className="p-4 bg-primary text-white rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 group flex items-center gap-3 font-bold border border-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDownloading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Download
              size={20}
              className="group-hover:-translate-y-1 transition-transform"
            />
          )}
          <span className="hidden sm:inline">
            {isDownloading ? "Generating..." : "Download PDF"}
          </span>
        </button>
      </div>
    </div>
  );
}
