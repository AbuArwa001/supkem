"use client";

import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface NewsPaperMetaFieldsProps {
  formData: {
    title: string;
    issue_number: string;
    published_date: string;
    is_published: boolean;
  };
  setFormData: (data: any) => void;
}

export function NewsPaperMetaFields({ formData, setFormData }: NewsPaperMetaFieldsProps) {
  const t = useTranslations("Dashboard.admin.newsPapers");

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
          className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">
            {t("issueNumber")}
          </label>
          <input
            value={formData.issue_number}
            onChange={(e) => setFormData({ ...formData, issue_number: e.target.value })}
            placeholder={t("issueNumberPlaceholder")}
            className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">
            {t("publishedDate")}
          </label>
          <input
            type="date"
            required
            value={formData.published_date}
            onChange={(e) => setFormData({ ...formData, published_date: e.target.value })}
            className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all"
          />
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
    </>
  );
}
