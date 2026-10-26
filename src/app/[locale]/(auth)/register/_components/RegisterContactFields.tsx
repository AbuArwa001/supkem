"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, ChevronDown, AlertCircle } from "lucide-react";
import { RegisterFormData, FieldErrors } from "./types";
import { useTranslations } from "next-intl";
import { KENYA_COUNTIES } from "./kenyaCounties";
import { RegisterTextInput } from "./RegisterTextInput";

interface RegisterContactFieldsProps {
  formData: RegisterFormData;
  fieldErrors: FieldErrors;
  onChange: (field: keyof RegisterFormData, value: string) => void;
}

export function RegisterContactFields({
  formData,
  fieldErrors,
  onChange,
}: RegisterContactFieldsProps) {
  const t = useTranslations("Auth.register");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
        <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/15 shadow-xs">
          <Mail size={18} />
        </div>
        <div>
          <h3 className="text-base font-black font-outfit text-slate-800 uppercase tracking-wider">
            2. Contact &amp; County Information
          </h3>
          <p className="text-xs text-slate-400 font-medium">For official communications and accreditation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RegisterTextInput
          label={t("email")}
          name="email"
          type="email"
          value={formData.email}
          placeholder="abdullah@example.com"
          icon={Mail}
          required
          error={fieldErrors.email}
          onChange={(val) => onChange("email", val)}
        />

        <RegisterTextInput
          label={t("phone")}
          name="phone_number"
          value={formData.phone_number}
          placeholder="+254 7XX XXX XXX"
          icon={Phone}
          required
          error={fieldErrors.phone_number}
          onChange={(val) => onChange("phone_number", val)}
        />

        <div data-error-field="location" id="field-location" className="space-y-2 md:col-span-2">
          <label className="text-xs font-black text-slate-600 uppercase tracking-wider flex items-center gap-1 ml-1">
            County / Region <span className="text-rose-500 font-bold">*</span>
          </label>
          <div className="relative group">
            <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${fieldErrors.location ? "text-rose-400" : "text-slate-400 group-focus-within:text-primary"}`} size={18} />
            <select
              required
              name="location"
              value={formData.location}
              onChange={(e) => onChange("location", e.target.value)}
              className={`w-full bg-slate-50/70 border rounded-2xl py-4 pl-12 pr-10 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none appearance-none cursor-pointer font-semibold text-slate-800 text-sm shadow-xs ${fieldErrors.location ? "border-rose-400 bg-rose-50/20" : "border-slate-200/90"} ${!formData.location && "text-slate-400 font-normal"}`}
            >
              <option value="" disabled>Select your county in Kenya</option>
              {KENYA_COUNTIES.map((c) => (
                <option key={c} value={c} className="text-slate-800 font-medium">{c} County</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
          </div>
          <AnimatePresence>
            {fieldErrors.location && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-rose-500 font-semibold ml-1 flex items-center gap-1">
                <AlertCircle size={13} /> {fieldErrors.location}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
