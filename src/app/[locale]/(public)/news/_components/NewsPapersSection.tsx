"use client";

import { Link } from "@/i18n/routing";
import { BookOpen, ArrowRight } from "lucide-react";
import useSWR from "swr";
import { useTranslations, useLocale } from "next-intl";
import { NewsPaperItem } from "@/app/[locale]/(public)/news/_services/newsService";
import { NewsPaperCard } from "./NewsPaperCard";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://supkem-drf.onrender.com";

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
                {displayPapers.map((paper, i) => (
                    <NewsPaperCard key={paper.id || i} paper={paper} locale={locale} issueText={t("issue")} readText={t("read")} />
                ))}
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
