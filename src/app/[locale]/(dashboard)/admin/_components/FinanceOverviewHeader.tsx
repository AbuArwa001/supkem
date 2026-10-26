import React from "react";
import { motion } from "framer-motion";
import { Activity, Calendar, RefreshCw, FileDown, Receipt, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface FinanceOverviewHeaderProps {
  userName: string;
  isRefreshing: boolean;
  onRefresh: () => void;
  onExportCSV: () => void;
}

export function FinanceOverviewHeader({
  userName, isRefreshing, onRefresh, onExportCSV,
}: FinanceOverviewHeaderProps) {
  const t = useTranslations("Dashboard.admin.finance");
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const formattedDate = new Intl.DateTimeFormat("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }).format(new Date());

  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2.5">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[10px] font-black tracking-widest uppercase shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <Activity size={12} />
            {t("financialTelemetryLive")}
          </motion.div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold tracking-wider uppercase">
            <Calendar size={11} className="text-slate-400" />
            {formattedDate}
          </div>
        </div>

        <div>
          <h1 className="text-3xl md:text-5xl font-black font-outfit text-slate-900 tracking-tight leading-tight">
            {greeting}, <span className="text-emerald-700 italic">{userName}</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm md:text-base mt-1 max-w-2xl">{t("commandCenterDesc")}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <Button variant="outline" size="icon" onClick={onRefresh} title={t("refresh")} className="rounded-2xl border-slate-200 bg-white h-12 w-12 hover:bg-slate-50 shadow-xs transition-all shrink-0 cursor-pointer">
          <RefreshCw className={`h-4 w-4 text-slate-600 ${isRefreshing ? "animate-spin text-emerald-600" : ""}`} />
        </Button>

        <Button variant="outline" onClick={onExportCSV} className="rounded-2xl border-slate-200 bg-white font-black text-xs uppercase tracking-wider h-12 px-5 hover:bg-slate-50 shadow-xs transition-all flex items-center gap-2 text-slate-700 cursor-pointer">
          <FileDown size={16} className="text-emerald-700" />
          <span>{t("exportCSV")}</span>
        </Button>

        <Button asChild className="rounded-2xl font-black bg-emerald-700 hover:bg-emerald-800 text-white h-12 px-6 shadow-lg shadow-emerald-700/20 transition-all active:scale-95 flex items-center gap-2.5 uppercase tracking-wider text-xs cursor-pointer">
          <Link href="/admin/finance">
            <Receipt size={16} />
            <span>{t("openLedger")}</span>
            <ArrowRight size={14} className="ml-0.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
