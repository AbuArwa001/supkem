"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Receipt,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  RefreshCw,
  FileDown,
  ChevronRight,
  ExternalLink,
  Phone,
  Building,
  User,
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Smartphone,
  ChevronLeft,
  DollarSign
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import api from "@/lib/api";
import { RoleGuard } from "@/components/RoleGuard";
import { Link } from "@/i18n/routing";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { format } from "date-fns";

// --- Types ---
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
  recent_transactions: PaymentRecord[];
}

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function FinanceDashboardPage() {
  return (
    <RoleGuard module="finance">
      <FinanceDashboardView isMainDashboard={false} />
    </RoleGuard>
  );
}

export interface FinanceDashboardViewProps {
  isMainDashboard?: boolean;
}

export function FinanceDashboardView({ isMainDashboard = false }: FinanceDashboardViewProps) {
  const { user } = useAuth();
  const userName = user?.first_name || user?.full_name || "Finance Officer";
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  // Fetch Analytics & Statistics
  const {
    data: analytics,
    isLoading: isAnalyticsLoading,
    isValidating: isAnalyticsValidating,
    mutate: mutateAnalytics,
  } = useSWR<FinanceAnalyticsData>("/applications/payments/analytics/", fetcher);

  // Fetch all payment ledger items
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

  const handleRefreshAll = () => {
    mutateAnalytics();
    mutatePayments();
    toast.success("Finance records refreshed");
  };

  const handleCheckMpesaStatus = async (paymentId: string) => {
    setIsCheckingStatus(true);
    try {
      const res = await api.post(`/applications/payments/${paymentId}/check_status/`);
      toast.info(`M-Pesa Status: ${res.data?.status || "Checked"}`);
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
    if (!filteredPayments.length) {
      toast.error("No transactions to export");
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

    const rows = filteredPayments.map((p) => [
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
    link.setAttribute("download", `SUPKEM_Finance_Ledger_${format(new Date(), "yyyyMMdd_HHmm")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Finance report exported as CSV");
  };

  // Filtering payments
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const matchesStatus =
        selectedStatus === "All" || p.status.toLowerCase() === selectedStatus.toLowerCase();
      const q = search.toLowerCase().trim();
      if (!q) return matchesStatus;

      const matchesSearch =
        p.receipt_number?.toLowerCase().includes(q) ||
        p.checkout_request_id?.toLowerCase().includes(q) ||
        p.phone_number?.toLowerCase().includes(q) ||
        p.applicant_name?.toLowerCase().includes(q) ||
        p.applicant_email?.toLowerCase().includes(q) ||
        p.organization_name?.toLowerCase().includes(q) ||
        p.service_name?.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [payments, selectedStatus, search]);

  const totalCollected = analytics?.total_collected || 0;
  const totalPending = analytics?.total_pending || 0;
  const totalRequests = analytics?.total_requests || payments.length;
  const collectionRate = analytics?.collection_rate || 0;
  const completedCount = analytics?.completed_count || 0;
  const pendingCount = analytics?.pending_count || 0;
  const failedCount = analytics?.failed_count || 0;

  const isRefreshing = isAnalyticsValidating || isPaymentsValidating;

  return (
    <div className="space-y-10 pb-16 min-h-screen">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-4">
          {!isMainDashboard && (
            <Link
              href="/admin"
              className="p-2.5 hover:bg-slate-100 rounded-2xl transition-colors text-slate-400 hover:text-primary mt-1"
            >
              <ChevronLeft size={24} />
            </Link>
          )}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-black tracking-widest text-[10px] uppercase px-2.5 py-0.5">
                {isMainDashboard ? "Finance Command Center • Primary Dashboard" : "Financial Operations & Ledger"}
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-outfit text-slate-900 tracking-tight">
              {isMainDashboard ? (
                <>
                  Welcome back, <span className="text-primary italic">{userName}</span>
                </>
              ) : (
                <>
                  Finance & <span className="text-primary italic">Revenue Analytics</span>
                </>
              )}
            </h1>
            <p className="text-slate-500 font-medium text-sm mt-1">
              {isMainDashboard
                ? "Your primary financial command center: real-time M-Pesa collections, pending settlements, and revenue analytics."
                : "Real-time payment settlements, outstanding fee requests, service earnings, and audit trail."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start md:self-end">
          <Button
            variant="outline"
            onClick={handleExportCSV}
            className="h-11 px-4 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center gap-2 shadow-sm"
          >
            <FileDown className="h-4 w-4 text-slate-500" />
            <span>Export CSV</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefreshAll}
            className="h-11 w-11 rounded-xl hover:bg-slate-100 text-slate-500 border border-slate-200"
            title="Refresh financial data"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin text-primary" : ""}`} />
          </Button>
        </div>
      </header>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Total Collected */}
        <Card className="border-none shadow-premium rounded-[2rem] bg-gradient-to-br from-emerald-500/10 via-emerald-50/50 to-white overflow-hidden relative border border-emerald-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
                Total Revenue Collected
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
                    {completedCount} Settled
                  </Badge>
                  <span className="text-xs text-slate-400 font-medium">100% verified</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Pending Collections */}
        <Card className="border-none shadow-premium rounded-[2rem] bg-gradient-to-br from-amber-500/10 via-amber-50/50 to-white overflow-hidden relative border border-amber-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-amber-800">
                Pending Collections
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
                    {pendingCount} Pending Requests
                  </Badge>
                  <span className="text-xs text-slate-400 font-medium">Awaiting payment</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Total Payment Requests */}
        <Card className="border-none shadow-premium rounded-[2rem] bg-gradient-to-br from-blue-500/10 via-blue-50/50 to-white overflow-hidden relative border border-blue-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-blue-800">
                Total Payment Requests
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
                  {totalRequests.toLocaleString()} <span className="text-sm font-semibold text-slate-400">Total</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-slate-500 font-semibold">
                    Avg KES {Number(analytics?.average_transaction_value || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                  {failedCount > 0 && (
                    <span className="text-xs text-rose-500 font-bold">• {failedCount} failed</span>
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
                Settlement Success Rate
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
                <Layers className="h-5 w-5 text-primary" />
                Revenue by Service Category
              </CardTitle>
              <CardDescription className="text-slate-400 font-medium text-xs mt-1">
                Breakdown of collections per certification and operational service.
              </CardDescription>
            </div>
            <Badge className="bg-primary/10 text-primary border-none font-bold text-xs uppercase px-3 py-1">
              Active Portfolio
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
                          <span className="text-[11px] font-bold text-primary uppercase">
                            {item.category}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">
                            • {item.count} {item.count === 1 ? "payment" : "payments"}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-slate-900 font-outfit">
                          KES {Number(item.total_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {percent.toFixed(1)}% of total
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-teal-500 transition-all duration-700"
                        style={{ width: `${Math.max(percent, 2)}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-slate-400">
                <Receipt className="h-10 w-10 mx-auto text-slate-300 mb-2" />
                <p className="font-semibold text-sm">No service collections recorded yet.</p>
              </div>
            )}
          </div>
        </Card>

        {/* Payment Status Health & Summary */}
        <Card className="border-none shadow-premium bg-white rounded-[2.5rem] p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl font-black font-outfit text-slate-900 uppercase tracking-tight flex items-center gap-2.5">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              Settlement Health
            </CardTitle>
            <CardDescription className="text-slate-400 font-medium text-xs">
              Distribution of incoming requests by operational settlement status.
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
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-900">Completed</span>
                  <p className="text-[11px] text-emerald-700 font-semibold">{completedCount} transactions</p>
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
                  <span className="text-xs font-black uppercase tracking-wider text-amber-900">Pending</span>
                  <p className="text-[11px] text-amber-700 font-semibold">{pendingCount} requests</p>
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
                  <span className="text-xs font-black uppercase tracking-wider text-rose-900">Failed</span>
                  <p className="text-[11px] text-rose-700 font-semibold">{failedCount} dropped</p>
                </div>
              </div>
              <span className="text-sm font-black text-rose-950 font-outfit">
                KES {Number(analytics?.total_failed || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Payments reconciled with Safaricom Daraja M-Pesa STK Push
            </p>
          </div>
        </Card>
      </div>

      {/* Payment Ledger & Transactions Table */}
      <Card className="border-none shadow-premium bg-white rounded-[2.5rem] overflow-hidden p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <CardTitle className="text-2xl font-black font-outfit text-slate-900 uppercase tracking-tight">
                Payments Audit Ledger
              </CardTitle>
              <Badge className="bg-slate-100 text-slate-600 border-none font-bold text-xs uppercase px-3 py-1">
                {filteredPayments.length} of {payments.length} Records
              </Badge>
            </div>
            <CardDescription className="text-slate-400 font-medium text-xs mt-1">
              Detailed transaction log of all citizen and institutional application payments.
            </CardDescription>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200/60 self-start">
            {(["All", "Completed", "Pending", "Failed"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  selectedStatus === status
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by receipt code, applicant name, phone number, service, or mosque/organization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-12 rounded-2xl border-slate-200 bg-slate-50/50 font-medium text-sm focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all shadow-none"
          />
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100">
              <tr>
                <th className="py-4 px-5">Receipt / Reference</th>
                <th className="py-4 px-5">Applicant & Entity</th>
                <th className="py-4 px-5">Service</th>
                <th className="py-4 px-5">Amount</th>
                <th className="py-4 px-5">Channel & Phone</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5">Date</th>
                <th className="py-4 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {isPaymentsLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-4 px-5"><Skeleton className="h-4 w-28 rounded" /></td>
                    <td className="py-4 px-5"><Skeleton className="h-4 w-36 rounded" /></td>
                    <td className="py-4 px-5"><Skeleton className="h-4 w-24 rounded" /></td>
                    <td className="py-4 px-5"><Skeleton className="h-4 w-20 rounded" /></td>
                    <td className="py-4 px-5"><Skeleton className="h-4 w-24 rounded" /></td>
                    <td className="py-4 px-5"><Skeleton className="h-5 w-16 rounded-full" /></td>
                    <td className="py-4 px-5"><Skeleton className="h-4 w-24 rounded" /></td>
                    <td className="py-4 px-5 text-right"><Skeleton className="h-8 w-16 rounded ml-auto" /></td>
                  </tr>
                ))
              ) : filteredPayments.length > 0 ? (
                filteredPayments.map((p) => {
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
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-900 font-mono text-xs">
                            {p.receipt_number || p.checkout_request_id?.slice(0, 14) || "NO-RECEIPT"}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          M-PESA STK
                        </span>
                      </td>

                      {/* Applicant & Org */}
                      <td className="py-4 px-5">
                        <div className="font-bold text-slate-900">
                          {p.applicant_name || "Applicant"}
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium truncate max-w-[200px]">
                          {p.organization_name ? (
                            <span className="flex items-center gap-1">
                              <Building size={11} />
                              {p.organization_name}
                            </span>
                          ) : (
                            p.applicant_email || "Individual Citizen"
                          )}
                        </div>
                      </td>

                      {/* Service */}
                      <td className="py-4 px-5">
                        <span className="font-bold text-slate-800 line-clamp-1">
                          {p.service_name || "Official Service"}
                        </span>
                        {p.service_category && (
                          <span className="text-[10px] font-bold text-primary uppercase">
                            {p.service_category}
                          </span>
                        )}
                      </td>

                      {/* Amount */}
                      <td className="py-4 px-5">
                        <span className="font-black text-slate-900 font-outfit text-sm">
                          KES {Number(p.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                      </td>

                      {/* Channel & Phone */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-1.5 font-mono text-xs text-slate-600">
                          <Smartphone size={13} className="text-slate-400" />
                          <span>{p.phone_number || "N/A"}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-5">
                        <Badge
                          className={`border font-black text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            statusColors[p.status] || "bg-slate-50 text-slate-600 border-slate-200"
                          }`}
                        >
                          {p.status}
                        </Badge>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-5 text-slate-500 text-xs">
                        {p.created_at ? format(new Date(p.created_at), "MMM dd, yyyy HH:mm") : "N/A"}
                      </td>

                      {/* Action */}
                      <td className="py-4 px-5 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPayment(p);
                          }}
                          className="h-8 px-3 rounded-lg text-xs font-bold text-primary hover:bg-primary/10"
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <Receipt className="h-8 w-8 mx-auto text-slate-300 mb-2" />
                    <p className="font-bold text-sm text-slate-600">No payment transactions match your query.</p>
                    <p className="text-xs text-slate-400 mt-1">Try clearing your search or status filter.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Transaction Detail Modal */}
      <Dialog open={Boolean(selectedPayment)} onOpenChange={(open) => !open && setSelectedPayment(null)}>
        <DialogContent className="max-w-xl p-0 overflow-hidden border-none shadow-premium rounded-[2rem] bg-white">
          {selectedPayment && (
            <div>
              {/* Modal Header */}
              <div className="p-8 pb-6 border-b border-slate-100 bg-gradient-to-r from-emerald-50/40 via-teal-50/20 to-white flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-primary/10 text-primary">
                    <Receipt size={26} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 font-outfit uppercase tracking-tight">
                      Payment Receipt & Audit
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
                    <span className="text-xs font-bold text-slate-400 uppercase">Payment Channel</span>
                    <p className="text-xs font-black text-slate-800 uppercase">M-Pesa Express (STK)</p>
                  </div>
                </div>

                {/* Information Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Applicant Name
                    </span>
                    <p className="font-bold text-slate-900">{selectedPayment.applicant_name || "Applicant"}</p>
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
                    <p className="font-bold text-primary">{selectedPayment.service_category || "General"}</p>
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
