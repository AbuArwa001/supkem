"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    X,
    Video as VideoIcon,
    CheckCircle2,
    Loader2,
    Film
} from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";

interface VideoBriefingItem {
    id: string;
    title: string;
    description: string;
    video_file: string;
    is_published: boolean;
    created_at: string;
    updated_at: string;
}

export default function AdminVideos() {
    const [videos, setVideos] = useState<VideoBriefingItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<VideoBriefingItem | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        is_published: true,
        video_file: null as File | null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        setLoading(true);
        try {
            const res = await api.get("/videos/");
            setVideos(res.data.results || res.data);
        } catch (err) {
            console.error("Failed to fetch videos", err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (item: VideoBriefingItem | null = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title,
                description: item.description || "",
                is_published: item.is_published,
                video_file: null // Don't pre-fill file input for security/browser reasons
            });
        } else {
            setEditingItem(null);
            setFormData({
                title: "",
                description: "",
                is_published: true,
                video_file: null
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("is_published", String(formData.is_published));
        if (formData.video_file) {
            data.append("video_file", formData.video_file);
        }

        try {
            if (editingItem) {
                await api.patch(`/videos/${editingItem.id}/`, data, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            } else {
                await api.post("/videos/", data, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            }
            setIsModalOpen(false);
            fetchVideos();
        } catch (err) {
            console.error("Failed to save video", err);
            alert("Failed to save video. Please ensure the file is a valid video format and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this video briefing?")) {
            try {
                await api.delete(`/videos/${id}/`);
                fetchVideos();
            } catch (err) {
                console.error("Failed to delete video", err);
            }
        }
    };

    const filteredVideos = videos.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-bold font-outfit text-primary tracking-tight">Video Briefings</h1>
                    <p className="text-foreground/60 font-medium">Manage uploaded video content and press briefings.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors" />
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search videos..."
                            className="pl-12 pr-4 py-3 bg-white border border-border focus:border-primary/20 rounded-2xl text-sm transition-all outline-none w-64 shadow-sm"
                        />
                    </div>

                    <button
                        onClick={() => handleOpenModal()}
                        className="px-6 py-3 bg-primary text-white rounded-2xl font-bold hover-lift premium-gradient shadow-lg flex items-center gap-2"
                    >
                        <Plus size={20} /> Upload Video
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
                    {filteredVideos.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white border border-border rounded-[32px] overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all group flex flex-col"
                        >
                            {/* Video Placeholder */}
                            <div className="aspect-video relative bg-primary/5 flex items-center justify-center overflow-hidden">
                                {item.video_file ? (
                                    <video
                                        src={item.video_file.startsWith('http') ? item.video_file : `https://supkem-drf.onrender.com${item.video_file}`}
                                        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                    />
                                ) : (
                                    <VideoIcon className="text-primary/20" size={48} />
                                )}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Film size={20} className="ml-1" />
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4 relative z-10">
                                    <span className={cn(
                                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md",
                                        item.is_published ? "bg-green-500/90 text-white" : "bg-amber-500/90 text-white"
                                    )}>
                                        {item.is_published ? "Published" : "Draft"}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 space-y-4 flex-1 flex flex-col">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold font-outfit text-primary line-clamp-2">{item.title}</h3>
                                    <p className="text-sm text-foreground/60 line-clamp-2">{item.description || "No description provided."}</p>
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
                                            onClick={() => handleDelete(item.id)}
                                            className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {filteredVideos.length === 0 && (
                        <div className="col-span-full py-20 text-center space-y-4">
                            <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center mx-auto">
                                <Film className="text-primary/20" size={40} />
                            </div>
                            <p className="text-foreground/40 font-bold">No video briefings found.</p>
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
                            className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden shadow-primary/10"
                        >
                            <div className="p-8 border-b border-border flex items-center justify-between">
                                <h2 className="text-2xl font-bold font-outfit text-primary">
                                    {editingItem ? "Edit Video Briefing" : "Upload Video Briefing"}
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
                                        placeholder="Enter video title..."
                                        className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">Description</label>
                                    <textarea
                                        rows={4}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Add a short description... (optional)"
                                        className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all resize-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">Video File (*.mp4, *.webm)</label>
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            accept="video/mp4,video/webm"
                                            required={!editingItem} // Only required when creating a new one
                                            onChange={(e) => setFormData({ ...formData, video_file: e.target.files?.[0] || null })}
                                            className="hidden"
                                            id="video-upload"
                                        />
                                        <label
                                            htmlFor="video-upload"
                                            className="w-full px-6 py-4 bg-primary/[0.02] border border-dashed border-border group-hover:border-primary/50 rounded-2xl cursor-pointer flex flex-col items-center justify-center gap-3 text-foreground/40 font-bold transition-all min-h-[120px]"
                                        >
                                            <VideoIcon size={32} className="text-primary/30 group-hover:text-primary transition-colors" />
                                            <span className="text-center">
                                                {formData.video_file ? (
                                                    <span className="text-primary">{formData.video_file.name}</span>
                                                ) : editingItem ? (
                                                    <span>Click to replace existing video</span>
                                                ) : (
                                                    <span>Click to Browse Video File</span>
                                                )}
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">Visibility Status</label>
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
                                            <span className="font-bold text-primary text-sm">Published to Public</span>
                                        </label>
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
                                                Uploading...
                                            </>
                                        ) : (
                                            editingItem ? "Update Video" : "Upload Video"
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
