import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { AreaChart } from "../Charts";
import { useTranslations } from "next-intl";

interface VelocityChartPanelProps {
  growthTrend: any[];
}

export function VelocityChartPanel({ growthTrend }: VelocityChartPanelProps) {
  const t = useTranslations("Dashboard.admin.overview");

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="lg:col-span-7 p-7 md:p-8 rounded-[2.25rem] bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between"
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

      <div className="py-2">
        <AreaChart data={growthTrend} />
      </div>

      <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold">
        <span>Past 30 Days</span>
        <span className="text-emerald-700 font-black">↑ Velocity Trending Positive</span>
      </div>
    </motion.div>
  );
}
