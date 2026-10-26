"use client";

import React from "react";
import { Plus, Camera, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { UploadProgress } from "@/components/UploadProgress";
import type { NewsGalleryItem } from "@/services/news-service";
import type { GalleryUploadProgress } from "../../_hooks/useNewsLogic";

function PendingThumb({ file, index, onRemove }: { file: File; index: number; onRemove: (i: number) => void }) {
  const url = React.useMemo(() => URL.createObjectURL(file), [file]);
  React.useEffect(() => () => URL.revokeObjectURL(url), [url]);
  return (
    <div className="relative group rounded-xl overflow-hidden aspect-square border border-border">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt={file.name} className="w-full h-full object-cover" />
      <button type="button" onClick={() => onRemove(index)} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
        <Trash2 size={18} />
      </button>
    </div>
  );
}

function SavedThumb({ item, isDeleting, onDelete }: { item: NewsGalleryItem; isDeleting: boolean; onDelete: (id: string) => void }) {
  return (
    <div className="relative group rounded-xl overflow-hidden aspect-square border border-border">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.image} alt={item.caption || "Gallery"} className="w-full h-full object-cover" />
      <button type="button" onClick={() => onDelete(item.id)} disabled={isDeleting} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white disabled:cursor-not-allowed">
        <Trash2 size={18} />
      </button>
    </div>
  );
}

interface NewsGallerySectionProps {
  pendingFiles: File[];
  savedGallery: NewsGalleryItem[];
  isDeletingId: string | null;
  galleryProgress: GalleryUploadProgress | null;
  onAddFiles: (files: File[]) => void;
  onRemovePending: (index: number) => void;
  onDeleteSaved: (id: string) => void;
}

export function NewsGallerySection({
  pendingFiles, savedGallery, isDeletingId, galleryProgress, onAddFiles, onRemovePending, onDeleteSaved,
}: NewsGallerySectionProps) {
  const t = useTranslations("Dashboard.admin.news");
  const total = savedGallery.length + pendingFiles.length;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length) onAddFiles(Array.from(e.dataTransfer.files));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) onAddFiles(Array.from(e.target.files));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <label className="text-sm font-bold text-primary uppercase tracking-widest">
          {t("gallery")}{total > 0 && <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">{total} {total === 1 ? t("image") : t("images")}</span>}
        </label>
      </div>

      <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} className="relative border-2 border-dashed border-border hover:border-primary/40 rounded-2xl p-6 transition-all group bg-primary/[0.01]">
        <input type="file" id="gallery-upload" accept="image/*" multiple className="hidden" onChange={handleInput} />
        <label htmlFor="gallery-upload" className="flex flex-col items-center gap-2 cursor-pointer text-foreground/40 group-hover:text-primary/60 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"><Plus size={20} className="text-primary" /></div>
          <span className="text-sm font-semibold text-center">{t("dropImages")}</span>
          <span className="text-xs text-center">{t("fileSupports")}</span>
        </label>
        <input type="file" id="gallery-camera" accept="image/*" capture="environment" className="hidden" onChange={handleInput} />
        <label htmlFor="gallery-camera" className="sm:hidden mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary/10 text-primary font-bold active:scale-95 transition-transform">
          <Camera size={20} /> Take photo
        </label>
      </div>

      {total > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {savedGallery.map((item) => (<SavedThumb key={item.id} item={item} isDeleting={isDeletingId === item.id} onDelete={onDeleteSaved} />))}
          {pendingFiles.map((file, i) => (<PendingThumb key={`${file.name}-${i}`} file={file} index={i} onRemove={onRemovePending} />))}
        </div>
      )}

      {galleryProgress && (
        <UploadProgress
          percent={galleryProgress.percent}
          label={galleryProgress.phase === "optimizing" ? t("optimizingImages") : t("uploadingGallery", { uploaded: galleryProgress.uploaded, total: galleryProgress.total })}
          detail={galleryProgress.failed > 0 ? t("galleryUploadWarning", { count: galleryProgress.failed }) : undefined}
        />
      )}
    </div>
  );
}
