import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Application } from "../_types";
import ApplicationCard from "./ApplicationCard";

interface ApplicationsGridProps {
  isLoading: boolean;
  filteredApps: Application[];
  paginatedApps: Application[];
  selectedIds: (string | number)[];
  toggleSelectApp: (id: string | number) => void;
}

export function ApplicationsGrid({
  isLoading,
  filteredApps,
  paginatedApps,
  selectedIds,
  toggleSelectApp,
}: ApplicationsGridProps) {
  const t = useTranslations("Dashboard.admin.applications");

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="bg-white rounded-[24px] border border-slate-100 p-6 animate-pulse space-y-4">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl" />
            <div className="space-y-2">
              <div className="h-5 w-3/4 bg-slate-100 rounded-lg" />
              <div className="h-4 w-1/2 bg-slate-50 rounded-lg" />
            </div>
            <div className="border-t border-slate-50 pt-4 space-y-2">
              <div className="h-3 w-2/3 bg-slate-50 rounded" />
            </div>
            <div className="h-10 w-full bg-slate-50 rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {paginatedApps.map((app, index) => (
        <ApplicationCard
          key={app.id}
          application={app}
          index={index}
          isSelected={selectedIds.includes(app.id)}
          onToggleSelect={toggleSelectApp}
        />
      ))}

      {filteredApps.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-full py-24 text-center space-y-4 rounded-[32px] border-2 border-dashed border-slate-200 bg-slate-50/50"
        >
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
            <Search size={36} />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black font-outfit text-slate-800">{t("noApplications")}</h3>
            <p className="text-slate-500 font-medium text-sm">{t("noApplicationsDesc")}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
