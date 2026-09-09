"use client";

import { useState } from "react";
import useSWR from "swr";
import { dashboardService } from "../_services/dashboardService";

export interface DashboardData {
  stats: any[];
  summary?: any;
  recent_applications: any[];
  report_data: any;
  upcoming_deadlines: any[];
}

/**
 * Hook to manage admin dashboard state and data fetching using SWR.
 */
export const useAdminDashboard = () => {
  const [isReportOpen, setIsReportOpen] = useState(false);

  const { data, isLoading, isValidating, mutate } = useSWR<DashboardData>(
    "/dashboard/stats/",
    () => dashboardService.getStats(),
    { revalidateOnFocus: false }
  );

  return {
    data: data || null,
    isLoading,
    isValidating,
    mutate,
    isReportOpen,
    setIsReportOpen,
  };
};
