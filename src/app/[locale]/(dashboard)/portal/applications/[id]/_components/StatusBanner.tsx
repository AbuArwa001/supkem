"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldAlert, Clock, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusBannerProps {
  status: string;
  certification?: {
    serial_number: string;
  };
  isPaymentPending?: boolean;
  onPayClick?: () => void;
}

export const StatusBanner = ({ status, certification, isPaymentPending, onPayClick }: StatusBannerProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case "Approved":
        return {
          bg: "bg-emerald-600",
          icon: CheckCircle2,
          textColor: "text-emerald-100",
        };
      case "Rejected":
        return {
          bg: "bg-red-600",
          icon: ShieldAlert,
          textColor: "text-red-100",
        };
      case "Under Review":
        return {
          bg: "bg-amber-600",
          icon: HelpCircle,
          textColor: "text-amber-100",
        };
      default:
        return {
          bg: "bg-blue-600",
          icon: Clock,
          textColor: "text-blue-100",
        };
    }
  };

  const config = isPaymentPending ? {
    bg: "bg-amber-600",
    icon: ShieldAlert,
    textColor: "text-amber-100"
  } : getStatusConfig();
  
  const StatusIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative overflow-hidden rounded-[16px] p-8 md:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8",
        config.bg
      )}
    >
      <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />

      <div className="relative z-10 space-y-2 text-center md:text-left">
        <p className="text-white/80 text-xs font-black uppercase tracking-[0.2em]">
          Current Status
        </p>
        <h2 className="text-4xl md:text-5xl font-black font-outfit tracking-tight">
          {isPaymentPending ? "Pending Payment" : status}
        </h2>
        {status === "Approved" && certification && (
          <p className={cn(config.textColor, "font-medium")}>
            Certificate ID: {certification.serial_number}
          </p>
        )}
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        {isPaymentPending && (
          <button
            onClick={onPayClick}
            className="px-6 py-3 bg-white text-amber-700 rounded-xl font-bold hover:bg-amber-50 hover:scale-105 transition-all shadow-xl"
          >
            Complete Payment
          </button>
        )}
        <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shrink-0">
          <StatusIcon size={40} />
        </div>
      </div>
    </motion.div>
  );
};
