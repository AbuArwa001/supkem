import { Calendar, User, ArrowLeft, BookOpen } from "lucide-react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import api, { API_BASE_URL } from "@/lib/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { NewsGallery } from "../_components/NewsGallery";
import { SocialShareButtons } from "@/components/SocialShareButtons";
import { SocialFollowLinks } from "@/components/SocialFollowLinks";
import type { Metadata } from "next";

async function getArticle(slug: string, locale: string) {
    try {
        const res = await api.get(`/news/news/${slug}/`, {
            headers: {
                "Accept-Language": locale
            }
        });
        return res.data;
    } catch {
        return null;
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
    const { slug, locale } = await params;
    const article = await getArticle(slug, locale);

    if (!article) return {};

    const cleanDesc = article.content
        ? article.content.replace(/!\[.*?\]\(.*?\)/g, "").replace(/[#*`_~>\[\]\(\)]/g, "").slice(0, 160)
        : "SUPKEM Official News Release";

    const featuredImage = article.featured_image
        ? (article.featured_image.startsWith('http') ? article.featured_image : `${API_BASE_URL}${article.featured_image.startsWith('/') ? '' : '/'}${article.featured_image}`)
        : "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1600";

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
            creator: "@SUPKEM_Official",
        },
    };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
    const { slug, locale } = await params;
    const article = await getArticle(slug, locale);
    const t = await getTranslations({ locale, namespace: "NewsPage.article" });

    if (!article || !article.is_published) {
        notFound();
    }

    const featuredImage = article.featured_image
        ? (article.featured_image.startsWith('http') ? article.featured_image : `${API_BASE_URL}${article.featured_image.startsWith('/') ? '' : '/'}${article.featured_image}`)
        : "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1600";

    return (
        <div className="pb-24 bg-slate-950 text-slate-100 min-h-screen">
            {/* Hero Header */}
            <header className="relative h-[65vh] min-h-[520px] flex items-end overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={featuredImage}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
                </div>

                <div className="max-w-4xl mx-auto px-6 pb-16 w-full relative z-10 space-y-6">
                    <Link
                        href="/news/articles"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs bg-slate-900/80 px-5 py-2.5 rounded-full border border-slate-700 backdrop-blur-md shadow-xl"
                    >
                        <ArrowLeft size={14} className="text-emerald-400" /> {t("back")}
                    </Link>
                    <h1 className="text-4xl lg:text-6xl font-black font-outfit text-white leading-tight max-w-3xl">
                        {article.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-300 uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                            <Calendar size={14} className="text-amber-400" />
                            {new Date(article.created_at).toLocaleDateString(locale === 'ar' ? 'ar-KE' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-2">
                            <User size={14} className="text-emerald-400" /> {t("press")}
                        </span>
                    </div>
                </div>
            </header>

            {/* Article Body Container */}
            <main className="max-w-4xl mx-auto px-6 -mt-12 relative z-20 space-y-12">
                <div className="bg-slate-900 rounded-[28px] p-8 lg:p-16 shadow-2xl border border-slate-800 space-y-8">
                    {/* Social Media Sharing Bar Header */}
                    <div className="pb-6 border-b border-slate-800">
                        <SocialShareButtons title={article.title} />
                    </div>

                    {/* Article Content */}
                    <article className="
                        prose prose-invert prose-lg max-w-none
                        prose-headings:font-outfit prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight prose-headings:leading-tight
                        prose-h1:text-4xl prose-h2:text-3xl prose-h2:border-b prose-h2:border-slate-800 prose-h2:pb-4 prose-h3:text-2xl
                        prose-p:text-slate-300 prose-p:leading-relaxed prose-p:font-normal
                        prose-strong:text-emerald-400 prose-strong:font-bold
                        prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-500/10 prose-blockquote:rounded-r-2xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:text-slate-200 prose-blockquote:not-italic prose-blockquote:font-medium
                        prose-a:text-emerald-400 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                        prose-ul:text-slate-300 prose-li:text-slate-300 prose-li:font-medium prose-li:leading-relaxed
                        prose-ol:text-slate-300
                        prose-img:rounded-3xl prose-img:shadow-xl prose-img:w-full
                        prose-code:bg-slate-800 prose-code:text-emerald-300 prose-code:rounded-lg prose-code:px-2 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                        prose-hr:border-slate-800 prose-hr:my-8
                    ">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                img: ({ node, ...props }) => (
                                    <span className="flex justify-center my-8">
                                        <img {...props} className="max-w-full h-auto rounded-3xl shadow-xl border border-slate-800" alt={props.alt || "Article Image"} />
                                    </span>
                                ),
                            }}
                        >
                            {article.content}
                        </ReactMarkdown>
                    </article>

                    {/* Bottom Social Media Sharing Bar */}
                    <div className="pt-8 border-t border-slate-800">
                        <SocialShareButtons title={article.title} />
                    </div>
                </div>

                {/* Gallery Section */}
                {article.gallery && article.gallery.length > 0 && (
                    <NewsGallery items={article.gallery} />
                )}

                {/* Follow SUPKEM Section */}
                <div className="p-8 rounded-[28px] bg-slate-900 border border-slate-800 shadow-xl">
                    <SocialFollowLinks variant="pills" />
                </div>

                {/* Back CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-[24px] bg-emerald-950/40 border border-emerald-500/20 shadow-xl">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400">
                            <BookOpen size={22} />
                        </div>
                        <div>
                            <p className="font-bold text-white text-base">{t("readMore")}</p>
                            <p className="text-sm text-slate-400">{t("browseDesc")}</p>
                        </div>
                    </div>
                    <Link
                        href="/news/articles"
                        className="px-6 py-3 bg-emerald-500 text-slate-950 rounded-2xl font-bold hover:bg-emerald-400 transition-all flex items-center gap-2 shrink-0 text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20"
                    >
                        <ArrowLeft size={14} /> {t("allArticles")}
                    </Link>
                </div>
            </main>
        </div>
    );
}
