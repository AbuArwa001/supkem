"use client";

import { Compass, MapPin, ChevronDown, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OrgJurisdictionSectionProps {
  formData: any;
  errors: Record<string, string>;
  regions: any[];
  councils: any[];
  onRegionChange: (e: any) => void;
  onChange: (field: string, val: string) => void;
}

export function OrgJurisdictionSection({
  formData,
  errors,
  regions,
  councils,
  onRegionChange,
  onChange,
}: OrgJurisdictionSectionProps) {
  return (
    <div className="p-8 rounded-[28px] bg-white border border-slate-200/90 shadow-xl shadow-slate-200/40 space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100/80 shadow-xs">
          <Compass size={20} />
        </div>
        <div>
          <h3 className="text-lg font-black font-outfit text-slate-900">3. SUPKEM Regional Jurisdiction</h3>
          <p className="text-xs text-slate-400 font-medium">Select the administrative territory</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div data-error-field="region" id="field-region" className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
            Region <span className="text-rose-500 font-bold">*</span>
          </label>
          <div className="relative">
            <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.region ? "text-rose-400" : "text-slate-400"}`} size={18} />
            <select
              required
              name="region"
              value={formData.region}
              onChange={onRegionChange}
              className={`w-full bg-slate-50/70 border rounded-2xl py-4 pl-12 pr-10 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none appearance-none cursor-pointer font-semibold text-slate-800 text-sm shadow-xs ${errors.region ? "border-rose-400 bg-rose-50/20" : "border-slate-200/90"}`}
            >
              <option value="">Select Region</option>
              {regions.map((r: any) => (<option key={r.id} value={r.id}>{r.name}</option>))}
            </select>
            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <AnimatePresence>
            {errors.region && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-rose-500 font-semibold ml-1 flex items-center gap-1">
                <AlertCircle size={13} /> {errors.region}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div data-error-field="county_council" id="field-county_council" className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
            County Council <span className="text-rose-500 font-bold">*</span>
          </label>
          <div className="relative">
            <select
              required
              name="county_council"
              disabled={!formData.region}
              value={formData.county_council}
              onChange={(e) => onChange("county_council", e.target.value)}
              className={`w-full bg-slate-50/70 border rounded-2xl py-4 pl-5 pr-10 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none appearance-none cursor-pointer font-semibold text-slate-800 text-sm shadow-xs disabled:opacity-50 ${errors.county_council ? "border-rose-400 bg-rose-50/20" : "border-slate-200/90"}`}
            >
              <option value="">{formData.region ? "Select County Council" : "Select Region First"}</option>
              {councils.map((c: any) => (<option key={c.id} value={c.id}>{c.name}</option>))}
            </select>
            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <AnimatePresence>
            {errors.county_council && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-rose-500 font-semibold ml-1 flex items-center gap-1">
                <AlertCircle size={13} /> {errors.county_council}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
