"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useITDashboardLogic } from "./it/useITDashboardLogic";
import { ITExecutiveHeader } from "./it/ITExecutiveHeader";
import { ITKpiGrid } from "./it/ITKpiGrid";
import { ITQuickActionsGrid } from "./it/ITQuickActionsGrid";
import { ITIntegrationsStatusCard } from "./it/ITIntegrationsStatusCard";
import { ITRecentAuditStream } from "./it/ITRecentAuditStream";

export function ITDashboardView() {
  const { user } = useAuth();
  const userName = user?.first_name || user?.full_name || "IT Officer";
  const logic = useITDashboardLogic();

  return (
    <div className="space-y-10 pb-16 min-h-screen">
      <ITExecutiveHeader
        userName={userName}
        isRefreshing={logic.isRefreshing}
        onRefresh={logic.handleRefresh}
      />

      <ITKpiGrid
        stats={logic.stats}
        isLoading={logic.isStatsLoading}
        totalUsers={logic.totalUsers}
        activeUsers={logic.activeUsers}
        activeRatio={logic.activeRatio}
        dbEngine={logic.dbEngine}
      />

      <ITQuickActionsGrid
        totalUsers={logic.totalUsers}
        totalParams={logic.totalParams}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <ITIntegrationsStatusCard />
        <ITRecentAuditStream
          logs={logic.logs}
          isLoading={logic.isLogsLoading}
        />
      </div>
    </div>
  );
}
