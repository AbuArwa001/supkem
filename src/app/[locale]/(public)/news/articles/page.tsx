import { NewsArticlesClient } from "@/app/[locale]/(public)/news/_components/NewsArticlesClient";
import { getNews } from "@/app/[locale]/(public)/news/_services/newsService";

export const revalidate = 60;

export default async function NewsArticlesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const newsItems = await getNews(locale);
    const t = await getTranslations({ locale, namespace: "NewsPage.hero" });

    return <NewsArticlesClient initialNewsItems={newsItems} />;
}
