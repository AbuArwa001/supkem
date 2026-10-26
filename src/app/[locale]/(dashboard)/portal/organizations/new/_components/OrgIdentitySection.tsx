"use client";

import { Building2, ChevronDown, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OrgIdentitySectionProps {
  formData: any;
  errors: Record<string, string>;
  onChange: (field: string, val: string) => void;
}

export function OrgIdentitySection({ formData, errors, onChange }: OrgIdentitySectionProps) {
  return (
    <div className="p-8 rounded-[28px] bg-white border border-slate-200/90 shadow-xl shadow-slate-200/40 space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/15 shadow-xs">
          <Building2 size={20} />
        </div>
        <div>
          <h3 className="text-lg font-black font-outfit text-slate-900">1. Institutional Identity</h3>
          <p className="text-xs text-slate-400 font-medium">Official name and operational category</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div data-error-field="name" id="field-name" className="space-y-2 md:col-span-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
            Institution Name <span className="text-rose-500 font-bold">*</span>
          </label>
          <div className="relative group">
            <Building2 className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.name ? "text-rose-400" : "text-slate-400 group-focus-within:text-primary"}`} size={18} />
            <input
              required
              name="name"
              value={formData.name}
              onChange={(e) => onChange("name", e.target.value)}
              className={`w-full bg-slate-50/70 border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-semibold text-slate-800 text-sm shadow-xs ${errors.name ? "border-rose-400 bg-rose-50/20" : "border-slate-200/90"}`}
              placeholder="e.g. Al-Noor Educational Center & Mosque"
            />
          </div>
          <AnimatePresence>
            {errors.name && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-rose-500 font-semibold ml-1 flex items-center gap-1">
                <AlertCircle size={13} /> {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-600">Institutional Classification</label>
          <div className="relative">
            <select
              required
              name="type"
              value={formData.type}
              onChange={(e) => onChange("type", e.target.value)}
              className="w-full bg-slate-50/70 border border-slate-200/90 rounded-2xl py-4 pl-5 pr-10 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none appearance-none cursor-pointer font-semibold text-slate-800 text-sm shadow-xs"
            >
              <option value="Mosque">Mosque</option>
              <option value="School/College">School / College</option>
              <option value="Hospital/Clinic">Hospital / Clinic</option>
              <option value="NGO/CBO">NGO / CBO</option>
              <option value="Community Group">Community Group</option>
              <option value="Other">Other Community Service</option>
            </select>
            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
