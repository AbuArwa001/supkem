import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Image as ImageIcon, CheckCircle2, Loader2 } from "lucide-react";
import { NewsPaperItem } from "@/services/news-service";
import { cn } from "@/lib/utils";

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
  onSubmit: (e: React.FormEvent) => void;
}

export function NewsPaperModal({
  isOpen,
  onClose,
  editingItem,
  formData,
  setFormData,
  isSubmitting,
  onSubmit,
}: NewsPaperModalProps) {
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
            className="relative w-full max-w-2xl bg-white rounded-[20px] shadow-2xl overflow-hidden shadow-primary/10"
          >
            <div className="p-8 border-b border-border flex items-center justify-between">
              <h2 className="text-2xl font-bold font-outfit text-primary">
                {editingItem ? "Edit News Paper" : "Upload News Paper"}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-primary/5 rounded-xl transition-colors"
                type="button"
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
                  placeholder="Enter news paper title..."
                  className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">
                    Issue Number
                  </label>
                  <input
                    value={formData.issue_number}
                    onChange={(e) =>
                      setFormData({ ...formData, issue_number: e.target.value })
                    }
                    placeholder="e.g. Issue 7"
                    className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">
                    Published Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.published_date}
                    onChange={(e) =>
                      setFormData({ ...formData, published_date: e.target.value })
                    }
                    className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">
                    PDF File
                  </label>
                  <div className="relative group">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          file: e.target.files?.[0] || null,
                        })
                      }
                      className="hidden"
                      id="pdf-upload"
                      required={!editingItem}
                    />
                    <label
                      htmlFor="pdf-upload"
                      className="w-full px-6 py-4 bg-primary/[0.02] border border-dashed border-border group-hover:border-primary/50 rounded-2xl cursor-pointer flex items-center justify-center gap-2 text-foreground/40 font-bold transition-all"
                    >
                      <FileText size={20} />
                      <span className="truncate max-w-[150px]">
                        {formData.file
                            ? formData.file.name
                            : "Select PDF"}
                      </span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">
                    Cover Image (Optional)
                  </label>
                  <div className="relative group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cover_image: e.target.files?.[0] || null,
                        })
                      }
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="w-full px-6 py-4 bg-primary/[0.02] border border-dashed border-border group-hover:border-primary/50 rounded-2xl cursor-pointer flex items-center justify-center gap-2 text-foreground/40 font-bold transition-all"
                    >
                      <ImageIcon size={20} />
                       <span className="truncate max-w-[150px]">
                        {formData.cover_image
                            ? formData.cover_image.name
                            : "Select Image"}
                       </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">
                  Status
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
                      Published
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-8 flex items-center gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-8 py-4 bg-foreground/5 text-primary rounded-2xl font-bold hover:bg-foreground/10 transition-all font-outfit"
                >
                  Cancel
                </button>
                <button
                  disabled={isSubmitting}
                  className="flex-[2] px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 font-outfit transition-all active:scale-95 premium-gradient shadow-primary/20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Saving...
                    </>
                  ) : editingItem ? (
                    "Update News Paper"
                  ) : (
                    "Create News Paper"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
