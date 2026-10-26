"use client";

import { useState, useEffect } from "react";
import { videoService } from "../_services/videoService";
import { uploadVideoDirect } from "@/lib/upload";

export interface VideoBriefingItem {
  id: string;
  title: string;
  description: string;
  video_file: string;
  stream_url?: string;
  download_url?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface VideoFormData {
  title: string;
  description: string;
  is_published: boolean;
  video_file: File | null;
}

/**
 * Custom hook for managing video management business logic.
 */
export const useVideosLogic = () => {
  const [videos, setVideos] = useState<VideoBriefingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<VideoBriefingItem | null>(null);
  const [formData, setFormData] = useState<VideoFormData>({
    title: "",
    description: "",
    is_published: true,
    video_file: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadPercent, setUploadPercent] = useState<number | null>(null);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const data = await videoService.getVideos();
      setVideos(data);
    } catch (err) {
      console.error("Failed to fetch videos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleOpenModal = (item: VideoBriefingItem | null = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        description: item.description || "",
        is_published: item.is_published,
        video_file: null
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: "",
        description: "",
        is_published: true,
        video_file: null
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingItem && !formData.video_file) {
      alert("Please select a video file to upload.");
      return;
    }

    setIsSubmitting(true);
    setUploadPercent(null);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("is_published", formData.is_published ? "true" : "false");

    try {
      if (formData.video_file) {
        setUploadPercent(0);
        // Preferred: browser -> S3 directly (chunked, no server memory/timeouts)
        const key = await uploadVideoDirect(formData.video_file, setUploadPercent);
        if (key) {
          data.append("video_key", key);
        } else {
          data.append("video_file", formData.video_file);
        }
      }

      // Only the small metadata (or fallback file) goes through the API.
      const sendingFile = data.has("video_file");
      const onProgress = sendingFile ? setUploadPercent : undefined;
      if (editingItem) {
        await videoService.updateVideo(editingItem.id, data, onProgress);
      } else {
        await videoService.createVideo(data, onProgress);
      }
      setIsModalOpen(false);
      fetchVideos();
    } catch (err: any) {
      console.error("Failed to save video", err.response?.data || err);
      const errorMsg = err.response?.data
        ? Object.entries(err.response.data)
            .map(([field, msgs]) => `${field}: ${msgs}`)
            .join("\n")
        : err.message || "Failed to save video. Please ensure all fields are correct.";
      alert(errorMsg);
    } finally {
      setIsSubmitting(false);
      setUploadPercent(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this video briefing?")) {
      try {
        await videoService.deleteVideo(id);
        fetchVideos();
      } catch (err) {
        console.error("Failed to delete video", err);
      }
    }
  };

  const filteredVideos = videos.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    videos: filteredVideos,
    loading,
    searchTerm,
    setSearchTerm,
    isModalOpen,
    setIsModalOpen,
    editingItem,
    formData,
    setFormData,
    isSubmitting,
    uploadPercent,
    handleOpenModal,
    handleSubmit,
    handleDelete
  };
};
