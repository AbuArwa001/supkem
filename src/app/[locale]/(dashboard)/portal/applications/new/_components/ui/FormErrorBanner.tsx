"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ArrowUpRight, ChevronDown, ChevronUp, XCircle } from "lucide-react";
import { scrollToFirstError } from "@/app/[locale]/(dashboard)/portal/applications/new/_utils/formScrollUtils";
import { FIELD_LABEL_MAP } from "./formErrorMap";

interface FormErrorBannerProps {
  errors: Record<string, string | undefined | null>;
  className?: string;
}

export function FormErrorBanner({ errors, className = "" }: FormErrorBannerProps) {
  const [expanded, setExpanded] = useState(false);
  const activeErrors = Object.entries(errors).filter(([_, val]) => !!val) as [string, string][];
  const errorCount = activeErrors.length;

  if (errorCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-50 via-red-50/90 to-rose-50 border border-rose-200 shadow-xl shadow-rose-500/10 space-y-3 ${className}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-500/25">
              <AlertTriangle size={20} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm sm:text-base font-bold text-rose-950 font-outfit">
                  {errorCount} {errorCount === 1 ? "Required Field Needs Attention" : "Required Fields Need Attention"}
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-200/80 text-rose-900 uppercase tracking-wider">
                  Action Required
                </span>
              </div>
              <p className="text-xs text-rose-700 font-medium">Click any issue below to jump directly to and focus the field.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {errorCount > 2 && (
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                className="px-3 py-1.5 text-xs font-bold text-rose-700 hover:text-rose-950 bg-white/80 hover:bg-white rounded-xl border border-rose-200 transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>{expanded ? "Show Less" : `View All (${errorCount})`}</span>
                {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            )}
            <button
              type="button"
              onClick={() => scrollToFirstError(errors)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black rounded-xl shadow-md shadow-rose-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] font-outfit cursor-pointer"
            >
              <span>Jump to First Issue</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        <div className="pt-1 flex flex-wrap gap-2">
          {(expanded ? activeErrors : activeErrors.slice(0, 4)).map(([key, msg]) => (
            <button
              key={key}
              type="button"
              onClick={() => scrollToFirstError({ [key]: errors[key] })}
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-rose-100/70 border border-rose-200/80 text-rose-800 text-xs font-semibold shadow-xs hover:shadow-sm hover:border-rose-300 transition-all cursor-pointer text-left"
              title={msg}
            >
              <XCircle size={13} className="text-rose-500 group-hover:rotate-90 transition-transform shrink-0" />
              <span className="font-bold text-rose-950">{FIELD_LABEL_MAP[key] || key.replace(/_/g, " ")}:</span>
              <span className="text-rose-700 font-normal truncate max-w-[220px]">{msg}</span>
            </button>
          ))}
          {!expanded && activeErrors.length > 4 && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="px-2.5 py-1.5 rounded-xl bg-rose-100/70 hover:bg-rose-200 text-rose-900 text-xs font-bold transition-all cursor-pointer"
            >
              +{activeErrors.length - 4} more
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
