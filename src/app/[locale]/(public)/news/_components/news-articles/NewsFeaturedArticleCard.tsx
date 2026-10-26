"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Calendar, Clock, Sparkles, ArrowRight } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";
import { NewsItem } from "@/app/[locale]/(public)/news/_services/newsService";
import { SocialShareButtons } from "@/components/SocialShareButtons";
import { extractFirstImage, cleanContent, calculateReadTime, getCategory, tSafe } from "./newsArticlesHelpers";

interface NewsFeaturedArticleCardProps {
    article: NewsItem;
    tHero: any;
}

export function NewsFeaturedArticleCard({ article, tHero }: NewsFeaturedArticleCardProps) {
    const extractedImg = extractFirstImage(article.content);
    const imageSource = article.featured_image
        ? (article.featured_image.startsWith("http")
            ? article.featured_image
            : `${API_BASE_URL}${article.featured_image.startsWith("/") ? "" : "/"}${article.featured_image}`)
        : (extractedImg || "https://images.unsplash.com/photo-1541872703-74c5e4001bc2?auto=format&fit=crop&q=80&w=1200");

    const category = getCategory(article);
    const readTime = calculateReadTime(article.content);

    return (
        <div className="group relative rounded-[32px] bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl hover:border-emerald-500/40 transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-7 relative min-h-[320px] md:min-h-[420px] overflow-hidden bg-slate-950">
                    <Link href={`/news/${article.slug}`}>
                        <Image src={imageSource} alt={article.title} fill priority className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    </Link>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950/90 pointer-events-none" />
                    <div className="absolute top-6 left-6 flex items-center gap-2">
                        <span className="px-3.5 py-1.5 rounded-full bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                            <Sparkles size={12} /> {tSafe(tHero, "featuredBadge", "FEATURED STORY")}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${category.color}`}>
                            {category.label}
                        </span>
                    </div>
                </div>

                <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
                            <span className="flex items-center gap-1.5">
                                <Calendar size={14} className="text-amber-400" />
                                {new Date(article.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5">
                                <Clock size={14} className="text-emerald-400" />
                                {readTime} {tSafe(tHero, "readTime", "min read")}
                            </span>
                        </div>

                        <Link href={`/news/${article.slug}`}>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-outfit text-white leading-tight group-hover:text-emerald-300 transition-colors">
                                {article.title}
                            </h2>
                        </Link>
                        <p className="text-slate-300 text-sm md:text-base leading-relaxed line-clamp-4 font-normal">
                            {cleanContent(article.content)}
                        </p>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-slate-800">
                        <SocialShareButtons
                            title={article.title}
                            url={typeof window !== "undefined" ? `${window.location.origin}/news/${article.slug}` : undefined}
                        />
                        <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">SP</div>
                                <div>
                                    <div className="text-xs font-bold text-white">SUPKEM Press</div>
                                    <div className="text-[10px] text-slate-400">Official Bulletin</div>
                                </div>
                            </div>
                            <Link href={`/news/${article.slug}`} className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                                {tSafe(tHero, "readStory", "Read Full Story")} <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
