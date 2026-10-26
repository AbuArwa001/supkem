"use client";

import { motion } from "framer-motion";
import { ArrowRight, FilePlus } from "lucide-react";
import { useLocale } from "next-intl";

interface ServiceFloatingDockProps {
  selectedService: any;
  onNext: () => void;
}

export function ServiceFloatingDock({ selectedService, onNext }: ServiceFloatingDockProps) {
  const locale = useLocale();
  const isAr = locale === "ar";

  if (!selectedService) return null;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="fixed bottom-5 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-xl z-50 bg-slate-900/95 backdrop-blur-xl text-white border border-white/15 shadow-2xl shadow-slate-950/40 rounded-2xl sm:rounded-3xl p-3 sm:p-4 px-4 sm:px-6 flex items-center justify-between gap-4"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md shadow-primary/30">
          <FilePlus size={20} />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
              {Number(selectedService.fee) > 0
                ? `KES ${Number(selectedService.fee).toLocaleString()}`
                : isAr ? "مجاني" : "NO FEE"}
            </span>
            <span className="text-slate-600 text-xs">•</span>
            <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider truncate">
              {selectedService.target_audience}
            </span>
          </div>
          <h5 className="font-bold text-sm sm:text-base font-outfit truncate text-white">
            {isAr ? (selectedService.name_ar || selectedService.name) : selectedService.name}
          </h5>
        </div>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-95 text-white font-black text-xs sm:text-sm font-outfit shrink-0 flex items-center gap-2 shadow-lg shadow-primary/30 cursor-pointer hover:scale-105 active:scale-95 transition-all"
      >
        <span>{isAr ? "المتابعة للخطوة التالية" : "Continue to Next Step"}</span>
        <ArrowRight size={16} className="rtl:rotate-180" />
      </button>
    </motion.div>
  );
}
