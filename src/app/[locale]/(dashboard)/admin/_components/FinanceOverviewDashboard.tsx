"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import { motion } from "framer-motion";
import {
  CreditCard,
  Receipt,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
  FileDown,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Layers,
  ShieldCheck,
  Smartphone,
  Building,
  Calendar,
  Activity,
  Award,
  FileText,
  Sliders,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import api from "@/lib/api";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { format } from "date-fns";

interface ServiceRevenueItem {
  service_name: string;
  category: string;
  total_amount: number;
  count: number;
}

interface TrendItem {
  date?: string;
  month?: string;
  amount: number;
  count: number;
}

interface StatusItem {
  status: string;
  count: number;
  amount: number;
}

interface PaymentRecord {
  id: string;
  application: string;
  checkout_request_id?: string;
  receipt_number?: string;
  amount: string | number;
  phone_number: string;
  status: "Completed" | "Pending" | "Failed" | string;
  mpesa_response?: any;
  created_at: string;
  updated_at: string;
  applicant_name?: string;
  applicant_email?: string;
  applicant_phone?: string;
  organization_name?: string;
  service_name?: string;
  service_category?: string;
  service_fee?: string | number;
  application_status?: string;
}

interface FinanceAnalyticsData {
  total_collected: number;
  total_pending: number;
  total_failed: number;
  total_requests: number;
  completed_count: number;
  pending_count: number;
  failed_count: number;
  collection_rate: number;
  average_transaction_value: number;
  services_data: ServiceRevenueItem[];
  daily_trend: TrendItem[];
  monthly_trend: TrendItem[];
  status_distribution: StatusItem[];
  recent_transactions?: PaymentRecord[];
}

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function FinanceOverviewDashboard() {
  const t = useTranslations("Dashboard.admin.finance");
  const { user } = useAuth();
  const userName = user?.first_name || user?.full_name || "Finance Officer";
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  // Fetch Analytics & Statistics
  const {
    data: analytics,
    isLoading: isAnalyticsLoading,
    isValidating: isAnalyticsValidating,
    mutate: mutateAnalytics,
  } = useSWR<FinanceAnalyticsData>("/applications/payments/analytics/", fetcher);

  // Fetch recent payments for quick audit stream
  const {
    data: rawPayments,
    isLoading: isPaymentsLoading,
    isValidating: isPaymentsValidating,
    mutate: mutatePayments,
  } = useSWR<any>("/applications/payments/", fetcher);

  const payments: PaymentRecord[] = useMemo(() => {
    if (!rawPayments) return [];
    if (Array.isArray(rawPayments)) return rawPayments;
    return rawPayments.results || [];
  }, [rawPayments]);

  const recentPayments = useMemo(() => {
    return payments.slice(0, 7);
  }, [payments]);

  const isRefreshing = isAnalyticsValidating || isPaymentsValidating;

  const handleRefreshAll = () => {
    mutateAnalytics();
    mutatePayments();
    toast.success("Financial telemetry refreshed");
  };

  const handleCheckMpesaStatus = async (paymentId: string) => {
    setIsCheckingStatus(true);
    try {
      const res = await api.post(`/applications/payments/${paymentId}/check_status/`);
      toast.info(`M-Pesa Live Status: ${res.data?.status || "Verified"}`);
      mutateAnalytics();
      mutatePayments();
      if (res.data?.payment) {
        setSelectedPayment(res.data.payment);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Could not verify M-Pesa transaction status");
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const handleExportCSV = () => {
    if (!payments.length) {
      toast.error("No transactions available to export");
      return;
    }

    const headers = [
      "Receipt / Ref",
      "Applicant Name",
      "Applicant Email",
      "Organization",
      "Service",
      "Amount (KES)",
      "Phone",
      "Status",
      "Date",
    ];

    const rows = payments.map((p) => [
      `"${p.receipt_number || p.checkout_request_id || p.id}"`,
      `"${p.applicant_name || "N/A"}"`,
      `"${p.applicant_email || "N/A"}"`,
      `"${p.organization_name || "Individual"}"`,
      `"${p.service_name || "N/A"}"`,
      Number(p.amount || 0).toFixed(2),
      `"${p.phone_number || "N/A"}"`,
      `"${p.status}"`,
      `"${p.created_at ? format(new Date(p.created_at), "yyyy-MM-dd HH:mm") : ""}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SUPKEM_Finance_Summary_${format(new Date(), "yyyyMMdd_HHmm")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Financial summary exported as CSV");
  };

  const totalCollected = analytics?.total_collected || 0;
  const totalPending = analytics?.total_pending || 0;
  const totalFailed = analytics?.total_failed || 0;
  const totalRequests = analytics?.total_requests || payments.length;
  const collectionRate = analytics?.collection_rate || 0;
  const completedCount = analytics?.completed_count || 0;
  const pendingCount = analytics?.pending_count || 0;
  const failedCount = analytics?.failed_count || 0;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="space-y-10 pb-16 min-h-screen">
      {/* Executive Command Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
        <div className="space-y-2">
          {/* Status Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[10px] font-black tracking-widest uppercase shadow-2xs"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <Activity size={12} />
              {t("financialTelemetryLive")}
            </motion.div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold tracking-wider uppercase">
              <Calendar size={11} className="text-slate-400" />
              {formattedDate}
            </div>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-3xl md:text-5xl font-black font-outfit text-slate-900 tracking-tight leading-tight">
              {getGreeting()},{" "}
              <span className="text-emerald-700 italic">{userName}</span>
            </h1>
            <p className="text-slate-500 font-medium text-sm md:text-base mt-1 max-w-2xl">
              {t("commandCenterDesc")}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Refresh button */}
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefreshAll}
            title={t("refresh")}
            className="rounded-2xl border-slate-200 bg-white h-12 w-12 hover:bg-slate-50 shadow-sm transition-all shrink-0 cursor-pointer"
          >
            <RefreshCw
              className={`h-4 w-4 text-slate-600 ${isRefreshing ? "animate-spin text-emerald-600" : ""}`}
            />
          </Button>

          {/* Export Report */}
          <Button
            variant="outline"
            onClick={handleExportCSV}
            className="rounded-2xl border-slate-200 bg-white font-black text-xs uppercase tracking-wider h-12 px-5 hover:bg-slate-50 shadow-sm transition-all flex items-center gap-2 text-slate-700 cursor-pointer"
          >
            <FileDown size={16} className="text-emerald-700" />
            <span>{t("exportCSV")}</span>
          </Button>

          {/* Primary CTA: Open Payments & Ledger */}
          <Button
            asChild
            className="rounded-2xl font-black bg-emerald-700 hover:bg-emerald-800 text-white h-12 px-6 shadow-lg shadow-emerald-700/20 transition-all active:scale-95 flex items-center gap-2.5 uppercase tracking-wider text-xs cursor-pointer"
          >
            <Link href="/admin/finance">
              <Receipt size={16} />
              <span>{t("openLedger")}</span>
              <ArrowRight size={14} className="ml-0.5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Attention Alert Banner if Pending or Failed exist */}
      {(pendingCount > 0 || failedCount > 0) && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-950"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500 text-white shrink-0">
              <AlertCircle size={18} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-amber-900">
                {t("actionRecommended")}
              </p>
              <p className="text-xs text-amber-800 font-medium">
                {pendingCount > 0 && t("pendingPayments", { count: pendingCount })}
                {pendingCount > 0 && failedCount > 0 && " • "}
                {failedCount > 0 && t("failedTransactions", { count: failedCount })}
              </p>
            </div>
          </div>
          <Link
            href="/admin/finance"
            className="inline-flex items-center gap-1.5 text-xs font-black text-amber-900 hover:text-amber-950 underline underline-offset-2 shrink-0 self-start sm:self-auto"
          >
            <span>{t("reviewInLedger")}</span>
            <ArrowUpRight size={14} />
          </Link>
        </motion.div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Total Collected */}
        <Card className="border-none shadow-premium rounded-[2rem] bg-gradient-to-br from-emerald-500/10 via-emerald-50/50 to-white overflow-hidden relative border border-emerald-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
                {t("totalRevenue")}
              </span>
              <div className="p-2.5 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
                <CheckCircle2 size={20} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            {isAnalyticsLoading ? (
              <Skeleton className="h-10 w-36 rounded-xl" />
            ) : (
              <>
                <div className="text-2xl sm:text-3xl font-black font-outfit text-slate-900 tracking-tight">
                  KES {Number(totalCollected).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-emerald-100 text-emerald-800 border-none font-bold text-[10px] px-2 py-0.5 uppercase">
                    {t("settled", { count: completedCount })}
                  </Badge>
                  <span className="text-xs text-slate-400 font-medium">{t("reconciled")}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* {t("pendingCollections")} */}
        <Card className="border-none shadow-premium rounded-[2rem] bg-gradient-to-br from-amber-500/10 via-amber-50/50 to-white overflow-hidden relative border border-amber-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-amber-800">
                {t("pendingCollections")}
              </span>
              <div className="p-2.5 rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
                <Clock size={20} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            {isAnalyticsLoading ? (
              <Skeleton className="h-10 w-36 rounded-xl" />
            ) : (
              <>
                <div className="text-2xl sm:text-3xl font-black font-outfit text-slate-900 tracking-tight text-amber-900">
                  KES {Number(totalPending).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-amber-100 text-amber-800 border-none font-bold text-[10px] px-2 py-0.5 uppercase">
                    {t("pending", { count: pendingCount })}
                  </Badge>
                  <span className="text-xs text-slate-400 font-medium">{t("awaitingPayment")}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* {t("totalRequests")} */}
        <Card className="border-none shadow-premium rounded-[2rem] bg-gradient-to-br from-blue-500/10 via-blue-50/50 to-white overflow-hidden relative border border-blue-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-blue-800">
                {t("totalRequests")}
              </span>
              <div className="p-2.5 rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
                <Receipt size={20} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            {isAnalyticsLoading ? (
              <Skeleton className="h-10 w-36 rounded-xl" />
            ) : (
              <>
                <div className="text-2xl sm:text-3xl font-black font-outfit text-slate-900 tracking-tight">
                  {totalRequests.toLocaleString()} <span className="text-sm font-semibold text-slate-400">{t("total")}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-slate-500 font-semibold">
                    {t("avg")} KES {Number(analytics?.average_transaction_value || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                  {failedCount > 0 && (
                    <span className="text-xs text-rose-500 font-bold">• {t("failed", { count: failedCount })}</span>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Success Rate */}
        <Card className="border-none shadow-premium rounded-[2rem] bg-gradient-to-br from-teal-500/10 via-teal-50/50 to-white overflow-hidden relative border border-teal-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-teal-800">
                {t("successRate")}
              </span>
              <div className="p-2.5 rounded-2xl bg-teal-600 text-white shadow-md shadow-teal-600/20">
                <TrendingUp size={20} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            {isAnalyticsLoading ? (
              <Skeleton className="h-10 w-36 rounded-xl" />
            ) : (
              <>
                <div className="text-2xl sm:text-3xl font-black font-outfit text-teal-900 tracking-tight">
                  {collectionRate}%
                </div>
                <div className="mt-2.5 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-teal-500 h-full rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(collectionRate, 100)}%` }}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Analytics Visual Breakdown (Two Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Service Revenue Distribution */}
        <Card className="lg:col-span-2 border-none shadow-premium bg-white rounded-[2.5rem] p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-black font-outfit text-slate-900 uppercase tracking-tight flex items-center gap-2.5">
                <Layers className="h-5 w-5 text-emerald-600" />
                {t("revenueByCategory")}
              </CardTitle>
              <CardDescription className="text-slate-400 font-medium text-xs mt-1">
                {t("revenueByCategoryDesc")}
              </CardDescription>
            </div>
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-bold text-xs uppercase px-3 py-1">
              {t("activePortfolio")}
            </Badge>
          </div>

          <div className="space-y-4 pt-2">
            {isAnalyticsLoading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-5 w-48 rounded-lg" />
                  <Skeleton className="h-3 w-full rounded-full" />
                </div>
              ))
            ) : analytics?.services_data && analytics.services_data.length > 0 ? (
              analytics.services_data.map((item, idx) => {
                const percent = totalCollected > 0 ? (item.total_amount / totalCollected) * 100 : 0;
                return (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="space-y-0.5">
                        <span className="text-sm font-black text-slate-800 uppercase tracking-tight">
                          {item.service_name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-emerald-700 uppercase">
                            {item.category}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">
                            • {item.count} {item.count === 1 ? t("payment") : t("payments")}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-slate-900 font-outfit">
                          KES {Number(item.total_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {percent.toFixed(1)}{t("ofTotal")}
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 transition-all duration-700"
                        style={{ width: `${Math.max(percent, 2)}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-slate-400">
                <Receipt className="h-10 w-10 mx-auto text-slate-300 mb-2" />
                <p className="font-semibold text-sm">{t("noServiceCollections")}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Payment Status Health & Summary */}
        <Card className="border-none shadow-premium bg-white rounded-[2.5rem] p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl font-black font-outfit text-slate-900 uppercase tracking-tight flex items-center gap-2.5">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              {t("settlementHealth")}
            </CardTitle>
            <CardDescription className="text-slate-400 font-medium text-xs">
              {t("settlementHealthDesc")}
            </CardDescription>
          </div>

          <div className="space-y-4 my-auto">
            {/* Completed */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500 text-white">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-900">{t("completed")}</span>
                  <p className="text-[11px] text-emerald-700 font-semibold">{t("transactions", { count: completedCount })}</p>
                </div>
              </div>
              <span className="text-sm font-black text-emerald-950 font-outfit">
                KES {Number(totalCollected).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>

            {/* Pending */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-amber-50/60 border border-amber-100">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500 text-white">
                  <Clock size={18} />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-amber-900">{t("pending")}</span>
                  <p className="text-[11px] text-amber-700 font-semibold">{t("requests", { count: pendingCount })}</p>
                </div>
              </div>
              <span className="text-sm font-black text-amber-950 font-outfit">
                KES {Number(totalPending).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>

            {/* Failed */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-rose-50/60 border border-rose-100">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-rose-500 text-white">
                  <XCircle size={18} />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-rose-900">{t("failed")}</span>
                  <p className="text-[11px] text-rose-700 font-semibold">{t("dropped", { count: failedCount })}</p>
                </div>
              </div>
              <span className="text-sm font-black text-rose-950 font-outfit">
                KES {Number(totalFailed).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {t("reconciledWithMpesa")}
            </p>
          </div>
        </Card>
      </div>

      {/* Quick Financial Operations & Recent Transactions Preview */}
      <Card className="border-none shadow-premium bg-white rounded-[2.5rem] overflow-hidden p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <CardTitle className="text-xl sm:text-2xl font-black font-outfit text-slate-900 uppercase tracking-tight">
                {t("recentActivity")}
              </CardTitle>
              <Badge className="bg-emerald-50 text-emerald-800 border-emerald-200 font-bold text-xs uppercase px-3 py-1">
                {t("liveAuditStream")}
              </Badge>
            </div>
            <CardDescription className="text-slate-400 font-medium text-xs mt-1">
              {t("recentActivityDesc")}
            </CardDescription>
          </div>

          {/* Direct Link to Payments & Ledger */}
          <Button
            asChild
            variant="outline"
            className="rounded-2xl border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 font-black text-xs uppercase tracking-wider h-11 px-4 text-emerald-800 flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <Link href="/admin/finance">
              <span>{t("viewFullLedger", { count: payments.length })}</span>
              <ArrowRight size={14} />
            </Link>
          </Button>
        </div>

        {/* Compact Table of Recent Records */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-5">{t("receiptRef")}</th>
                <th className="py-3.5 px-5">{t("applicantEntity")}</th>
                <th className="py-3.5 px-5">{t("service")}</th>
                <th className="py-3.5 px-5">{t("amount")}</th>
                <th className="py-3.5 px-5">{t("status")}</th>
                <th className="py-3.5 px-5">{t("date")}</th>
                <th className="py-3.5 px-5 text-right">{t("action")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {isPaymentsLoading ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-3.5 px-5"><Skeleton className="h-4 w-28 rounded" /></td>
                    <td className="py-3.5 px-5"><Skeleton className="h-4 w-36 rounded" /></td>
                    <td className="py-3.5 px-5"><Skeleton className="h-4 w-24 rounded" /></td>
                    <td className="py-3.5 px-5"><Skeleton className="h-4 w-20 rounded" /></td>
                    <td className="py-3.5 px-5"><Skeleton className="h-5 w-16 rounded-full" /></td>
                    <td className="py-3.5 px-5"><Skeleton className="h-4 w-24 rounded" /></td>
                    <td className="py-3.5 px-5 text-right"><Skeleton className="h-7 w-14 rounded ml-auto" /></td>
                  </tr>
                ))
              ) : recentPayments.length > 0 ? (
                recentPayments.map((p) => {
                  const statusColors: Record<string, string> = {
                    Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
                    Pending: "bg-amber-50 text-amber-700 border-amber-200",
                    Failed: "bg-rose-50 text-rose-700 border-rose-200",
                  };

                  return (
                    <tr
                      key={p.id}
                      onClick={() => setSelectedPayment(p)}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                    >
                      {/* Receipt */}
                      <td className="py-3.5 px-5">
                        <span className="font-black text-slate-900 font-mono text-xs">
                          {p.receipt_number || p.checkout_request_id?.slice(0, 14) || t("noReceipt")}
                        </span>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          {t("mpesaStk")}
                        </div>
                      </td>

                      {/* Applicant & Org */}
                      <td className="py-3.5 px-5">
                        <div className="font-bold text-slate-900">
                          {p.applicant_name || t("applicant")}
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium truncate max-w-[180px]">
                          {p.organization_name ? (
                            <span className="flex items-center gap-1">
                              <Building size={11} />
                              {p.organization_name}
                            </span>
                          ) : (
                            p.applicant_email || t("individualCitizen")
                          )}
                        </div>
                      </td>

                      {/* Service */}
                      <td className="py-3.5 px-5">
                        <span className="font-bold text-slate-800 line-clamp-1">
                          {p.service_name || t("officialService")}
                        </span>
                        {p.service_category && (
                          <span className="text-[10px] font-bold text-emerald-700 uppercase">
                            {p.service_category}
                          </span>
                        )}
                      </td>

                      {/* Amount */}
                      <td className="py-3.5 px-5">
                        <span className="font-black text-slate-900 font-outfit text-sm">
                          KES {Number(p.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-5">
                        <Badge
                          className={`border font-black text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            statusColors[p.status] || "bg-slate-50 text-slate-600 border-slate-200"
                          }`}
                        >
                          {p.status}
                        </Badge>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-5 text-slate-500 text-xs">
                        {p.created_at ? format(new Date(p.created_at), "MMM dd, HH:mm") : "N/A"}
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-5 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPayment(p);
                          }}
                          className="h-8 px-3 rounded-lg text-xs font-bold text-emerald-700 hover:bg-emerald-50"
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <Receipt className="h-8 w-8 mx-auto text-slate-300 mb-2" />
                    <p className="font-bold text-sm text-slate-600">{t("noTransactions")}</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Navigation Strip */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100">
          <div className="flex items-center gap-6 text-xs text-slate-500 font-medium">
            <Link
              href="/admin/services"
              className="inline-flex items-center gap-1.5 hover:text-emerald-700 transition-colors"
            >
              <Award size={14} className="text-amber-600" />
              <span>{t("configureServices")}</span>
            </Link>
            <Link
              href="/admin/applications"
              className="inline-flex items-center gap-1.5 hover:text-emerald-700 transition-colors"
            >
              <FileText size={14} className="text-blue-600" />
              <span>{t("applicationsRegistry")}</span>
            </Link>
          </div>

          <Link
            href="/admin/finance"
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-700 hover:text-emerald-800"
          >
            <span>{t("openComprehensiveLedger")}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </Card>

      {/* Quick Transaction Detail Modal */}
      <Dialog open={Boolean(selectedPayment)} onOpenChange={(open) => !open && setSelectedPayment(null)}>
        <DialogContent className="max-w-xl p-0 overflow-hidden border-none shadow-premium rounded-[2rem] bg-white">
          {selectedPayment && (
            <div>
              {/* Modal Header */}
              <div className="p-8 pb-6 border-b border-slate-100 bg-gradient-to-r from-emerald-50/40 via-teal-50/20 to-white flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                    <Receipt size={26} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 font-outfit uppercase tracking-tight">
                      {t("paymentReceiptAudit")}
                    </h2>
                    <p className="text-slate-400 font-mono text-xs mt-0.5">
                      {selectedPayment.receipt_number || selectedPayment.checkout_request_id || selectedPayment.id}
                    </p>
                  </div>
                </div>
                <Badge
                  className={`border font-black text-[10px] uppercase px-3 py-1 rounded-full ${
                    selectedPayment.status === "Completed"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : selectedPayment.status === "Pending"
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-rose-50 text-rose-700 border-rose-200"
                  }`}
                >
                  {selectedPayment.status}
                </Badge>
              </div>

              {/* Modal Body */}
              <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar text-sm">
                {/* Amount Highlight */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Amount Settled
                    </span>
                    <div className="text-3xl font-black font-outfit text-slate-900">
                      KES {Number(selectedPayment.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-400 uppercase">{t("paymentChannel")}</span>
                    <p className="text-xs font-black text-slate-800 uppercase">M-Pesa Express (STK)</p>
                  </div>
                </div>

                {/* Information Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Applicant Name
                    </span>
                    <p className="font-bold text-slate-900">{selectedPayment.applicant_name || t("applicant")}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Applicant Email
                    </span>
                    <p className="font-bold text-slate-900 text-xs truncate">{selectedPayment.applicant_email || "N/A"}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Organization
                    </span>
                    <p className="font-bold text-slate-900">{selectedPayment.organization_name || "Individual"}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      M-Pesa Phone
                    </span>
                    <p className="font-mono font-bold text-slate-900">{selectedPayment.phone_number}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Service Requested
                    </span>
                    <p className="font-bold text-slate-900">{selectedPayment.service_name || "N/A"}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Category
                    </span>
                    <p className="font-bold text-emerald-700">{selectedPayment.service_category || "General"}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Created Timestamp
                    </span>
                    <p className="text-xs text-slate-700">
                      {selectedPayment.created_at ? format(new Date(selectedPayment.created_at), "PPP p") : "N/A"}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Checkout Request ID
                    </span>
                    <p className="font-mono text-xs text-slate-700 truncate" title={selectedPayment.checkout_request_id}>
                      {selectedPayment.checkout_request_id || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Application Link */}
                {selectedPayment.application && (
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-700">Linked Application Record</span>
                      <p className="text-[11px] text-slate-400">View application documents, review history & certificate</p>
                    </div>
                    <Link
                      href={`/admin/applications/${selectedPayment.application}`}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <span>Open Application</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => handleCheckMpesaStatus(selectedPayment.id)}
                  disabled={isCheckingStatus}
                  className="h-11 px-4 rounded-xl border-slate-200 font-bold text-xs flex items-center gap-2"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isCheckingStatus ? "animate-spin" : ""}`} />
                  <span>Check M-Pesa Live Status</span>
                </Button>

                <Button
                  onClick={() => setSelectedPayment(null)}
                  className="h-11 px-6 rounded-xl bg-slate-900 text-white font-black text-xs uppercase tracking-wider"
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
