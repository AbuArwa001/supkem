"use client";

import { useState, useMemo } from "react";
import { Plus, Loader2, Award, FileText, Ban } from "lucide-react";
import { cn } from "@/lib/utils";
import { ServiceFormData, ServiceCategoryItem } from "../types";

const DEFAULT_CATEGORIES = ["Accreditation", "Halal", "Marriage", "Education", "Employment", "Pilgrimage", "Kosher", "Travel", "Other"];
const AUDIENCES = ["Both", "Organization", "Individual"];
const DOCUMENT_OPTIONS = [
  { value: "Certificate", labelKey: "docTypeCertificate", icon: Award },
  { value: "Letter", labelKey: "docTypeLetter", icon: FileText },
  { value: "None", labelKey: "docTypeNone", icon: Ban },
] as const;

interface ServiceCategoryFieldsProps {
  formData: ServiceFormData;
  setFormData: (data: ServiceFormData) => void;
  categories: ServiceCategoryItem[];
  onQuickAddCategory?: (name: string) => Promise<ServiceCategoryItem | null>;
  t: (key: string) => string;
}

export function ServiceCategoryFields({ formData, setFormData, categories, onQuickAddCategory, t }: ServiceCategoryFieldsProps) {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isAddingLoading, setIsAddingLoading] = useState(false);

  const categoryNames = useMemo(() => {
    const names = new Set<string>();
    categories.forEach((c) => { if (c.name) names.add(c.name); });
    if (names.size === 0) DEFAULT_CATEGORIES.forEach((c) => names.add(c));
    if (formData.category) names.add(formData.category);
    return Array.from(names);
  }, [categories, formData.category]);

  const handleCreateInline = async () => {
    if (!newCategoryName.trim()) return;
    setIsAddingLoading(true);
    try {
      const created = onQuickAddCategory ? await onQuickAddCategory(newCategoryName.trim()) : null;
      setFormData({ ...formData, category: created?.name || newCategoryName.trim() });
      setNewCategoryName("");
      setIsAddingCategory(false);
    } finally { setIsAddingLoading(false); }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <label className="text-sm font-bold text-primary uppercase tracking-widest">{t("category")}</label>
            <button type="button" onClick={() => { setIsAddingCategory(!isAddingCategory); setNewCategoryName(""); }} className="text-xs font-bold text-secondary hover:text-secondary/80 flex items-center gap-1 cursor-pointer">
              {isAddingCategory ? t("cancel") : <><Plus size={13} /> {t("addNewCategory")}</>}
            </button>
          </div>
          {!isAddingCategory ? (
            <select value={formData.category} onChange={(e) => e.target.value === "__NEW__" ? setIsAddingCategory(true) : setFormData({ ...formData, category: e.target.value })} className="w-full px-6 py-4 bg-primary/[0.02] border border-border rounded-2xl outline-none font-medium text-primary cursor-pointer">
              {categoryNames.map((c) => (<option key={c} value={c}>{c}</option>))}
              <option value="__NEW__">{t("addNewCategory")}</option>
            </select>
          ) : (
            <div className="flex items-center gap-2">
              <input autoFocus value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder={t("namePlaceholder")} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleCreateInline(); } }} className="flex-1 px-5 py-4 bg-primary/[0.02] border border-primary/40 rounded-2xl outline-none font-medium text-primary text-sm" />
              <button type="button" disabled={isAddingLoading || !newCategoryName.trim()} onClick={handleCreateInline} className="px-5 py-4 bg-primary text-white font-bold rounded-2xl text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50">
                {isAddingLoading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />} {t("create")}
              </button>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">{t("targetAudience")}</label>
          <select value={formData.target_audience || "Both"} onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })} className="w-full px-6 py-4 bg-primary/[0.02] border border-border rounded-2xl outline-none font-medium text-primary">
            {AUDIENCES.map((a) => (<option key={a} value={a}>{a}</option>))}
          </select>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-bold text-primary uppercase tracking-widest">{t("documentType")}</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {DOCUMENT_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isSelected = (formData.document_type || "Certificate") === opt.value;
            return (
              <button key={opt.value} type="button" onClick={() => setFormData({ ...formData, document_type: opt.value })} className={cn("flex items-center gap-3 p-4 rounded-2xl border text-left rtl:text-right transition-all cursor-pointer", isSelected ? "border-primary bg-primary/[0.06] text-primary shadow-sm ring-2 ring-primary/20" : "border-border hover:border-primary/30 bg-primary/[0.01]")}>
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", isSelected ? "bg-primary text-white" : "bg-primary/5 text-primary")}><Icon size={18} /></div>
                <div className="min-w-0 flex-1"><p className="font-bold text-xs sm:text-sm truncate">{t(opt.labelKey)}</p></div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
