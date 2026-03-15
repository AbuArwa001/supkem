"use client";

import { cn } from "@/lib/utils";
import VideoPlayer from "@/components/news/VideoPlayer";
import { VideoBriefingItem } from "../../_hooks/useVideosLogic";

interface VideoPlayerSectionProps {
  video: VideoBriefingItem;
  videoUrl: string;
}

export const VideoPlayerSection = ({
  video,
  videoUrl,
}: VideoPlayerSectionProps) => {
  return (
    <div className="lg:col-span-8 space-y-8">
      <div className="aspect-video bg-black rounded-[32px] overflow-hidden shadow-2xl border-4 border-white shadow-primary/5 relative">
        <VideoPlayer url={videoUrl} />
      </div>

      <div className="bg-white border border-border rounded-[32px] p-8 lg:p-12 space-y-6">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
              video.is_published
                ? "bg-green-100 text-green-600 border border-green-200"
                : "bg-amber-100 text-amber-600 border border-amber-200",
            )}
          >
            {video.is_published ? "Status: Published" : "Status: Draft"}
          </span>
        </div>
        <h2 className="text-3xl font-black font-outfit text-primary tracking-tight">
          {video.title}
        </h2>
        <div className="h-px bg-border/50 w-full" />
        <div className="space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest text-foreground/40">
            Description
          </h3>
          <p className="text-lg text-foreground/70 leading-relaxed font-medium">
            {video.description || "No description provided."}
          </p>
        </div>
      </div>
    </div>
  );
};
