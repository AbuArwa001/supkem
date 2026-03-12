import { Calendar, User, ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import api, { API_BASE_URL } from "@/lib/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { notFound } from "next/navigation";

async function getArticle(slug: string) {
    try {
        const res = await api.get(`/news/${slug}/`);
        return res.data;
    } catch {
        return null;
    }
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article || !article.is_published) {
        notFound();
    }

    const featuredImage = article.featured_image
        ? (article.featured_image.startsWith('http') ? article.featured_image : `${API_BASE_URL}${article.featured_image.startsWith('/') ? '' : '/'}${article.featured_image}`)
        : "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1600";

    return (
        <div className="pb-24 bg-slate-50 min-h-screen">
            {/* Hero */}
            <header className="relative h-[65vh] min-h-[520px] flex items-end overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={featuredImage}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
                </div>

                <div className="max-w-4xl mx-auto px-6 pb-16 w-full relative z-10 space-y-6">
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs bg-black/20 px-4 py-2 rounded-full backdrop-blur-md"
                    >
                        <ArrowLeft size={14} /> Back to News
                    </Link>
                    <h1 className="text-4xl lg:text-6xl font-black font-outfit text-white leading-tight max-w-3xl">
                        {article.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-white/60 uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                            <Calendar size={14} className="text-amber-400" />
                            {new Date(article.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-2">
                            <User size={14} className="text-amber-400" /> SUPKEM Press
                        </span>
                    </div>
                </div>
            </header>

            {/* Article Body */}
            <main className="max-w-3xl mx-auto px-6 -mt-12 relative z-20">
                <div className="bg-white rounded-[20px] p-8 lg:p-16 shadow-2xl shadow-black/10 border border-slate-100">
                    <article className="
                        prose prose-lg max-w-none
                        prose-headings:font-outfit prose-headings:text-primary prose-headings:font-black prose-headings:tracking-tight prose-headings:leading-tight
                        prose-h1:text-4xl prose-h2:text-3xl prose-h2:border-b prose-h2:border-border prose-h2:pb-4 prose-h3:text-2xl
                        prose-p:text-foreground/70 prose-p:leading-relaxed prose-p:font-medium
                        prose-strong:text-primary prose-strong:font-bold
                        prose-blockquote:border-l-4 prose-blockquote:border-primary/30 prose-blockquote:bg-primary/[0.03] prose-blockquote:rounded-r-2xl prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:text-foreground/70 prose-blockquote:not-italic prose-blockquote:font-medium
                        prose-a:text-primary prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                        prose-ul:text-foreground/70 prose-li:text-foreground/70 prose-li:font-medium prose-li:leading-relaxed
                        prose-ol:text-foreground/70
                        prose-img:rounded-3xl prose-img:shadow-xl prose-img:w-full
                        prose-code:bg-primary/5 prose-code:text-primary prose-code:rounded-lg prose-code:px-2 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                        prose-hr:border-border prose-hr:my-8
                    ">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                img: ({ node, ...props }) => (
                                    <span className="flex justify-center my-8">
                                        <img {...props} className="max-w-full h-auto rounded-3xl shadow-xl" alt={props.alt || "Article Image"} />
                                    </span>
                                ),
                            }}
                        >
                            {article.content}
                        </ReactMarkdown>
                    </article>
                </div>

                {/* Back CTA */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-[32px] bg-primary/5 border border-primary/10">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-2xl">
                            <BookOpen size={22} className="text-primary" />
                        </div>
                        <div>
                            <p className="font-bold text-primary">Read More from SUPKEM</p>
                            <p className="text-sm text-foreground/60">Browse our latest news and announcements.</p>
                        </div>
                    </div>
                    <Link
                        href="/news"
                        className="px-6 py-3 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-colors flex items-center gap-2 shrink-0 text-sm"
                    >
                        <ArrowLeft size={14} /> All Articles
                    </Link>
                </div>
            </main>
        </div>
    );
}

