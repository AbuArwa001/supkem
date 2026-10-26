"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { VideoFormData, VideoBriefingItem } from "../_hooks/useVideosLogic";
import { useTranslations } from "next-intl";
import { VideoFileInput } from "./VideoFileInput";
import { VideoModalFields } from "./VideoModalFields";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  formData: VideoFormData;
  setFormData: (data: VideoFormData) => void;
  editingItem: VideoBriefingItem | null;
  isSubmitting: boolean;
  uploadPercent?: number | null;
}

export const VideoModal = ({
  isOpen, onClose, onSubmit, formData, setFormData, editingItem, isSubmitting, uploadPercent = null,
}: VideoModalProps) => {
  const t = useTranslations("Dashboard.admin.videos");

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
            className="relative w-full max-w-lg bg-white rounded-t-[20px] sm:rounded-[20px] shadow-2xl overflow-hidden shadow-primary/10"
          >
            <div className="p-5 sm:p-8 border-b border-border flex items-center justify-between">
              <h2 className="text-2xl font-bold font-outfit text-primary">
                {editingItem ? t("editVideo") : t("uploadVideoBriefing")}
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-primary/5 rounded-xl transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={onSubmit} className="p-5 sm:p-8 space-y-6 max-h-[80vh] sm:max-h-[70vh] overflow-y-auto custom-scrollbar">
              <VideoModalFields formData={formData} setFormData={setFormData} />

              <VideoFileInput
                videoFile={formData.video_file}
                onFileChange={(file) => setFormData({ ...formData, video_file: file })}
                isEditing={!!editingItem}
                isSubmitting={isSubmitting}
                uploadPercent={uploadPercent}
              />

              <div className="pt-8 flex items-center gap-4">
                <button
                  type="button" onClick={onClose}
                  className="flex-1 px-8 py-4 bg-foreground/5 text-primary rounded-2xl font-bold hover:bg-foreground/10 transition-all"
                >
                  {t("cancel")}
                </button>
                <button
                  disabled={isSubmitting}
                  className="flex-[2] px-8 py-4 bg-primary text-white rounded-2xl font-bold hover-lift premium-gradient shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      {t("uploading")}
                    </>
                  ) : editingItem ? (
                    t("updateVideo")
                  ) : (
                    t("uploadVideo")
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
