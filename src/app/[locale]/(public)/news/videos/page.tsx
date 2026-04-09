import { VideoBriefings } from "@/app/(public)/news/_components/VideoBriefings";
import { getVideos } from "@/app/(public)/news/_services/newsService";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const revalidate = 60;

export default async function VideoBriefingsPage() {
    const videos = await getVideos();

    return (
        <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <Link
                    href="/news"
                    className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors font-bold uppercase tracking-widest text-xs bg-primary/5 px-4 py-2 rounded-full"
                >
                    <ArrowLeft size={14} /> Back to News Hub
                </Link>
            </div>
            <VideoBriefings videos={videos} limit={0} />
        </div>
    );
}
