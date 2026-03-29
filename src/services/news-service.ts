import axios from 'axios';
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
        
        // Extract Django HTML Exception Title if DEBUG=True returned a traceback page (e.g. 170KB HTML)
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
                errorMsg = text.substring(0, 500); // snippet
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

export interface NewsGalleryItem {
    id: string;
    image: string;
    caption: string | null;
}

export interface NewsItem {
    id: string;
    title: string;
    slug: string;
    content: string;
    featured_image: string | null;
    is_published: boolean;
    created_at: string;
    updated_at: string;
    gallery: NewsGalleryItem[];
}

export interface NewsResponse {
    results?: NewsItem[];
}

/**
 * Service to handle news gallery image API calls.
 */
export const NewsGalleryService = {
    /**
     * Uploads one or more gallery images to a news article.
     * @param slug The news article slug.
     * @param files Array of image files to upload.
     * @returns The created gallery image records.
     */
    async addImages(slug: string, files: File[]): Promise<NewsGalleryItem[]> {
        const data = new FormData();
        files.forEach((f) => data.append("images", f));
        return await postMultipart<NewsGalleryItem[]>(`/news/news/${slug}/gallery/`, data);
    },

    /**
     * Deletes a gallery image by its ID.
     * @param slug The news article slug.
     * @param galleryId The gallery image ID.
     */
    async deleteImage(slug: string, galleryId: string): Promise<void> {
        await api.delete(`/news/news/${slug}/gallery/${galleryId}/`);
    },
};

/**
 * Service to handle news-related API calls.
 */
export const NewsService = {
    /**
     * Fetches all news items.
     * @returns List of news items.
     */
    async getNews(): Promise<NewsItem[]> {
        const response = await api.get<NewsItem[] | NewsResponse>("/news/news/");
        if (Array.isArray(response.data)) {
            return response.data;
        }
        return response.data.results || [];
    },

    /**
     * Creates a new news item.
     * @param data FormData containing title, content, is_published, and optional featured_image.
     * @returns The created news item.
     */
    async createNews(data: FormData): Promise<NewsItem> {
        return await postMultipart<NewsItem>("/news/news/", data);
    },

    /**
     * Updates an existing news item.
     * @param slug The slug of the news item to update.
     * @param data FormData containing title, content, is_published, and optional featured_image.
     * @returns The updated news item.
     */
    async updateNews(slug: string, data: FormData): Promise<NewsItem> {
        return await patchMultipart<NewsItem>(`/news/news/${slug}/`, data);
    },

    /**
     * Deletes a news item.
     * @param slug The slug of the news item to delete.
     */
    async deleteNews(slug: string): Promise<void> {
        await api.delete(`/news/news/${slug}/`);
    },
};

export interface NewsPaperItem {
    id: string;
    title: string;
    file: string | null;
    cover_image: string | null;
    issue_number: string;
    published_date: string;
    is_published: boolean;
    created_at: string;
    updated_at: string;
}

export const NewsPaperService = {
    async getNewsPapers(): Promise<NewsPaperItem[]> {
        const response = await api.get<NewsPaperItem[] | { results?: NewsPaperItem[] }>("/news/news_papers/");
        if (Array.isArray(response.data)) {
            return response.data;
        }
        return response.data.results || [];
    },

    async createNewsPaper(data: FormData): Promise<NewsPaperItem> {
        return await postMultipart<NewsPaperItem>("/news/news_papers/", data);
    },

    async updateNewsPaper(id: string, data: FormData): Promise<NewsPaperItem> {
        return await patchMultipart<NewsPaperItem>(`/news/news_papers/${id}/`, data);
    },

    async deleteNewsPaper(id: string): Promise<void> {
        await api.delete(`/news/news_papers/${id}/`);
    },
};
