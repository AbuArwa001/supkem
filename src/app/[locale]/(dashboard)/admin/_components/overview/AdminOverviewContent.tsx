"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { canAccessModule } from "@/lib/permissions";
import { useAdminDashboard } from "../../_hooks/useAdminDashboard";
import { DashboardSkeleton } from "../DashboardSkeleton";
import { ReportModal } from "../ReportModal";
import { DashboardAnalytics } from "../DashboardAnalytics";
import { ApplicationsTable } from "../ApplicationsTable";
import { Sidebar } from "../Sidebar";
import { AdminExecutiveHeader } from "./AdminExecutiveHeader";
import { AdminKpiStatsGrid } from "./AdminKpiStatsGrid";

export function AdminOverviewContent() {
  const { user } = useAuth();
  const { data, isLoading, isValidating, mutate, isReportOpen, setIsReportOpen } = useAdminDashboard();

  const permissions = {
    canOrg: canAccessModule(user, "organizations"),
    canUsers: canAccessModule(user, "users"),
    canServices: canAccessModule(user, "services"),
    canNews: canAccessModule(user, "news"),
    canFinance: canAccessModule(user, "finance"),
    canReport: canAccessModule(user, "users") || canAccessModule(user, "organizations"),
  };

  if (isLoading) return <DashboardSkeleton />;

  const stats = data?.stats || [];
  const recentApplications = data?.recent_applications || [];
  const deadlines = data?.upcoming_deadlines || [];
  const reportData = data?.report_data || {};
  const userName = user?.first_name || user?.full_name || "Administrator";

  return (
    <div className="space-y-8 md:space-y-10 min-h-screen">
      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} data={data?.report_data} />

      <AdminExecutiveHeader
        userName={userName}
        isValidating={isValidating}
        onRefresh={() => mutate()}
        onOpenReport={() => setIsReportOpen(true)}
        permissions={permissions}
      />

      <AdminKpiStatsGrid stats={stats} />

      <DashboardAnalytics
        growthTrend={reportData.growth_trend || []}
        statusDistribution={reportData.status_distribution || []}
        organizationTypes={reportData.organization_types || []}
        summary={data?.summary}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 md:gap-10">
        <ApplicationsTable applications={recentApplications} />
        <Sidebar deadlines={deadlines} />
      </div>
    </div>
  );
}
