"use client";

// React/Next.js core

// External libraries
import { Search } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="space-y-10 relative">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 blur-[100px] -z-10 rounded-full" />
      <div className="absolute top-40 -left-20 w-72 h-72 bg-secondary/10 blur-[80px] -z-10 rounded-full" />
      
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
        <div className="space-y-2">
          <h1 className="text-4xl lg:text-5xl font-black font-outfit tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-accent drop-shadow-sm">
            {t("heading")}
          </h1>
          <p className="text-foreground/60 font-medium text-lg max-w-xl">
            {t("desc")}
          </p>
        </div>

        <div className="flex items-center gap-4 glass p-2 rounded-[24px] shadow-xl shadow-primary/5 hover:shadow-primary/10 transition-all duration-500">
          <div className="relative group pl-2">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors"
            />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t("search")}
              className="pl-12 pr-4 py-3.5 bg-white/50 backdrop-blur-md border border-transparent focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/10 rounded-[18px] text-sm transition-all duration-300 outline-none w-64 lg:w-72 font-medium"
            />
          </div>
          <div className="flex items-center gap-1 pr-2">
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

      <div className="grid grid-cols-1 gap-6">
        {filteredApps.map((app, index) => (
          <ApplicationCard key={app.id} application={app} index={index} />
        ))}

        {filteredApps.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-24 text-center space-y-6 rounded-[32px] border-2 border-dashed border-primary/20 bg-gradient-to-b from-primary/[0.02] to-transparent glass relative overflow-hidden"
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
    </div>
  );
}
