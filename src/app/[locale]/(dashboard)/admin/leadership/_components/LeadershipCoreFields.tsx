"use client";

import { Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface LeadershipCoreFieldsProps {
  formData: {
    name: string;
    title: string;
    bio: string;
    order: number;
    is_active: boolean;
    photo: File | null;
  };
  setFormData: (data: any) => void;
}

export function LeadershipCoreFields({ formData, setFormData }: LeadershipCoreFieldsProps) {
  const t = useTranslations("Dashboard.admin.leadership");

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-border/50">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-primary uppercase tracking-[0.25em] px-1">{t("fullName")}</label>
          <input
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Hassan Ole Naado"
            className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-bold text-primary transition-all text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-primary uppercase tracking-[0.25em] px-1">{t("officialTitle")}</label>
          <input
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. National Chairman"
            className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-bold text-primary transition-all text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black text-primary uppercase tracking-[0.25em] px-1">{t("bioLabel")}</label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          placeholder={t("bioPlaceholder")}
          rows={4}
          className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all resize-none text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-border/50">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-primary uppercase tracking-[0.25em] px-1">{t("profilePhoto")}</label>
          <div className="relative group">
            <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, photo: e.target.files?.[0] || null })} className="hidden" id="profile-photo-upload" />
            <label htmlFor="profile-photo-upload" className="w-full px-6 py-4 bg-white border border-dashed border-border group-hover:border-primary/50 group-hover:shadow-lg rounded-2xl cursor-pointer flex items-center justify-center gap-3 text-foreground/30 font-black text-xs uppercase tracking-widest transition-all">
              {formData.photo ? (
                <>
                  <CheckCircle2 size={18} className="text-emerald-500" />
                  <span className="text-emerald-600 truncate max-w-[150px]">{formData.photo.name}</span>
                </>
              ) : (
                <>
                  <ImageIcon size={18} className="group-hover:text-primary transition-colors" />
                  <span>{t("selectPhoto")}</span>
                </>
              )}
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-primary uppercase tracking-[0.25em] px-1">{t("displayOrder")}</label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
            className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-bold text-primary transition-all text-sm"
          />
        </div>
      </div>
    </>
  );
}
