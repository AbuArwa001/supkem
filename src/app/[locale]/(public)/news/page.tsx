import { FeaturedNews } from "@/app/[locale]/(public)/news/_components/FeaturedNews";
import { NewsHero } from "@/app/[locale]/(public)/news/_components/NewsHero";
import { VideoBriefings } from "@/app/[locale]/(public)/news/_components/VideoBriefings";
import { NewsPapersSection } from "@/app/[locale]/(public)/news/_components/NewsPapersSection";

import { getNews, getVideos, getNewsPapers } from "@/app/[locale]/(public)/news/_services/newsService";

import { getLocale } from "next-intl/server";

export const revalidate = 60; // Revalidate the page cache every 60 seconds

export default async function NewsPage() {
    const locale = await getLocale();
    const newsItems = await getNews(locale);
    const videos = await getVideos(locale);
    const newsPapers = await getNewsPapers(locale);

    return (
        <div className="space-y-24 pb-24">
            <NewsHero />
            <NewsPapersSection newsPapers={newsPapers} />
            <VideoBriefings videos={videos} />
            <FeaturedNews newsItems={newsItems} />
        </div>
    );
}
