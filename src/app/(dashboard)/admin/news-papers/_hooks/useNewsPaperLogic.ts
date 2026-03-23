import { useState, useEffect, useMemo } from "react";
import { NewsPaperService, NewsPaperItem } from "@/services/news-service";

export function useNewsPaperLogic() {
    const [newsPapers, setNewsPapers] = useState<NewsPaperItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<NewsPaperItem | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        issue_number: "",
        published_date: new Date().toISOString().split('T')[0],
        is_published: true,
        file: null as File | null,
        cover_image: null as File | null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchNewsPapers = async () => {
        setLoading(true);
        try {
            const data = await NewsPaperService.getNewsPapers();
            setNewsPapers(data);
        } catch (err) {
            console.error("Failed to fetch news papers", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNewsPapers();
    }, []);

    const handleOpenModal = (item: NewsPaperItem | null = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title,
                issue_number: item.issue_number || "",
                published_date: item.published_date || new Date().toISOString().split('T')[0],
                is_published: item.is_published,
                file: null,
                cover_image: null
            });
        } else {
            setEditingItem(null);
            setFormData({
                title: "",
                issue_number: "",
                published_date: new Date().toISOString().split('T')[0],
                is_published: true,
                file: null,
                cover_image: null
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
        data.append("issue_number", formData.issue_number);
        data.append("published_date", formData.published_date);
        data.append("is_published", String(formData.is_published));
        if (formData.file) {
            data.append("file", formData.file);
        }
        if (formData.cover_image) {
            data.append("cover_image", formData.cover_image);
        }

        try {
            if (editingItem) {
                await NewsPaperService.updateNewsPaper(editingItem.id, data);
            } else {
                await NewsPaperService.createNewsPaper(data);
            }
            setIsModalOpen(false);
            fetchNewsPapers();
        } catch (err) {
            console.error("Failed to save news paper", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this news paper?")) {
            try {
                await NewsPaperService.deleteNewsPaper(id);
                fetchNewsPapers();
            } catch (err) {
                console.error("Failed to delete news paper", err);
            }
        }
    };

    const filteredNewsPapers = useMemo(() => {
        return newsPapers.filter((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [newsPapers, searchTerm]);

    return {
        newsPapers: filteredNewsPapers,
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
        fetchNewsPapers,
    };
}
