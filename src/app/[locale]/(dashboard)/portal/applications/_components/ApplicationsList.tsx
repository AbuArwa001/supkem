"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { AlertCircle, FileText, Plus } from "lucide-react";
import { ApplicationCard } from "./ApplicationCard";
import { Application } from "./types";
import { useTranslations } from "next-intl";

interface ApplicationsListProps {
  applications: Application[];
  isLoading: boolean;
  error: any;
  view?: "grid" | "list";
  getStatusStyles: (status: string) => string;
  getStatusIcon: (status: string) => any;
  selectedIds?: (string | number)[];
  onToggleSelect?: (id: string | number) => void;
}

export function ApplicationsList({
  applications,
  isLoading,
  error,
  view = "grid",
  getStatusStyles,
  getStatusIcon,
  selectedIds = [],
  onToggleSelect,
}: ApplicationsListProps) {
  const t = useTranslations("Dashboard.portal.applicationsPage");

  if (error) {
    return (
      <div className="p-5 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600">
        <AlertCircle size={20} />
        <span className="font-semibold text-sm">
          {t("loadFailed")}
        </span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-[24px] border border-slate-100 p-6 animate-pulse space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl" />
              <div className="h-5 w-20 bg-slate-100 rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="h-5 w-3/4 bg-slate-100 rounded-lg" />
              <div className="h-4 w-1/2 bg-slate-50 rounded-lg" />
            </div>
            <div className="border-t border-slate-50 pt-4 space-y-2">
              <div className="h-3 w-2/3 bg-slate-50 rounded" />
              <div className="h-3 w-1/2 bg-slate-50 rounded" />
            </div>
            <div className="h-10 w-full bg-slate-50 rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-24 px-8 text-center bg-white rounded-[28px] border border-slate-100 shadow-sm"
      >
        <div className="w-24 h-24 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 mb-6">
          <FileText size={44} />
        </div>
        <h3 className="text-2xl font-black text-slate-800 font-outfit">{t("noApps")}</h3>
        <p className="text-slate-500 font-medium text-sm max-w-sm mt-2">
          {t("noAppsDesc")}
        </p>
        <Link
          href="/portal/applications/new"
          className="mt-8 flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all"
        >
          <Plus size={18} />
          {t("applyFirst")}
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {applications.map((app, index) => (
        <ApplicationCard
          key={app.id}
          application={app}
          view="grid"
          index={index}
          getStatusStyles={getStatusStyles}
          getStatusIcon={getStatusIcon}
          isSelected={selectedIds.includes(app.id)}
          onToggleSelect={onToggleSelect}
        />
      ))}
    </div>
  );
}
