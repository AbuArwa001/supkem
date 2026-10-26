"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Tag, Loader2, Layers, AlertCircle } from "lucide-react";
import { ServiceCategoryItem } from "./types";
import { useTranslations, useLocale } from "next-intl";
import { NewCategoryForm } from "./category-modal/NewCategoryForm";
import { CategoryCardItem } from "./category-modal/CategoryCardItem";

interface CategoryManagementModalProps {
  categories: ServiceCategoryItem[];
  loading: boolean;
  onClose: () => void;
  onAddCategory: (data: { name: string; description?: string }) => Promise<ServiceCategoryItem | null>;
  onDeleteCategory: (id: string, force?: boolean) => Promise<boolean>;
}

export function CategoryManagementModal({
  categories, loading, onClose, onAddCategory, onDeleteCategory,
}: CategoryManagementModalProps) {
  const t = useTranslations("Dashboard.admin.services.categoryModal");
  const isAr = useLocale() === "ar";
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleDelete = async (category: ServiceCategoryItem) => {
    const hasServices = (category.services_count ?? 0) > 0;
    const confirmMsg = hasServices
      ? `Category '${category.name}' is currently used by ${category.services_count} service(s). Are you sure you want to force delete it?`
      : t("deleteConfirm", { name: category.name });
    if (!window.confirm(confirmMsg)) return;

    setDeletingId(category.id);
    setErrorMsg(null);
    try { await onDeleteCategory(category.id, hasServices); }
    catch (err: any) { setErrorMsg(err.response?.data?.detail || "Failed to delete category."); }
    finally { setDeletingId(null); }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-primary/20 backdrop-blur-sm" />
      <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="relative w-full max-w-4xl bg-white rounded-[24px] shadow-2xl overflow-hidden shadow-primary/10 flex flex-col max-h-[90vh]">
        <div className="p-6 sm:p-8 border-b border-border flex items-center justify-between bg-primary/[0.01]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><Layers size={24} /></div>
            <div>
              <h2 className="text-2xl font-bold font-outfit text-primary">{t("title")}</h2>
              <p className="text-sm text-foreground/60 font-medium">{t("subtitle")}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 hover:bg-primary/5 rounded-xl transition-colors text-foreground/60 hover:text-primary"><X size={22} /></button>
        </div>

        {errorMsg && (
          <div className="mx-6 sm:mx-8 mt-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-700 text-sm">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{errorMsg}</div>
            <button onClick={() => setErrorMsg(null)} className="text-rose-500 hover:text-rose-700"><X size={16} /></button>
          </div>
        )}

        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 custom-scrollbar">
          <NewCategoryForm onAddCategory={onAddCategory} onError={setErrorMsg} />

          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Tag size={18} className="text-primary" />
                <h3 className="font-bold text-primary font-outfit text-lg">{t("existingCategories")}</h3>
              </div>
              <span className="text-xs font-black px-2.5 py-1 bg-primary/5 text-primary rounded-lg border border-primary/10">{categories.length}</span>
            </div>

            {loading ? (
              <div className="py-12 flex items-center justify-center"><Loader2 size={32} className="animate-spin text-primary" /></div>
            ) : categories.length === 0 ? (
              <div className="py-12 text-center text-foreground/50 font-medium text-sm">{t("noCategories")}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <CategoryCardItem key={cat.id} category={cat} isAr={isAr} isDeleting={deletingId === cat.id} t={t} onDelete={handleDelete} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-border bg-primary/[0.01] flex justify-end">
          <button type="button" onClick={onClose} className="px-8 py-3 bg-foreground/5 text-primary rounded-xl font-bold text-sm hover:bg-foreground/10 transition-all cursor-pointer">
            {t("close")}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
