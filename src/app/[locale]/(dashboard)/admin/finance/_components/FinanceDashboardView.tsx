"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { FinanceDashboardViewProps } from "./financeTypes";
import { useFinanceLogic } from "./useFinanceLogic";
import { FinanceHeader } from "./FinanceHeader";
import { FinanceKpiCards } from "./FinanceKpiCards";
import { ServiceRevenueBreakdown } from "./ServiceRevenueBreakdown";
import { SettlementHealthCard } from "./SettlementHealthCard";
import { PaymentsTable } from "./PaymentsTable";
import { PaymentDetailsDialog } from "./PaymentDetailsDialog";

export function FinanceDashboardView({ isMainDashboard = false }: FinanceDashboardViewProps) {
  const t = useTranslations("Dashboard.admin.finance");
  const logic = useFinanceLogic(t("all"));

  const totalCollected = logic.analytics?.total_collected || 0;
  const totalPending = logic.analytics?.total_pending || 0;
  const completedCount = logic.analytics?.completed_count || 0;
  const pendingCount = logic.analytics?.pending_count || 0;
  const failedCount = logic.analytics?.failed_count || 0;

  return (
    <div className="space-y-10 pb-16 min-h-screen">
      <FinanceHeader
        isRefreshing={logic.isRefreshing}
        onRefresh={logic.handleRefreshAll}
        onExportCSV={logic.handleExportCSV}
      />

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
          totalFailed={logic.analytics?.total_failed || 0}
        />
      </div>

      <PaymentsTable
        payments={logic.payments}
        filteredPayments={logic.filteredPayments}
        isLoading={logic.isPaymentsLoading}
        search={logic.search}
        onSearchChange={logic.setSearch}
        selectedStatus={logic.selectedStatus}
        onStatusChange={logic.setSelectedStatus}
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
