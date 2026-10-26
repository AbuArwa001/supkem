import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface FinanceAttentionBannerProps {
  pendingCount: number;
  failedCount: number;
}

export function FinanceAttentionBanner({ pendingCount, failedCount }: FinanceAttentionBannerProps) {
  const t = useTranslations("Dashboard.admin.finance");

  if (pendingCount <= 0 && failedCount <= 0) return null;

  return (
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
  );
}
