import { useState, useEffect, useMemo } from "react";
import { NewsService, NewsGalleryService, NewsItem, NewsGalleryItem } from "@/services/news-service";
import { toast } from "sonner";
import { compressImage } from "@/lib/upload";

export interface GalleryUploadProgress {
    total: number;
    uploaded: number;
    failed: number;
    /** Combined percent (0-100) across all files, including in-flight bytes. */
    percent: number;
    phase: "saving" | "optimizing" | "uploading";
}

const GALLERY_CONCURRENCY = 3;

export function useNewsLogic() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        title_ar: "",
        content: "",
        content_ar: "",
        is_published: true,
        featured_image: null as File | null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Gallery state
    const [pendingGalleryFiles, setPendingGalleryFiles] = useState<File[]>([]);
    const [savedGallery, setSavedGallery] = useState<NewsGalleryItem[]>([]);
    const [isDeletingGalleryId, setIsDeletingGalleryId] = useState<string | null>(null);
    const [galleryProgress, setGalleryProgress] = useState<GalleryUploadProgress | null>(null);

    const fetchNews = async () => {
        setLoading(true);
        try {
            const data = await NewsService.getNews();
            setNews(data);
        } catch (err) {
            console.error("Failed to fetch news", err);
            toast.error("Failed to fetch news.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleOpenModal = (item: NewsItem | null = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title,
                title_ar: item.title_ar || "",
                content: item.content,
                content_ar: item.content_ar || "",
                is_published: item.is_published,
                featured_image: null,
            });
            setSavedGallery(item.gallery || []);
        } else {
            setEditingItem(null);
            setFormData({
                title: "",
                title_ar: "",
                content: "",
                content_ar: "",
                is_published: true,
                featured_image: null,
            });
            setSavedGallery([]);
        }
        setPendingGalleryFiles([]);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setPendingGalleryFiles([]);
    };

    const handleAddGalleryFiles = (files: File[]) => {
        setPendingGalleryFiles((prev) => [...prev, ...files]);
    };

    const handleRemovePendingFile = (index: number) => {
        setPendingGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleDeleteSavedImage = async (galleryId: string) => {
        if (!editingItem) return;
        setIsDeletingGalleryId(galleryId);
        try {
            await NewsGalleryService.deleteImage(editingItem.slug, galleryId);
            setSavedGallery((prev) => prev.filter((img) => img.id !== galleryId));
            toast.success("Gallery image deleted");
        } catch (err) {
            console.error("Failed to delete gallery image", err);
            toast.error("Failed to delete gallery image");
        } finally {
            setIsDeletingGalleryId(null);
        }
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
        if (formData.featured_image) {
            data.append("featured_image", await compressImage(formData.featured_image));
        }

        try {
            let slug: string;
            let saved: NewsItem;
            if (editingItem) {
                saved = await NewsService.updateNews(editingItem.slug, data);
            } else {
                saved = await NewsService.createNews(data);
            }
            slug = saved.slug;

            // Upload pending gallery images after save (tracked, concurrent)
            if (pendingGalleryFiles.length > 0) {
                const total = pendingGalleryFiles.length;
                const perFile = new Array(total).fill(0);
                let uploaded = 0;
                const failedFiles: File[] = [];
                const newItems: NewsGalleryItem[] = [];

                const publish = (phase: GalleryUploadProgress["phase"]) =>
                    setGalleryProgress({
                        total,
                        uploaded,
                        failed: failedFiles.length,
                        percent: Math.round(perFile.reduce((a, b) => a + b, 0) / total),
                        phase,
                    });

                publish("optimizing");
                let cursor = 0;
                const worker = async () => {
                    while (cursor < total) {
                        const i = cursor++;
                        const original = pendingGalleryFiles[i];
                        try {
                            const file = await compressImage(original);
                            const result = await NewsGalleryService.addImage(slug, file, (p) => {
                                perFile[i] = p;
                                publish("uploading");
                            });
                            perFile[i] = 100;
                            uploaded++;
                            newItems.push(...(Array.isArray(result) ? result : []));
                        } catch (galleryError) {
                            console.error("Gallery upload failed", galleryError);
                            perFile[i] = 100;
                            failedFiles.push(original);
                        }
                        publish("uploading");
                    }
                };
                await Promise.all(
                    Array.from({ length: Math.min(GALLERY_CONCURRENCY, total) }, worker)
                );
                setGalleryProgress(null);

                if (failedFiles.length > 0) {
                    // Keep the modal open so the user can retry just the failed files.
                    setPendingGalleryFiles(failedFiles);
                    setSavedGallery((prev) => [...prev, ...newItems]);
                    setEditingItem((prev) => prev ?? ({ ...saved, gallery: [] } as NewsItem));
                    toast.warning(
                        `News saved. ${uploaded} of ${total} images uploaded, ${failedFiles.length} failed — press Save to retry them.`
                    );
                    fetchNews();
                    return;
                }
                toast.success(editingItem ? "News updated with gallery successfully!" : "News created with gallery successfully!");
            } else {
                toast.success(editingItem ? "News updated successfully!" : "News created successfully!");
            }

            setIsModalOpen(false);
            fetchNews();
        } catch (err: any) {
            console.error("Failed to save news", err);
            toast.error(err.response?.data?.detail || err.message || "Failed to save news.");
        } finally {
            setIsSubmitting(false);
            setGalleryProgress(null);
        }
    };

    const handleDelete = async (slug: string) => {
        if (confirm("Are you sure you want to delete this news item?")) {
            try {
                await NewsService.deleteNews(slug);
                fetchNews();
            } catch (err) {
                console.error("Failed to delete news", err);
            }
        }
    };

    const filteredNews = useMemo(() => {
        return news.filter((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.title_ar || "").toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [news, searchTerm]);

    return {
        news: filteredNews,
        loading,
        searchTerm,
        setSearchTerm,
        isModalOpen,
        editingItem,
        formData,
        setFormData,
        isSubmitting,
        handleOpenModal,
        handleCloseModal,
        handleSubmit,
        handleDelete,
        fetchNews,
        // Gallery
        pendingGalleryFiles,
        savedGallery,
        isDeletingGalleryId,
        galleryProgress,
        handleAddGalleryFiles,
        handleRemovePendingFile,
        handleDeleteSavedImage,
    };
}
