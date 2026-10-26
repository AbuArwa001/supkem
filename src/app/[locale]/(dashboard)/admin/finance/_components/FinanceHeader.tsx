import React from "react";
import { ChevronLeft, FileDown, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface FinanceHeaderProps {
  isRefreshing: boolean;
  onRefresh: () => void;
  onExportCSV: () => void;
}

export function FinanceHeader({ isRefreshing, onRefresh, onExportCSV }: FinanceHeaderProps) {
  const t = useTranslations("Dashboard.admin.finance");

  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-100">
      <div className="flex items-center gap-4">
        <Link
          href="/admin"
          className="p-2.5 hover:bg-slate-100 rounded-2xl transition-colors text-slate-400 hover:text-primary mt-1"
          title={t("backToDashboard")}
        >
          <ChevronLeft size={24} />
        </Link>
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-black tracking-widest text-[10px] uppercase px-2.5 py-0.5">
              {t("mpesaDaraja")}
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-outfit text-slate-900 tracking-tight">
            {t("ledgerTitle")} <span className="text-primary italic">{t("ledgerTitleSpan")}</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">{t("ledgerDesc")}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 self-start md:self-end">
        <Button
          variant="outline"
          onClick={onExportCSV}
          className="h-11 px-4 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center gap-2 shadow-xs"
        >
          <FileDown className="h-4 w-4 text-slate-500" />
          <span>{t("exportCSV")}</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onRefresh}
          className="h-11 w-11 rounded-xl hover:bg-slate-100 text-slate-500 border border-slate-200"
          title="Refresh financial data"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin text-primary" : ""}`} />
        </Button>
      </div>
    </header>
  );
}
