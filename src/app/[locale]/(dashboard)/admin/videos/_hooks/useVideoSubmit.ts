"use client";

import { useState } from "react";
import { videoService } from "../_services/videoService";
import { uploadVideoDirect } from "@/lib/upload";
import { VideoBriefingItem, VideoFormData } from "../_types";

export function useVideoSubmit(onSuccess: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadPercent, setUploadPercent] = useState<number | null>(null);

  const submitVideo = async (formData: VideoFormData, editingItem: VideoBriefingItem | null) => {
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
        const key = await uploadVideoDirect(formData.video_file, setUploadPercent);
        if (key) {
          data.append("video_key", key);
        } else {
          data.append("video_file", formData.video_file);
        }
      }

      const sendingFile = data.has("video_file");
      const onProgress = sendingFile ? setUploadPercent : undefined;

      if (editingItem) {
        await videoService.updateVideo(editingItem.id, data, onProgress);
      } else {
        await videoService.createVideo(data, onProgress);
      }
      onSuccess();
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

  return { isSubmitting, uploadPercent, submitVideo };
}
