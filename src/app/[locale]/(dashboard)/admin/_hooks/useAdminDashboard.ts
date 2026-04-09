"use client";

import { useState, useEffect } from "react";
import { dashboardService } from "../_services/dashboardService";

export interface DashboardData {
  stats: any[];
  recent_applications: any[];
  report_data: any;
  upcoming_deadlines: any[];
}

/**
 * Hook to manage admin dashboard state and data fetching.
 * Separates complex logic from the UI.
 */
export const useAdminDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReportOpen, setIsReportOpen] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const dashboardData = await dashboardService.getStats();
        setData(dashboardData);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return {
    data,
    isLoading,
    isReportOpen,
    setIsReportOpen
  };
};
