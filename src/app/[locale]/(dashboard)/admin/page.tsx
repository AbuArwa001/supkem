"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { useAuth } from "@/hooks/useAuth";
import { canAccessModule, getUserRoleName, getHomePath } from "@/lib/permissions";
import { DashboardSkeleton } from "./_components/DashboardSkeleton";
import { FinanceOverviewDashboard } from "./_components/FinanceOverviewDashboard";
import { ITDashboardView } from "./_components/ITDashboardView";
import { AdminOverviewContent } from "./_components/overview/AdminOverviewContent";

export default function AdminOverview() {
  const { user } = useAuth();
  const router = useRouter();
  const roleName = getUserRoleName(user);
  const canOverview = canAccessModule(user, "overview");

  useEffect(() => {
    if (user && !canOverview) router.replace(getHomePath(user));
  }, [user, canOverview, router]);

  if (!canOverview) {
    return <DashboardSkeleton />;
  }

  if (roleName === "Finance Officer") {
    return <FinanceOverviewDashboard />;
  }

  if (roleName === "IT Officer") {
    return <ITDashboardView />;
  }

  return <AdminOverviewContent />;
}
