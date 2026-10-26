"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";

interface WithdrawAlertBannerProps {
  message: { type: "success" | "error"; text: string } | null;
}

export function WithdrawAlertBanner({ message }: WithdrawAlertBannerProps) {
  if (!message) return null;

  return (
    <div
      className={`p-4 rounded-2xl border flex items-center gap-3 text-sm font-medium ${
        message.type === "success"
          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
          : "bg-rose-50 text-rose-800 border-rose-200"
      }`}
    >
      {message.type === "success" ? (
        <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
      ) : (
        <AlertCircle size={18} className="text-rose-600 shrink-0" />
      )}
      <span>{message.text}</span>
    </div>
  );
}
