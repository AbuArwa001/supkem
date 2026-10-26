"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";
import { NewsItem } from "@/app/[locale]/(public)/news/_services/newsService";
import { SocialShareButtons } from "@/components/SocialShareButtons";
import { extractFirstImage, cleanContent, calculateReadTime, getCategory, tSafe } from "./newsArticlesHelpers";

interface NewsArticleListCardProps {
    item: NewsItem;
    tHero: any;
    tNews: any;
}

export function NewsArticleListCard({ item, tHero, tNews }: NewsArticleListCardProps) {
    const extractedImg = extractFirstImage(item.content);
    const imageSource = item.featured_image
        ? (item.featured_image.startsWith("http")
            ? item.featured_image
            : `${API_BASE_URL}${item.featured_image.startsWith("/") ? "" : "/"}${item.featured_image}`)
        : (extractedImg || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800");

    const category = getCategory(item);
    const readTime = calculateReadTime(item.content);

    return (
        <div className="group p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col md:flex-row gap-6 shadow-lg">
            <Link href={`/news/${item.slug}`} className="w-full md:w-64 h-48 rounded-2xl bg-slate-950 overflow-hidden relative shrink-0">
                <Image src={imageSource} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase border backdrop-blur-md ${category.color}`}>
                    {category.label}
                </span>
            </Link>

            <div className="flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
                        <span className="flex items-center gap-1.5">
                            <Calendar size={13} className="text-amber-400" />
                            {new Date(item.created_at).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                            <Clock size={13} className="text-emerald-400" />
                            {readTime} {tSafe(tHero, "readTime", "min read")}
                        </span>
                    </div>

                    <Link href={`/news/${item.slug}`}>
                        <h3 className="text-xl font-bold font-outfit text-white group-hover:text-emerald-400 transition-colors">
                            {item.title}
                        </h3>
                    </Link>

                    <p className="text-slate-300 text-sm leading-relaxed line-clamp-2">
                        {cleanContent(item.content)}
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800">
                    <SocialShareButtons
                        title={item.title}
                        url={typeof window !== "undefined" ? `${window.location.origin}/news/${item.slug}` : undefined}
                    />
                    <Link
                        href={`/news/${item.slug}`}
                        className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 hover:gap-2.5 transition-all"
                    >
                        {tSafe(tNews, "details", "Details")} <ChevronRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
