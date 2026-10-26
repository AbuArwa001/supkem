"use client";

import { FileText, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OrgLegalSectionProps {
  formData: any;
  errors: Record<string, string>;
  onChange: (field: string, val: string) => void;
}

export function OrgLegalSection({ formData, errors, onChange }: OrgLegalSectionProps) {
  return (
    <div className="p-8 rounded-[28px] bg-white border border-slate-200/90 shadow-xl shadow-slate-200/40 space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/80 shadow-xs">
          <FileText size={20} />
        </div>
        <div>
          <h3 className="text-lg font-black font-outfit text-slate-900">2. Legal & Statutory Identification</h3>
          <p className="text-xs text-slate-400 font-medium">Government Registrar & Tax records</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div data-error-field="reg_number" id="field-reg_number" className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
            Govt Registration Number <span className="text-rose-500 font-bold">*</span>
          </label>
          <input
            required
            name="reg_number"
            value={formData.reg_number}
            onChange={(e) => onChange("reg_number", e.target.value)}
            className={`w-full bg-slate-50/70 border rounded-2xl py-4 px-5 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-semibold text-slate-800 text-sm shadow-xs ${
              errors.reg_number ? "border-rose-400 bg-rose-50/20" : "border-slate-200/90"
            }`}
            placeholder="e.g. REG/12345/2020"
          />
          <AnimatePresence>
            {errors.reg_number && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-rose-500 font-semibold ml-1 flex items-center gap-1">
                <AlertCircle size={13} /> {errors.reg_number}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div data-error-field="pin_number" id="field-pin_number" className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
            KRA PIN Number <span className="text-rose-500 font-bold">*</span>
          </label>
          <input
            required
            name="pin_number"
            value={formData.pin_number}
            onChange={(e) => onChange("pin_number", e.target.value)}
            className={`w-full bg-slate-50/70 border rounded-2xl py-4 px-5 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-semibold text-slate-800 text-sm shadow-xs ${
              errors.pin_number ? "border-rose-400 bg-rose-50/20" : "border-slate-200/90"
            }`}
            placeholder="e.g. P051234567Z"
          />
          <AnimatePresence>
            {errors.pin_number && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-rose-500 font-semibold ml-1 flex items-center gap-1">
                <AlertCircle size={13} /> {errors.pin_number}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
