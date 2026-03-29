import { useState, useEffect, useMemo } from "react";
import { NewsService, NewsGalleryService, NewsItem, NewsGalleryItem } from "@/services/news-service";
import { toast } from "sonner";

export function useNewsLogic() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        is_published: true,
        featured_image: null as File | null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Gallery state
    const [pendingGalleryFiles, setPendingGalleryFiles] = useState<File[]>([]);
    const [savedGallery, setSavedGallery] = useState<NewsGalleryItem[]>([]);
    const [isDeletingGalleryId, setIsDeletingGalleryId] = useState<string | null>(null);

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
                content: item.content,
                is_published: item.is_published,
                featured_image: null,
            });
            setSavedGallery(item.gallery || []);
        } else {
            setEditingItem(null);
            setFormData({
                title: "",
                content: "",
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
        data.append("content", formData.content);
        data.append("is_published", String(formData.is_published));
        if (formData.featured_image) {
            data.append("featured_image", formData.featured_image);
        }

        try {
            let slug: string;
            if (editingItem) {
                const updated = await NewsService.updateNews(editingItem.slug, data);
                slug = updated.slug;
            } else {
                const created = await NewsService.createNews(data);
                slug = created.slug;
            }

            // Upload pending gallery images after save
            if (pendingGalleryFiles.length > 0) {
                try {
                    await NewsGalleryService.addImages(slug, pendingGalleryFiles);
                    toast.success(editingItem ? "News updated with gallery successfully!" : "News created with gallery successfully!");
                } catch (galleryError: any) {
                    console.error("Gallery upload failed", galleryError);
                    toast.error(
                        galleryError.message 
                        || "News saved, but gallery images failed to upload (file too large or invalid)."
                    );
                }
            } else {
                toast.success(editingItem ? "News updated successfully!" : "News created successfully!");
            }

            setIsModalOpen(false);
            fetchNews();
        } catch (err: any) {
            console.error("Failed to save news", err);
            toast.error(err.response?.data?.detail || "Failed to save news.");
        } finally {
            setIsSubmitting(false);
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
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
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
        handleAddGalleryFiles,
        handleRemovePendingFile,
        handleDeleteSavedImage,
    };
}
