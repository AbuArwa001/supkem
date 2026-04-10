"use client";

import { ArrowLeft, Trash2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { VideoBriefingItem } from "../../_hooks/useVideosLogic";

interface VideoPreviewHeaderProps {
  video: VideoBriefingItem;
  onDelete: () => void;
}

export const VideoPreviewHeader = ({
  video,
  onDelete,
}: VideoPreviewHeaderProps) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div className="space-y-2">
        <Link
          href="/admin/videos"
          className="inline-flex items-center gap-2 text-primary/60 hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px]"
        >
          <ArrowLeft size={14} /> Back to Video Registry
        </Link>
        <h1 className="text-4xl font-bold font-outfit text-primary tracking-tight">
          Briefing Preview
        </h1>
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
          onClick={onDelete}
          className="px-6 py-3 bg-red-50 text-red-500 border border-red-100 rounded-2xl font-bold hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
        >
          <Trash2 size={18} /> Delete
        </button>
      </div>
    </div>
  );
};
