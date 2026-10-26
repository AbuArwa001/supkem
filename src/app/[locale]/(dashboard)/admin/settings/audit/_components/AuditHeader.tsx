import React from "react";
import { Link } from "@/i18n/routing";
import { ChevronLeft, Database, History, Activity } from "lucide-react";
import { useTranslations } from "next-intl";

interface AuditHeaderProps {
  view: "logs" | "stats";
  setView: (view: "logs" | "stats") => void;
}

export function AuditHeader({ view, setView }: AuditHeaderProps) {
  const t = useTranslations("Dashboard.admin.settings.audit");

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/settings"
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-primary self-start mt-2"
        >
          <ChevronLeft size={24} className="rtl:rotate-180" />
        </Link>
        <div>
          <h1 className="text-4xl font-bold font-outfit text-primary tracking-tight flex items-center">
            {t("title")} <span className="text-foreground/40 italic ml-2">{t("titleSub")}</span>
            <Database className="ml-4 h-8 w-8 text-primary shadow-sm" />
          </h1>
          <p className="text-foreground/60 font-medium tracking-tight mt-1">
            {t("desc")}
          </p>
        </div>
      </div>

      <div className="flex bg-slate-100 p-1.5 rounded-2xl">
        <button
          onClick={() => setView("logs")}
          className={`flex items-center px-6 py-2.5 rounded-xl font-bold transition-all text-sm uppercase tracking-tight ${
            view === "logs" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <History className="h-4 w-4 mr-2" />
          {t("auditTrail")}
        </button>
        <button
          onClick={() => setView("stats")}
          className={`flex items-center px-6 py-2.5 rounded-xl font-bold transition-all text-sm uppercase tracking-tight ${
            view === "stats" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <Activity className="h-4 w-4 mr-2" />
          {t("systemHealth")}
        </button>
      </div>
    </header>
  );
}
