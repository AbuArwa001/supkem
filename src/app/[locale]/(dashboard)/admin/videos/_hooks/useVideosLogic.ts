"use client";

import { useState, useEffect } from "react";
import { videoService } from "../_services/videoService";
import { VideoBriefingItem, VideoFormData } from "../_types";
import { useVideoSubmit } from "./useVideoSubmit";

export type { VideoBriefingItem, VideoFormData };

const initialForm: VideoFormData = { title: "", description: "", is_published: true, video_file: null };

export const useVideosLogic = () => {
  const [videos, setVideos] = useState<VideoBriefingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<VideoBriefingItem | null>(null);
  const [formData, setFormData] = useState<VideoFormData>(initialForm);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      setVideos(await videoService.getVideos());
    } catch (err) {
      console.error("Failed to fetch videos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVideos(); }, []);

  const { isSubmitting, uploadPercent, submitVideo } = useVideoSubmit(() => {
    setIsModalOpen(false);
    fetchVideos();
  });

  const handleOpenModal = (item: VideoBriefingItem | null = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ title: item.title, description: item.description || "", is_published: item.is_published, video_file: null });
    } else {
      setEditingItem(null);
      setFormData(initialForm);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitVideo(formData, editingItem);
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
    videos: filteredVideos, loading, searchTerm, setSearchTerm, isModalOpen, setIsModalOpen,
    editingItem, formData, setFormData, isSubmitting, uploadPercent, handleOpenModal, handleSubmit, handleDelete,
  };
};
