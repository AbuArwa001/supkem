import React from "react";
import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { PaymentRecord } from "./financeTypes";

interface PaymentDetailsFieldsProps {
  payment: PaymentRecord;
}

export function PaymentDetailsFields({ payment }: PaymentDetailsFieldsProps) {
  const t = useTranslations("Dashboard.admin.finance");

  return (
    <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar text-sm">
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-slate-400">Amount Settled</span>
          <div className="text-3xl font-black font-outfit text-slate-900">
            KES {Number(payment.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-slate-400 uppercase">{t("paymentChannel")}</span>
          <p className="text-xs font-black text-slate-800 uppercase">M-Pesa Express (STK)</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Applicant Name</span>
          <p className="font-bold text-slate-900">{payment.applicant_name || t("applicant")}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Applicant Email</span>
          <p className="font-bold text-slate-900 text-xs truncate">{payment.applicant_email || "N/A"}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Organization</span>
          <p className="font-bold text-slate-900">{payment.organization_name || "Individual"}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">M-Pesa Phone</span>
          <p className="font-mono font-bold text-slate-900">{payment.phone_number}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Service Requested</span>
          <p className="font-bold text-slate-900">{payment.service_name || "N/A"}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Category</span>
          <p className="font-bold text-primary">{payment.service_category || "General"}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Created Timestamp</span>
          <p className="text-xs text-slate-700">{payment.created_at ? format(new Date(payment.created_at), "PPP p") : "N/A"}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Checkout Request ID</span>
          <p className="font-mono text-xs text-slate-700 truncate" title={payment.checkout_request_id}>{payment.checkout_request_id || "N/A"}</p>
        </div>
      </div>

      {payment.application && (
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-700">Linked Application Record</span>
            <p className="text-[11px] text-slate-400">View application documents, review history & certificate</p>
          </div>
          <Link href={`/admin/applications/${payment.application}`} className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors">
            <span>Open Application</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}
