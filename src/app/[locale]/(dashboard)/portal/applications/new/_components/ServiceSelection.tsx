"use client";

import { motion } from "framer-motion";
import { Layout, FilePlus, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Service } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";
import { useLocale } from "next-intl";

interface ServiceCardProps {
  service: Service;
  selected: boolean;
  hasError: boolean;
  onSelect: (service: Service) => void;
}

function ServiceCard({ service, selected, hasError, onSelect }: ServiceCardProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const displayName = isAr
    ? service.name_ar || service.name || service.name_en
    : service.name || service.name_en || service.name_ar;
  const displayDesc = isAr
    ? service.description_ar || service.description || service.description_en
    : service.description || service.description_en || service.description_ar;

  return (
    <label
      className={cn(
        "p-6 rounded-[22px] border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between gap-5 group relative overflow-hidden select-none",
        selected
          ? "border-primary bg-gradient-to-b from-primary/[0.04] to-primary/[0.08] shadow-xl shadow-primary/10 ring-4 ring-primary/15 scale-[1.01]"
          : hasError
          ? "border-rose-300 bg-rose-50/30 hover:border-rose-400"
          : "border-slate-200/90 hover:border-primary/40 bg-white hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-0.5"
      )}
    >
      <input
        type="radio"
        name="service"
        value={service.id}
        className="hidden"
        onChange={() => onSelect(service)}
      />

      {/* Top row: Icon, Fee, and Selection Indicator */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300",
              selected
                ? "bg-primary text-white shadow-lg shadow-primary/30 rotate-3 scale-110"
                : "bg-slate-100/80 text-slate-500 group-hover:text-primary group-hover:bg-primary/10"
            )}
          >
            <FilePlus size={22} />
          </div>
          <span
            className={cn(
              "px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider shadow-xs border",
              service.fee > 0
                ? "bg-emerald-50 text-emerald-700 border-emerald-200/80"
                : "bg-blue-50 text-blue-700 border-blue-200/80"
            )}
          >
            {service.fee > 0 ? `KES ${Number(service.fee).toLocaleString()}` : "NO FEE"}
          </span>
        </div>

        {/* Selected Checkmark Indicator */}
        <div
          className={cn(
            "w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 border-2",
            selected
              ? "bg-primary border-primary text-white scale-110 shadow-sm"
              : "border-slate-200 bg-slate-50 text-transparent group-hover:border-primary/40"
          )}
        >
          <Check size={14} strokeWidth={3} />
        </div>
      </div>

      {/* Middle: Name and description */}
      <div className="space-y-2">
        <h4
          className={cn(
            "font-black text-lg font-outfit tracking-tight transition-colors line-clamp-1",
            selected ? "text-primary" : "text-slate-800 group-hover:text-primary"
          )}
        >
          {displayName}
        </h4>
        <p className="text-slate-500 text-xs sm:text-sm font-medium line-clamp-2 leading-relaxed">
          {displayDesc}
        </p>
      </div>

      {/* Bottom: Tags */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
        <span className="text-[10px] font-black uppercase tracking-wider text-secondary-foreground bg-secondary/20 px-2.5 py-1 rounded-lg">
          {service.category}
        </span>
        <span
          className={cn(
            "text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border",
            service.target_audience === "Individual"
              ? "bg-blue-50 text-blue-700 border-blue-100"
              : "bg-purple-50 text-purple-700 border-purple-100"
          )}
        >
          {service.target_audience}
        </span>
      </div>
    </label>
  );
}

export function ServiceSelection({
  services,
  selectedServiceId,
  errors,
  onSelect,
}: {
  services: Service[];
  selectedServiceId: string;
  errors: Record<string, string>;
  onSelect: (service: Service) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
      data-error-field="service"
      id="field-service"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/15 shadow-xs">
          <Layout size={24} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-black font-outfit text-slate-900">Select Accreditation Service</h3>
            <span className="text-xs font-black text-rose-500 uppercase tracking-widest bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
              Required
            </span>
          </div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
            Choose the official SUPKEM certificate or endorsement program
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            selected={selectedServiceId === service.id}
            hasError={!!errors.service}
            onSelect={onSelect}
          />
        ))}
      </div>
    </motion.div>
  );
}
