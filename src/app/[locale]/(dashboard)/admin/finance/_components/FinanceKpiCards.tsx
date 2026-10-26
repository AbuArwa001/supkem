import React from "react";
import { CheckCircle2, Clock, Receipt, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { FinanceAnalyticsData } from "./financeTypes";
import { FinanceStatCard } from "./FinanceStatCard";

interface FinanceKpiCardsProps {
  analytics?: FinanceAnalyticsData;
  isLoading: boolean;
  totalRequestsCount: number;
}

export function FinanceKpiCards({ analytics, isLoading, totalRequestsCount }: FinanceKpiCardsProps) {
  const t = useTranslations("Dashboard.admin.finance");
  const totalCollected = analytics?.total_collected || 0;
  const totalPending = analytics?.total_pending || 0;
  const totalRequests = analytics?.total_requests || totalRequestsCount;
  const collectionRate = analytics?.collection_rate || 0;
  const completedCount = analytics?.completed_count || 0;
  const pendingCount = analytics?.pending_count || 0;
  const failedCount = analytics?.failed_count || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      <FinanceStatCard
        title={t("totalRevenue")}
        icon={<CheckCircle2 size={20} />}
        iconBg="bg-emerald-600 shadow-emerald-600/20"
        gradientClass="from-emerald-500/10 via-emerald-50/50 to-white"
        borderClass="border-emerald-500/20"
        titleColor="text-emerald-800"
        isLoading={isLoading}
        value={`KES ${Number(totalCollected).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        footer={
          <div className="flex items-center gap-2 mt-2">
            <Badge className="bg-emerald-100 text-emerald-800 border-none font-bold text-[10px] px-2 py-0.5 uppercase">{t("settled", { count: completedCount })}</Badge>
            <span className="text-xs text-slate-400 font-medium">{t("verified100")}</span>
          </div>
        }
      />

      <FinanceStatCard
        title={t("pendingCollections")}
        icon={<Clock size={20} />}
        iconBg="bg-amber-500 shadow-amber-500/20"
        gradientClass="from-amber-500/10 via-amber-50/50 to-white"
        borderClass="border-amber-500/20"
        titleColor="text-amber-800"
        isLoading={isLoading}
        value={<span className="text-amber-900">KES {Number(totalPending).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>}
        footer={
          <div className="flex items-center gap-2 mt-2">
            <Badge className="bg-amber-100 text-amber-800 border-none font-bold text-[10px] px-2 py-0.5 uppercase">{t("pendingRequests", { count: pendingCount })}</Badge>
            <span className="text-xs text-slate-400 font-medium">{t("awaitingPayment")}</span>
          </div>
        }
      />

      <FinanceStatCard
        title={t("totalRequests")}
        icon={<Receipt size={20} />}
        iconBg="bg-blue-600 shadow-blue-600/20"
        gradientClass="from-blue-500/10 via-blue-50/50 to-white"
        borderClass="border-blue-500/20"
        titleColor="text-blue-800"
        isLoading={isLoading}
        value={<>{totalRequests.toLocaleString()} <span className="text-sm font-semibold text-slate-400">{t("total")}</span></>}
        footer={
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-slate-500 font-semibold">{t("avg")} KES {Number(analytics?.average_transaction_value || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            {failedCount > 0 && <span className="text-xs text-rose-500 font-bold">• {t("failed", { count: failedCount })}</span>}
          </div>
        }
      />

      <FinanceStatCard
        title={t("successRate")}
        icon={<TrendingUp size={20} />}
        iconBg="bg-teal-600 shadow-teal-600/20"
        gradientClass="from-teal-500/10 via-teal-50/50 to-white"
        borderClass="border-teal-500/20"
        titleColor="text-teal-800"
        isLoading={isLoading}
        value={<span className="text-teal-900">{collectionRate}%</span>}
        footer={
          <div className="mt-2.5 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-teal-500 h-full rounded-full transition-all duration-700" style={{ width: `${Math.min(collectionRate, 100)}%` }} />
          </div>
        }
      />
    </div>
  );
}
