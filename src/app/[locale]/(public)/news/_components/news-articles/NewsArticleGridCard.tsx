"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";
import { NewsItem } from "@/app/[locale]/(public)/news/_services/newsService";
import { SocialShareButtons } from "@/components/SocialShareButtons";
import { extractFirstImage, cleanContent, calculateReadTime, getCategory, tSafe } from "./newsArticlesHelpers";

interface NewsArticleGridCardProps {
    item: NewsItem;
    tHero: any;
    tNews: any;
}

export function NewsArticleGridCard({ item, tHero, tNews }: NewsArticleGridCardProps) {
    const extractedImg = extractFirstImage(item.content);
    const imageSource = item.featured_image
        ? (item.featured_image.startsWith("http")
            ? item.featured_image
            : `${API_BASE_URL}${item.featured_image.startsWith("/") ? "" : "/"}${item.featured_image}`)
        : (extractedImg || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800");

    const category = getCategory(item);
    const readTime = calculateReadTime(item.content);

    return (
        <div className="group rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-emerald-500/40 transition-all flex flex-col justify-between shadow-xl">
            <div className="flex flex-col h-full">
                <Link href={`/news/${item.slug}`} className="aspect-[16/10] bg-slate-950 relative overflow-hidden shrink-0">
                    <Image src={imageSource} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${category.color}`}>
                        {category.label}
                    </span>
                </Link>

                <div className="p-6 space-y-4 flex flex-col flex-1 justify-between">
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
                            <h3 className="text-xl font-bold font-outfit text-white group-hover:text-emerald-300 transition-colors leading-snug">
                                {item.title}
                            </h3>
                        </Link>
                        <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                            {cleanContent(item.content)}
                        </p>
                    </div>

                    <div className="pt-4 border-t border-slate-800 space-y-3">
                        <SocialShareButtons
                            title={item.title}
                            url={typeof window !== "undefined" ? `${window.location.origin}/news/${item.slug}` : undefined}
                        />
                        <div className="flex items-center justify-between text-xs font-bold pt-1">
                            <span className="text-slate-400 font-medium">SUPKEM Press</span>
                            <Link href={`/news/${item.slug}`} className="text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                                {tSafe(tNews, "details", "Details")} <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
