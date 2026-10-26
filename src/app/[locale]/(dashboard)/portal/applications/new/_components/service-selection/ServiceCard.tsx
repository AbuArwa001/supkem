"use client";

import { motion } from "framer-motion";
import { FilePlus, Check, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Service } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";
import { useLocale } from "next-intl";
import { ServiceTags } from "./ServiceTags";

export interface ServiceCardProps {
  service: Service;
  selected: boolean;
  hasError: boolean;
  onSelect: (service: Service) => void;
  onProceed?: () => void;
}

export function ServiceCard({ service, selected, hasError, onSelect, onProceed }: ServiceCardProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const displayName = isAr ? service.name_ar || service.name || service.name_en : service.name || service.name_en || service.name_ar;
  const displayDesc = isAr ? service.description_ar || service.description || service.description_en : service.description || service.description_en || service.description_ar;

  const handleClick = () => {
    if (selected && onProceed) onProceed();
    else onSelect(service);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      className={cn(
        "p-6 rounded-[22px] border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between gap-5 group relative overflow-hidden select-none focus:outline-none focus:ring-4 focus:ring-primary/20",
        selected
          ? "border-primary bg-gradient-to-b from-primary/[0.05] to-primary/[0.09] shadow-xl shadow-primary/10 ring-4 ring-primary/15 scale-[1.01]"
          : hasError
          ? "border-rose-300 bg-rose-50/30 hover:border-rose-400"
          : "border-slate-200/90 hover:border-primary/40 bg-white hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-0.5"
      )}
    >
      <input type="radio" name="service" value={service.id} checked={selected} readOnly className="sr-only" />

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300", selected ? "bg-primary text-white shadow-lg shadow-primary/30 rotate-3 scale-110" : "bg-slate-100/80 text-slate-500 group-hover:text-primary group-hover:bg-primary/10")}>
            <FilePlus size={22} />
          </div>
          <span className={cn("px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider shadow-xs border", service.fee > 0 ? "bg-emerald-50 text-emerald-700 border-emerald-200/80" : "bg-blue-50 text-blue-700 border-blue-200/80")}>
            {service.fee > 0 ? `KES ${Number(service.fee).toLocaleString()}` : isAr ? "مجاني" : "NO FEE"}
          </span>
        </div>

        <div className={cn("w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 border-2", selected ? "bg-primary border-primary text-white scale-110 shadow-sm" : "border-slate-200 bg-slate-50 text-transparent group-hover:border-primary/40")}>
          <Check size={14} strokeWidth={3} />
        </div>
      </div>

      <div className="space-y-2">
        <h4 className={cn("font-black text-lg font-outfit tracking-tight transition-colors line-clamp-1", selected ? "text-primary" : "text-slate-800 group-hover:text-primary")}>
          {displayName}
        </h4>
        <p className="text-slate-500 text-xs sm:text-sm font-medium line-clamp-2 leading-relaxed">{displayDesc}</p>
      </div>

      <ServiceTags service={service} isAr={isAr} />

      {selected && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="pt-3 border-t border-primary/20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
            <Sparkles size={14} className="text-secondary animate-pulse" />
            <span>{isAr ? "الخدمة المحددة" : "Selected Service"}</span>
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onProceed?.(); }}
            className="px-4 py-2 rounded-xl bg-primary hover:bg-accent text-white font-black text-xs font-outfit shadow-md shadow-primary/25 flex items-center gap-1.5 cursor-pointer hover:scale-[1.03] active:scale-[0.97] transition-all"
          >
            <span>{isAr ? "المتابعة للخطوة التالية" : "Continue to Next Step"}</span>
            <ArrowRight size={14} className="rtl:rotate-180" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
