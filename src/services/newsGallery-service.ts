import api from "@/lib/api";
import { apiMultipartWithProgress } from "@/lib/upload";
import { postMultipart } from "./newsHttpUtils";

export interface NewsGalleryItem {
    id: string;
    image: string;
    caption: string | null;
}

export const NewsGalleryService = {
    async addImages(slug: string, files: File[]): Promise<NewsGalleryItem[]> {
        const data = new FormData();
        files.forEach((f) => data.append("images", f));
        return await postMultipart<NewsGalleryItem[]>(`/news/news/${slug}/gallery/`, data);
    },

    async addImage(
        slug: string,
        file: File,
        onProgress?: (percent: number) => void
    ): Promise<NewsGalleryItem[]> {
        const data = new FormData();
        data.append("images", file);
        return await apiMultipartWithProgress<NewsGalleryItem[]>(
            "POST",
            `/news/news/${slug}/gallery/`,
            data,
            onProgress
        );
    },

    async deleteImage(slug: string, galleryId: string): Promise<void> {
        await api.delete(`/news/news/${slug}/gallery/${galleryId}/`);
    },
};
