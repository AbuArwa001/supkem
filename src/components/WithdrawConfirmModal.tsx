"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { WithdrawModalHeader } from "./withdrawModal/WithdrawModalHeader";
import { WithdrawModalWarning } from "./withdrawModal/WithdrawModalWarning";
import { WithdrawModalActions } from "./withdrawModal/WithdrawModalActions";

interface WithdrawConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => Promise<void>;
  count: number;
  isLoading: boolean;
}

export function WithdrawConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  count,
  isLoading,
}: WithdrawConfirmModalProps) {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onConfirm(reason);
    setReason("");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-100 shadow-2xl space-y-6 relative"
        >
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>

          <WithdrawModalHeader count={count} />
          <WithdrawModalWarning />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Reason for Withdrawal (Optional)
              </label>
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="E.g., duplicate submission, changed travel dates, no longer required..."
                className="w-full p-3.5 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-500/10 placeholder:text-slate-400 transition-all resize-none"
              />
            </div>

            <WithdrawModalActions isLoading={isLoading} onClose={onClose} />
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
