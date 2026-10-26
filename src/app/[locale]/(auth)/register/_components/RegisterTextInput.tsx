"use client";

import { LucideIcon, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface RegisterTextInputProps {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  icon: LucideIcon;
  onChange: (val: string) => void;
  required?: boolean;
  optionalBadge?: boolean;
  type?: string;
  error?: string;
  className?: string;
}

export function RegisterTextInput({
  label,
  name,
  value,
  placeholder,
  icon: Icon,
  onChange,
  required,
  optionalBadge,
  type = "text",
  error,
  className = "",
}: RegisterTextInputProps) {
  return (
    <div data-error-field={name} id={`field-${name}`} className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between ml-1">
        <label className="text-xs font-black text-slate-600 uppercase tracking-wider flex items-center gap-1">
          {label} {required && <span className="text-rose-500 font-bold">*</span>}
        </label>
        {optionalBadge && (
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-md">
            Optional
          </span>
        )}
      </div>
      <div className="relative group">
        <Icon
          className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
            error ? "text-rose-400" : "text-slate-400 group-focus-within:text-primary"
          }`}
          size={18}
        />
        <input
          type={type}
          required={required}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-slate-50/70 border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-semibold text-slate-800 text-sm shadow-xs ${
            error ? "border-rose-400 bg-rose-50/20" : "border-slate-200/90"
          }`}
          placeholder={placeholder}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-rose-500 font-semibold ml-1 flex items-center gap-1"
          >
            <AlertCircle size={13} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
