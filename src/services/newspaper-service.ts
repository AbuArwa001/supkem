import api from "@/lib/api";
import { postMultipart, patchMultipart } from "./newsHttpUtils";

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
