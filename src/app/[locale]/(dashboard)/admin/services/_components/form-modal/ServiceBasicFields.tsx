"use client";

import { DollarSign, Sparkles } from "lucide-react";
import { ServiceFormData } from "../types";

interface ServiceBasicFieldsProps {
  formData: ServiceFormData;
  setFormData: (data: ServiceFormData) => void;
  onOpenAIGeneration: () => void;
  t: (key: string) => string;
}

export function ServiceBasicFields({
  formData,
  setFormData,
  onOpenAIGeneration,
  t,
}: ServiceBasicFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">
            {t("name")}
          </label>
          <input
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={t("namePlaceholder")}
            className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">
            {t("feeLabel")}
          </label>
          <div className="relative">
            <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 ltr:left-4 rtl:right-4" />
            <input
              required
              type="number"
              value={formData.fee}
              onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
              placeholder="0.00"
              className="w-full ltr:pl-12 rtl:pr-12 px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <label className="text-sm font-bold text-primary uppercase tracking-widest">
            {t("description")}
          </label>
          <button
            type="button"
            onClick={onOpenAIGeneration}
            className="text-xs font-bold text-secondary hover:text-secondary/80 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles size={14} className="text-secondary" />
            {t("generateWithAI")}
          </button>
        </div>
        <textarea
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder={t("descriptionPlaceholder")}
          className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all resize-none"
        />
      </div>
    </>
  );
}
