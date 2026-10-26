"use client";

import { motion } from "framer-motion";
import { TrendingUp, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { getStatCardTheme } from "./statCardThemes";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  color?: string;
  delay: number;
}

export const StatCard = ({
  icon: Icon,
  label,
  value,
  trend,
  color,
  delay,
}: StatCardProps) => {
  const t = useTranslations("Dashboard.admin.metrics");

  const getLabel = (lbl: string) => {
    switch (lbl) {
      case "Organizations": return t("organizations");
      case "Total Users": return t("users");
      case "Applications": return t("applications");
      case "Certificates": return t("certificates");
      default: return lbl;
    }
  };

  const theme = getStatCardTheme(label, color);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: "easeOut" }}
      className={cn(
        "p-7 md:p-8 rounded-[2.25rem] bg-white border border-slate-200/80 shadow-xs hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-300 hover:-translate-y-1.5 group relative overflow-hidden",
        theme.borderAccent
      )}
    >
      <div
        className={cn(
          "absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-2xl transition-all duration-500 pointer-events-none",
          theme.glowBg
        )}
      />

      <div className="flex items-start justify-between relative z-10">
        <div className="space-y-2">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
            {getLabel(label)}
          </p>
          <div className="flex items-end gap-3">
            <h3 className="text-4xl md:text-5xl font-black font-outfit text-slate-900 tracking-tight leading-none">
              {value}
            </h3>
          </div>
        </div>

        <div className={cn("p-4 rounded-2xl group-hover:scale-110 transition-transform shadow-lg shrink-0", theme.iconBg)}>
          <Icon size={24} />
        </div>
      </div>

      {trend && (
        <div className="mt-6 flex items-center gap-2 relative z-10 pt-2 border-t border-slate-100">
          <span className="text-xs font-black text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shadow-2xs">
            <TrendingUp size={12} /> {trend}
          </span>
          <span className="text-xs font-semibold text-slate-400">{t("vsLastMonth")}</span>
        </div>
      )}
    </motion.div>
  );
};
