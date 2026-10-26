import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import api from "@/lib/api";
import { resolveVideoStreamUrl, resolveVideoFallbackUrl } from "@/lib/videoUtils";
import VideoPlayer from "@/components/news/VideoPlayer";
import { VideoHero } from "./_components/VideoHero";
import { VideoDescription } from "./_components/VideoDescription";
import { VideoSidebar } from "./_components/VideoSidebar";
import { VideoSchema } from "./_components/VideoSchema";

interface PageProps {
    params: Promise<{ id: string; locale: string }>;
}

async function getVideo(id: string, locale: string) {
    try {
        const res = await api.get(`/videos/${id}/`, { headers: { "Accept-Language": locale } });
        return res.data;
    } catch {
        return null;
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id, locale } = await params;
    const video = await getVideo(id, locale);
    if (!video || !video.is_published) return {};
    const title = `${video.title} | SUPKEM Press Briefing`;
    const description = video.description?.slice(0, 160) || "SUPKEM Official Media Briefing";
    return {
        title,
        description,
        openGraph: { title, description, type: "video.other" },
        twitter: { card: "summary_large_image", title, description },
    };
}

export default async function VideoBriefingPage({ params }: PageProps) {
    const { id, locale } = await params;
    const t = await getTranslations({ locale, namespace: "NewsPage.videoDetail" });
    const video = await getVideo(id, locale);

    if (!video || !video.is_published) notFound();

    const videoUrl = resolveVideoStreamUrl(video);
    const fallbackUrl = resolveVideoFallbackUrl(video);

    return (
        <div className="pb-24 bg-slate-50 min-h-screen">
            <VideoSchema title={video.title} description={video.description || "SUPKEM Briefing"} uploadDate={video.created_at} contentUrl={videoUrl} />
            <VideoHero title={video.title} createdAt={video.created_at} locale={locale} backText={t("backToMedia")} pressBriefingText={t("pressBriefing")} supkemMediaText={t("supkemMedia")} />
            <main className="max-w-5xl mx-auto px-6 -mt-10 lg:-mt-20 relative z-20 space-y-12">
                <div className="aspect-video bg-black rounded-[20px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border-4 border-white/5 relative group">
                    <VideoPlayer url={videoUrl} fallbackUrl={fallbackUrl} title={video.title} />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    <div className="lg:col-span-2 space-y-8">
                        <VideoDescription heading={t("aboutBriefing")} description={video.description} defaultDesc={t("defaultDesc")} />
                    </div>
                    <VideoSidebar title={video.title} actionsLabel={t("actions")} moreMediaLabel={t("moreMedia")} stayInformedTitle={t("stayInformed")} followChannelsDesc={t("followChannels")} contactPressLabel={t("contactPressOffice")} />
                </div>
            </main>
        </div>
    );
}
