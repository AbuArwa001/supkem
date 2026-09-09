"use client";

import { ChevronLeft, RefreshCw, Plus, Download, Activity } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface UserHeaderProps {
  onRefresh: () => void;
  isValidating: boolean;
  onAddClick: () => void;
  onExportCsv?: () => void;
}

export const UserHeader = ({
  onRefresh,
  isValidating,
  onAddClick,
  onExportCsv,
}: UserHeaderProps) => {
  const t = useTranslations("Dashboard.admin.users");

  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
      <div className="flex items-start gap-4">
        <Link
          href="/admin/settings"
          className="p-2.5 hover:bg-white rounded-2xl border border-transparent hover:border-slate-200 transition-all text-slate-400 hover:text-emerald-700 shadow-none hover:shadow-sm self-start mt-1"
        >
          <ChevronLeft size={22} className="rtl:rotate-180" />
        </Link>
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-[10px] font-black tracking-widest uppercase">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <Activity size={12} />
            {t("liveDirectory")}
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 font-outfit leading-none uppercase">
            Team <span className="text-emerald-700 italic">Management</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm md:text-base max-w-xl">
            {t("desc")}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 self-start md:self-end flex-wrap">
        <Button
          variant="outline"
          size="icon"
          onClick={onRefresh}
          title="Refresh Directory"
          className="rounded-2xl border-slate-200 bg-white h-12 w-12 hover:bg-slate-50 shadow-sm transition-all shrink-0 cursor-pointer"
        >
          <RefreshCw
            className={`h-4 w-4 text-slate-600 ${isValidating ? "animate-spin" : ""}`}
          />
        </Button>

        {onExportCsv && (
          <Button
            variant="outline"
            onClick={onExportCsv}
            className="rounded-2xl border-slate-200 bg-white font-black text-xs uppercase tracking-widest h-12 px-5 hover:bg-slate-50 shadow-sm transition-all flex items-center gap-2 text-slate-700 cursor-pointer"
          >
            <Download className="h-4 w-4 text-slate-500" />
            {t("exportCsv")}
          </Button>
        )}

        <Button
          onClick={onAddClick}
          className="rounded-2xl font-black bg-emerald-700 hover:bg-emerald-800 h-12 px-6 md:px-7 shadow-lg shadow-emerald-700/25 transition-all active:scale-95 flex items-center gap-2.5 text-white uppercase tracking-widest text-xs cursor-pointer"
        >
          <Plus className="h-4 w-4" /> {t("addUser")}
        </Button>
      </div>
    </header>
  );
};
