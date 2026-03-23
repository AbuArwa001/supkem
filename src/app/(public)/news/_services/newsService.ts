import api from "@/lib/api";

export interface NewsItem {
    id: number | string;
    title: string;
    slug: string;
    content: string;
    featured_image?: string;
    created_at: string;
    is_published: boolean;
    [key: string]: any;
}

export interface VideoItem {
    id: number | string;
    title: string;
    description?: string;
    video_file: string;
    created_at: string;
    is_published: boolean;
    [key: string]: any;
}

export async function getNews(): Promise<NewsItem[]> {
    try {
        const res = await api.get('/news/');
        return (res.data.results || res.data).filter((item: NewsItem) => item.is_published);
    } catch (err) {
        console.error("Error fetching news:", err);
        return [];
    }
}

export async function getVideos(): Promise<VideoItem[]> {
    try {
        const res = await api.get('/videos/');
        const data = res.data.results || res.data;
        if (!Array.isArray(data)) {
            console.warn("Videos data is not an array:", data);
            return [];
        }
        return data.filter((item: VideoItem) => item.is_published);
    } catch (err) {
        console.error("Error fetching videos:", err);
        return [];
    }
}

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

export async function getNewsPapers(): Promise<NewsPaperItem[]> {
    try {
        const res = await api.get('/news/news_papers/');
        const data = res.data.results || res.data;
        if (!Array.isArray(data)) {
            console.warn("NewsPapers data is not an array:", data);
            return [];
        }
        return data.filter((item: NewsPaperItem) => item.is_published);
    } catch (err) {
        console.error("Error fetching news papers:", err);
        return [];
    }
}

export async function getNewsPaperById(id: string): Promise<NewsPaperItem | null> {
    try {
        const res = await api.get(`/news/news_papers/${id}/`);
        return res.data;
    } catch (err) {
        console.error("Error fetching news paper by id:", err);
        return null;
    }
}
