"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { NewsItem, NewsGalleryItem } from "@/services/news-service";
import { useTranslations } from "next-intl";
import type { GalleryUploadProgress } from "../_hooks/useNewsLogic";
import { NewsBasicFields } from "./news-modal/NewsBasicFields";
import { NewsContentEditors } from "./news-modal/NewsContentEditors";
import { NewsGallerySection } from "./news-modal/NewsGallerySection";

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingItem: NewsItem | null;
  formData: {
    title: string;
    title_ar: string;
    content: string;
    content_ar: string;
    is_published: boolean;
    featured_image: File | null;
  };
  setFormData: (data: any) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  pendingGalleryFiles: File[];
  savedGallery: NewsGalleryItem[];
  isDeletingGalleryId: string | null;
  galleryProgress: GalleryUploadProgress | null;
  onAddGalleryFiles: (files: File[]) => void;
  onRemovePendingFile: (index: number) => void;
  onDeleteSavedImage: (id: string) => void;
}

export function NewsModal({
  isOpen, onClose, editingItem, formData, setFormData, isSubmitting, onSubmit,
  pendingGalleryFiles, savedGallery, isDeletingGalleryId, galleryProgress,
  onAddGalleryFiles, onRemovePendingFile, onDeleteSavedImage,
}: NewsModalProps) {
  const t = useTranslations("Dashboard.admin.news");

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={isSubmitting ? undefined : onClose}
            className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-t-[20px] sm:rounded-[20px] shadow-2xl overflow-hidden shadow-primary/10"
          >
            <div className="p-5 sm:p-8 border-b border-border flex items-center justify-between">
              <h2 className="text-2xl font-bold font-outfit text-primary">{editingItem ? t("editNews") : t("createNews")}</h2>
              <button onClick={onClose} className="p-2 hover:bg-primary/5 rounded-xl transition-colors"><X size={24} /></button>
            </div>

            <form onSubmit={onSubmit} className="p-5 sm:p-8 space-y-6 max-h-[80vh] sm:max-h-[75vh] overflow-y-auto custom-scrollbar">
              <NewsBasicFields formData={formData} setFormData={setFormData} />

              <NewsContentEditors
                content={formData.content}
                contentAr={formData.content_ar}
                onChangeContent={(val) => setFormData({ ...formData, content: val })}
                onChangeContentAr={(val) => setFormData({ ...formData, content_ar: val })}
              />

              <NewsGallerySection
                pendingFiles={pendingGalleryFiles}
                savedGallery={savedGallery}
                isDeletingId={isDeletingGalleryId}
                galleryProgress={galleryProgress}
                onAddFiles={onAddGalleryFiles}
                onRemovePending={onRemovePendingFile}
                onDeleteSaved={onDeleteSavedImage}
              />

              <div className="sticky bottom-0 -mx-5 sm:-mx-8 -mb-5 sm:-mb-8 px-5 sm:px-8 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-6 bg-white/95 backdrop-blur border-t border-border/60 flex items-center gap-3 sm:gap-4">
                <button type="button" onClick={onClose} disabled={isSubmitting} className="flex-1 px-4 sm:px-8 py-3.5 sm:py-4 bg-foreground/5 text-primary rounded-2xl font-bold hover:bg-foreground/10 transition-all font-outfit disabled:opacity-50">
                  {t("cancel")}
                </button>
                <button disabled={isSubmitting} className="flex-[2] px-4 sm:px-8 py-3.5 sm:py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 font-outfit transition-all active:scale-95 premium-gradient shadow-primary/20">
                  {isSubmitting ? (<><Loader2 className="animate-spin" size={20} />{t("saving")}</>) : editingItem ? t("updateNews") : t("createNews")}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
