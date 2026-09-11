"use client";

import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

interface ApplicationHeaderProps {
  id: string;
  submittedAt: string;
  onBack: () => void;
}

export const ApplicationHeader = ({ id, submittedAt, onBack }: ApplicationHeaderProps) => {
  const t = useTranslations("Dashboard.portal.applicationDetail");

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-6">
      <button
        onClick={onBack}
        className="w-14 h-14 bg-white border border-slate-100 rounded-[20px] flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.12)] hover:-translate-x-1 transition-all duration-500 group shrink-0"
      >
        <ArrowLeft
          size={24}
          className="text-slate-900 group-hover:scale-110 transition-transform duration-500"
        />
      </button>
      <div>
        <h1 className="text-4xl lg:text-5xl font-black font-outfit text-slate-900 tracking-tight">
          {t("title")}
        </h1>
        <p className="text-sm font-medium text-slate-500 flex items-center gap-3 mt-3">
          <span className="bg-slate-900 px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-widest text-white shadow-md">
            #{id.substring(0, 8).toUpperCase()}
          </span>
          <span>{new Date(submittedAt).toLocaleString()}</span>
        </p>
      </div>
    </div>
  );
};
