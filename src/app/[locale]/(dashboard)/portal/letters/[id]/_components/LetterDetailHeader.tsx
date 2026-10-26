"use client";

import { ArrowLeft, Download, Printer } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface LetterDetailHeaderProps {
  serviceName: string;
  isDownloading: boolean;
  onPrint: () => void;
  onDownload: () => void;
}

export function LetterDetailHeader({
  serviceName,
  isDownloading,
  onPrint,
  onDownload,
}: LetterDetailHeaderProps) {
  const t = useTranslations("Dashboard.portal.lettersPage");
  const router = useRouter();

  return (
    <div className="flex items-center justify-between no-print print:hidden">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-3 bg-white border border-border/50 rounded-2xl hover:bg-slate-50 hover:shadow-sm transition-all group no-print cursor-pointer"
        >
          <ArrowLeft size={20} className="text-slate-600 group-hover:-translate-x-1 transition-transform" />
        </button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-outfit text-primary tracking-tight">
            {t("officialLetter")}
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-widest mt-1">
            {serviceName || t("officialLetter")}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 no-print print:hidden">
        <button
          onClick={onPrint}
          className="p-3 sm:p-4 bg-white border border-border/50 rounded-2xl text-slate-600 hover:text-primary hover:border-primary/20 hover:shadow-lg transition-all active:scale-95 group cursor-pointer"
        >
          <Printer size={20} className="group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={onDownload}
          disabled={isDownloading}
          className="p-3 sm:p-4 bg-primary text-white rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 group flex items-center gap-3 font-bold border border-primary/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isDownloading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
          )}
          <span className="hidden sm:inline">
            {isDownloading ? t("generating") : t("downloadPdf")}
          </span>
        </button>
      </div>
    </div>
  );
}
