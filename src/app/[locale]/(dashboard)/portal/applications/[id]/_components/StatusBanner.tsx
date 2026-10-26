"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { getStatusConfig } from "./statusConfig";
import { WithdrawModal } from "./WithdrawModal";

interface StatusBannerProps {
  status: string;
  certification?: { serial_number: string };
  isPaymentPending?: boolean;
  onPayClick?: () => void;
  onWithdrawClick?: (reason?: string) => Promise<{ success: boolean; error?: string }>;
  isWithdrawing?: boolean;
}

export const StatusBanner = ({
  status, certification, isPaymentPending, onPayClick, onWithdrawClick, isWithdrawing = false,
}: StatusBannerProps) => {
  const t = useTranslations("Dashboard.portal.applicationDetail");
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [reason, setReason] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const canWithdraw = !["Approved", "Rejected", "Withdrawn"].includes(status);
  const config = getStatusConfig(status, isPaymentPending);
  const StatusIcon = config.icon;

  const handleConfirmWithdraw = async () => {
    if (!onWithdrawClick) return;
    setErrorMessage("");
    const res = await onWithdrawClick(reason);
    if (res?.success) { setShowWithdrawModal(false); setReason(""); }
    else { setErrorMessage(res?.error || "Failed to withdraw application."); }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgb(0,0,0,0.15)] flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800 bg-slate-900 group"
      >
        <div className={cn("absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-all duration-700 group-hover:scale-110", config.glow)} />

        <div className="relative z-10 space-y-3 text-center md:text-left">
          <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em]">{t("currentStatus")}</p>
          <h2 className="text-4xl md:text-6xl font-black font-outfit tracking-tight text-white">
            {isPaymentPending ? t("completePayment") : status}
          </h2>
          {status === "Approved" && certification && (
            <p className={cn(config.textColor, "font-medium text-lg")}>
              {t("certificateId")}: {certification.serial_number}
            </p>
          )}
          {status === "Withdrawn" && <p className="text-slate-400 font-medium text-sm">{t("withdrawnNotice")}</p>}
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
          {isPaymentPending && (
            <button onClick={onPayClick} className="px-6 py-3.5 bg-white text-slate-900 rounded-2xl font-black tracking-tight hover:bg-slate-100 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 transition-all duration-300 text-sm">
              {t("completePayment")}
            </button>
          )}
          {canWithdraw && onWithdrawClick && (
            <button onClick={() => setShowWithdrawModal(true)} className="px-5 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider text-rose-300 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 hover:text-rose-200 transition-all duration-300">
              {t("withdrawApp")}
            </button>
          )}
          <div className={cn("w-20 h-20 md:w-24 md:h-24 rounded-[24px] flex items-center justify-center backdrop-blur-md shrink-0 border transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3", config.iconBg)}>
            <StatusIcon size={36} className={config.iconColor} />
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showWithdrawModal && (
          <WithdrawModal
            isOpen={showWithdrawModal} reason={reason} setReason={setReason}
            errorMessage={errorMessage} isWithdrawing={isWithdrawing}
            onClose={() => setShowWithdrawModal(false)} onConfirm={handleConfirmWithdraw}
          />
        )}
      </AnimatePresence>
    </>
  );
};
