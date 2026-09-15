"use client";

import { useState } from "react";
import useSWR from "swr";
import { motion } from "framer-motion";
import {
  Server,
  Users,
  Shield,
  Activity,
  Cpu,
  RefreshCw,
  Sliders,
  Plug,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  Database,
  Lock,
  Mail,
  Smartphone,
  Bot,
  Building2,
  FileCode,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/routing";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/api";
import { toast } from "sonner";
import { format } from "date-fns";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

interface AuditItem {
  id: number | string;
  user_details?: { email?: string; name?: string };
  action: string;
  content_type_name: string;
  object_repr: string;
  ip_address?: string;
  timestamp: string;
}

interface SystemStats {
  database_engine?: string;
  recent_activity_count?: number;
  user_stats?: {
    total: number;
    active: number;
  };
  model_counts?: Record<string, number>;
}

export function ITDashboardView() {
  const { user } = useAuth();
  const userName = user?.first_name || user?.full_name || "IT Officer";

  // SWR fetching
  const {
    data: stats,
    isLoading: isStatsLoading,
    isValidating: isStatsValidating,
    mutate: mutateStats,
  } = useSWR<SystemStats>("/configurations/audit/stats/", fetcher, {
    revalidateOnFocus: false,
  });

  const {
    data: logs,
    isLoading: isLogsLoading,
    isValidating: isLogsValidating,
    mutate: mutateLogs,
  } = useSWR<AuditItem[]>("/configurations/audit/logs/", fetcher, {
    revalidateOnFocus: false,
  });

  const {
    data: parameters,
    isLoading: isParamsLoading,
    mutate: mutateParams,
  } = useSWR<any[]>("/configurations/system-parameters/", fetcher, {
    revalidateOnFocus: false,
  });

  const isRefreshing = isStatsValidating || isLogsValidating;

  const handleRefresh = () => {
    mutateStats();
    mutateLogs();
    mutateParams();
    toast.success("IT telemetry & audit logs refreshed");
  };

  const totalUsers = stats?.user_stats?.total ?? 0;
  const activeUsers = stats?.user_stats?.active ?? 0;
  const activeRatio = totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 100;
  const totalParams = Array.isArray(parameters) ? parameters.length : 0;
  const dbEngine = stats?.database_engine || "PostgreSQL / Cloud SQL";

  const quickActions = [
    {
      title: "User Directory & Access",
      desc: "Manage user credentials, status, activation, and role assignments.",
      href: "/admin/users",
      icon: Users,
      badge: `${totalUsers} Users`,
      color: "from-blue-600 to-indigo-600",
      lightBg: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      title: "Access Control (RBAC)",
      desc: "Configure role permissions, staff privileges, and security boundaries.",
      href: "/admin/settings/access-control",
      icon: Shield,
      badge: "Security",
      color: "from-emerald-600 to-teal-600",
      lightBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      title: "API & Integrations Hub",
      desc: "Manage API credentials for M-Pesa, Resend, Knock, and OpenAI.",
      href: "/admin/settings/integrations",
      icon: Plug,
      badge: "4 Services",
      color: "from-amber-600 to-orange-600",
      lightBg: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      title: "Security & Audit Trail",
      desc: "Live stream of administrative actions, data modifications, and logins.",
      href: "/admin/settings/audit",
      icon: Activity,
      badge: "Audit Logs",
      color: "from-purple-600 to-violet-600",
      lightBg: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      title: "System Parameters",
      desc: "Application settings, system fee thresholds, and maintenance toggles.",
      href: "/admin/settings/system-parameters",
      icon: Sliders,
      badge: `${totalParams} Params`,
      color: "from-slate-700 to-slate-900",
      lightBg: "bg-slate-100 text-slate-700 border-slate-200",
    },
    {
      title: "Mosque & Org Directory",
      desc: "Inspect registered mosques, institutions, and religious bodies.",
      href: "/admin/organizations",
      icon: Building2,
      badge: "Directory",
      color: "from-teal-600 to-cyan-600",
      lightBg: "bg-teal-50 text-teal-700 border-teal-200",
    },
  ];

  const integrationStatuses = [
    {
      name: "Safaricom M-Pesa Daraja",
      service: "Payment Gateway",
      icon: Smartphone,
      status: "Configured",
      type: "active",
      accent: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    {
      name: "Resend Email Delivery",
      service: "SMTP & Invoices",
      icon: Mail,
      status: "Operational",
      type: "active",
      accent: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      name: "Knock Notifications",
      service: "In-App & Push Engine",
      icon: Activity,
      status: "Operational",
      type: "active",
      accent: "text-purple-600 bg-purple-50 border-purple-200",
    },
    {
      name: "OpenAI Platform",
      service: "Bilingual Translation",
      icon: Bot,
      status: "Ready",
      type: "active",
      accent: "text-amber-600 bg-amber-50 border-amber-200",
    },
  ];

  return (
    <div className="space-y-10 pb-16 min-h-screen">
      {/* Executive Command Header */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200 font-black tracking-widest text-[10px] uppercase px-2.5 py-0.5 flex items-center gap-1.5">
              <Server size={12} />
              IT Operations & Infrastructure • Primary Dashboard
            </Badge>
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-bold text-[10px] uppercase px-2 py-0.5 flex items-center gap-1">
              <CheckCircle2 size={11} />
              All Systems Operational
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-outfit text-slate-900 tracking-tight">
            Welcome back, <span className="text-primary italic">{userName}</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">
            Centralized IT command center: user identity governance, cloud integrations, and infrastructure telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start lg:self-end">
          <Link href="/admin/settings/audit">
            <Button
              variant="outline"
              className="h-11 px-4 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center gap-2 shadow-sm"
            >
              <Activity className="h-4 w-4 text-purple-600" />
              <span>Full Audit Trail</span>
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            className="h-11 w-11 rounded-xl hover:bg-slate-100 text-slate-500 border border-slate-200"
            title="Refresh IT Telemetry"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin text-primary" : ""}`} />
          </Button>
        </div>
      </header>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Total Users */}
        <Card className="border-none shadow-premium rounded-[2rem] bg-gradient-to-br from-blue-500/10 via-blue-50/40 to-white overflow-hidden relative border border-blue-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-blue-900">
                User Identity Directory
              </span>
              <div className="p-2.5 rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
                <Users size={20} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            {isStatsLoading ? (
              <Skeleton className="h-10 w-24 rounded-lg" />
            ) : (
              <div className="text-3xl font-black font-outfit text-slate-900">
                {totalUsers.toLocaleString()}
              </div>
            )}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-500 font-medium">
                Active: <strong className="text-blue-700">{activeUsers}</strong> ({activeRatio}%)
              </span>
              <Link
                href="/admin/users"
                className="text-blue-700 hover:underline font-bold flex items-center gap-0.5"
              >
                Manage <ArrowUpRight size={13} />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Security & Access Control */}
        <Card className="border-none shadow-premium rounded-[2rem] bg-gradient-to-br from-emerald-500/10 via-emerald-50/40 to-white overflow-hidden relative border border-emerald-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-900">
                Security & RBAC
              </span>
              <div className="p-2.5 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
                <ShieldCheck size={20} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-3xl font-black font-outfit text-slate-900">Active</div>
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-500 font-medium">Roles & Privileges Protected</span>
              <Link
                href="/admin/settings/access-control"
                className="text-emerald-700 hover:underline font-bold flex items-center gap-0.5"
              >
                Roles <ArrowUpRight size={13} />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* API & Cloud Integrations */}
        <Card className="border-none shadow-premium rounded-[2rem] bg-gradient-to-br from-amber-500/10 via-amber-50/40 to-white overflow-hidden relative border border-amber-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-amber-900">
                Core Integrations
              </span>
              <div className="p-2.5 rounded-2xl bg-amber-600 text-white shadow-md shadow-amber-600/20">
                <Plug size={20} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-3xl font-black font-outfit text-slate-900">4 / 4</div>
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-500 font-medium">M-Pesa, Email, Knock, AI</span>
              <Link
                href="/admin/settings/integrations"
                className="text-amber-700 hover:underline font-bold flex items-center gap-0.5"
              >
                Configure <ArrowUpRight size={13} />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="border-none shadow-premium rounded-[2rem] bg-gradient-to-br from-purple-500/10 via-purple-50/40 to-white overflow-hidden relative border border-purple-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-purple-900">
                Database & Infrastructure
              </span>
              <div className="p-2.5 rounded-2xl bg-purple-600 text-white shadow-md shadow-purple-600/20">
                <Database size={20} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-xl font-black font-outfit text-slate-900 truncate">
              {dbEngine}
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-500 font-medium">Audit Activity: 24h</span>
              <Link
                href="/admin/settings/system-parameters"
                className="text-purple-700 hover:underline font-bold flex items-center gap-0.5"
              >
                Settings <ArrowUpRight size={13} />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* IT Command Hub: Quick Actions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-outfit text-slate-900 tracking-tight flex items-center gap-2">
            <Cpu className="text-primary h-5 w-5" />
            IT Operations & Administration Hub
          </h2>
          <span className="text-xs text-slate-400 font-medium">Direct operational shortcuts</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
              >
                <Link href={action.href} className="block group h-full">
                  <div className="h-full bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`p-3 rounded-2xl bg-gradient-to-tr ${action.color} text-white shadow-sm`}
                        >
                          <Icon size={22} />
                        </div>
                        <Badge
                          variant="outline"
                          className={`${action.lightBg} font-bold text-[11px] px-2.5 py-0.5`}
                        >
                          {action.badge}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-slate-900 text-base group-hover:text-primary transition-colors mb-1.5 flex items-center gap-1.5">
                        {action.title}
                        <ArrowUpRight
                          size={15}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-primary"
                        />
                      </h3>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        {action.desc}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600 group-hover:text-primary transition-colors">
                      <span>Launch Module</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Two-Column Telemetry: Cloud Integrations & Audit Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Integrations & Services Status (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-outfit text-slate-900 tracking-tight flex items-center gap-2">
              <Plug className="text-primary h-5 w-5" />
              API & Cloud Integrations
            </h2>
            <Link
              href="/admin/settings/integrations"
              className="text-xs text-primary font-bold hover:underline"
            >
              Configure
            </Link>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            {integrationStatuses.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-2xs">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                      <p className="text-[11px] text-slate-500 font-medium">{item.service}</p>
                    </div>
                  </div>
                  <Badge className={`${item.accent} font-black text-[10px] uppercase tracking-wider`}>
                    {item.status}
                  </Badge>
                </div>
              );
            })}

            <div className="pt-2 text-center">
              <Link href="/admin/settings/integrations" className="block w-full">
                <Button
                  variant="outline"
                  className="w-full h-10 rounded-xl text-xs font-bold text-slate-700 border-slate-200"
                >
                  Manage API Credentials & Secrets
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Real-Time Security & Audit Stream (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-outfit text-slate-900 tracking-tight flex items-center gap-2">
              <Activity className="text-purple-600 h-5 w-5" />
              Recent Security & Audit Trail
            </h2>
            <Link
              href="/admin/settings/audit"
              className="text-xs text-purple-700 font-bold hover:underline flex items-center gap-1"
            >
              View Full Logs <ArrowUpRight size={12} />
            </Link>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            {isLogsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-14 w-full rounded-2xl" />
                ))}
              </div>
            ) : !logs || logs.length === 0 ? (
              <div className="py-12 text-center">
                <Clock className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500 font-medium">No recent audit records found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {logs.slice(0, 6).map((log, idx) => {
                  const actionColor =
                    log.action === "CREATE"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : log.action === "DELETE"
                      ? "bg-rose-50 text-rose-700 border-rose-200"
                      : "bg-blue-50 text-blue-700 border-blue-200";

                  return (
                    <div
                      key={log.id || idx}
                      className="p-3.5 rounded-2xl bg-slate-50/60 border border-slate-100 flex items-center justify-between gap-4 text-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Badge
                          className={`${actionColor} font-black text-[10px] uppercase tracking-wider px-2 py-0.5 shrink-0`}
                        >
                          {log.action}
                        </Badge>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate">
                            {log.object_repr || `${log.content_type_name} modified`}
                          </p>
                          <p className="text-[11px] text-slate-500 truncate">
                            By {log.user_details?.email || "System"} •{" "}
                            {log.content_type_name?.toUpperCase() || "RECORD"}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[11px] text-slate-400 font-medium block">
                          {log.timestamp ? format(new Date(log.timestamp), "HH:mm • dd MMM") : "Recent"}
                        </span>
                        {log.ip_address && (
                          <span className="text-[10px] text-slate-400 font-mono">
                            {log.ip_address}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
