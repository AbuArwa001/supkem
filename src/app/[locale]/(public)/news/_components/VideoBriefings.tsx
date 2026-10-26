"use client";

import { Link } from "@/i18n/routing";
import { Film, ArrowRight } from "lucide-react";
import useSWR from "swr";
import { VideoItem } from "@/app/[locale]/(public)/news/_services/newsService";
import { useTranslations, useLocale } from "next-intl";
import { VideoBriefingCard } from "./VideoBriefingCard";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://supkem-drf.onrender.com";

interface VideoBriefingsProps {
  videos: VideoItem[];
  limit?: number;
}

export function VideoBriefings({ videos: initialVideos, limit = 3 }: VideoBriefingsProps) {
  const t = useTranslations("NewsPage.videos");
  const locale = useLocale();

  const { data: videos } = useSWR<VideoItem[]>(
    [`${API_BASE}/api/v1/videos/`, locale],
    ([url, loc]: [string, string]) =>
      fetch(url, { headers: { "Accept-Language": loc } })
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
        {displayVideos.map((video, i) => (
          <VideoBriefingCard key={video.id || i} video={video} locale={locale} watchNowText={t("watchNow")} />
        ))}
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
