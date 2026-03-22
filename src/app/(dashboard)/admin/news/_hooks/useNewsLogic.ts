import { useState, useEffect, useMemo } from "react";
import { NewsService, NewsItem } from "@/services/news-service";

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
        featured_image: null as File | null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

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
                featured_image: null
            });
        } else {
            setEditingItem(null);
            setFormData({
                title: "",
                content: "",
                is_published: true,
                featured_image: null
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
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
            if (editingItem) {
                await NewsService.updateNews(editingItem.slug, data);
            } else {
                await NewsService.createNews(data);
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
    };
}
