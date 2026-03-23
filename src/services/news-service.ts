import api from "@/lib/api";

export interface NewsItem {
    id: string;
    title: string;
    slug: string;
    content: string;
    featured_image: string | null;
    is_published: boolean;
    created_at: string;
    updated_at: string;
}

export interface NewsResponse {
    results?: NewsItem[];
}

/**
 * Service to handle news-related API calls.
 */
export const NewsService = {
    /**
     * Fetches all news items.
     * @returns List of news items.
     */
    async getNews(): Promise<NewsItem[]> {
        const response = await api.get<NewsItem[] | NewsResponse>("/news/");
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
        const response = await api.post<NewsItem>("/news/", data, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    },

    /**
     * Updates an existing news item.
     * @param slug The slug of the news item to update.
     * @param data FormData containing title, content, is_published, and optional featured_image.
     * @returns The updated news item.
     */
    async updateNews(slug: string, data: FormData): Promise<NewsItem> {
        const response = await api.patch<NewsItem>(`/news/${slug}/`, data, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
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
        const response = await api.post<NewsPaperItem>("/news/news_papers/", data, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    },

    async updateNewsPaper(id: string, data: FormData): Promise<NewsPaperItem> {
        const response = await api.patch<NewsPaperItem>(`/news/news_papers/${id}/`, data, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    },

    async deleteNewsPaper(id: string): Promise<void> {
        await api.delete(`/news/news_papers/${id}/`);
    },
};
