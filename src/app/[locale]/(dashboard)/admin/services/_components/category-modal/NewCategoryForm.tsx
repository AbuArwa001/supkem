"use client";

import { useState } from "react";
import { FolderPlus, Plus, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { ServiceCategoryItem } from "../types";

interface NewCategoryFormProps {
  onAddCategory: (data: { name: string; description?: string }) => Promise<ServiceCategoryItem | null>;
  onError: (msg: string | null) => void;
}

export function NewCategoryForm({ onAddCategory, onError }: NewCategoryFormProps) {
  const t = useTranslations("Dashboard.admin.services.categoryModal");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    onError(null);
    try {
      const res = await onAddCategory({ name: name.trim(), description: description.trim() });
      if (res) {
        setName("");
        setDescription("");
      }
    } catch (err: any) {
      const data = err.response?.data;
      onError(data?.name?.[0] || data?.detail || "Failed to create category.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 rounded-[20px] bg-primary/[0.02] border border-primary/10 space-y-4">
      <div className="flex items-center gap-2">
        <FolderPlus size={18} className="text-primary" />
        <h3 className="font-bold text-primary font-outfit text-lg">{t("newCategory")}</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-primary uppercase tracking-widest px-1">{t("name")} *</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("namePlaceholder")}
              className="w-full px-5 py-3.5 bg-white border border-border focus:border-primary/40 rounded-xl outline-none font-medium text-primary text-sm shadow-xs transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-primary uppercase tracking-widest px-1">{t("description")}</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("descPlaceholder")}
              className="w-full px-5 py-3.5 bg-white border border-border focus:border-primary/40 rounded-xl outline-none font-medium text-primary text-sm shadow-xs transition-all"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSubmitting || !name.trim()}
            className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm hover-lift premium-gradient shadow-md flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <><Loader2 size={16} className="animate-spin" />{t("adding")}</>
            ) : (
              <><Plus size={16} />{t("addButton")}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
