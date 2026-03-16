"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { videoService } from "../../_services/videoService";
import { VideoBriefingItem } from "../../_hooks/useVideosLogic";

/**
 * Custom hook for video detail page logic.
 */
export const useVideoDetailLogic = (id: string) => {
  const router = useRouter();
  const [video, setVideo] = useState<VideoBriefingItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await videoService.getVideoById(id);
        setVideo(data);
      } catch (err) {
        console.error("Failed to fetch video detail", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id]);

  const handleDelete = async () => {
    if (!video) return;
    if (confirm("Are you sure you want to delete this video briefing?")) {
      try {
        await videoService.deleteVideo(video.id);
        router.push("/admin/videos");
      } catch (err) {
        console.error("Failed to delete video", err);
      }
    }
  };

  return {
    video,
    loading,
    handleDelete
  };
};
