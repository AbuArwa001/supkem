import api from "@/lib/api";

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
        const response = await api.post<NewsGalleryItem[]>(
            `/news/news/${slug}/gallery/`,
            data
        );
        return response.data;
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
        const response = await api.post<NewsItem>("/news/news/", data);
        return response.data;
    },

    /**
     * Updates an existing news item.
     * @param slug The slug of the news item to update.
     * @param data FormData containing title, content, is_published, and optional featured_image.
     * @returns The updated news item.
     */
    async updateNews(slug: string, data: FormData): Promise<NewsItem> {
        const response = await api.patch<NewsItem>(`/news/news/${slug}/`, data);
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
        const response = await api.post<NewsPaperItem>("/news/news_papers/", data);
        return response.data;
    },

    async updateNewsPaper(id: string, data: FormData): Promise<NewsPaperItem> {
        const response = await api.patch<NewsPaperItem>(`/news/news_papers/${id}/`, data);
        return response.data;
    },

    async deleteNewsPaper(id: string): Promise<void> {
        await api.delete(`/news/news_papers/${id}/`);
    },
};
