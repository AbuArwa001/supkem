"use client";

import { Link } from "@/i18n/routing";
import { Plus, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { ApplicationsControlBar } from "./ApplicationsControlBar";

interface ApplicationsHeaderProps {
  total: number;
  filteredTotal: number;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedService: string;
  onServiceChange: (val: string) => void;
  distinctServices: string[];
  statusFilter: string;
  onStatusFilterChange: (val: string) => void;
  sortBy: "newest" | "oldest" | "service_asc" | "status";
  onSortByChange: (val: "newest" | "oldest" | "service_asc" | "status") => void;
}

export function ApplicationsHeader({
  total,
  filteredTotal,
  searchTerm,
  onSearchChange,
  selectedService,
  onServiceChange,
  distinctServices,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortByChange,
}: ApplicationsHeaderProps) {
  const t = useTranslations("Dashboard.portal.applicationsPage");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <FileText size={26} className="text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 font-outfit leading-tight">
                {t("title")}
              </h1>
              {total > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-black border border-primary/20">
                  {filteredTotal === total ? total : `${filteredTotal} / ${total}`}
                </span>
              )}
            </div>
            <p className="text-slate-500 font-medium mt-0.5 text-xs sm:text-sm">{t("subtitle")}</p>
          </div>
        </div>

        <Link
          href="/portal/applications/new"
          className="flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all font-bold text-sm shrink-0"
        >
          <Plus size={18} />
          {t("newApp")}
        </Link>
      </div>

      <ApplicationsControlBar
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        selectedService={selectedService}
        onServiceChange={onServiceChange}
        distinctServices={distinctServices}
        statusFilter={statusFilter}
        onStatusFilterChange={onStatusFilterChange}
        sortBy={sortBy}
        onSortByChange={onSortByChange}
      />
    </div>
  );
}
