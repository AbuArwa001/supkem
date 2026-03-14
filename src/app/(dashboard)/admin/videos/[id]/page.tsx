"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Edit2,
    Calendar,
    User,
    PlayCircle,
    Film,
    CheckCircle2,
    XCircle,
    Trash2,
    Loader2
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api, { API_BASE_URL } from "@/lib/api";
import { cn } from "@/lib/utils";
import VideoPlayer from "@/components/news/VideoPlayer";

interface VideoBriefingItem {
    id: string;
    title: string;
    description: string;
    video_file: string;
    is_published: boolean;
    created_at: string;
    updated_at: string;
}

export default function AdminVideoDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [video, setVideo] = useState<VideoBriefingItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const res = await api.get(`/videos/${id}/`);
                setVideo(res.data);
            } catch (err) {
                console.error("Failed to fetch video detail", err);
            } finally {
                setLoading(false);
            }
        };
        fetchVideo();
    }, [id]);

    const handleDelete = async () => {
        if (!video) return;
        if (confirm("Are you sure you want to delete this video briefing?")) {
            try {
                await api.delete(`/videos/${video.id}/`);
                router.push("/admin/videos");
            } catch (err) {
                console.error("Failed to delete video", err);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="animate-spin text-primary" size={40} />
            </div>
        );
    }

    if (!video) {
        return (
            <div className="text-center py-20 space-y-4">
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto">
                    <XCircle size={40} />
                </div>
                <h2 className="text-2xl font-bold font-outfit text-primary">Video Not Found</h2>
                <p className="text-foreground/60">The video you are looking for does not exist or has been removed.</p>
                <Link href="/admin/videos" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
                    <ArrowLeft size={16} /> Back to Registry
                </Link>
            </div>
        );
    }

    const videoUrl = video.video_file.startsWith('http')
        ? video.video_file
        : `${API_BASE_URL}${video.video_file.startsWith('/') ? '' : '/'}${video.video_file}`;

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2">
                    <Link
                        href="/admin/videos"
                        className="inline-flex items-center gap-2 text-primary/60 hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px]"
                    >
                        <ArrowLeft size={14} /> Back to Video Registry
                    </Link>
                    <h1 className="text-4xl font-bold font-outfit text-primary tracking-tight">Briefing Preview</h1>
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        href={`/videos/${video.id}`}
                        target="_blank"
                        className="px-6 py-3 bg-slate-50 text-primary border border-border rounded-2xl font-bold hover:bg-white transition-all flex items-center gap-2"
                    >
                        Public Link
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="px-6 py-3 bg-red-50 text-red-500 border border-red-100 rounded-2xl font-bold hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
                    >
                        <Trash2 size={18} /> Delete
                    </button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Column: Player & Info */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="aspect-video bg-black rounded-[32px] overflow-hidden shadow-2xl border-4 border-white shadow-primary/5 relative">
                        <VideoPlayer url={videoUrl} />
                    </div>

                    <div className="bg-white border border-border rounded-[32px] p-8 lg:p-12 space-y-6">
                        <div className="flex items-center gap-3">
                            <span className={cn(
                                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                video.is_published ? "bg-green-100 text-green-600 border border-green-200" : "bg-amber-100 text-amber-600 border border-amber-200"
                            )}>
                                {video.is_published ? "Status: Published" : "Status: Draft"}
                            </span>
                        </div>
                        <h2 className="text-3xl font-black font-outfit text-primary tracking-tight">
                            {video.title}
                        </h2>
                        <div className="h-px bg-border/50 w-full" />
                        <div className="space-y-4">
                            <h3 className="text-sm font-black uppercase tracking-widest text-foreground/40">Description</h3>
                            <p className="text-lg text-foreground/70 leading-relaxed font-medium">
                                {video.description || "No description provided."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Metadata & Details */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white border border-border rounded-[32px] p-8 space-y-8">
                        <h3 className="text-xl font-bold font-outfit text-primary">Metadata Details</h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/5 rounded-xl">
                                    <Calendar className="text-primary" size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">Created Date</p>
                                    <p className="font-bold text-primary">{new Date(video.created_at).toLocaleDateString()}</p>
                                    <p className="text-xs text-foreground/40 font-medium">{new Date(video.created_at).toLocaleTimeString()}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/5 rounded-xl">
                                    <User className="text-primary" size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">Author</p>
                                    <p className="font-bold text-primary">SUPKEM Press Office</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/5 rounded-xl">
                                    <Film className="text-primary" size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">File Path</p>
                                    <p className="text-xs font-mono font-bold text-primary break-all">{video.video_file}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/5 rounded-xl">
                                    <CheckCircle2 className="text-primary" size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">Visibility</p>
                                    <p className="font-bold text-primary">{video.is_published ? "Visible to Everyone" : "Internal Review Only"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-border/50">
                            <Link
                                href={`/admin/videos`}
                                className="w-full py-4 bg-primary/5 text-primary rounded-2xl font-bold text-sm hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 group"
                            >
                                <Edit2 size={16} /> Edit Data in Registry
                            </Link>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-secondary to-primary-dark rounded-[32px] p-8 text-white shadow-xl shadow-secondary/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 scale-150 rotate-12">
                            <Film size={80} />
                        </div>
                        <div className="relative z-10 space-y-4">
                            <h3 className="text-xl font-bold font-outfit tracking-tight">System Info</h3>
                            <p className="text-xs opacity-80 leading-relaxed font-medium">This video briefing is stored securely on the council media servers. Last internal update was {new Date(video.updated_at).toLocaleDateString()}.</p>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">ID: {video.id}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
