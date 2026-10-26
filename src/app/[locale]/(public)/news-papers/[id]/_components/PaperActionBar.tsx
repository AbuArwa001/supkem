import React from "react";
import { BookOpen, Download } from "lucide-react";

interface PaperActionBarProps {
  pdfUrl: string;
  officialPubText: string;
  councilNameText: string;
  downloadText: string;
}

export function PaperActionBar({
  pdfUrl,
  officialPubText,
  councilNameText,
  downloadText,
}: PaperActionBarProps) {
  return (
    <div className="bg-white rounded-[16px] p-6 shadow-2xl shadow-black/5 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-2xl">
          <BookOpen size={24} className="text-primary" />
        </div>
        <div>
          <p className="font-bold text-primary">{officialPubText}</p>
          <p className="text-sm text-foreground/60">{councilNameText}</p>
        </div>
      </div>

      <a
        href={pdfUrl}
        target="_blank"
        rel="noreferrer"
        className="px-8 py-4 bg-primary text-white rounded-xl font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 w-full md:w-auto"
      >
        <Download size={20} />
        {downloadText}
      </a>
    </div>
  );
}
