import { NewsArticlesClient } from "@/app/[locale]/(public)/news/_components/NewsArticlesClient";
import { getNews } from "@/app/[locale]/(public)/news/_services/newsService";

export const revalidate = 60;

export default async function NewsArticlesPage() {
    const newsItems = await getNews();

    return <NewsArticlesClient initialNewsItems={newsItems} />;
}
