"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Video as VideoIcon, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { VideoFormData, VideoBriefingItem } from "../_hooks/useVideosLogic";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  formData: VideoFormData;
  setFormData: (data: VideoFormData) => void;
  editingItem: VideoBriefingItem | null;
  isSubmitting: boolean;
}

export const VideoModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  editingItem,
  isSubmitting,
}: VideoModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[20px] shadow-2xl overflow-hidden shadow-primary/10"
          >
            <div className="p-8 border-b border-border flex items-center justify-between">
              <h2 className="text-2xl font-bold font-outfit text-primary">
                {editingItem ? "Edit Video Briefing" : "Upload Video Briefing"}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-primary/5 rounded-xl transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form
              onSubmit={onSubmit}
              className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar"
            >
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">
                  Title
                </label>
                <input
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter video title..."
                  className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Add a short description... (optional)"
                  className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">
                  Video File (*.mp4, *.webm)
                </label>
                <div className="relative group">
                  <input
                    type="file"
                    accept="video/mp4,video/webm"
                    required={!editingItem}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        video_file: e.target.files?.[0] || null,
                      })
                    }
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="w-full px-6 py-4 bg-primary/[0.02] border border-dashed border-border group-hover:border-primary/50 rounded-2xl cursor-pointer flex flex-col items-center justify-center gap-3 text-foreground/40 font-bold transition-all min-h-[120px]"
                  >
                    <VideoIcon
                      size={32}
                      className="text-primary/30 group-hover:text-primary transition-colors"
                    />
                    <span className="text-center">
                      {formData.video_file ? (
                        <span className="text-primary">
                          {formData.video_file.name}
                        </span>
                      ) : editingItem ? (
                        <span>Click to replace existing video</span>
                      ) : (
                        <span>Click to Browse Video File</span>
                      )}
                    </span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">
                  Visibility Status
                </label>
                <div className="flex items-center gap-4 py-4">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.is_published}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          is_published: e.target.checked,
                        })
                      }
                      className="hidden"
                    />
                    <div
                      className={cn(
                        "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                        formData.is_published
                          ? "bg-primary border-primary"
                          : "border-border group-hover:border-primary/30",
                      )}
                    >
                      {formData.is_published && (
                        <CheckCircle2 size={14} className="text-white" />
                      )}
                    </div>
                    <span className="font-bold text-primary text-sm">
                      Published to Public
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-8 flex items-center gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-8 py-4 bg-foreground/5 text-primary rounded-2xl font-bold hover:bg-foreground/10 transition-all"
                >
                  Cancel
                </button>
                <button
                  disabled={isSubmitting}
                  className="flex-[2] px-8 py-4 bg-primary text-white rounded-2xl font-bold hover-lift premium-gradient shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Uploading...
                    </>
                  ) : editingItem ? (
                    "Update Video"
                  ) : (
                    "Upload Video"
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
