import api from "@/lib/api";

/**
 * Service for video CRUD operations.
 * Handles FormData for file uploads.
 */
export const videoService = {
  getVideos: async () => {
    const res = await api.get("/videos/");
    return res.data.results || res.data;
  },

  getVideoById: async (id: string) => {
    const res = await api.get(`/videos/${id}/`);
    return res.data;
  },

  createVideo: async (formData: FormData) => {
    return api.post("/videos/", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  },

  updateVideo: async (id: string, formData: FormData) => {
    return api.patch(`/videos/${id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  },

  deleteVideo: async (id: string) => {
    return api.delete(`/videos/${id}/`);
  }
};
