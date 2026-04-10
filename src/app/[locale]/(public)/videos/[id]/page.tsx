import { Calendar, User, ArrowLeft, PlayCircle, Film, Share2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import api, { API_BASE_URL } from "@/lib/api";
import { notFound } from "next/navigation";
import VideoPlayer from "@/components/news/VideoPlayer";
import ShareButton from "@/components/news/ShareButton";

async function getVideo(id: string) {
    try {
        const res = await api.get(`/videos/${id}/`);
        return res.data;
    } catch {
        return null;
    }
}

export default async function VideoBriefingPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const video = await getVideo(id);

    if (!video || !video.is_published) {
        notFound();
    }

    const videoUrl = video.video_file.startsWith('http')
        ? video.video_file
        : `${API_BASE_URL}${video.video_file.startsWith('/') ? '' : '/'}${video.video_file}`;

    return (
        <div className="pb-24 bg-slate-50 min-h-screen">
            {/* Dark Hero Section for Video */}
            <header className="relative bg-black pt-20 pb-12 lg:pt-32 lg:pb-24 px-6 overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10 space-y-8">
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs bg-white/5 px-4 py-2 rounded-full backdrop-blur-md"
                    >
                        <ArrowLeft size={14} /> Back to Media
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-12 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest">
                                <Film size={12} /> Press Briefing
                            </div>
                            <h1 className="text-4xl lg:text-7xl font-black font-outfit text-white leading-tight tracking-tighter">
                                {video.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-8 text-sm font-bold text-white/40 uppercase tracking-widest">
                                <span className="flex items-center gap-2.5">
                                    <Calendar size={16} className="text-primary" />
                                    {new Date(video.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                                <span className="flex items-center gap-2.5">
                                    <User size={16} className="text-primary" />
                                    SUPKEM Media
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Video Content Section */}
            <main className="max-w-5xl mx-auto px-6 -mt-10 lg:-mt-20 relative z-20">
                <div className="space-y-12">
                    {/* Premium Video Container */}
                    <div className="aspect-video bg-black rounded-[20px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border-4 border-white/5 relative group">
                        <VideoPlayer url={videoUrl} />
                    </div>

                    {/* Meta & Description */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white rounded-[16px] p-8 lg:p-12 shadow-xl shadow-black/5 border border-slate-100">
                                <h2 className="text-2xl font-black font-outfit text-primary mb-6 flex items-center gap-3">
                                    <PlayCircle className="text-secondary" />
                                    About this Briefing
                                </h2>
                                <p className="text-lg text-foreground/70 leading-relaxed font-medium whitespace-pre-wrap">
                                    {video.description || "Official press briefing and announcement from the Supreme Council of Kenya Muslims."}
                                </p>
                            </div>
                        </div>

                        {/* Sidebar / Actions */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-[16px] p-6 shadow-xl shadow-black/5 border border-slate-100 space-y-6">
                                <p className="text-xs font-black uppercase tracking-widest text-foreground/40 px-2">Actions</p>
                                <ShareButton title={video.title} />
                                <Link
                                    href="/news"
                                    className="w-full py-4 bg-slate-50 text-primary rounded-[20px] font-bold text-sm hover:bg-primary/5 transition-all flex items-center justify-center gap-2 border border-slate-100"
                                >
                                    More Media Content
                                </Link>
                            </div>

                            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-[16px] p-8 text-white shadow-xl shadow-primary/20 space-y-4">
                                <h3 className="text-xl font-bold font-outfit tracking-tight">Stay Informed</h3>
                                <p className="text-sm opacity-80 leading-relaxed font-medium">Follow our official channels for the most accurate and up-to-date information.</p>
                                <div className="pt-2">
                                    <Link href="/contact" className="text-xs font-black uppercase tracking-widest underline underline-offset-4 hover:text-white/80 transition-all">Contact Press Office</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
