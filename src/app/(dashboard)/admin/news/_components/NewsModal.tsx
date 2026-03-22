import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Image as ImageIcon, CheckCircle2, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { NewsItem } from "@/services/news-service";
import { cn } from "@/lib/utils";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingItem: NewsItem | null;
  formData: {
    title: string;
    content: string;
    is_published: boolean;
    featured_image: File | null;
  };
  setFormData: (data: any) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

/**
 * Modal component for creating and editing news items.
 */
export function NewsModal({
  isOpen,
  onClose,
  editingItem,
  formData,
  setFormData,
  isSubmitting,
  onSubmit,
}: NewsModalProps) {
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
                {editingItem ? "Edit News" : "Create News"}
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
                  placeholder="Enter news title..."
                  className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">
                  Content (Markdown Supported)
                </label>
                <div
                  data-color-mode="light"
                  className="border border-border rounded-2xl overflow-hidden focus-within:border-primary/20 transition-all"
                >
                  <MDEditor
                    value={formData.content}
                    onChange={(val?: string) =>
                      setFormData({ ...formData, content: val || "" })
                    }
                    preview="edit"
                    height={300}
                    className="!border-none"
                    textareaProps={{
                      placeholder: "Write your news story in markdown...",
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">
                    Featured Image
                  </label>
                  <div className="relative group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          featured_image: e.target.files?.[0] || null,
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
                      {formData.featured_image
                        ? formData.featured_image.name
                        : "Select Image"}
                    </label>
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
                    "Update News"
                  ) : (
                    "Create News"
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
