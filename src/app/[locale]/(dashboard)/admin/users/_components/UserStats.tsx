"use client";

import { Users, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import type { UserStatsData } from "../_services/userService";
import { UserStatCard, UserStatCardItem } from "./UserStatCard";

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

  const statCards: UserStatCardItem[] = [
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
      badgeColor: inactive > 0 ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-emerald-50 text-emerald-600 border-emerald-200",
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
      {statCards.map((card, idx) => (
        <UserStatCard key={card.title} card={card} index={idx} />
      ))}
    </div>
  );
};
