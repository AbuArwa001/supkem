"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { BookOpen, ArrowRight } from "lucide-react";
import useSWR from "swr";
import { useTranslations, useLocale } from "next-intl";
import { API_BASE_URL } from "@/lib/api";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://supkem-drf.onrender.com";
import { NewsPaperItem } from "@/app/[locale]/(public)/news/_services/newsService";

interface NewsPapersSectionProps {
    newsPapers: NewsPaperItem[];
    limit?: number;
}

export function NewsPapersSection({ newsPapers: initialNewsPapers, limit = 3 }: NewsPapersSectionProps) {
    const t = useTranslations("NewsPage.papers");
    const locale = useLocale();
    const { data: newsPapers } = useSWR<NewsPaperItem[]>(
        [`${API_BASE}/api/v1/news/news_papers/`, locale],
        ([url, loc]: [string, string]) =>
            fetch(url, { headers: { "Accept-Language": loc } })
                .then((r) => r.json())
                .then((d) => {
                    const items = Array.isArray(d) ? d : d?.results ?? [];
                    return items.filter((item: any) => item.is_published);
                }),
        { fallbackData: initialNewsPapers, refreshInterval: 30000 }
    );

    if (!newsPapers || newsPapers.length === 0) return null;

    const displayPapers = limit > 0 ? newsPapers.slice(0, limit) : newsPapers;
    const hasMore = limit > 0 && newsPapers.length > limit;

    return (
        <section className="max-w-7xl mx-auto px-6 space-y-12">
            <div className="flex items-center gap-4">
                <div className="p-4 bg-primary/5 rounded-2xl">
                    <BookOpen className="text-primary" size={28} />
                </div>
                <div>
                    <h2 className="text-3xl font-black font-outfit text-primary tracking-tight">{t("title")}</h2>
                    <p className="text-foreground/60 font-medium">{t("desc")}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
                {displayPapers.map((paper, i) => {
                    const imageUrl = paper.cover_image
                        ? paper.cover_image.startsWith('http')
                            ? paper.cover_image
                            : `${API_BASE_URL}${paper.cover_image.startsWith('/') ? '' : '/'}${paper.cover_image}`
                        : null;

                    const pdfUrl = paper.file
                        ? paper.file.startsWith("https")
                            ? paper.file
                            : `${API_BASE_URL}${paper.file.startsWith("/") ? "" : "/"}${paper.file}`
                        : null;

                    return (
                        <Link
                            key={i}
                            href={`/news-papers/${paper.id}`}
                            className="bg-white border border-border rounded-[24px] overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all group flex flex-col"
                        >
                            <div className="aspect-[4/5] relative bg-primary/5 flex items-center justify-center overflow-hidden pointer-events-none">
                                {imageUrl ? (
                                    <Image
                                        src={imageUrl}
                                        alt={paper.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : pdfUrl ? (
                                    <iframe
                                        src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
                                        className="w-full h-full group-hover:scale-105 transition-transform duration-700 opacity-90 scale-110"
                                        title={paper.title}
                                    />
                                ) : (
                                    <BookOpen className="text-primary/20 hover:scale-110 transition-transform duration-500" size={48} />
                                )}
                                <div className="absolute top-4 right-4 z-20">
                                    {paper.issue_number && (
                                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary text-white shadow-lg">
                                            {t("issue")} {paper.issue_number}
                                        </span>
                                    )}
                                </div>
                                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 z-10" />
                            </div>

                            <div className="p-6 space-y-3 flex-1 flex flex-col">
                                <h3 className="text-lg font-bold font-outfit text-primary line-clamp-2 leading-snug group-hover:text-secondary transition-colors">
                                    {paper.title}
                                </h3>
                                <div className="pt-4 mt-auto border-t border-border/50 flex items-center justify-between text-xs font-bold text-foreground/30 uppercase tracking-widest">
                                    <span>{new Date(paper.published_date).toLocaleDateString(locale === 'ar' ? 'ar-KE' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    <span className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                        {t("read")} <ArrowRight size={14} />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {hasMore && (
                <div className="flex justify-center pt-8">
                    <Link
                        href="/news/papers"
                        className="px-8 py-4 bg-white hover:bg-primary/5 text-primary border-2 border-primary/20 rounded-full font-bold uppercase tracking-widest text-sm flex items-center gap-3 transition-all hover:gap-5"
                    >
                        {t("viewAll")} <ArrowRight size={18} />
                    </Link>
                </div>
            )}
        </section>
    );
}
