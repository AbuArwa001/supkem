"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { FieldErrors } from "./types";
import { scrollToFirstError } from "@/app/[locale]/(dashboard)/portal/applications/new/_utils/formScrollUtils";

interface RegisterErrorBannerProps {
  error: string;
  fieldErrors: FieldErrors;
}

export function RegisterErrorBanner({ error, fieldErrors }: RegisterErrorBannerProps) {
  const activeErrors = Object.entries(fieldErrors).filter(([_, v]) => !!v);

  if (!error && activeErrors.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-5 bg-gradient-to-r from-rose-50 via-red-50 to-rose-50 text-rose-800 rounded-2xl text-sm font-semibold border border-rose-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs">
          <AlertCircle size={18} />
        </div>
        <div>
          <p className="font-bold text-rose-900 font-outfit">
            {error || `Please review ${activeErrors.length} required field${activeErrors.length === 1 ? "" : "s"}`}
          </p>
          {activeErrors.length > 0 && (
            <p className="text-xs text-rose-700/80 mt-0.5">
              {activeErrors[0][1]}
            </p>
          )}
        </div>
      </div>
      {activeErrors.length > 0 && (
        <button
          type="button"
          onClick={() => scrollToFirstError(fieldErrors)}
          className="px-3.5 py-1.5 bg-white hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 shadow-xs shrink-0 self-end sm:self-auto cursor-pointer"
        >
          Fix first issue
        </button>
      )}
    </motion.div>
  );
}
