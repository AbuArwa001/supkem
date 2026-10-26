"use client";

import { Link } from "@/i18n/routing";
import { PlayCircle, ArrowRight } from "lucide-react";
import VideoPlayer from "@/components/news/VideoPlayer";
import { resolveVideoStreamUrl, resolveVideoFallbackUrl, resolveVideoThumbnail } from "@/lib/videoUtils";
import { VideoItem } from "@/app/[locale]/(public)/news/_services/newsService";

interface VideoBriefingCardProps {
  video: VideoItem;
  locale: string;
  watchNowText: string;
}

export function VideoBriefingCard({ video, locale, watchNowText }: VideoBriefingCardProps) {
  const videoUrl = resolveVideoStreamUrl(video);
  const fallbackUrl = resolveVideoFallbackUrl(video);
  const thumbnailUrl = resolveVideoThumbnail(video);
  const formattedDate = new Date(video.created_at).toLocaleDateString(
    locale === "ar" ? "ar-KE" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <Link
      href={`/videos/${video.id}`}
      className="bg-white border border-border rounded-[16px] overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all group flex flex-col"
    >
      <div className="aspect-video relative bg-black flex items-center justify-center overflow-hidden">
        <VideoPlayer
          url={videoUrl}
          fallbackUrl={fallbackUrl}
          poster={thumbnailUrl}
          title={video.title}
          isCardPreview
        />
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
          <span>{formattedDate}</span>
          <span className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
            {watchNowText} <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
