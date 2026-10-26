import React from "react";
import { CheckCircle2, Clock, XCircle, ShieldCheck } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { useTranslations } from "next-intl";

interface SettlementHealthCardProps {
  completedCount: number;
  pendingCount: number;
  failedCount: number;
  totalCollected: number;
  totalPending: number;
  totalFailed: number;
}

export function SettlementHealthCard({
  completedCount,
  pendingCount,
  failedCount,
  totalCollected,
  totalPending,
  totalFailed,
}: SettlementHealthCardProps) {
  const t = useTranslations("Dashboard.admin.finance");

  return (
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
        <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500 text-white"><CheckCircle2 size={18} /></div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-900">{t("completed")}</span>
              <p className="text-[11px] text-emerald-700 font-semibold">{t("transactions", { count: completedCount })}</p>
            </div>
          </div>
          <span className="text-sm font-black text-emerald-950 font-outfit">
            KES {Number(totalCollected).toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </span>
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-amber-50/60 border border-amber-100">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500 text-white"><Clock size={18} /></div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-900">{t("pendingLabel")}</span>
              <p className="text-[11px] text-amber-700 font-semibold">{t("requests", { count: pendingCount })}</p>
            </div>
          </div>
          <span className="text-sm font-black text-amber-950 font-outfit">
            KES {Number(totalPending).toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </span>
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-rose-50/60 border border-rose-100">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-500 text-white"><XCircle size={18} /></div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-rose-900">{t("failedLabel")}</span>
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
  );
}
