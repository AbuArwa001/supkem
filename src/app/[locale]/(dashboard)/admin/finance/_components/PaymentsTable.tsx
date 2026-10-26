import React from "react";
import { Search, Receipt } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import { PaymentRecord } from "./financeTypes";
import { PaymentsTableRow } from "./PaymentsTableRow";

interface PaymentsTableProps {
  payments: PaymentRecord[];
  filteredPayments: PaymentRecord[];
  isLoading: boolean;
  search: string;
  onSearchChange: (v: string) => void;
  selectedStatus: string;
  onStatusChange: (s: string) => void;
  onSelectPayment: (p: PaymentRecord) => void;
}

export function PaymentsTable({
  payments, filteredPayments, isLoading, search, onSearchChange,
  selectedStatus, onStatusChange, onSelectPayment,
}: PaymentsTableProps) {
  const t = useTranslations("Dashboard.admin.finance");

  return (
    <Card className="border-none shadow-premium bg-white rounded-[2.5rem] overflow-hidden p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <CardTitle className="text-2xl font-black font-outfit text-slate-900 uppercase tracking-tight">{t("auditLedger")}</CardTitle>
            <Badge className="bg-slate-100 text-slate-600 border-none font-bold text-xs uppercase px-3 py-1">
              {t("recordsCount", { filtered: filteredPayments.length, total: payments.length })}
            </Badge>
          </div>
          <CardDescription className="text-slate-400 font-medium text-xs mt-1">{t("auditLedgerDesc")}</CardDescription>
        </div>

        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200/60 self-start">
          {([t("all"), "Completed", "Pending", "Failed"] as const).map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(status)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                selectedStatus === status ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {status === "Completed" ? t("completed") : status === "Pending" ? t("pendingLabel") : status === "Failed" ? t("failedLabel") : status}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input placeholder={t("searchPlaceholder")} value={search} onChange={(e) => onSearchChange(e.target.value)} className="pl-11 h-12 rounded-2xl border-slate-200 bg-slate-50/50 font-medium text-sm focus:bg-white transition-all shadow-none" />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-100">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100">
            <tr>
              <th className="py-4 px-5">{t("receiptRef")}</th>
              <th className="py-4 px-5">{t("applicantEntity")}</th>
              <th className="py-4 px-5">{t("service")}</th>
              <th className="py-4 px-5">{t("amount")}</th>
              <th className="py-4 px-5">{t("channelPhone")}</th>
              <th className="py-4 px-5">{t("status")}</th>
              <th className="py-4 px-5">{t("date")}</th>
              <th className="py-4 px-5 text-right">{t("action")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={8} className="py-4 px-5"><Skeleton className="h-5 w-full rounded" /></td>
                </tr>
              ))
            ) : filteredPayments.length > 0 ? (
              filteredPayments.map((p) => (
                <PaymentsTableRow key={p.id} payment={p} onSelect={onSelectPayment} />
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-400">
                  <Receipt className="h-8 w-8 mx-auto text-slate-300 mb-2" />
                  <p className="font-bold text-sm text-slate-600">{t("noTransactionsMatch")}</p>
                  <p className="text-xs text-slate-400 mt-1">{t("tryClearingSearch")}</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
