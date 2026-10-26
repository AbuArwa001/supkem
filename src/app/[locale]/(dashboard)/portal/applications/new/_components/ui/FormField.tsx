"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import React from "react";

export * from "./formStyles";

interface FormFieldProps {
  label: string;
  name?: string;
  error?: string;
  colSpan?: boolean;
  readOnly?: boolean;
  required?: boolean;
  hint?: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * A shared input wrapper atom. Renders label, input slot, animated error, and optional hint.
 * Attaches data-error-field and data-has-error for automatic scrolling and highlighting.
 */
export function FormField({
  label,
  name,
  error,
  colSpan,
  required,
  hint,
  children,
  className,
}: FormFieldProps) {
  return (
    <div
      data-error-field={name}
      data-has-error={!!error}
      id={name ? `field-${name}` : undefined}
      className={cn("space-y-2 transition-all duration-200", colSpan && "md:col-span-2", className)}
    >
      <div className="flex items-center justify-between ml-1">
        <label
          htmlFor={name}
          className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5 cursor-pointer select-none"
        >
          <span>{label}</span>
          {required && (
            <span className="text-rose-500 font-bold text-sm leading-none" title="Required field">*</span>
          )}
        </label>
        {!required && (
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100/80 px-2 py-0.5 rounded-md">
            Optional
          </span>
        )}
      </div>

      <div className="relative group">{children}</div>

      <AnimatePresence mode="wait">
        {error ? (
          <motion.div
            key="field-error"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 text-xs text-rose-600 font-semibold ml-1 pt-1"
          >
            <AlertCircle size={14} className="shrink-0 text-rose-500" />
            <span>{error}</span>
          </motion.div>
        ) : hint ? (
          <p className="text-[11px] font-medium text-slate-400 ml-1 tracking-wide">{hint}</p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
