"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, AlertCircle } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";
import { useTranslations } from "next-intl";
import { calculatePasswordStrength } from "./passwordStrengthUtils";

interface PasswordFieldProps {
  value: string;
  error?: string;
  onChange: (val: string) => void;
}

export function PasswordField({ value, error, onChange }: PasswordFieldProps) {
  const t = useTranslations("Auth.register");
  const strength = useMemo(() => calculatePasswordStrength(value || ""), [value]);

  return (
    <div data-error-field="password" id="field-password" className="space-y-2">
      <div className="flex items-center justify-between ml-1">
        <label className="text-xs font-black text-slate-600 uppercase tracking-wider flex items-center gap-1">
          {t("createPassword")} <span className="text-rose-500 font-bold">*</span>
        </label>
        {strength.label && (
          <span className={`text-[10px] font-black uppercase tracking-wider ${strength.textColor}`}>
            {strength.label}
          </span>
        )}
      </div>
      <div className="relative group">
        <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${error ? "text-rose-400" : "text-slate-400 group-focus-within:text-primary"}`} size={18} />
        <PasswordInput
          required
          name="password"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-slate-50/70 border rounded-2xl py-4 pl-12 pr-10 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-semibold text-slate-800 text-sm shadow-xs ${error ? "border-rose-400 bg-rose-50/20" : "border-slate-200/90"}`}
          placeholder="Minimum 8 characters"
        />
      </div>
      {value && (
        <div className="space-y-1 pt-1 ml-1">
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full transition-all duration-300 ${strength.color}`} style={{ width: `${strength.score}%` }} />
          </div>
        </div>
      )}
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-rose-500 font-semibold ml-1 flex items-center gap-1">
            <AlertCircle size={13} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
