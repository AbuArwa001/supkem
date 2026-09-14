"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, FilePlus, Check, Sparkles, Award, FileText, Search, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Service } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";
import { useLocale } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";

interface ServiceCardProps {
  service: Service;
  selected: boolean;
  hasError: boolean;
  onSelect: (service: Service) => void;
  onProceed?: () => void;
}

export function ServiceSelectionSkeleton() {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Skeleton */}
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-2xl shrink-0 bg-slate-200/80" />
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-7 w-60 rounded-lg bg-slate-200/80" />
            <Skeleton className="h-5 w-16 rounded-md bg-slate-200/60" />
          </div>
          <Skeleton className="h-4 w-72 max-w-full rounded bg-slate-200/60" />
        </div>
      </div>

      {/* Search & Category Pills Skeleton */}
      <div className="space-y-3 bg-slate-50/70 border border-slate-200/80 p-3 sm:p-4 rounded-2xl">
        <Skeleton className="h-11 w-full rounded-xl bg-slate-200/70" />
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Skeleton className="h-8 w-28 rounded-lg bg-slate-200/80 shrink-0" />
          <Skeleton className="h-8 w-24 rounded-lg bg-slate-200/60 shrink-0" />
          <Skeleton className="h-8 w-32 rounded-lg bg-slate-200/60 shrink-0" />
          <Skeleton className="h-8 w-24 rounded-lg bg-slate-200/60 shrink-0" />
        </div>
      </div>

      {/* Grid of 6 Service Card Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className="p-6 rounded-[22px] border-2 border-slate-200/80 bg-white flex flex-col justify-between gap-5 shadow-xs"
          >
            {/* Top row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="w-12 h-12 rounded-2xl bg-slate-200/80" />
                <Skeleton className="h-6 w-24 rounded-xl bg-slate-200/60" />
              </div>
              <Skeleton className="w-7 h-7 rounded-full bg-slate-200/60" />
            </div>

            {/* Middle */}
            <div className="space-y-2.5">
              <Skeleton className="h-6 w-3/4 rounded-lg bg-slate-200/80" />
              <Skeleton className="h-4 w-full rounded bg-slate-200/60" />
              <Skeleton className="h-4 w-4/5 rounded bg-slate-200/50" />
            </div>

            {/* Bottom tags */}
            <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
              <Skeleton className="h-5 w-16 rounded-lg bg-slate-200/60" />
              <Skeleton className="h-5 w-20 rounded-lg bg-slate-200/60" />
              <Skeleton className="h-5 w-24 rounded-lg bg-slate-200/60 ml-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceCard({ service, selected, hasError, onSelect, onProceed }: ServiceCardProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const displayName = isAr
    ? service.name_ar || service.name || service.name_en
    : service.name || service.name_en || service.name_ar;
  const displayDesc = isAr
    ? service.description_ar || service.description || service.description_en
    : service.description || service.description_en || service.description_ar;

  const handleClick = () => {
    if (selected && onProceed) {
      onProceed();
    } else {
      onSelect(service);
    }
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
      <input
        type="radio"
        name="service"
        value={service.id}
        checked={selected}
        readOnly
        className="sr-only"
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
            {service.fee > 0 ? `KES ${Number(service.fee).toLocaleString()}` : isAr ? "مجاني" : "NO FEE"}
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

      {/* Tags row */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
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
        {service.document_type === "Letter" ? (
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border bg-blue-50 text-blue-700 border-blue-200/80 inline-flex items-center gap-1 ml-auto rtl:mr-auto rtl:ml-0">
            <FileText size={11} /> {isAr ? "خطاب رسمي" : "Official Letter"}
          </span>
        ) : service.document_type === "None" ? (
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border bg-slate-100 text-slate-500 border-slate-200 inline-flex items-center gap-1 ml-auto rtl:mr-auto rtl:ml-0">
            {isAr ? "بدون وثيقة" : "No Document"}
          </span>
        ) : (
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border bg-emerald-50 text-emerald-700 border-emerald-200 inline-flex items-center gap-1 ml-auto rtl:mr-auto rtl:ml-0">
            <Award size={11} /> {isAr ? "شهادة رسمية" : "Certificate"}
          </span>
        )}
      </div>

      {/* Seamless instant action when selected */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: "auto", marginTop: 8 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          className="pt-3 border-t border-primary/20 flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
            <Sparkles size={14} className="text-secondary animate-pulse" />
            <span>{isAr ? "الخدمة المحددة" : "Selected Service"}</span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onProceed?.();
            }}
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

export function ServiceSelection({
  services,
  selectedServiceId,
  errors,
  dataLoading = false,
  onSelect,
  onProceed,
}: {
  services: Service[];
  selectedServiceId: string;
  errors: Record<string, string>;
  dataLoading?: boolean;
  onSelect: (service: Service) => void;
  onProceed?: () => void;
}) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  if (dataLoading) {
    return <ServiceSelectionSkeleton />;
  }

  // Dynamic categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    services.forEach((s) => {
      if (s.category) cats.add(s.category);
    });
    return ["all", ...Array.from(cats)];
  }, [services]);

  // Filter services by search and category
  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const nameMatch = (s.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.name_ar || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.description_ar || "").toLowerCase().includes(searchQuery.toLowerCase());

      const categoryMatch =
        activeCategory === "all" ||
        s.category?.toLowerCase() === activeCategory.toLowerCase() ||
        (activeCategory === "individual" && s.target_audience === "Individual") ||
        (activeCategory === "organization" && s.target_audience === "Organization");

      return nameMatch && categoryMatch;
    });
  }, [services, searchQuery, activeCategory]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
      data-error-field="service"
      id="field-service"
    >
      {/* Header and subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/15 shadow-xs shrink-0">
            <Layout size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-black font-outfit text-slate-900">
                {isAr ? "اختر خدمة الاعتماد" : "Select Accreditation Service"}
              </h3>
              <span className="text-xs font-black text-rose-500 uppercase tracking-widest bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
                {isAr ? "مطلوب" : "Required"}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
              {isAr
                ? "اختر الشهادة أو برنامج التزكية الرسمي من سوبكيم"
                : "Choose the official SUPKEM certificate or endorsement program"}
            </p>
          </div>
        </div>
      </div>

      {/* Search & Quick Filters to eliminate scrolling through large card lists */}
      <div className="space-y-3 bg-slate-50/70 border border-slate-200/80 p-3 sm:p-4 rounded-2xl">
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 rtl:left-auto rtl:right-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? "ابحث عن خدمة بالاسم أو الوصف..." : "Search services by name or keyword..."}
            className="w-full pl-10 pr-10 rtl:pl-10 rtl:pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rtl:right-auto rtl:left-3"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={cn(
              "px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer",
              activeCategory === "all"
                ? "bg-primary text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
            )}
          >
            {isAr ? "جميع الخدمات" : "All Services"} ({services.length})
          </button>
          {categories
            .filter((c) => c !== "all")
            .map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer",
                  activeCategory.toLowerCase() === cat.toLowerCase()
                    ? "bg-primary text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                )}
              >
                {cat}
              </button>
            ))}
        </div>
      </div>

      {/* Service Cards Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              selected={selectedServiceId === service.id}
              hasError={!!errors.service}
              onSelect={onSelect}
              onProceed={onProceed}
            />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-white border border-dashed border-slate-200 rounded-2xl space-y-2">
          <p className="text-slate-500 font-bold text-sm">
            {isAr ? "لم يتم العثور على خدمات مطابقة للبحث" : "No services match your search or filter"}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
            }}
            className="text-xs font-bold text-primary hover:underline cursor-pointer"
          >
            {isAr ? "إعادة ضبط عوامل التصفية" : "Reset filters"}
          </button>
        </div>
      )}
    </motion.div>
  );
}

