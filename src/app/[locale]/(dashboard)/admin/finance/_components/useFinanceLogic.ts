import { useState, useMemo } from "react";
import useSWR from "swr";
import api from "@/lib/api";
import { toast } from "sonner";
import { FinanceAnalyticsData, PaymentRecord } from "./financeTypes";
import { exportFinanceCsv } from "./financeCsvHelper";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function useFinanceLogic(allLabel: string) {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>(allLabel);
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  const { data: analytics, isLoading: isAnalyticsLoading, isValidating: isAnalyticsValidating, mutate: mutateAnalytics } =
    useSWR<FinanceAnalyticsData>("/applications/payments/analytics/", fetcher);

  const { data: rawPayments, isLoading: isPaymentsLoading, isValidating: isPaymentsValidating, mutate: mutatePayments } =
    useSWR<any>("/applications/payments/", fetcher);

  const payments: PaymentRecord[] = useMemo(() => {
    if (!rawPayments) return [];
    return Array.isArray(rawPayments) ? rawPayments : rawPayments.results || [];
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
      if (res.data?.payment) setSelectedPayment(res.data.payment);
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Could not verify M-Pesa transaction status");
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const matchesStatus = selectedStatus === allLabel || p.status.toLowerCase() === selectedStatus.toLowerCase();
      const q = search.toLowerCase().trim();
      if (!q) return matchesStatus;
      return (
        matchesStatus &&
        (p.receipt_number?.toLowerCase().includes(q) ||
          p.checkout_request_id?.toLowerCase().includes(q) ||
          p.phone_number?.toLowerCase().includes(q) ||
          p.applicant_name?.toLowerCase().includes(q) ||
          p.applicant_email?.toLowerCase().includes(q) ||
          p.organization_name?.toLowerCase().includes(q) ||
          p.service_name?.toLowerCase().includes(q))
      );
    });
  }, [payments, selectedStatus, search, allLabel]);

  return {
    search, setSearch, selectedStatus, setSelectedStatus, selectedPayment, setSelectedPayment,
    isCheckingStatus, analytics, isAnalyticsLoading, isPaymentsLoading,
    isRefreshing: isAnalyticsValidating || isPaymentsValidating,
    payments, filteredPayments, handleRefreshAll, handleCheckMpesaStatus,
    handleExportCSV: () => exportFinanceCsv(filteredPayments),
  };
}
