import { FeaturedNews } from "@/app/(public)/news/_components/FeaturedNews";
import { NewsHero } from "@/app/(public)/news/_components/NewsHero";
import { VideoBriefings } from "@/app/(public)/news/_components/VideoBriefings";
import { NewsPapersSection } from "@/app/(public)/news/_components/NewsPapersSection";

import { getNews, getVideos, getNewsPapers } from "@/app/(public)/news/_services/newsService";

export const revalidate = 60; // Revalidate the page cache every 60 seconds

export default async function NewsPage() {
    const newsItems = await getNews();
    const videos = await getVideos();
    const newsPapers = await getNewsPapers();

    return (
        <div className="space-y-24 pb-24">
            <NewsHero />
            <NewsPapersSection newsPapers={newsPapers} />
            <VideoBriefings videos={videos} />
            <FeaturedNews newsItems={newsItems} />
        </div>
    );
}
