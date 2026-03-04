import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { notFound } from "next/navigation";

async function getNewsArticle(slug: string) {
    try {
        const res = await api.get(`/news/${slug}/`);
        return res.data;
    } catch (err) {
        return null;
    }
}

export default async function NewsArticlePage({ params }: { params: { slug: string } }) {
    const article = await getNewsArticle(params.slug);

    if (!article) {
        notFound();
    }

    const imageUrl = article.featured_image
        ? (article.featured_image.startsWith('http') ? article.featured_image : `https://supkem-drf.onrender.com${article.featured_image}`)
        : "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1600";

    return (
        <article className="pb-24 bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <header className="relative h-[60vh] min-h-[500px] flex items-end pb-16 px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
                </div>

                <div className="max-w-4xl mx-auto w-full relative z-20 space-y-6">
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs mb-8 bg-black/20 px-4 py-2 rounded-full backdrop-blur-md"
                    >
                        <ArrowLeft size={16} /> Back to News
                    </Link>

                    <h1 className="text-4xl lg:text-6xl font-black font-outfit text-white leading-tight">
                        {article.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-white/70 uppercase tracking-widest pt-4">
                        <span className="flex items-center gap-2">
                            <Calendar size={16} className="text-amber-400" />
                            {new Date(article.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                        <span className="flex items-center gap-2">
                            <User size={16} className="text-amber-400" />
                            SUPKEM Press
                        </span>
                    </div>
                </div>
            </header>

            {/* Content Section */}
            <main className="max-w-3xl mx-auto px-6 -mt-8 relative z-30">
                <div className="bg-white rounded-[40px] p-8 lg:p-16 shadow-2xl shadow-black/5 border border-slate-100">
                    <div className="prose prose-lg prose-slate max-w-none prose-headings:font-outfit prose-headings:font-bold prose-headings:text-primary prose-a:text-amber-600 hover:prose-a:text-amber-500 prose-img:rounded-2xl prose-img:shadow-lg custom-markdown">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                img: ({ node, ...props }) => (
                                    <span className="flex justify-center my-8">
                                        <img {...props} className="max-w-full h-auto rounded-2xl shadow-xl" alt={props.alt || "Article Image"} />
                                    </span>
                                ),
                            }}
                        >
                            {article.content}
                        </ReactMarkdown>
                    </div>
                </div>
            </main>
        </article>
    );
}
