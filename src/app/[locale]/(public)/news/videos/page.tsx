"use client";

import { VideoBriefings } from "@/app/[locale]/(public)/news/_components/VideoBriefings";
import { getVideos } from "@/app/[locale]/(public)/news/_services/newsService";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { VideoItem } from "@/app/[locale]/(public)/news/_services/newsService";

export default function VideoBriefingsPage() {
    const t = useTranslations("NewsPage.hero");
    const [videos, setVideos] = useState<VideoItem[]>([]);

    useEffect(() => {
        getVideos().then(setVideos);
    }, []);

    return (
        <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <Link
                    href="/news"
                    className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors font-bold uppercase tracking-widest text-xs bg-primary/5 px-4 py-2 rounded-full"
                >
                    <ArrowLeft size={14} /> {t("backToNews")}
                </Link>
            </div>
            <VideoBriefings videos={videos} limit={0} />
        </div>
    );
}

