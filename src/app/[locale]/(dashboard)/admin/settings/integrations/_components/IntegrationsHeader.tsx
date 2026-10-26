import React from "react";
import { Link } from "@/i18n/routing";
import { ChevronLeft, Plug } from "lucide-react";
import { useTranslations } from "next-intl";
import { INTEGRATIONS, IntegrationParam } from "./integrationTypes";

interface IntegrationsHeaderProps {
  params: Record<string, IntegrationParam>;
}

export function IntegrationsHeader({ params }: IntegrationsHeaderProps) {
  const t = useTranslations("Dashboard.admin.settings.integrations");
  const configuredCount = Object.values(params).filter((p) => p.is_configured).length;
  const totalCount = INTEGRATIONS.reduce((acc, i) => acc + i.paramKeys.length, 0);

  return (
    <div>
      <div className="flex items-center gap-4 mb-2">
        <Link
          href="/admin/settings"
          className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition-colors font-medium"
        >
          <ChevronLeft size={16} className="rtl:rotate-180" />
          {t("backToSettings")}
        </Link>
      </div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-violet-600 to-indigo-700 shadow-xl shadow-violet-200">
            <Plug size={30} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl lg:text-5xl font-black font-outfit text-slate-900 tracking-tight">
              {t("title")} <span className="text-slate-300 font-normal italic">{t("titleSub")}</span>
            </h1>
            <p className="text-slate-500 font-medium text-lg mt-2">{t("desc")}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t("status")}</p>
            <p className="text-sm font-bold text-slate-700 mt-0.5">
              {t("keysSet", { count: configuredCount, total: totalCount })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
