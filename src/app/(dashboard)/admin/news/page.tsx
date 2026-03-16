"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText,
    Plus,
    Search,
    Edit2,
    Trash2,
    X,
    Eye,
    Image as ImageIcon,
    CheckCircle2,
    AlertCircle,
    MoreVertical,
    Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import api, { API_BASE_URL } from "@/lib/api";
import Image from "next/image";
import dynamic from "next/dynamic";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

interface NewsItem {
    id: string;
    title: string;
    slug: string;
    content: string;
    featured_image: string | null;
    is_published: boolean;
    created_at: string;
    updated_at: string;
}

export default function AdminNews() {
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

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        setLoading(true);
        try {
            const res = await api.get("/news/");
            setNews(res.data.results || res.data);
        } catch (err) {
            console.error("Failed to fetch news", err);
        } finally {
            setLoading(false);
        }
    };

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
                await api.patch(`/news/${editingItem.slug}/`, data, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            } else {
                await api.post("/news/", data, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
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
                await api.delete(`/news/${slug}/`);
                fetchNews();
            } catch (err) {
                console.error("Failed to delete news", err);
            }
        }
    };

    const filteredNews = news.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-bold font-outfit text-primary tracking-tight">News CMS</h1>
                    <p className="text-foreground/60 font-medium">Manage latest updates and announcements.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors" />
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search news..."
                            className="pl-12 pr-4 py-3 bg-white border border-border focus:border-primary/20 rounded-2xl text-sm transition-all outline-none w-64 shadow-sm"
                        />
                    </div>

                    <button
                        onClick={() => handleOpenModal()}
                        className="px-6 py-3 bg-primary text-white rounded-2xl font-bold hover-lift premium-gradient shadow-lg flex items-center gap-2"
                    >
                        <Plus size={20} /> Create News
                    </button>
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="animate-spin text-primary" size={40} />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNews.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white border border-border rounded-[32px] overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all group flex flex-col"
                        >
                            {/* Image Placeholder/Preview */}
                            <div className="aspect-video relative bg-primary/5 flex items-center justify-center overflow-hidden">
                                {item.featured_image ? (
                                    <Image
                                        src={item.featured_image.startsWith('http') ? item.featured_image : `${API_BASE_URL}${item.featured_image.startsWith('/') ? '' : '/'}${item.featured_image}`}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <ImageIcon className="text-primary/20" size={48} />
                                )}
                                <div className="absolute top-4 right-4">
                                    <span className={cn(
                                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                        item.is_published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                                    )}>
                                        {item.is_published ? "Published" : "Draft"}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 space-y-4 flex-1 flex flex-col">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold font-outfit text-primary line-clamp-2">{item.title}</h3>
                                    <p className="text-sm text-foreground/60 line-clamp-3">{item.content}</p>
                                </div>

                                <div className="pt-6 mt-auto border-t border-border/50 flex items-center justify-between">
                                    <p className="text-xs font-bold text-foreground/30 uppercase tracking-widest">{new Date(item.created_at).toLocaleDateString()}</p>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleOpenModal(item)}
                                            className="p-2 bg-primary/5 text-primary rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.slug)}
                                            className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {filteredNews.length === 0 && (
                        <div className="col-span-full py-20 text-center space-y-4">
                            <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center mx-auto">
                                <FileText className="text-primary/20" size={40} />
                            </div>
                            <p className="text-foreground/40 font-bold">No news items found.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-2xl bg-white rounded-[20px] shadow-2xl overflow-hidden shadow-primary/10"
                        >
                            <div className="p-8 border-b border-border flex items-center justify-between">
                                <h2 className="text-2xl font-bold font-outfit text-primary">
                                    {editingItem ? "Edit News" : "Create News"}
                                </h2>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 hover:bg-primary/5 rounded-xl transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">Title</label>
                                    <input
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Enter news title..."
                                        className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">Content (Markdown Supported)</label>
                                    <div data-color-mode="light" className="border border-border rounded-2xl overflow-hidden focus-within:border-primary/20 transition-all">
                                        <MDEditor
                                            value={formData.content}
                                            onChange={(val?: string) => setFormData({ ...formData, content: val || "" })}
                                            preview="edit"
                                            height={300}
                                            className="!border-none"
                                            textareaProps={{
                                                placeholder: "Write your news story in markdown...",
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">Featured Image</label>
                                        <div className="relative group">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setFormData({ ...formData, featured_image: e.target.files?.[0] || null })}
                                                className="hidden"
                                                id="image-upload"
                                            />
                                            <label
                                                htmlFor="image-upload"
                                                className="w-full px-6 py-4 bg-primary/[0.02] border border-dashed border-border group-hover:border-primary/50 rounded-2xl cursor-pointer flex items-center justify-center gap-2 text-foreground/40 font-bold transition-all"
                                            >
                                                <ImageIcon size={20} />
                                                {formData.featured_image ? formData.featured_image.name : "Select Image"}
                                            </label>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">Status</label>
                                        <div className="flex items-center gap-4 py-4">
                                            <label className="flex items-center gap-2 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.is_published}
                                                    onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                                                    className="hidden"
                                                />
                                                <div className={cn(
                                                    "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                                                    formData.is_published ? "bg-primary border-primary" : "border-border group-hover:border-primary/30"
                                                )}>
                                                    {formData.is_published && <CheckCircle2 size={14} className="text-white" />}
                                                </div>
                                                <span className="font-bold text-primary text-sm">Published</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 flex items-center gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-8 py-4 bg-foreground/5 text-primary rounded-2xl font-bold hover:bg-foreground/10 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        disabled={isSubmitting}
                                        className="flex-[2] px-8 py-4 bg-primary text-white rounded-2xl font-bold hover-lift premium-gradient shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="animate-spin" size={20} />
                                                Saving...
                                            </>
                                        ) : (
                                            editingItem ? "Update News" : "Create News"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
