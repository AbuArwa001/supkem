"use client";

import { use } from "react";
import { ArrowLeft, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/api";
import { useVideoDetailLogic } from "./_hooks/useVideoDetailLogic";
import { VideoPreviewHeader } from "./_components/VideoPreviewHeader";
import { VideoPlayerSection } from "./_components/VideoPlayerSection";
import { VideoMetadataSidebar } from "./_components/VideoMetadataSidebar";

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Admin Video Detail Page - Briefing Preview.
 * Adheres to 200-line readability constraint.
 */
export default function AdminVideoDetail({ params }: PageProps) {
  const { id } = use(params);
  const { video, loading, handleDelete } = useVideoDetailLogic(id);

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
        <h2 className="text-2xl font-bold font-outfit text-primary">
          Video Not Found
        </h2>
        <p className="text-foreground/60">
          The video you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/admin/videos"
          className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
        >
          <ArrowLeft size={16} /> Back to Registry
        </Link>
      </div>
    );
  }

  const videoUrl = video.video_file.startsWith("http")
    ? video.video_file
    : `${API_BASE_URL}${video.video_file.startsWith("/") ? "" : "/"}${video.video_file}`;

  return (
    <div className="space-y-10 pb-20">
      <VideoPreviewHeader video={video} onDelete={handleDelete} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <VideoPlayerSection video={video} videoUrl={videoUrl} />
        <VideoMetadataSidebar video={video} />
      </div>
    </div>
  );
}
