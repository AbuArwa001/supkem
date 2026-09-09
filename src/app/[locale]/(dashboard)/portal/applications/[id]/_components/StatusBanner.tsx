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
          glow: "bg-blue-500/20",
          iconColor: "text-blue-400",
          iconBg: "bg-blue-500/20 border-blue-500/30",
          icon: Clock,
          textColor: "text-blue-400",
        };
    }
  };

  const config = isPaymentPending ? {
    glow: "bg-amber-500/20",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/20 border-amber-500/30",
    icon: ShieldAlert,
    textColor: "text-amber-400"
  } : getStatusConfig();
  
  const StatusIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgb(0,0,0,0.15)] flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800 bg-slate-900 group"
    >
      <div className={cn("absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-all duration-700 group-hover:scale-110", config.glow)} />

      <div className="relative z-10 space-y-3 text-center md:text-left">
        <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em]">
          Current Status
        </p>
        <h2 className="text-4xl md:text-6xl font-black font-outfit tracking-tight text-white">
          {isPaymentPending ? "Pending Payment" : status}
        </h2>
        {status === "Approved" && certification && (
          <p className={cn(config.textColor, "font-medium text-lg")}>
            Certificate ID: {certification.serial_number}
          </p>
        )}
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        {isPaymentPending && (
          <button
            onClick={onPayClick}
            className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black tracking-tight hover:bg-slate-100 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-all duration-500"
          >
            Complete Payment
          </button>
        )}
        <div className={cn("w-24 h-24 rounded-[24px] flex items-center justify-center backdrop-blur-md shrink-0 border transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3", config.iconBg)}>
          <StatusIcon size={40} className={config.iconColor} />
        </div>
      </div>
    </motion.div>
  );
};
