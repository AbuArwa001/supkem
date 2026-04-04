import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Image as ImageIcon,
  CheckCircle2,
  Loader2,
  User,
} from "lucide-react";
import { LeadershipProfile } from "@/services/leadership-service";
import { cn } from "@/lib/utils";

interface LeadershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingItem: LeadershipProfile | null;
  formData: {
    name: string;
    title: string;
    bio: string;
    order: number;
    is_active: boolean;
    photo: File | null;
  };
  setFormData: (data: any) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function LeadershipModal({
  isOpen,
  onClose,
  editingItem,
  formData,
  setFormData,
  isSubmitting,
  onSubmit,
}: LeadershipModalProps) {
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
            className="relative w-full max-w-xl bg-white rounded-[20px] shadow-2xl overflow-hidden border border-border"
          >
            {/* Header */}
            <div className="p-8 border-b border-border flex items-center justify-between bg-slate-50/50">
              <div className="space-y-1">
                <h2 className="text-2xl font-black font-outfit text-primary tracking-tight">
                  {editingItem ? "Edit Official" : "Add New Official"}
                </h2>
                <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest">
                  Leadership Profile Editor
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-3 hover:bg-white rounded-2xl transition-all hover:shadow-md border border-transparent hover:border-border group"
              >
                <X
                  size={24}
                  className="text-foreground/30 group-hover:text-primary transition-colors"
                />
              </button>
            </div>

            <form
              onSubmit={onSubmit}
              className="p-8 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-border/50">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-primary uppercase tracking-[0.25em] px-1">
                    Full Name
                  </label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Hassan Ole Naado"
                    className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-bold text-primary transition-all text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-primary uppercase tracking-[0.25em] px-1">
                    Official Title
                  </label>
                  <input
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g. National Chairman"
                    className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-bold text-primary transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.25em] px-1">
                  Professional Bio / Description
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  placeholder="Tell us about their role and background..."
                  rows={4}
                  className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all resize-none text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-border/50">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-primary uppercase tracking-[0.25em] px-1">
                    Profile Photo
                  </label>
                  <div className="relative group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          photo: e.target.files?.[0] || null,
                        })
                      }
                      className="hidden"
                      id="profile-photo-upload"
                    />
                    <label
                      htmlFor="profile-photo-upload"
                      className="w-full px-6 py-4 bg-white border border-dashed border-border group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/5 rounded-2xl cursor-pointer flex items-center justify-center gap-3 text-foreground/30 font-black text-xs uppercase tracking-widest transition-all"
                    >
                      {formData.photo ? (
                        <>
                          <CheckCircle2
                            size={18}
                            className="text-emerald-500"
                          />
                          <span className="text-emerald-600 truncate max-w-[150px]">
                            {formData.photo.name}
                          </span>
                        </>
                      ) : (
                        <>
                          <ImageIcon
                            size={18}
                            className="group-hover:text-primary transition-colors"
                          />
                          <span>Select Photo</span>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-primary uppercase tracking-[0.25em] px-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        order: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-bold text-primary transition-all text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 py-2">
                <label className="flex items-center gap-3 cursor-pointer group select-none">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        is_active: e.target.checked,
                      })
                    }
                    className="hidden"
                  />
                  <div
                    className={cn(
                      "w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all",
                      formData.is_active
                        ? "bg-primary border-primary shadow-lg shadow-primary/20 scale-110"
                        : "border-border group-hover:border-primary/30",
                    )}
                  >
                    {formData.is_active && (
                      <CheckCircle2 size={16} className="text-white" />
                    )}
                  </div>
                  <span className="font-black text-primary text-xs uppercase tracking-widest">
                    Visible on website
                  </span>
                </label>
              </div>

              {/* Actions */}
              <div className="pt-8 flex items-center gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-8 py-5 bg-foreground/[0.03] text-primary rounded-[20px] font-black text-xs uppercase tracking-widest hover:bg-foreground/[0.06] transition-all active:scale-95 border border-border"
                >
                  Discard
                </button>
                <button
                  disabled={isSubmitting}
                  className="flex-[2] px-8 py-5 bg-primary text-white rounded-[20px] font-black text-xs uppercase tracking-widest hover:shadow-2xl hover:shadow-primary/30 flex items-center justify-center gap-3 disabled:opacity-50 transition-all active:scale-95 premium-gradient"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Processing...
                    </>
                  ) : editingItem ? (
                    "Re-publish Profile"
                  ) : (
                    "Publish Profile"
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
