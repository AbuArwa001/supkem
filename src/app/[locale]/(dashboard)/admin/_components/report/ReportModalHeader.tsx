import React from "react";
import { X, FileDown, BarChart3 } from "lucide-react";
import { useTranslations } from "next-intl";

interface ReportModalHeaderProps {
  onDownload: () => void;
  onClose: () => void;
}

export function ReportModalHeader({ onDownload, onClose }: ReportModalHeaderProps) {
  const t = useTranslations("Dashboard.admin.report");

  return (
    <div className="p-8 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-emerald-700">
          <BarChart3 size={20} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t("systems")}</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black font-outfit text-slate-900">{t("title")}</h2>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onDownload}
          className="px-6 py-3 bg-emerald-700 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-700/20 cursor-pointer"
        >
          <FileDown size={18} /> {t("export")}
        </button>
        <button
          onClick={onClose}
          className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
