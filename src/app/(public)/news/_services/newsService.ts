const SERVER_API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://supkem-drf.onrender.com";

const BASE = `${SERVER_API_URL}/api/v1`;

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

async function serverFetch<T>(path: string): Promise<T | null> {
    try {
        const res = await fetch(`${BASE}${path}`, { cache: "no-store" });
        if (!res.ok) {
            console.error(`API fetch failed: ${res.status} ${path}`);
            return null;
        }
        return res.json();
    } catch (err) {
        console.error(`Error fetching ${path}:`, err);
        return null;
    }
}

export async function getNews(): Promise<NewsItem[]> {
    const data = await serverFetch<{ results?: NewsItem[] } | NewsItem[]>("/news/news/");
    const items = Array.isArray(data) ? data : (data as any)?.results ?? [];
    return items.filter((item: NewsItem) => item.is_published);
}

export async function getVideos(): Promise<VideoItem[]> {
    const data = await serverFetch<{ results?: VideoItem[] } | VideoItem[]>("/videos/");
    const items = Array.isArray(data) ? data : (data as any)?.results ?? [];
    return items.filter((item: VideoItem) => item.is_published);
}

export async function getNewsPapers(): Promise<NewsPaperItem[]> {
    const data = await serverFetch<{ results?: NewsPaperItem[] } | NewsPaperItem[]>("/news/news_papers/");
    const items = Array.isArray(data) ? data : (data as any)?.results ?? [];
    return items.filter((item: NewsPaperItem) => item.is_published);
}

export async function getNewsPaperById(id: string): Promise<NewsPaperItem | null> {
    return serverFetch<NewsPaperItem>(`/news/news_papers/${id}/`);
}

