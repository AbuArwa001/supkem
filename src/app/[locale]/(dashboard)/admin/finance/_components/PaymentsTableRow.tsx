import React from "react";
import { Building, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import { PaymentRecord } from "./financeTypes";

interface PaymentsTableRowProps {
  payment: PaymentRecord;
  onSelect: (p: PaymentRecord) => void;
}

const statusColors: Record<string, string> = {
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Failed: "bg-rose-50 text-rose-700 border-rose-200",
};

export function PaymentsTableRow({ payment: p, onSelect }: PaymentsTableRowProps) {
  const t = useTranslations("Dashboard.admin.finance");

  return (
    <tr onClick={() => onSelect(p)} className="hover:bg-slate-50/80 transition-colors cursor-pointer group">
      <td className="py-4 px-5">
        <span className="font-black text-slate-900 font-mono text-xs block">
          {p.receipt_number || p.checkout_request_id?.slice(0, 14) || t("noReceipt")}
        </span>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t("mpesaStk")}</span>
      </td>

      <td className="py-4 px-5">
        <div className="font-bold text-slate-900">{p.applicant_name || t("applicant")}</div>
        <div className="text-[11px] text-slate-400 font-medium truncate max-w-[200px]">
          {p.organization_name ? (
            <span className="flex items-center gap-1"><Building size={11} />{p.organization_name}</span>
          ) : (
            p.applicant_email || t("individualCitizen")
          )}
        </div>
      </td>

      <td className="py-4 px-5">
        <span className="font-bold text-slate-800 line-clamp-1">{p.service_name || t("officialService")}</span>
        {p.service_category && (
          <span className="text-[10px] font-bold text-primary uppercase">{p.service_category}</span>
        )}
      </td>

      <td className="py-4 px-5">
        <span className="font-black text-slate-900 font-outfit text-sm">
          KES {Number(p.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      </td>

      <td className="py-4 px-5">
        <div className="flex items-center gap-1.5 font-mono text-xs text-slate-600">
          <Smartphone size={13} className="text-slate-400" />
          <span>{p.phone_number || "N/A"}</span>
        </div>
      </td>

      <td className="py-4 px-5">
        <Badge className={`border font-black text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full ${statusColors[p.status] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
          {p.status}
        </Badge>
      </td>

      <td className="py-4 px-5 text-slate-500 text-xs">
        {p.created_at ? format(new Date(p.created_at), "MMM dd, yyyy HH:mm") : "N/A"}
      </td>

      <td className="py-4 px-5 text-right">
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => { e.stopPropagation(); onSelect(p); }}
          className="h-8 px-3 rounded-lg text-xs font-bold text-primary hover:bg-primary/10"
        >
          Details
        </Button>
      </td>
    </tr>
  );
}
