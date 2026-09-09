"use client";

// React/Next.js core

// External libraries
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

// Internal components
import { useApplicationsLogic } from "@/app/[locale]/(dashboard)/admin/applications/_hooks/useApplicationsLogic";
import ApplicationCard from "@/app/[locale]/(dashboard)/admin/applications/_components/ApplicationCard";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const FILTER_OPTIONS = ["all", "pending", "approved", "rejected"];

export default function AdminApplications() {
  const { filteredApps, filter, setFilter, searchTerm, setSearchTerm } =
    useApplicationsLogic();

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12; // Multiple of 4 for nice rows
  const totalPages = Math.ceil(filteredApps.length / ITEMS_PER_PAGE);
  const paginatedApps = filteredApps.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const t = useTranslations("Dashboard.admin.applications");

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl lg:text-5xl font-black font-outfit tracking-tight text-primary drop-shadow-sm">
            {t("heading")}
          </h1>
          <p className="text-foreground/60 font-medium text-lg max-w-xl">
            {t("desc")}
          </p>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 bg-white p-2 rounded-[24px] shadow-xl shadow-primary/5 border border-primary/5">
          <div className="relative group flex-1 lg:flex-none">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors"
            />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t("search")}
              className="pl-12 pr-4 py-3.5 bg-primary/[0.02] border border-transparent focus:border-primary/20 focus:bg-white rounded-[18px] text-sm transition-all duration-300 outline-none w-full lg:w-72 font-medium"
            />
          </div>
          <div className="flex items-center gap-1">
            {FILTER_OPTIONS.map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={cn(
                  "px-5 py-3 text-xs font-bold uppercase tracking-widest rounded-[16px] transition-all duration-300 relative overflow-hidden",
                  filter === filterOption
                    ? "text-white shadow-lg shadow-primary/30 scale-105"
                    : "text-foreground/50 hover:bg-primary/5 hover:text-primary hover:scale-105",
                )}
              >
                {filter === filterOption && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-accent -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{t(`filters.${filterOption.toUpperCase()}`)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedApps.map((app, index) => (
          <ApplicationCard key={app.id} application={app} index={index} />
        ))}

        {filteredApps.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-full py-24 text-center space-y-6 rounded-[32px] border-2 border-dashed border-primary/20 bg-gradient-to-b from-primary/[0.02] to-transparent glass relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-primary/[0.02] bg-[length:32px_32px]" />
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary/40 relative">
              <div className="absolute inset-0 animate-ping opacity-20 rounded-full bg-primary" />
              <Search size={48} />
            </div>
            <div className="space-y-2 relative z-10">
              <h3 className="text-3xl font-black font-outfit text-primary/60">
                {t("noApplications")}
              </h3>
              <p className="text-foreground/40 font-medium text-lg">
                {t("noApplicationsDesc")}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  "w-10 h-10 rounded-lg text-sm font-bold transition-all",
                  currentPage === page
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
