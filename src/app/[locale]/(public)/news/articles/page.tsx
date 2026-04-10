import { FeaturedNews } from "@/app/[locale]/(public)/news/_components/FeaturedNews";
import { getNews } from "@/app/[locale]/(public)/news/_services/newsService";
import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";

import { getTranslations } from "next-intl/server";
export const revalidate = 60;

export default async function NewsArticlesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const newsItems = await getNews();
    const t = await getTranslations({ locale, namespace: "NewsPage.hero" });

    return (
        <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <Link
                    href="/news"
                    className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors font-bold uppercase tracking-widest text-xs bg-primary/5 px-4 py-2 rounded-full"
                >
                    <ArrowLeft size={14} /> {t("backToNews")}
                </Link>
            </div>
            <FeaturedNews newsItems={newsItems} limit={0} />
        </div>
    );
}
