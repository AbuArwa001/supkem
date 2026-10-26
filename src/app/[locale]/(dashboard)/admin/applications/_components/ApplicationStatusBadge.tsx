import React from "react";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface ApplicationStatusBadgeProps {
  status: string;
}

export function ApplicationStatusBadge({ status }: ApplicationStatusBadgeProps) {
  const t = useTranslations("Dashboard.admin.applications");

  const badgeColor = status === "Approved"
    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
    : status === "Rejected"
      ? "bg-rose-50 text-rose-700 border-rose-100"
      : status === "Withdrawn"
        ? "bg-slate-100 text-slate-600 border-slate-200"
        : (status === "Pending" || status === "Submitted")
          ? "bg-amber-50 text-amber-700 border-amber-200"
          : "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] inline-flex items-center gap-1.5 border mb-2", badgeColor)}>
      {status === "Approved" ? (
        <CheckCircle2 size={10} />
      ) : (status === "Rejected" || status === "Withdrawn") ? (
        <AlertCircle size={10} />
      ) : (
        <Clock size={10} />
      )}
      {status === "Submitted"
        ? (t("filters.PENDING") || "PENDING")
        : (t(`filters.${status.toUpperCase()}`) || status)}
    </span>
  );
}
