import React from "react";
import { Settings as SettingsIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export function SettingsHubHeader() {
  const t = useTranslations("Dashboard.admin.settings.hub");

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-4">
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-xl shadow-black/10">
          <SettingsIcon size={32} className="animate-[spin_4s_linear_infinite]" />
        </div>
        <div>
          <h1 className="text-4xl lg:text-5xl font-black font-outfit text-slate-900 tracking-tight">
            {t("heading")} <span className="text-slate-300 font-normal italic">{t("headingHub")}</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg mt-2">
            {t("desc")}
          </p>
        </div>
      </div>
    </header>
  );
}
