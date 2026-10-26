import React from "react";
import { format } from "date-fns";
import { Building, ArrowRight, Receipt } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { PaymentRecord } from "../finance/_components/financeTypes";

interface RecentTransactionsCardProps {
  recentPayments: PaymentRecord[];
  totalPaymentsCount: number;
  isLoading: boolean;
  onSelectPayment: (p: PaymentRecord) => void;
}

const statusColors: Record<string, string> = {
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Failed: "bg-rose-50 text-rose-700 border-rose-200",
};

export function RecentTransactionsCard({
  recentPayments, totalPaymentsCount, isLoading, onSelectPayment,
}: RecentTransactionsCardProps) {
  const t = useTranslations("Dashboard.admin.finance");

  return (
    <Card className="border-none shadow-premium bg-white rounded-[2.5rem] overflow-hidden p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl sm:text-2xl font-black font-outfit text-slate-900 uppercase tracking-tight">{t("recentActivity")}</CardTitle>
            <Badge className="bg-emerald-50 text-emerald-800 border-emerald-200 font-bold text-xs uppercase px-3 py-1">{t("liveAuditStream")}</Badge>
          </div>
          <CardDescription className="text-slate-400 font-medium text-xs mt-1">{t("recentActivityDesc")}</CardDescription>
        </div>
        <Button asChild variant="outline" className="rounded-2xl border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 font-black text-xs uppercase tracking-wider h-11 px-4 text-emerald-800 flex items-center gap-2 self-start sm:self-auto cursor-pointer">
          <Link href="/admin/finance">
            <span>{t("viewFullLedger", { count: totalPaymentsCount })}</span>
            <ArrowRight size={14} />
          </Link>
        </Button>
      </div>

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
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={7} className="py-3.5 px-5"><Skeleton className="h-4 w-full rounded" /></td>
                </tr>
              ))
            ) : recentPayments.length > 0 ? (
              recentPayments.map((p) => (
                <tr key={p.id} onClick={() => onSelectPayment(p)} className="hover:bg-slate-50/80 transition-colors cursor-pointer group">
                  <td className="py-3.5 px-5"><span className="font-black text-slate-900 font-mono text-xs">{p.receipt_number || p.checkout_request_id?.slice(0, 14) || t("noReceipt")}</span><div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t("mpesaStk")}</div></td>
                  <td className="py-3.5 px-5"><div className="font-bold text-slate-900">{p.applicant_name || t("applicant")}</div><div className="text-[11px] text-slate-400 font-medium truncate max-w-[180px]">{p.organization_name ? <span className="flex items-center gap-1"><Building size={11} />{p.organization_name}</span> : p.applicant_email || t("individualCitizen")}</div></td>
                  <td className="py-3.5 px-5"><span className="font-bold text-slate-800 line-clamp-1">{p.service_name || t("officialService")}</span>{p.service_category && <span className="text-[10px] font-bold text-emerald-700 uppercase">{p.service_category}</span>}</td>
                  <td className="py-3.5 px-5"><span className="font-black text-slate-900 font-outfit text-sm">KES {Number(p.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></td>
                  <td className="py-3.5 px-5"><Badge className={`border font-black text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full ${statusColors[p.status] || "bg-slate-50 text-slate-600 border-slate-200"}`}>{p.status}</Badge></td>
                  <td className="py-3.5 px-5 text-slate-500 text-xs">{p.created_at ? format(new Date(p.created_at), "MMM dd, HH:mm") : "N/A"}</td>
                  <td className="py-3.5 px-5 text-right"><Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onSelectPayment(p); }} className="h-8 px-3 rounded-lg text-xs font-bold text-emerald-700 hover:bg-emerald-50">Details</Button></td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={7} className="py-8 text-center text-slate-400"><Receipt className="h-6 w-6 mx-auto mb-1 text-slate-300" /><p className="font-bold text-xs">{t("noTransactionsMatch")}</p></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
