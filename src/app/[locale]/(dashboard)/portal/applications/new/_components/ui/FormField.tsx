"use client";

// React/Next.js core
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import React from "react";

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
  readOnly,
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
      className={cn(
        "space-y-2 transition-all duration-200",
        colSpan && "md:col-span-2",
        className
      )}
    >
      <div className="flex items-center justify-between ml-1">
        <label
          htmlFor={name}
          className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5 cursor-pointer select-none"
        >
          <span>{label}</span>
          {required && (
            <span className="text-rose-500 font-bold text-sm leading-none" title="Required field">
              *
            </span>
          )}
        </label>
        {!required && (
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100/80 px-2 py-0.5 rounded-md">
            Optional
          </span>
        )}
      </div>

      <div className="relative group">
        {children}
      </div>

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
          <p className="text-[11px] font-medium text-slate-400 ml-1 tracking-wide">
            {hint}
          </p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/** Standard CSS classes for modern luxury form inputs */
export const inputBase =
  "w-full bg-slate-50/70 border rounded-2xl px-5 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all duration-200 font-semibold text-slate-800 shadow-xs hover:border-slate-300 hover:bg-slate-50 placeholder:text-slate-400 text-sm";

export const inputReadOnly =
  "w-full bg-slate-100/70 border border-slate-200/80 rounded-2xl px-5 py-4 outline-none font-semibold text-slate-500 shadow-xs cursor-not-allowed text-sm select-none";

export const inputError =
  "border-rose-400 bg-rose-50/20 text-rose-950 focus:ring-rose-500/10 focus:border-rose-500";

export const inputNormal = "border-slate-200/90";

/** Helper: derive border & focus classes from error state */
export const borderFor = (error?: string) => (error ? inputError : inputNormal);
