"use client";

import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/useAuth";
import { useFinanceLogic } from "../finance/_components/useFinanceLogic";
import { FinanceOverviewHeader } from "./FinanceOverviewHeader";
import { FinanceAttentionBanner } from "./FinanceAttentionBanner";
import { FinanceKpiCards } from "../finance/_components/FinanceKpiCards";
import { ServiceRevenueBreakdown } from "../finance/_components/ServiceRevenueBreakdown";
import { SettlementHealthCard } from "../finance/_components/SettlementHealthCard";
import { RecentTransactionsCard } from "./RecentTransactionsCard";
import { PaymentDetailsDialog } from "../finance/_components/PaymentDetailsDialog";

export function FinanceOverviewDashboard() {
  const t = useTranslations("Dashboard.admin.finance");
  const { user } = useAuth();
  const userName = user?.first_name || user?.full_name || "Finance Officer";
  const logic = useFinanceLogic(t("all"));

  const totalCollected = logic.analytics?.total_collected || 0;
  const totalPending = logic.analytics?.total_pending || 0;
  const totalFailed = logic.analytics?.total_failed || 0;
  const pendingCount = logic.analytics?.pending_count || 0;
  const failedCount = logic.analytics?.failed_count || 0;
  const completedCount = logic.analytics?.completed_count || 0;
  const recentPayments = logic.payments.slice(0, 7);

  return (
    <div className="space-y-10 pb-16 min-h-screen">
      <FinanceOverviewHeader
        userName={userName}
        isRefreshing={logic.isRefreshing}
        onRefresh={logic.handleRefreshAll}
        onExportCSV={logic.handleExportCSV}
      />

      <FinanceAttentionBanner pendingCount={pendingCount} failedCount={failedCount} />

      <FinanceKpiCards
        analytics={logic.analytics}
        isLoading={logic.isAnalyticsLoading}
        totalRequestsCount={logic.payments.length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ServiceRevenueBreakdown
          servicesData={logic.analytics?.services_data}
          totalCollected={totalCollected}
          isLoading={logic.isAnalyticsLoading}
        />
        <SettlementHealthCard
          completedCount={completedCount}
          pendingCount={pendingCount}
          failedCount={failedCount}
          totalCollected={totalCollected}
          totalPending={totalPending}
          totalFailed={totalFailed}
        />
      </div>

      <RecentTransactionsCard
        recentPayments={recentPayments}
        totalPaymentsCount={logic.payments.length}
        isLoading={logic.isPaymentsLoading}
        onSelectPayment={logic.setSelectedPayment}
      />

      <PaymentDetailsDialog
        payment={logic.selectedPayment}
        onClose={() => logic.setSelectedPayment(null)}
        isCheckingStatus={logic.isCheckingStatus}
        onCheckStatus={logic.handleCheckMpesaStatus}
      />
    </div>
  );
}
