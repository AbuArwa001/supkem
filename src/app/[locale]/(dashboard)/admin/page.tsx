"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Users,
  FileText,
  Award,
  Activity,
  BarChart3,
  RefreshCw,
  Plus,
  Calendar,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { useAdminDashboard } from "./_hooks/useAdminDashboard";
import { useAuth } from "@/hooks/useAuth";
import { StatCard } from "./_components/StatCard";
import { DashboardAnalytics } from "./_components/DashboardAnalytics";
import { ReportModal } from "./_components/ReportModal";
import { DashboardSkeleton } from "./_components/DashboardSkeleton";
import { ApplicationsTable } from "./_components/ApplicationsTable";
import { Sidebar } from "./_components/Sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";

export default function AdminOverview() {
  const t = useTranslations("Dashboard.admin.overview");
  const tc = useTranslations("Dashboard.common");
  const { user } = useAuth();
  const { data, isLoading, isValidating, mutate, isReportOpen, setIsReportOpen } =
    useAdminDashboard();

  if (isLoading) return <DashboardSkeleton />;

  const stats = data?.stats || [];
  const recentApplications = data?.recent_applications || [];
  const deadlines = data?.upcoming_deadlines || [];
  const reportData = data?.report_data || {};

  const getIcon = (label: string) => {
    switch (label) {
      case "Organizations":
        return Building2;
      case "Total Users":
        return Users;
      case "Applications":
        return FileText;
      default:
        return Award;
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t("greetingMorning");
    if (hour < 17) return t("greetingAfternoon");
    return t("greetingEvening");
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  const userName = user?.first_name || user?.full_name || "Administrator";

  return (
    <div className="space-y-8 md:space-y-10 min-h-screen">
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        data={data?.report_data}
      />

      {/* Executive Command Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
        <div className="space-y-2">
          {/* Status Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[10px] font-black tracking-widest uppercase shadow-2xs"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <Activity size={12} />
              {t("systemOperational")}
            </motion.div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold tracking-wider uppercase">
              <Calendar size={11} className="text-slate-400" />
              {formattedDate}
            </div>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-3xl md:text-5xl font-black font-outfit text-slate-900 tracking-tight leading-tight">
              {getGreeting()},{" "}
              <span className="text-emerald-700 italic">{userName}</span>
            </h1>
            <p className="text-slate-500 font-medium text-sm md:text-base mt-1 max-w-2xl">
              {t("desc")}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Refresh button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => mutate()}
            title={t("liveRefresh")}
            className="rounded-2xl border-slate-200 bg-white h-12 w-12 hover:bg-slate-50 shadow-sm transition-all shrink-0 cursor-pointer"
          >
            <RefreshCw
              className={`h-4 w-4 text-slate-600 ${
                isValidating ? "animate-spin" : ""
              }`}
            />
          </Button>

          {/* Quick Actions Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="rounded-2xl border-slate-200 bg-white font-black text-xs uppercase tracking-wider h-12 px-5 hover:bg-slate-50 shadow-sm transition-all flex items-center gap-2 text-slate-700 cursor-pointer"
              >
                <Plus size={16} className="text-emerald-700" />
                {t("quickActions")}
                <ChevronDown size={14} className="text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="rounded-2xl border border-slate-100 shadow-xl p-2 min-w-[220px] bg-white text-slate-700 z-50"
            >
              <DropdownMenuItem asChild className="rounded-xl font-bold text-xs py-2.5 px-3 cursor-pointer">
                <Link href="/admin/organizations" className="flex items-center gap-2">
                  <Building2 size={15} className="text-emerald-600" />
                  {t("registerOrg")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-xl font-bold text-xs py-2.5 px-3 cursor-pointer">
                <Link href="/admin/users" className="flex items-center gap-2">
                  <Users size={15} className="text-indigo-600" />
                  {t("addNewUser")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-xl font-bold text-xs py-2.5 px-3 cursor-pointer">
                <Link href="/admin/services" className="flex items-center gap-2">
                  <Award size={15} className="text-amber-600" />
                  {t("createService")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-xl font-bold text-xs py-2.5 px-3 cursor-pointer">
                <Link href="/admin/news" className="flex items-center gap-2">
                  <Sparkles size={15} className="text-teal-600" />
                  {t("publishNews")}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Executive PDF Report Button */}
          <Button
            onClick={() => setIsReportOpen(true)}
            className="rounded-2xl font-black bg-emerald-700 hover:bg-emerald-800 text-white h-12 px-6 shadow-lg shadow-emerald-700/20 transition-all active:scale-95 flex items-center gap-2.5 uppercase tracking-wider text-xs cursor-pointer"
          >
            <BarChart3 size={16} />
            {t("generateReport")}
          </Button>
        </div>
      </div>

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        {stats.map((s, i) => (
          <StatCard key={i} icon={getIcon(s.label)} {...s} delay={i * 0.08} />
        ))}
      </div>

      {/* Inline Operations & Pipeline Intelligence Analytics */}
      <DashboardAnalytics
        growthTrend={reportData.growth_trend || []}
        statusDistribution={reportData.status_distribution || []}
        organizationTypes={reportData.organization_types || []}
        summary={data?.summary}
      />

      {/* Main Content Areas: Pipeline Table & Operational Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 md:gap-10">
        <ApplicationsTable applications={recentApplications} />
        <Sidebar deadlines={deadlines} />
      </div>
    </div>
  );
}
