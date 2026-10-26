"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { NewsPaperItem } from "@/services/news-service";
import { useTranslations } from "next-intl";
import { NewsPaperMetaFields } from "./NewsPaperMetaFields";
import { NewsPaperFileFields } from "./NewsPaperFileFields";

interface NewsPaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingItem: NewsPaperItem | null;
  formData: {
    title: string;
    issue_number: string;
    published_date: string;
    is_published: boolean;
    file: File | null;
    cover_image: File | null;
  };
  setFormData: (data: any) => void;
  isSubmitting: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
}

export function NewsPaperModal({
  isOpen, onClose, editingItem, formData, setFormData, isSubmitting, error, onSubmit,
}: NewsPaperModalProps) {
  const t = useTranslations("Dashboard.admin.newsPapers");

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-primary/20 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[20px] shadow-2xl overflow-hidden shadow-primary/10"
          >
            <div className="p-8 border-b border-border flex items-center justify-between">
              <h2 className="text-2xl font-bold font-outfit text-primary">{editingItem ? t("editNewsPaper") : t("uploadNewsPaper")}</h2>
              <button onClick={onClose} className="p-2 hover:bg-primary/5 rounded-xl transition-colors" type="button"><X size={24} /></button>
            </div>

            <form onSubmit={onSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl">
                  <p className="text-sm font-bold text-red-600 leading-relaxed">{error}</p>
                </div>
              )}

              <NewsPaperMetaFields formData={formData} setFormData={setFormData} />

              <NewsPaperFileFields
                file={formData.file}
                coverImage={formData.cover_image}
                onFileChange={(f) => setFormData({ ...formData, file: f })}
                onCoverChange={(c) => setFormData({ ...formData, cover_image: c })}
                isEditing={!!editingItem}
              />

              <div className="pt-8 flex items-center gap-4">
                <button type="button" onClick={onClose} className="flex-1 px-8 py-4 bg-foreground/5 text-primary rounded-2xl font-bold hover:bg-foreground/10 transition-all font-outfit">
                  {t("cancel")}
                </button>
                <button
                  disabled={isSubmitting}
                  className="flex-[2] px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 font-outfit transition-all active:scale-95 premium-gradient shadow-primary/20"
                >
                  {isSubmitting ? (<><Loader2 className="animate-spin" size={20} />{t("saving")}</>) : editingItem ? t("updateNewsPaper") : t("createNewsPaper")}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
