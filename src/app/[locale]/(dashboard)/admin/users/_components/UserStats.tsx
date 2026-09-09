"use client";

import { motion } from "framer-motion";
import { Users, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import type { UserStatsData } from "../_services/userService";

interface UserStatsProps {
  stats?: UserStatsData | null;
  totalCount: number;
  isLoading: boolean;
}

export const UserStats = ({ stats, totalCount, isLoading }: UserStatsProps) => {
  const t = useTranslations("Dashboard.admin.users");

  const total = stats?.total ?? totalCount;
  const active = stats?.active ?? 0;
  const inactive = stats?.inactive ?? 0;
  const staff = stats?.staff ?? 0;

  const activePercent = total > 0 ? Math.round((active / total) * 100) : 0;

  const statCards = [
    {
      title: t("stats.totalUsers"),
      desc: t("stats.totalDesc"),
      value: isLoading ? "-" : total.toLocaleString(),
      badge: `${total} Accounts`,
      badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
      icon: Users,
      iconBg: "bg-emerald-500/10 text-emerald-700",
      borderAccent: "hover:border-emerald-500/30",
    },
    {
      title: t("stats.activeUsers"),
      desc: t("stats.activeDesc"),
      value: isLoading ? "-" : active.toLocaleString(),
      badge: `${activePercent}% Verified`,
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: CheckCircle2,
      iconBg: "bg-emerald-500/15 text-emerald-600",
      borderAccent: "hover:border-emerald-500/40",
    },
    {
      title: t("stats.pendingUsers"),
      desc: t("stats.pendingDesc"),
      value: isLoading ? "-" : inactive.toLocaleString(),
      badge: inactive > 0 ? "Action Needed" : "All Clear",
      badgeColor:
        inactive > 0
          ? "bg-amber-50 text-amber-700 border-amber-200"
          : "bg-emerald-50 text-emerald-600 border-emerald-200",
      icon: AlertCircle,
      iconBg: "bg-amber-500/15 text-amber-600",
      borderAccent: "hover:border-amber-500/40",
    },
    {
      title: t("stats.staffUsers"),
      desc: t("stats.staffDesc"),
      value: isLoading ? "-" : staff.toLocaleString(),
      badge: "Gov & Staff",
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
      icon: ShieldCheck,
      iconBg: "bg-indigo-500/15 text-indigo-700",
      borderAccent: "hover:border-indigo-500/40",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
      {statCards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.08 }}
            className={`relative overflow-hidden rounded-[2rem] bg-white p-6 md:p-7 border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${card.borderAccent}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.iconBg}`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${card.badgeColor}`}
              >
                {card.badge}
              </span>
            </div>

            <div className="mt-5 space-y-1">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                {card.title}
              </p>
              <h3 className="text-3xl md:text-4xl font-black font-outfit text-slate-900 tracking-tight">
                {card.value}
              </h3>
              <p className="text-xs text-slate-500 font-medium pt-1 line-clamp-1">
                {card.desc}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
