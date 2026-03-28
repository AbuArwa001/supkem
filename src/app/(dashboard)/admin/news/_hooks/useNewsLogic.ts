import { useState, useEffect, useMemo } from "react";
import { NewsService, NewsGalleryService, NewsItem, NewsGalleryItem } from "@/services/news-service";

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
        } catch (err) {
            console.error("Failed to delete gallery image", err);
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
                await NewsGalleryService.addImages(slug, pendingGalleryFiles);
            }

            setIsModalOpen(false);
            fetchNews();
        } catch (err) {
            console.error("Failed to save news", err);
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
