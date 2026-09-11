"use client";

import { Link } from "@/i18n/routing";
import { LayoutGrid, List, Plus, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface ApplicationsHeaderProps {
  view: "grid" | "list";
  onViewChange: (v: "grid" | "list") => void;
  total: number;
}

export function ApplicationsHeader({ view, onViewChange, total }: ApplicationsHeaderProps) {
  const t = useTranslations("Dashboard.portal.applicationsPage");

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <FileText size={26} className="text-primary" />
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 font-outfit leading-tight">
              {t("title")}
            </h1>
            {total > 0 && (
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-black border border-primary/20">
                {total}
              </span>
            )}
          </div>
          <p className="text-slate-500 font-medium mt-1 text-sm">
            {t("subtitle")}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {/* View Toggle */}
        <div className="flex items-center gap-1 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
          <button
            onClick={() => onViewChange("grid")}
            className={cn(
              "p-2 rounded-lg transition-all",
              view === "grid"
                ? "bg-white text-primary shadow-sm border border-slate-200"
                : "text-slate-400 hover:text-slate-600"
            )}
            title={t("gridView")}
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => onViewChange("list")}
            className={cn(
              "p-2 rounded-lg transition-all",
              view === "list"
                ? "bg-white text-primary shadow-sm border border-slate-200"
                : "text-slate-400 hover:text-slate-600"
            )}
            title={t("listView")}
          >
            <List size={18} />
          </button>
        </div>

        {/* New Application */}
        <Link
          href="/portal/applications/new"
          className="flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all font-bold text-sm"
        >
          <Plus size={18} />
          {t("newApp")}
        </Link>
      </div>
    </div>
  );
}
