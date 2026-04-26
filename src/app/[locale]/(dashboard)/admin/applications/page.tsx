"use client";

// React/Next.js core

// External libraries
import { Search } from "lucide-react";

// Internal components
import { useApplicationsLogic } from "@/app/[locale]/(dashboard)/admin/applications/_hooks/useApplicationsLogic";
import ApplicationCard from "@/app/[locale]/(dashboard)/admin/applications/_components/ApplicationCard";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const FILTER_OPTIONS = ["all", "pending", "approved", "rejected"];

export default function AdminApplications() {
  const { filteredApps, filter, setFilter, searchTerm, setSearchTerm } =
    useApplicationsLogic();

  const t = useTranslations("Dashboard.admin.applications");

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold font-outfit text-primary">
            {t("heading")}
          </h1>
          <p className="text-foreground/60 font-medium">
            {t("desc")}
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white p-2 border border-border rounded-3xl shadow-sm">
          <div className="relative group pl-2">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors"
            />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t("search")}
              className="pl-12 pr-4 py-3 bg-primary/[0.02] border border-transparent focus:border-primary/20 focus:bg-white rounded-2xl text-sm transition-all outline-none w-64"
            />
          </div>
          <div className="flex items-center gap-1 pr-2">
            {FILTER_OPTIONS.map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={cn(
                  "px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-xl transition-all",
                  filter === filterOption
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-foreground/40 hover:bg-primary/5 hover:text-primary",
                )}
              >
                {t(`filters.${filterOption.toUpperCase()}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredApps.map((app, index) => (
          <ApplicationCard key={app.id} application={app} index={index} />
        ))}

        {filteredApps.length === 0 && (
          <div className="py-20 text-center space-y-4 rounded-[20px] border-2 border-dashed border-border bg-primary/[0.01]">
            <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto text-primary/20">
              <Search size={40} />
            </div>
            <h3 className="text-2xl font-bold font-outfit text-primary/40">
              {t("noApplications")}
            </h3>
            <p className="text-foreground/30 font-medium">
              {t("noApplicationsDesc")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
