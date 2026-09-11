"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldAlert, Clock, HelpCircle, Ban, X, AlertTriangle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface StatusBannerProps {
  status: string;
  certification?: {
    serial_number: string;
  };
  isPaymentPending?: boolean;
  onPayClick?: () => void;
  onWithdrawClick?: (reason?: string) => Promise<{ success: boolean; error?: string }>;
  isWithdrawing?: boolean;
}

export const StatusBanner = ({
  status,
  certification,
  isPaymentPending,
  onPayClick,
  onWithdrawClick,
  isWithdrawing = false,
}: StatusBannerProps) => {
  const t = useTranslations("Dashboard.portal.applicationDetail");
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [reason, setReason] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const canWithdraw = !["Approved", "Rejected", "Withdrawn"].includes(status);

  const handleConfirmWithdraw = async () => {
    if (!onWithdrawClick) return;
    setErrorMessage("");
    const res = await onWithdrawClick(reason);
    if (res?.success) {
      setShowWithdrawModal(false);
      setReason("");
    } else {
      setErrorMessage(res?.error || "Failed to withdraw application.");
    }
  };

  const getStatusConfig = () => {
    switch (status) {
      case "Approved":
        return {
          glow: "bg-emerald-500/20",
          iconColor: "text-emerald-400",
          iconBg: "bg-emerald-500/20 border-emerald-500/30",
          icon: CheckCircle2,
          textColor: "text-emerald-400",
        };
      case "Rejected":
        return {
          glow: "bg-rose-500/20",
          iconColor: "text-rose-400",
          iconBg: "bg-rose-500/20 border-rose-500/30",
          icon: ShieldAlert,
          textColor: "text-rose-400",
        };
      case "Withdrawn":
        return {
          glow: "bg-rose-500/10",
          iconColor: "text-rose-400",
          iconBg: "bg-rose-500/10 border-rose-500/20",
          icon: Ban,
          textColor: "text-rose-400",
        };
      case "Under Review":
        return {
          glow: "bg-amber-500/20",
          iconColor: "text-amber-400",
          iconBg: "bg-amber-500/20 border-amber-500/30",
          icon: HelpCircle,
          textColor: "text-amber-400",
        };
      default:
        return {
          glow: "bg-amber-500/20",
          iconColor: "text-amber-400",
          iconBg: "bg-amber-500/20 border-amber-500/30",
          icon: Clock,
          textColor: "text-amber-400",
        };
    }
  };

  const config = isPaymentPending
    ? {
        glow: "bg-amber-500/20",
        iconColor: "text-amber-400",
        iconBg: "bg-amber-500/20 border-amber-500/30",
        icon: ShieldAlert,
        textColor: "text-amber-400",
      }
    : getStatusConfig();

  const StatusIcon = config.icon;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgb(0,0,0,0.15)] flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800 bg-slate-900 group"
      >
        <div
          className={cn(
            "absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-all duration-700 group-hover:scale-110",
            config.glow
          )}
        />

        <div className="relative z-10 space-y-3 text-center md:text-left">
          <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em]">
            {t("currentStatus")}
          </p>
          <h2 className="text-4xl md:text-6xl font-black font-outfit tracking-tight text-white">
            {isPaymentPending ? t("completePayment") : status}
          </h2>
          {status === "Approved" && certification && (
            <p className={cn(config.textColor, "font-medium text-lg")}>
              {t("certificateId")}: {certification.serial_number}
            </p>
          )}
          {status === "Withdrawn" && (
            <p className="text-slate-400 font-medium text-sm">
              {t("withdrawnNotice")}
            </p>
          )}
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
          {isPaymentPending && (
            <button
              onClick={onPayClick}
              className="px-6 py-3.5 bg-white text-slate-900 rounded-2xl font-black tracking-tight hover:bg-slate-100 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 transition-all duration-300 text-sm"
            >
              {t("completePayment")}
            </button>
          )}

          {canWithdraw && onWithdrawClick && (
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="px-5 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider text-rose-300 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 hover:text-rose-200 transition-all duration-300"
            >
              {t("withdrawApp")}
            </button>
          )}

          <div
            className={cn(
              "w-20 h-20 md:w-24 md:h-24 rounded-[24px] flex items-center justify-center backdrop-blur-md shrink-0 border transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
              config.iconBg
            )}
          >
            <StatusIcon size={36} className={config.iconColor} />
          </div>
        </div>
      </motion.div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showWithdrawModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-white rounded-[32px] p-8 shadow-2xl border border-slate-100 overflow-hidden"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black font-outfit text-slate-900">
                      {t("withdrawConfirmTitle")}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {t("withdrawConfirmDesc")}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowWithdrawModal(false)}
                  disabled={isWithdrawing}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {t("withdrawPrompt")}
              </p>

              <div className="space-y-2 mb-6">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {t("withdrawReasonLabel")}
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder={t("withdrawReasonPlaceholder")}
                  rows={3}
                  className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-rose-400 focus:bg-white transition-all resize-none"
                />
              </div>

              {errorMessage && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-700 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowWithdrawModal(false)}
                  disabled={isWithdrawing}
                  className="px-6 py-3 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  {t("keepApp")}
                </button>
                <button
                  onClick={handleConfirmWithdraw}
                  disabled={isWithdrawing}
                  className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-600/20 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isWithdrawing && <Loader2 size={16} className="animate-spin" />}
                  {t("confirmWithdraw")}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
