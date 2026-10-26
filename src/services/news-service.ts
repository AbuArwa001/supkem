import api from "@/lib/api";
import { postMultipart, patchMultipart } from "./newsHttpUtils";
import { NewsGalleryItem, NewsGalleryService } from "./newsGallery-service";
import { NewsPaperItem, NewsPaperService } from "./newspaper-service";

export type { NewsGalleryItem, NewsPaperItem };
export { NewsGalleryService, NewsPaperService };

export interface NewsItem {
    id: string;
    title: string;
    title_ar: string | null;
    slug: string;
    content: string;
    content_ar: string | null;
    featured_image: string | null;
    is_published: boolean;
    created_at: string;
    updated_at: string;
    gallery: NewsGalleryItem[];
}

export interface NewsResponse {
    results?: NewsItem[];
}

export const NewsService = {
    async getNews(): Promise<NewsItem[]> {
        const response = await api.get<NewsItem[] | NewsResponse>("/news/news/");
        if (Array.isArray(response.data)) {
            return response.data;
        }
        return response.data.results || [];
    },

    async createNews(data: FormData): Promise<NewsItem> {
        return await postMultipart<NewsItem>("/news/news/", data);
    },

    async updateNews(slug: string, data: FormData): Promise<NewsItem> {
        return await patchMultipart<NewsItem>(`/news/news/${slug}/`, data);
    },

    async deleteNews(slug: string): Promise<void> {
        await api.delete(`/news/news/${slug}/`);
    },
};
