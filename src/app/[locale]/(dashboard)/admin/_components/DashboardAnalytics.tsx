"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Activity,
  Layers,
  Building2,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCheck,
} from "lucide-react";
import { AreaChart, BarChart } from "./Charts";
import { useTranslations } from "next-intl";

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

  const totalGrowthUnits = growthTrend.reduce(
    (acc, curr) => acc + (curr.count || 0),
    0
  );

  const totalStatusApps = statusDistribution.reduce(
    (acc, curr) => acc + (curr.count || 0),
    0
  );

  const approvalRate = summary?.approval_rate ?? 92;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-500 text-emerald-700";
      case "Under Review":
        return "bg-amber-500 text-amber-700";
      case "Rejected":
        return "bg-rose-500 text-rose-700";
      default:
        return "bg-teal-500 text-teal-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-emerald-800 text-xs font-black uppercase tracking-wider mb-1">
            <Activity size={14} className="text-emerald-700" />
            {t("analytics.title")}
          </div>
          <p className="text-xs text-slate-500 font-medium">
            {t("analytics.subtitle")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-black tracking-wide flex items-center gap-2 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {t("analytics.totalVolume", { count: totalGrowthUnits || totalStatusApps })}
            </span>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-black tracking-wide flex items-center gap-2 shadow-xs">
            <FileCheck size={14} className="text-emerald-400" />
            <span>{approvalRate}% {t("analytics.approvalRate")}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: 2 Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Velocity Area Chart Panel (spans 7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-7 p-7 md:p-8 rounded-[2.25rem] bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h4 className="text-lg md:text-xl font-black font-outfit text-slate-900 tracking-tight">
                {t("analytics.velocityTitle")}
              </h4>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                {t("analytics.velocitySubtitle")}
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100/60 shrink-0">
              <TrendingUp size={20} />
            </div>
          </div>

          {/* Area Chart */}
          <div className="py-2">
            <AreaChart data={growthTrend} />
          </div>

          <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Past 30 Days</span>
            <span className="text-emerald-700 font-black">
              ↑ Velocity Trending Positive
            </span>
          </div>
        </motion.div>

        {/* Status Distribution & Sector Breakdown (spans 5 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-5 p-7 md:p-8 rounded-[2.25rem] bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-6"
        >
          {/* Status Breakdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-black font-outfit text-slate-900 tracking-tight">
                  {t("analytics.statusTitle")}
                </h4>
                <p className="text-[11px] text-slate-400 font-medium">
                  {t("analytics.statusSubtitle")}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 shrink-0">
                <Layers size={18} />
              </div>
            </div>

            {/* Progress Bars by status */}
            <div className="space-y-2.5">
              {statusDistribution.map((item, idx) => {
                const count = item.count || 0;
                const percentage =
                  totalStatusApps > 0
                    ? Math.round((count / totalStatusApps) * 100)
                    : 0;

                const colorClass = getStatusColor(item.status);

                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-700 flex items-center gap-1.5">
                        <span
                          className={`h-2 w-2 rounded-full ${colorClass.split(" ")[0]}`}
                        />
                        {item.status}
                      </span>
                      <span className="text-slate-400 font-mono text-[11px]">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        className={`h-full rounded-full ${colorClass.split(" ")[0]}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Organization Sector Breakdown */}
          <div className="pt-5 border-t border-slate-100 space-y-3">
            <div className="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-wider">
              <Building2 size={14} className="text-emerald-700" />
              <span>{t("analytics.sectorTitle")}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {organizationTypes.slice(0, 4).map((org, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-100/80 flex items-center justify-between"
                >
                  <span className="text-[11px] font-bold text-slate-700 truncate mr-2">
                    {org.type || "Institution"}
                  </span>
                  <span className="px-2 py-0.5 rounded-lg bg-white text-slate-900 font-black text-[11px] shadow-2xs">
                    {org.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
