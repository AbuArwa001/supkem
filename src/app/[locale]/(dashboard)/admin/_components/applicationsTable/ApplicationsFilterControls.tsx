import React from "react";
import { Link } from "@/i18n/routing";
import { ArrowUpRight, Search } from "lucide-react";
import { useTranslations } from "next-intl";

interface ApplicationsFilterControlsProps {
  filterStatus: string;
  setFilterStatus: (v: string) => void;
  searchTerm: string;
  setSearchTerm: (v: string) => void;
}

export function ApplicationsFilterControls({
  filterStatus,
  setFilterStatus,
  searchTerm,
  setSearchTerm,
}: ApplicationsFilterControlsProps) {
  const t = useTranslations("Dashboard.admin.tables");

  const filterTabs = [
    { key: "all", label: "All Submissions" },
    { key: "review", label: "Under Review" },
    { key: "approved", label: "Approved" },
    { key: "pending", label: "Pending" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-black font-outfit text-slate-900 tracking-tight">
            {t("recentApps")}
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Real-time pipeline of incoming submissions and certification requests
          </p>
        </div>

        <Link
          href="/admin/applications"
          className="text-xs font-black uppercase tracking-wider text-emerald-800 hover:text-emerald-900 flex items-center gap-1.5 group shrink-0"
        >
          {t("viewPipeline")}
          <ArrowUpRight
            size={16}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/60 rounded-2xl overflow-x-auto no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilterStatus(tab.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                filterStatus === tab.key
                  ? "bg-white text-slate-900 shadow-xs font-extrabold"
                  : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute ltr:left-3.5 rtl:right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full ltr:pl-10 rtl:pr-10 pr-3 py-2 text-xs font-semibold rounded-2xl bg-white border border-slate-200/80 shadow-2xs focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 placeholder:text-slate-400"
          />
        </div>
      </div>
    </div>
  );
}
