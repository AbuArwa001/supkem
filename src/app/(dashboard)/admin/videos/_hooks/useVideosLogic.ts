"use client";

import { useState, useEffect } from "react";
import { videoService } from "../_services/videoService";

export interface VideoBriefingItem {
  id: string;
  title: string;
  description: string;
  video_file: string;
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

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("is_published", formData.is_published ? "true" : "false");

    if (formData.video_file) {
      data.append("video_file", formData.video_file);
    }

    try {
      if (editingItem) {
        await videoService.updateVideo(editingItem.id, data);
      } else {
        await videoService.createVideo(data);
      }
      setIsModalOpen(false);
      fetchVideos();
    } catch (err: any) {
      console.error("Failed to save video", err.response?.data || err);
      const errorMsg = err.response?.data
        ? Object.entries(err.response.data)
            .map(([field, msgs]) => `${field}: ${msgs}`)
            .join("\n")
        : "Failed to save video. Please ensure all fields are correct.";
      alert(errorMsg);
    } finally {
      setIsSubmitting(false);
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
    handleOpenModal,
    handleSubmit,
    handleDelete
  };
};
