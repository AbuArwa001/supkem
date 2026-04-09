"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Users,
  FileText,
  Award,
  Activity,
  BarChart3,
} from "lucide-react";
import { useAdminDashboard } from "./_hooks/useAdminDashboard";
import { StatCard } from "./_components/StatCard";
import { ReportModal } from "./_components/ReportModal";
import { DashboardSkeleton } from "./_components/DashboardSkeleton";
import { ApplicationsTable } from "./_components/ApplicationsTable";
import { Sidebar } from "./_components/Sidebar";
import { useTranslations } from "next-intl";

/**
 * Admin Dashboard - Main Overview Page.
 * Adheres to 200-line readability constraint.
 */
export default function AdminOverview() {
  const t = useTranslations("Dashboard.admin.overview");
  const tc = useTranslations("Dashboard.common");
  const { data, isLoading, isReportOpen, setIsReportOpen } =
    useAdminDashboard();

  if (isLoading) return <DashboardSkeleton />;

  const stats = data?.stats || [];
  const recentApplications = data?.recent_applications || [];
  const deadlines = data?.upcoming_deadlines || [];

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

  return (
    <div className="space-y-8 md:space-y-12 -m-6 p-6 sm:-m-10 sm:p-10 bg-slate-100/40 min-h-screen">
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        data={data?.report_data}
      />

      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-black tracking-widest uppercase"
          >
            <Activity size={10} /> {tc("liveDashboard")}
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-black font-outfit text-slate-900 tracking-tight leading-none">
            {t("heading")}
          </h1>
          <p className="text-slate-500 font-medium text-sm md:text-lg max-w-xl leading-relaxed">
            {t("desc")}
          </p>
        </div>
        <button
          onClick={() => setIsReportOpen(true)}
          className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white rounded-[20px] font-bold hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/20 transition-all flex items-center justify-center gap-3"
        >
          <BarChart3 size={20} /> {tc("generateReport")}
        </button>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        {stats.map((s, i) => (
          <StatCard key={i} icon={getIcon(s.label)} {...s} delay={i * 0.1} />
        ))}
      </div>

      {/* Main Content Areas */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 md:gap-12">
        <ApplicationsTable applications={recentApplications} />
        <Sidebar deadlines={deadlines} />
      </div>
    </div>
  );
}
