"use client";

import { motion } from "framer-motion";
import { TrendingUp, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  color: string;
  delay: number;
}

export const StatCard = ({
  icon: Icon,
  label,
  value,
  trend,
  color,
  delay,
}: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: "easeOut" }}
    className="p-8 rounded-[32px] bg-white border border-slate-300/50 border-l-4 border-l-indigo-500 shadow-md hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group relative overflow-hidden"
  >
    <div className="flex items-start justify-between relative z-10">
      <div>
        <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">
          {label}
        </p>
        <div className="flex items-end gap-3 mt-1">
          <h3 className="text-4xl font-black font-outfit text-slate-900 tracking-tight">
            {value}
          </h3>
        </div>
      </div>
      <div
        className={cn(
          "inline-flex p-4 rounded-2xl group-hover:scale-110 transition-transform shadow-inner",
          color,
        )}
      >
        <Icon size={24} className="text-white" />
      </div>
    </div>

    {trend && (
      <div className="mt-6 flex items-center gap-2 relative z-10">
        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
          <TrendingUp size={12} /> {trend}
        </span>
        <span className="text-xs font-semibold text-slate-400">
          vs last month
        </span>
      </div>
    )}

    {/* Decorative Background Elements */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 -translate-y-16 translate-x-16 rounded-full group-hover:bg-slate-100/50 transition-colors duration-500" />
    <div className="absolute bottom-0 right-10 w-16 h-16 bg-slate-50 translate-y-8 rounded-full group-hover:bg-slate-100/50 transition-colors duration-500 delay-75" />
  </motion.div>
);
