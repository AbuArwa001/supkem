import React from "react";
import { useTranslations } from "next-intl";

interface ApplicationsHeaderProps {
  totalCount: number;
  filteredCount: number;
}

export function ApplicationsHeader({ totalCount, filteredCount }: ApplicationsHeaderProps) {
  const t = useTranslations("Dashboard.admin.applications");

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl sm:text-4xl font-black font-outfit tracking-tight text-primary">
            {t("heading")}
          </h1>
          {totalCount > 0 && (
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-black border border-primary/20">
              {filteredCount === totalCount ? totalCount : `${filteredCount} / ${totalCount}`}
            </span>
          )}
        </div>
        <p className="text-slate-500 font-medium text-sm sm:text-base max-w-xl">
          {t("desc")}
        </p>
      </div>
    </div>
  );
}
