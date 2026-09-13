"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ArrowUpRight, Sparkles } from "lucide-react";
import { scrollToFirstError } from "@/app/[locale]/(dashboard)/portal/applications/new/_utils/formScrollUtils";

interface FormErrorBannerProps {
  errors: Record<string, string | undefined | null>;
  className?: string;
  onClearErrors?: () => void;
}

export function FormErrorBanner({ errors, className = "" }: FormErrorBannerProps) {
  const activeErrors = Object.entries(errors).filter(([_, val]) => !!val);
  const errorCount = activeErrors.length;

  if (errorCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={`p-4 md:p-5 rounded-2xl bg-gradient-to-r from-rose-50 via-red-50/80 to-rose-50 border border-rose-200/80 shadow-lg shadow-rose-500/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${className}`}
      >
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-500/20">
            <AlertTriangle size={20} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-rose-900 font-outfit">
                {errorCount} {errorCount === 1 ? "field requires" : "fields require"} attention
              </h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-200/70 text-rose-800 uppercase tracking-wider">
                Incomplete
              </span>
            </div>
            <p className="text-xs text-rose-700/80 mt-0.5 font-medium line-clamp-1">
              {activeErrors[0][1]}
              {errorCount > 1 && ` and ${errorCount - 1} more.`}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => scrollToFirstError(errors)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-rose-100/50 text-rose-700 hover:text-rose-900 text-xs font-bold rounded-xl border border-rose-200 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0 font-outfit"
        >
          <span>Jump to first issue</span>
          <ArrowUpRight size={14} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
