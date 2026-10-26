"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Layout } from "lucide-react";
import type { Service } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";
import { useLocale } from "next-intl";
import { ServiceSelectionSkeleton } from "./service-selection/ServiceSelectionSkeleton";
import { ServiceCard } from "./service-selection/ServiceCard";
import { ServiceFilters } from "./service-selection/ServiceFilters";

export { ServiceSelectionSkeleton, ServiceCard };

interface ServiceSelectionProps {
  services: Service[];
  selectedServiceId: string;
  errors: Record<string, string>;
  dataLoading?: boolean;
  onSelect: (service: Service) => void;
  onProceed?: () => void;
}

export function ServiceSelection({
  services, selectedServiceId, errors, dataLoading = false, onSelect, onProceed,
}: ServiceSelectionProps) {
  const isAr = useLocale() === "ar";
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const cats = new Set<string>();
    (services || []).filter((s) => s.is_active !== false).forEach((s) => { if (s.category) cats.add(s.category); });
    return ["all", ...Array.from(cats)];
  }, [services]);

  const filteredServices = useMemo(() => {
    return (services || [])
      .filter((s) => s.is_active !== false)
      .filter((s) => {
        const q = searchQuery.toLowerCase();
        const nameMatch = (s.name || "").toLowerCase().includes(q) || (s.name_ar || "").toLowerCase().includes(q) ||
          (s.description || "").toLowerCase().includes(q) || (s.description_ar || "").toLowerCase().includes(q);
        const categoryMatch = activeCategory === "all" || s.category?.toLowerCase() === activeCategory.toLowerCase() ||
          (activeCategory === "individual" && s.target_audience === "Individual") ||
          (activeCategory === "organization" && s.target_audience === "Organization");
        return nameMatch && categoryMatch;
      });
  }, [services, searchQuery, activeCategory]);

  if (dataLoading) return <ServiceSelectionSkeleton />;

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6" data-error-field="service" id="field-service">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/15 shadow-xs shrink-0">
            <Layout size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-black font-outfit text-slate-900">{isAr ? "اختر خدمة الاعتماد" : "Select Accreditation Service"}</h3>
              <span className="text-xs font-black text-rose-500 uppercase tracking-widest bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">{isAr ? "مطلوب" : "Required"}</span>
            </div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
              {isAr ? "اختر الشهادة أو برنامج التزكية الرسمي من سوبكيم" : "Choose the official SUPKEM certificate or endorsement program"}
            </p>
          </div>
        </div>
      </div>

      <ServiceFilters
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        activeCategory={activeCategory} setActiveCategory={setActiveCategory}
        categories={categories} totalServices={services.length} isAr={isAr}
      />

      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id} service={service} selected={selectedServiceId === service.id}
              hasError={!!errors.service} onSelect={onSelect} onProceed={onProceed}
            />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-white border border-dashed border-slate-200 rounded-2xl space-y-2">
          <p className="text-slate-500 font-bold text-sm">{isAr ? "لم يتم العثور على خدمات مطابقة للبحث" : "No services match your search or filter"}</p>
          <button type="button" onClick={() => { setSearchQuery(""); setActiveCategory("all"); }} className="text-xs font-bold text-primary hover:underline cursor-pointer">
            {isAr ? "إعادة ضبط عوامل التصفية" : "Reset filters"}
          </button>
        </div>
      )}
    </motion.div>
  );
}
