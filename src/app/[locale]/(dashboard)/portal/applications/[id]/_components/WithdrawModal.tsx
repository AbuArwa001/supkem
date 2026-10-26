"use client";

import { motion } from "framer-motion";
import { AlertTriangle, X, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface WithdrawModalProps {
  isOpen: boolean;
  reason: string;
  setReason: (val: string) => void;
  errorMessage: string;
  isWithdrawing: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function WithdrawModal({
  isOpen,
  reason,
  setReason,
  errorMessage,
  isWithdrawing,
  onClose,
  onConfirm,
}: WithdrawModalProps) {
  const t = useTranslations("Dashboard.portal.applicationDetail");
  if (!isOpen) return null;

  return (
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
              <h3 className="text-xl font-black font-outfit text-slate-900">{t("withdrawConfirmTitle")}</h3>
              <p className="text-xs text-slate-400 font-medium">{t("withdrawConfirmDesc")}</p>
            </div>
          </div>
          <button onClick={onClose} disabled={isWithdrawing} className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-50 transition-colors">
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-6">{t("withdrawPrompt")}</p>

        <div className="space-y-2 mb-6">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">{t("withdrawReasonLabel")}</label>
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
          <button onClick={onClose} disabled={isWithdrawing} className="px-6 py-3 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-100 transition-colors">
            {t("keepApp")}
          </button>
          <button
            onClick={onConfirm}
            disabled={isWithdrawing}
            className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-600/20 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isWithdrawing && <Loader2 size={16} className="animate-spin" />}
            {t("confirmWithdraw")}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
