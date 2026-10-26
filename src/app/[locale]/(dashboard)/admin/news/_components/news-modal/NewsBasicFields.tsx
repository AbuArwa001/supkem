"use client";

import { Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface NewsBasicFieldsProps {
  formData: {
    title: string;
    title_ar: string;
    is_published: boolean;
    featured_image: File | null;
  };
  setFormData: (data: any) => void;
}

export function NewsBasicFields({ formData, setFormData }: NewsBasicFieldsProps) {
  const t = useTranslations("Dashboard.admin.news");

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">
          {t("title")}
        </label>
        <input
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder={t("titlePlaceholder")}
          className="w-full px-4 sm:px-6 py-3.5 sm:py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary text-base transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-primary/70 uppercase tracking-widest px-1">
          {t("titleAr")}
        </label>
        <input
          value={formData.title_ar}
          onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
          placeholder={t("titleArPlaceholder")}
          dir="rtl"
          className="w-full px-4 sm:px-6 py-3.5 sm:py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary text-base transition-all text-right font-arabic"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">
            {t("featuredImage")}
          </label>
          <div className="relative group">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, featured_image: e.target.files?.[0] || null })}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="w-full px-6 py-4 bg-primary/[0.02] border border-dashed border-border group-hover:border-primary/50 rounded-2xl cursor-pointer flex items-center justify-center gap-2 text-foreground/40 font-bold transition-all"
            >
              <ImageIcon size={20} />
              {formData.featured_image ? formData.featured_image.name : t("selectImage")}
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">
            {t("status")}
          </label>
          <div className="flex items-center gap-4 py-4">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.is_published}
                onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                className="hidden"
              />
              <div
                className={cn(
                  "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                  formData.is_published ? "bg-primary border-primary" : "border-border group-hover:border-primary/30"
                )}
              >
                {formData.is_published && <CheckCircle2 size={14} className="text-white" />}
              </div>
              <span className="font-bold text-primary text-sm">{t("published")}</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
