import { FeaturedNews } from "@/app/(public)/news/_components/FeaturedNews";
import { NewsHero } from "@/app/(public)/news/_components/NewsHero";
import { VideoBriefings } from "@/app/(public)/news/_components/VideoBriefings";

import { getNews, getVideos } from "@/app/(public)/news/_services/newsService";

export default async function NewsPage() {
    const newsItems = await getNews();
    const videos = await getVideos();

    return (
        <div className="space-y-24 pb-24">
            <NewsHero />
            <VideoBriefings videos={videos} />
            <FeaturedNews newsItems={newsItems} />
        </div>
    );
}
