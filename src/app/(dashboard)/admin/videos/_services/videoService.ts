import Cookies from 'js-cookie';
import api, { API_BASE_URL } from "@/lib/api";

async function postMultipart<T>(endpoint: string, data: FormData): Promise<T> {
    const token = Cookies.get('access_token');
    
    // Using native fetch guarantees flawless multipart/form-data boundary generation in the browser
    const response = await fetch(`${API_BASE_URL}/api/v1${endpoint}`, {
        method: 'POST',
        headers: {
            // Do NOT specify Content-Type, fetch sets it with boundary!
            Authorization: token ? `Bearer ${token}` : "",
        },
        body: data
    });

    if (!response.ok) {
        let errorMsg = `HTTP Error ${response.status}`;
        const text = await response.text();
        
        if (text.includes('<title>')) {
            const titleMatch = text.match(/<title>(.*?)<\/title>/);
            if (titleMatch) {
                errorMsg = titleMatch[1].replace("Exception value:", "").trim();
            }
        } else {
            try {
                const json = JSON.parse(text);
                errorMsg = json.detail || JSON.stringify(json);
            } catch (e) {
                errorMsg = text.substring(0, 500);
            }
        }
        throw new Error(errorMsg);
    }
    return response.json();
}

async function patchMultipart<T>(endpoint: string, data: FormData): Promise<T> {
    const token = Cookies.get('access_token');
    
    const response = await fetch(`${API_BASE_URL}/api/v1${endpoint}`, {
        method: 'PATCH',
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        },
        body: data
    });

    if (!response.ok) {
        let errorMsg = `HTTP Error ${response.status}`;
        const text = await response.text();
        if (text.includes('<title>')) {
            const titleMatch = text.match(/<title>(.*?)<\/title>/);
            if (titleMatch) {
                errorMsg = titleMatch[1].replace("Exception value:", "").trim();
            }
        } else {
            try {
                const json = JSON.parse(text);
                errorMsg = json.detail || JSON.stringify(json);
            } catch (e) {
                errorMsg = text.substring(0, 500); 
            }
        }
        throw new Error(errorMsg);
    }
    return response.json();
}

/**
 * Service for video CRUD operations.
 * Handles FormData for file uploads using native fetch wrappers.
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
    return await postMultipart("/videos/", formData);
  },

  updateVideo: async (id: string, formData: FormData) => {
    return await patchMultipart(`/videos/${id}/`, formData);
  },

  deleteVideo: async (id: string) => {
    return api.delete(`/videos/${id}/`);
  }
};
