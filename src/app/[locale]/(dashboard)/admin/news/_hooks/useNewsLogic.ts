import { useState, useEffect, useMemo } from "react";
import { NewsService, NewsGalleryService, NewsItem, NewsGalleryItem } from "@/services/news-service";
import { toast } from "sonner";
import { compressImage } from "@/lib/upload";
import { uploadNewsGalleryBatch, GalleryUploadProgress } from "./newsGalleryUpload";

export type { GalleryUploadProgress };

export function useNewsLogic() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState({ title: "", title_ar: "", content: "", content_ar: "", is_published: true, featured_image: null as File | null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingGalleryFiles, setPendingGalleryFiles] = useState<File[]>([]);
  const [savedGallery, setSavedGallery] = useState<NewsGalleryItem[]>([]);
  const [isDeletingGalleryId, setIsDeletingGalleryId] = useState<string | null>(null);
  const [galleryProgress, setGalleryProgress] = useState<GalleryUploadProgress | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    try { setNews(await NewsService.getNews()); } catch (err) { console.error("Failed to fetch news", err); toast.error("Failed to fetch news."); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetchNews(); }, []);
  const handleOpenModal = (item: NewsItem | null = null) => {
    setEditingItem(item);
    setFormData({
      title: item?.title || "", title_ar: item?.title_ar || "", content: item?.content || "",
      content_ar: item?.content_ar || "", is_published: item ? item.is_published : true, featured_image: null,
    });
    setSavedGallery(item?.gallery || []);
    setPendingGalleryFiles([]);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => { setIsModalOpen(false); setPendingGalleryFiles([]); };
  const handleAddGalleryFiles = (files: File[]) => setPendingGalleryFiles((prev) => [...prev, ...files]);
  const handleRemovePendingFile = (idx: number) => setPendingGalleryFiles((prev) => prev.filter((_, i) => i !== idx));

  const handleDeleteSavedImage = async (galleryId: string) => {
    if (!editingItem) return;
    setIsDeletingGalleryId(galleryId);
    try {
      await NewsGalleryService.deleteImage(editingItem.slug, galleryId);
      setSavedGallery((prev) => prev.filter((img) => img.id !== galleryId));
      toast.success("Gallery image deleted");
    } catch { toast.error("Failed to delete gallery image"); }
    finally { setIsDeletingGalleryId(null); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = new FormData();
    data.append("title", formData.title);
    if (formData.title_ar) data.append("title_ar", formData.title_ar);
    data.append("content", formData.content);
    if (formData.content_ar) data.append("content_ar", formData.content_ar);
    data.append("is_published", String(formData.is_published));
    if (formData.featured_image) data.append("featured_image", await compressImage(formData.featured_image));
    try {
      const saved = editingItem ? await NewsService.updateNews(editingItem.slug, data) : await NewsService.createNews(data);
      if (pendingGalleryFiles.length > 0) {
        const { uploaded, failedFiles, newItems } = await uploadNewsGalleryBatch(saved.slug, pendingGalleryFiles, setGalleryProgress);
        setGalleryProgress(null);
        if (failedFiles.length > 0) {
          setPendingGalleryFiles(failedFiles);
          setSavedGallery((prev) => [...prev, ...newItems]);
          setEditingItem((prev) => prev ?? ({ ...saved, gallery: [] } as NewsItem));
          toast.warning(`News saved. ${uploaded} uploaded, ${failedFiles.length} failed — press Save to retry.`);
          fetchNews(); return;
        }
      }
      toast.success(editingItem ? "News updated successfully!" : "News created successfully!");
      setIsModalOpen(false);
      fetchNews();
    } catch (err: any) { toast.error(err.response?.data?.detail || err.message || "Failed to save news."); }
    finally { setIsSubmitting(false); setGalleryProgress(null); }
  };

  const handleDelete = async (slug: string) => {
    if (confirm("Are you sure you want to delete this news item?")) {
      try { await NewsService.deleteNews(slug); fetchNews(); } catch { toast.error("Failed to delete news"); }
    }
  };

  const filteredNews = useMemo(() => news.filter((i) =>
    i.title.toLowerCase().includes(searchTerm.toLowerCase()) || (i.title_ar || "").toLowerCase().includes(searchTerm.toLowerCase())
  ), [news, searchTerm]);

  return {
    news: filteredNews, loading, searchTerm, setSearchTerm, isModalOpen, editingItem, formData, setFormData, isSubmitting,
    handleOpenModal, handleCloseModal, handleSubmit, handleDelete, fetchNews, pendingGalleryFiles, savedGallery,
    isDeletingGalleryId, galleryProgress, handleAddGalleryFiles, handleRemovePendingFile, handleDeleteSavedImage,
  };
}
