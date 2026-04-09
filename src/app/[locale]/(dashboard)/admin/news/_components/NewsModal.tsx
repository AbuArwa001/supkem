import React, { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Image as ImageIcon,
  CheckCircle2,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import dynamic from "next/dynamic";
import { NewsItem, NewsGalleryItem } from "@/services/news-service";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

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
  // Gallery props
  pendingGalleryFiles: File[];
  savedGallery: NewsGalleryItem[];
  isDeletingGalleryId: string | null;
  onAddGalleryFiles: (files: File[]) => void;
  onRemovePendingFile: (index: number) => void;
  onDeleteSavedImage: (id: string) => void;
}

/** Renders a thumbnail for a pending (local) gallery file. */
function PendingGalleryThumb({
  file,
  index,
  onRemove,
}: {
  file: File;
  index: number;
  onRemove: (i: number) => void;
}) {
  const url = React.useMemo(() => URL.createObjectURL(file), [file]);
  React.useEffect(() => () => URL.revokeObjectURL(url), [url]);
  const t = useTranslations("Dashboard.admin.news");

  return (
    <div className="relative group rounded-xl overflow-hidden aspect-square border border-border">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt={file.name} className="w-full h-full object-cover" />
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
        aria-label={t("removeImage")}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}

/** Renders a thumbnail for an already-saved gallery image. */
function SavedGalleryThumb({
  item,
  isDeleting,
  onDelete,
}: {
  item: NewsGalleryItem;
  isDeleting: boolean;
  onDelete: (id: string) => void;
}) {
  const t = useTranslations("Dashboard.admin.news");
  return (
    <div className="relative group rounded-xl overflow-hidden aspect-square border border-border">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt={item.caption || t("galleryImageAlt")}
        className="w-full h-full object-cover"
      />
      <button
        type="button"
        onClick={() => onDelete(item.id)}
        disabled={isDeleting}
        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white disabled:cursor-not-allowed"
        aria-label={t("deleteImage")}
      >
        {isDeleting ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Trash2 size={18} />
        )}
      </button>
    </div>
  );
}

/**
 * Modal component for creating and editing news items,
 * including gallery image uploads.
 */
export function NewsModal({
  isOpen,
  onClose,
  editingItem,
  formData,
  setFormData,
  isSubmitting,
  onSubmit,
  pendingGalleryFiles,
  savedGallery,
  isDeletingGalleryId,
  onAddGalleryFiles,
  onRemovePendingFile,
  onDeleteSavedImage,
}: NewsModalProps) {
  const t = useTranslations("Dashboard.admin.news");

  const handleGalleryDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.startsWith("image/")
      );
      if (files.length > 0) onAddGalleryFiles(files);
    },
    [onAddGalleryFiles]
  );

  const handleGalleryInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) onAddGalleryFiles(files);
      e.target.value = "";
    },
    [onAddGalleryFiles]
  );

  const totalGalleryCount =
    savedGallery.length + pendingGalleryFiles.length;

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
            {/* Header */}
            <div className="p-8 border-b border-border flex items-center justify-between">
              <h2 className="text-2xl font-bold font-outfit text-primary">
                {editingItem ? t("editNews") : t("createNews")}
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
              className="p-8 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar"
            >
              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">
                  {t("title")}
                </label>
                <input
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder={t("titlePlaceholder")}
                  className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all"
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">
                  {t("contentLabel")}
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
                      placeholder: t("contentPlaceholder"),
                    }}
                  />
                </div>
              </div>

              {/* Featured Image & Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">
                    {t("featuredImage")}
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
                        : t("selectImage")}
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
                            : "border-border group-hover:border-primary/30"
                        )}
                      >
                        {formData.is_published && (
                          <CheckCircle2 size={14} className="text-white" />
                        )}
                      </div>
                      <span className="font-bold text-primary text-sm">
                        {t("published")}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Gallery Upload Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <label className="text-sm font-bold text-primary uppercase tracking-widest">
                    {t("gallery")}
                    {totalGalleryCount > 0 && (
                      <span className="ml-2 rtl:mr-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold normal-case tracking-normal">
                        {totalGalleryCount} {totalGalleryCount === 1 ? t("image") : t("images")}
                      </span>
                    )}
                  </label>
                </div>

                {/* Drop zone */}
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleGalleryDrop}
                  className="relative border-2 border-dashed border-border hover:border-primary/40 rounded-2xl p-6 transition-all group bg-primary/[0.01] hover:bg-primary/[0.03]"
                >
                  <input
                    type="file"
                    id="gallery-upload"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleGalleryInputChange}
                  />
                  <label
                    htmlFor="gallery-upload"
                    className="flex flex-col items-center gap-2 cursor-pointer text-foreground/40 group-hover:text-primary/60 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Plus size={20} className="text-primary" />
                    </div>
                    <span className="text-sm font-semibold text-center">
                      {t("dropImages")}
                    </span>
                    <span className="text-xs text-center">
                      {t("fileSupports")}
                    </span>
                  </label>
                </div>

                {/* Gallery grid */}
                {totalGalleryCount > 0 && (
                  <div className="grid grid-cols-4 gap-3">
                    {/* Saved (server-side) images */}
                    {savedGallery.map((item) => (
                      <SavedGalleryThumb
                        key={item.id}
                        item={item}
                        isDeleting={isDeletingGalleryId === item.id}
                        onDelete={onDeleteSavedImage}
                      />
                    ))}

                    {/* Pending (local) files queued for upload */}
                    {pendingGalleryFiles.map((file, i) => (
                      <PendingGalleryThumb
                        key={`${file.name}-${i}`}
                        file={file}
                        index={i}
                        onRemove={onRemovePendingFile}
                      />
                    ))}
                  </div>
                )}

                {pendingGalleryFiles.length > 0 && (
                  <p className="text-xs text-primary/50 px-1 font-medium">
                    {pendingGalleryFiles.length} {pendingGalleryFiles.length === 1 ? t("image") : t("images")} {t("queued")}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-8 py-4 bg-foreground/5 text-primary rounded-2xl font-bold hover:bg-foreground/10 transition-all font-outfit"
                >
                  {t("cancel")}
                </button>
                <button
                  disabled={isSubmitting}
                  className="flex-[2] px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 font-outfit transition-all active:scale-95 premium-gradient shadow-primary/20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      {t("saving")}
                    </>
                  ) : editingItem ? (
                    t("updateNews")
                  ) : (
                    t("createNews")
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

