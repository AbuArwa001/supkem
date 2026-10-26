"use client";

import { Activity, FileCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { VelocityChartPanel } from "./analytics/VelocityChartPanel";
import { StatusDistributionPanel } from "./analytics/StatusDistributionPanel";

interface DashboardAnalyticsProps {
  growthTrend: any[];
  statusDistribution: any[];
  organizationTypes: any[];
  summary?: any;
}

export const DashboardAnalytics = ({
  growthTrend,
  statusDistribution,
  organizationTypes,
  summary,
}: DashboardAnalyticsProps) => {
  const t = useTranslations("Dashboard.admin.overview");

  const totalGrowthUnits = growthTrend.reduce((acc, curr) => acc + (curr.count || 0), 0);
  const totalStatusApps = statusDistribution.reduce((acc, curr) => acc + (curr.count || 0), 0);
  const approvalRate = summary?.approval_rate ?? 92;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-emerald-800 text-xs font-black uppercase tracking-wider mb-1">
            <Activity size={14} className="text-emerald-700" />
            {t("analytics.title")}
          </div>
          <p className="text-xs text-slate-500 font-medium">{t("analytics.subtitle")}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-black tracking-wide flex items-center gap-2 shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{t("analytics.totalVolume", { count: totalGrowthUnits || totalStatusApps })}</span>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-black tracking-wide flex items-center gap-2 shadow-2xs">
            <FileCheck size={14} className="text-emerald-400" />
            <span>{approvalRate}% {t("analytics.approvalRate")}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <VelocityChartPanel growthTrend={growthTrend} />
        <StatusDistributionPanel
          statusDistribution={statusDistribution}
          organizationTypes={organizationTypes}
          totalStatusApps={totalStatusApps}
        />
      </div>
    </div>
  );
};
