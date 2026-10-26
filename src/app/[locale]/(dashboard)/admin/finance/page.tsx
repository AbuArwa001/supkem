"use client";

import { RoleGuard } from "@/components/RoleGuard";
import { FinanceDashboardView } from "./_components/FinanceDashboardView";
export { FinanceDashboardView } from "./_components/FinanceDashboardView";
export type { FinanceDashboardViewProps } from "./_components/financeTypes";

export default function FinanceDashboardPage() {
  return (
    <RoleGuard module="finance">
      <FinanceDashboardView isMainDashboard={false} />
    </RoleGuard>
  );
}
