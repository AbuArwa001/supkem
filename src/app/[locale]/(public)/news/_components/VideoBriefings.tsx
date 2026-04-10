"use client";

import Link from "next/link";
import { Film, PlayCircle, ArrowRight } from "lucide-react";
import VideoPlayer from "@/components/news/VideoPlayer";
import useSWR from "swr";
import { API_BASE_URL } from "@/lib/api";
import { VideoItem } from "@/app/[locale]/(public)/news/_services/newsService";
import { useTranslations } from "next-intl";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://supkem-drf.onrender.com";

interface VideoBriefingsProps {
  videos: VideoItem[];
  limit?: number;
}

export function VideoBriefings({ videos: initialVideos, limit = 6 }: VideoBriefingsProps) {
  const t = useTranslations("NewsPage.videos");

  const { data: videos } = useSWR<VideoItem[]>(
    `${API_BASE}/api/v1/videos/`,
    (url: string) =>
      fetch(url)
        .then((r) => r.json())
        .then((d) => {
          const items = Array.isArray(d) ? d : (d?.results ?? []);
          return items.filter((item: VideoItem) => item.is_published);
        }),
    { fallbackData: initialVideos, refreshInterval: 30000 },
  );

  if (!videos || videos.length === 0) return null;

  const displayVideos = limit > 0 ? videos.slice(0, limit) : videos;
  const hasMore = limit > 0 && videos.length > limit;

  return (
    <section className="max-w-7xl mx-auto px-6 space-y-12">
      <div className="flex items-center gap-4">
        <div className="p-4 bg-primary/5 rounded-2xl">
          <Film className="text-primary" size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-black font-outfit text-primary tracking-tight">
            {t("heading")}
          </h2>
          <p className="text-foreground/60 font-medium">{t("desc")}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayVideos.map((video, i) => {
          const videoUrl = video.video_file.startsWith("https")
            ? video.video_file
            : `${API_BASE_URL}${video.video_file.startsWith("/") ? "" : "/"}${video.video_file}`;

          return (
            <Link
              key={i}
              href={`/videos/${video.id}`}
              className="bg-white border border-border rounded-[16px] overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all group flex flex-col"
            >
              <div className="aspect-video relative bg-black flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 pointer-events-none z-10 bg-black/20 group-hover:bg-transparent transition-colors" />
                <VideoPlayer url={videoUrl} />
                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
                    <PlayCircle size={32} />
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col">
                <h3 className="text-xl font-bold font-outfit text-primary line-clamp-2 group-hover:text-secondary transition-colors">
                  {video.title}
                </h3>
                {video.description && (
                  <p className="text-sm text-foreground/60 line-clamp-2">{video.description}</p>
                )}
                <div className="pt-4 mt-auto border-t border-border/50 flex items-center justify-between text-xs font-bold text-foreground/30 uppercase tracking-widest">
                  <span>{new Date(video.created_at).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    {t("watchNow")} <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-8">
          <Link
            href="/news/videos"
            className="px-8 py-4 bg-white hover:bg-primary/5 text-primary border-2 border-primary/20 rounded-full font-bold uppercase tracking-widest text-sm flex items-center gap-3 transition-all hover:gap-5"
          >
            {t("viewAll")} <ArrowRight size={18} />
          </Link>
        </div>
      )}
    </section>
  );
}
