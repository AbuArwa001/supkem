"use client";

import { useMemo } from "react";
import { Infinity, Clock, Calendar, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ServiceFormData } from "../types";
import { getValidityMode, calculateDateSpan } from "./serviceValidityHelpers";

interface ServiceValiditySectionProps {
  formData: ServiceFormData;
  setFormData: (data: ServiceFormData) => void;
  t: (key: string, values?: any) => string;
}

export function ServiceValiditySection({ formData, setFormData, t }: ServiceValiditySectionProps) {
  const validityMode = useMemo(() => getValidityMode(formData), [formData]);
  const dateSpan = useMemo(() => calculateDateSpan(formData.start_date, formData.end_date || formData.expiration_date), [formData.start_date, formData.end_date, formData.expiration_date]);

  if (formData.document_type !== "Certificate") {
    return (
      <div className="p-5 rounded-2xl bg-primary/[0.02] border border-border space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2"><Calendar size={16} className="text-primary" /><h4 className="text-sm font-bold text-primary">{t("dateRangeTitle")} (Optional)</h4></div>
          {(formData.start_date || formData.end_date) && (
            <button type="button" onClick={() => setFormData({ ...formData, start_date: null, end_date: null, expiration_date: null })} className="text-[11px] font-bold text-red-500 hover:underline cursor-pointer">Clear Dates</button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5"><label className="text-xs font-bold text-primary uppercase tracking-wider block">{t("startDateLabel")}</label><input type="date" value={formData.start_date || ""} onChange={(e) => setFormData({ ...formData, start_date: e.target.value || null })} className="w-full px-4 py-2.5 bg-white border border-border rounded-xl text-xs font-semibold text-primary outline-none" /></div>
          <div className="space-y-1.5"><label className="text-xs font-bold text-primary uppercase tracking-wider block">{t("endDateLabel")}</label><input type="date" value={formData.end_date || formData.expiration_date || ""} min={formData.start_date || undefined} onChange={(e) => { const v = e.target.value || null; setFormData({ ...formData, end_date: v, expiration_date: v }); }} className="w-full px-4 py-2.5 bg-white border border-border rounded-xl text-xs font-semibold text-primary outline-none" /></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-2xl bg-primary/[0.02] border border-border space-y-4">
      <label className="text-xs font-bold text-primary uppercase tracking-wider block">{t("certificateValidityRules")}</label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button type="button" onClick={() => setFormData({ ...formData, is_indefinite: true, validity_duration: "Indefinite", start_date: null, end_date: null, expiration_date: null })} className={cn("p-4 rounded-xl border-2 text-left rtl:text-right transition-all cursor-pointer flex items-start gap-3", validityMode === "indefinite" ? "border-emerald-600 bg-emerald-50/50 shadow-xs ring-2 ring-emerald-500/10" : "border-border bg-white")}>
          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", validityMode === "indefinite" ? "bg-emerald-600 text-white" : "bg-primary/5 text-primary")}><Infinity size={18} /></div>
          <div><p className="text-xs font-bold text-primary">{t("indefiniteTitle")}</p><p className="text-[11px] text-foreground/60 mt-0.5">{t("indefiniteDesc")}</p></div>
        </button>
        <button type="button" onClick={() => setFormData({ ...formData, is_indefinite: false, validity_duration: formData.validity_duration === "Indefinite" || formData.validity_duration === "Date Range" ? "1 Year" : formData.validity_duration, start_date: null, end_date: null, expiration_date: null })} className={cn("p-4 rounded-xl border-2 text-left rtl:text-right transition-all cursor-pointer flex items-start gap-3", validityMode === "duration" ? "border-primary bg-primary/[0.06] shadow-xs ring-2 ring-primary/10" : "border-border bg-white")}>
          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", validityMode === "duration" ? "bg-primary text-white" : "bg-primary/5 text-primary")}><Clock size={18} /></div>
          <div><p className="text-xs font-bold text-primary">{t("fixedDurationTitle")}</p><p className="text-[11px] text-foreground/60 mt-0.5">{t("fixedDurationDesc")}</p></div>
        </button>
        <button type="button" onClick={() => { const today = new Date().toISOString().split("T")[0]; const nextYear = new Date(); nextYear.setFullYear(nextYear.getFullYear() + 1); const nextYearStr = nextYear.toISOString().split("T")[0]; setFormData({ ...formData, is_indefinite: false, validity_duration: "Date Range", start_date: formData.start_date || today, end_date: formData.end_date || nextYearStr, expiration_date: formData.end_date || nextYearStr }); }} className={cn("p-4 rounded-xl border-2 text-left rtl:text-right transition-all cursor-pointer flex items-start gap-3", validityMode === "dates" ? "border-purple-600 bg-purple-50/50 shadow-xs ring-2 ring-purple-500/10" : "border-border bg-white")}>
          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", validityMode === "dates" ? "bg-purple-600 text-white" : "bg-primary/5 text-primary")}><Calendar size={18} /></div>
          <div><p className="text-xs font-bold text-primary">{t("dateRangeTitle")}</p><p className="text-[11px] text-foreground/60 mt-0.5">{t("dateRangeDesc")}</p></div>
        </button>
      </div>

      {validityMode === "duration" && (
        <div className="pt-2 border-t border-border/60 space-y-3">
          <label className="text-xs font-bold text-primary uppercase tracking-wider block">{t("selectValidityPeriod")}</label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {["6 Months", "1 Year", "2 Years", "3 Years", "5 Years"].map((dur) => (
              <button type="button" key={dur} onClick={() => setFormData({ ...formData, validity_duration: dur })} className={cn("py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center", formData.validity_duration === dur ? "bg-primary text-white border-primary shadow-xs" : "bg-white text-foreground/70 border-border")}>
                {dur}
              </button>
            ))}
          </div>
        </div>
      )}

      {validityMode === "dates" && (
        <div className="pt-3 border-t border-border/60 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5"><label className="text-xs font-bold text-primary uppercase tracking-wider">{t("startDateLabel")}</label><input type="date" required value={formData.start_date || ""} onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} className="w-full px-4 py-2.5 bg-white border border-border rounded-xl text-xs font-semibold text-primary outline-none" /></div>
            <div className="space-y-1.5"><label className="text-xs font-bold text-primary uppercase tracking-wider">{t("endDateLabel")}</label><input type="date" required value={formData.end_date || formData.expiration_date || ""} min={formData.start_date || undefined} onChange={(e) => { const v = e.target.value; setFormData({ ...formData, end_date: v, expiration_date: v }); }} className="w-full px-4 py-2.5 bg-white border border-border rounded-xl text-xs font-semibold text-primary outline-none" /></div>
          </div>
          {dateSpan?.error ? (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold"><AlertCircle size={15} className="shrink-0 text-red-500" /><span>{t("invalidDateRange")}</span></div>
          ) : dateSpan ? (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-purple-50/70 border border-purple-200/80 text-purple-900 text-xs font-semibold"><Calendar size={15} className="shrink-0 text-purple-600" /><span>{t("validitySummary", { days: dateSpan.days, span: dateSpan.text, start: formData.start_date || "", end: formData.end_date || "" })}</span></div>
          ) : null}
        </div>
      )}
    </div>
  );
}
