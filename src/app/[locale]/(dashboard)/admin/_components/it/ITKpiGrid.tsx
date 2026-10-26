import React from "react";
import { Users, ShieldCheck, Plug, Database, ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { SystemStats } from "./itTypes";

interface ITKpiGridProps {
  stats?: SystemStats;
  isLoading: boolean;
  totalUsers: number;
  activeUsers: number;
  activeRatio: number;
  dbEngine: string;
}

export function ITKpiGrid({
  stats, isLoading, totalUsers, activeUsers, activeRatio, dbEngine,
}: ITKpiGridProps) {
  const t = useTranslations("Dashboard.admin.it");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      <Card className="border-none shadow-premium rounded-[2rem] bg-linear-to-br from-blue-500/10 via-blue-50/40 to-white overflow-hidden relative border border-blue-500/20">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-blue-900">User Identity Directory</span>
            <div className="p-2.5 rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-600/20"><Users size={20} /></div>
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          {isLoading ? <Skeleton className="h-10 w-24 rounded-lg" /> : <div className="text-3xl font-black font-outfit text-slate-900">{totalUsers.toLocaleString()}</div>}
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-slate-500 font-medium">Active: <strong className="text-blue-700">{activeUsers}</strong> ({activeRatio}%)</span>
            <Link href="/admin/users" className="text-blue-700 hover:underline font-bold flex items-center gap-0.5">{t("manage")} <ArrowUpRight size={13} /></Link>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-premium rounded-[2rem] bg-linear-to-br from-emerald-500/10 via-emerald-50/40 to-white overflow-hidden relative border border-emerald-500/20">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-900">Security & RBAC</span>
            <div className="p-2.5 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20"><ShieldCheck size={20} /></div>
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          <div className="text-3xl font-black font-outfit text-slate-900">{t("active")}</div>
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-slate-500 font-medium">{t("rolesPrivileges")}</span>
            <Link href="/admin/settings/access-control" className="text-emerald-700 hover:underline font-bold flex items-center gap-0.5">Roles <ArrowUpRight size={13} /></Link>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-premium rounded-[2rem] bg-linear-to-br from-amber-500/10 via-amber-50/40 to-white overflow-hidden relative border border-amber-500/20">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-amber-900">Core Integrations</span>
            <div className="p-2.5 rounded-2xl bg-amber-600 text-white shadow-md shadow-amber-600/20"><Plug size={20} /></div>
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          <div className="text-3xl font-black font-outfit text-slate-900">4 / 4</div>
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-slate-500 font-medium">{t("mpesaEmailKnockAI")}</span>
            <Link href="/admin/settings/integrations" className="text-amber-700 hover:underline font-bold flex items-center gap-0.5">Configure <ArrowUpRight size={13} /></Link>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-premium rounded-[2rem] bg-linear-to-br from-purple-500/10 via-purple-50/40 to-white overflow-hidden relative border border-purple-500/20">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-purple-900">Database & Infrastructure</span>
            <div className="p-2.5 rounded-2xl bg-purple-600 text-white shadow-md shadow-purple-600/20"><Database size={20} /></div>
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          <div className="text-xl font-black font-outfit text-slate-900 truncate">{dbEngine}</div>
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-slate-500 font-medium">{stats?.recent_activity_count !== undefined ? t("events24h", { count: stats.recent_activity_count }) : t("auditActivity24h")}</span>
            <Link href="/admin/settings/audit?tab=stats" className="text-purple-700 hover:underline font-bold flex items-center gap-0.5">{t("telemetry")} <ArrowUpRight size={13} /></Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
