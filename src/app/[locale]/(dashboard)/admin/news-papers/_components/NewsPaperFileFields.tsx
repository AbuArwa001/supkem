"use client";

import { FileText, Image as ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface NewsPaperFileFieldsProps {
  file: File | null;
  coverImage: File | null;
  onFileChange: (file: File | null) => void;
  onCoverChange: (file: File | null) => void;
  isEditing: boolean;
}

export function NewsPaperFileFields({
  file,
  coverImage,
  onFileChange,
  onCoverChange,
  isEditing,
}: NewsPaperFileFieldsProps) {
  const t = useTranslations("Dashboard.admin.newsPapers");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">
          {t("pdfFile")}
        </label>
        <div className="relative group">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => onFileChange(e.target.files?.[0] || null)}
            className="hidden"
            id="pdf-upload"
            required={!isEditing}
          />
          <label
            htmlFor="pdf-upload"
            className="w-full px-6 py-4 bg-primary/[0.02] border border-dashed border-border group-hover:border-primary/50 rounded-2xl cursor-pointer flex items-center justify-center gap-2 text-foreground/40 font-bold transition-all"
          >
            <FileText size={20} />
            <span className="truncate max-w-[150px]">
              {file ? file.name : t("selectPdf")}
            </span>
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">
          {t("coverImage")}
        </label>
        <div className="relative group">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onCoverChange(e.target.files?.[0] || null)}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="w-full px-6 py-4 bg-primary/[0.02] border border-dashed border-border group-hover:border-primary/50 rounded-2xl cursor-pointer flex items-center justify-center gap-2 text-foreground/40 font-bold transition-all"
          >
            <ImageIcon size={20} />
            <span className="truncate max-w-[150px]">
              {coverImage ? coverImage.name : t("selectImage")}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
