import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import api, { API_BASE_URL } from "@/lib/api";
import { NewsGallery } from "../_components/NewsGallery";
import { SocialFollowLinks } from "@/components/SocialFollowLinks";
import { ArticleHero } from "./_components/ArticleHero";
import { ArticleBody } from "./_components/ArticleBody";
import { ArticleCta } from "./_components/ArticleCta";
import { ArticleSchema } from "./_components/ArticleSchema";

interface PageProps {
    params: Promise<{ slug: string; locale: string }>;
}

async function getArticle(slug: string, locale: string) {
    try {
        const res = await api.get(`/news/news/${slug}/`, { headers: { "Accept-Language": locale } });
        return res.data;
    } catch {
        return null;
    }
}

function resolveImage(img?: string) {
    if (!img) return "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1600";
    return img.startsWith("http") ? img : `${API_BASE_URL}${img.startsWith("/") ? "" : "/"}${img}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug, locale } = await params;
    const article = await getArticle(slug, locale);
    if (!article) return {};

    const cleanDesc = article.content
        ? article.content.replace(/!\[.*?\]\(.*?\)/g, "").replace(/[#*`_~>\[\]\(\)]/g, "").slice(0, 160)
        : "SUPKEM Official News Release";
    const featuredImage = resolveImage(article.featured_image);

    return {
        title: `${article.title} | SUPKEM Press`,
        description: cleanDesc,
        openGraph: {
            title: article.title,
            description: cleanDesc,
            images: [{ url: featuredImage, width: 1200, height: 630, alt: article.title }],
            type: "article",
            siteName: "SUPKEM - Supreme Council of Kenya Muslims",
        },
        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: cleanDesc,
            images: [featuredImage],
        },
    };
}

export default async function NewsArticlePage({ params }: PageProps) {
    const { slug, locale } = await params;
    const article = await getArticle(slug, locale);
    const t = await getTranslations({ locale, namespace: "NewsPage.article" });

    if (!article || !article.is_published) notFound();

    const featuredImage = resolveImage(article.featured_image);

    return (
        <div className="pb-24 bg-slate-950 text-slate-100 min-h-screen">
            <ArticleSchema title={article.title} description={article.title} datePublished={article.created_at} image={featuredImage} />
            <ArticleHero title={article.title} featuredImage={featuredImage} createdAt={article.created_at} locale={locale} backText={t("back")} pressText={t("press")} />
            <main className="max-w-4xl mx-auto px-6 -mt-12 relative z-20 space-y-12">
                <ArticleBody title={article.title} content={article.content} />
                {article.gallery && article.gallery.length > 0 && <NewsGallery items={article.gallery} />}
                <div className="p-8 rounded-[28px] bg-slate-900 border border-slate-800 shadow-xl">
                    <SocialFollowLinks variant="pills" />
                </div>
                <ArticleCta readMoreText={t("readMore")} browseDescText={t("browseDesc")} allArticlesText={t("allArticles")} />
            </main>
        </div>
    );
}
