"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { LeadershipProfile } from "@/services/leadership-service";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { LeadershipCoreFields } from "./LeadershipCoreFields";
import { LeadershipSocialFields } from "./LeadershipSocialFields";

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
    twitter_url: string;
    linkedin_url: string;
    facebook_url: string;
  };
  setFormData: (data: any) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function LeadershipModal({
  isOpen, onClose, editingItem, formData, setFormData, isSubmitting, onSubmit,
}: LeadershipModalProps) {
  const t = useTranslations("Dashboard.admin.leadership");

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-primary/20 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-xl bg-white rounded-[20px] shadow-2xl overflow-hidden border border-border"
          >
            <div className="p-8 border-b border-border flex items-center justify-between bg-slate-50/50">
              <div className="space-y-1">
                <h2 className="text-2xl font-black font-outfit text-primary tracking-tight">{editingItem ? t("editOfficial") : t("addOfficial")}</h2>
                <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest">{t("editorTitle")}</p>
              </div>
              <button onClick={onClose} className="p-3 hover:bg-white rounded-2xl transition-all hover:shadow-md border border-transparent hover:border-border group">
                <X size={24} className="text-foreground/30 group-hover:text-primary transition-colors" />
              </button>
            </div>

            <form onSubmit={onSubmit} className="p-8 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
              <LeadershipCoreFields formData={formData} setFormData={setFormData} />

              <LeadershipSocialFields
                linkedinUrl={formData.linkedin_url}
                twitterUrl={formData.twitter_url}
                facebookUrl={formData.facebook_url}
                onChange={(f, val) => setFormData({ ...formData, [f]: val })}
              />

              <div className="flex items-center gap-4 py-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} className="hidden" />
                  <div className={cn("w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all", formData.is_active ? "bg-primary border-primary" : "border-border group-hover:border-primary/30")}>
                    {formData.is_active && <CheckCircle2 size={14} className="text-white" />}
                  </div>
                  <span className="font-bold text-primary text-sm">{t("statusActive")}</span>
                </label>
              </div>

              <div className="pt-8 flex items-center gap-4 border-t border-border/50">
                <button type="button" onClick={onClose} className="flex-1 px-8 py-4 bg-foreground/5 text-primary rounded-2xl font-bold hover:bg-foreground/10 transition-all font-outfit">
                  {t("cancel")}
                </button>
                <button
                  disabled={isSubmitting}
                  className="flex-[2] px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 font-outfit transition-all active:scale-95 premium-gradient shadow-primary/20"
                >
                  {isSubmitting ? (<><Loader2 className="animate-spin" size={20} />{t("saving")}</>) : editingItem ? t("updateOfficial") : t("addOfficial")}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
