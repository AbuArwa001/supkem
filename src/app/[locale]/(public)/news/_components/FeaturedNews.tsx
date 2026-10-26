"use client";

import { Link } from "@/i18n/routing";
import useSWR from "swr";
import { ArrowRight, BookOpen } from "lucide-react";
import { NewsItem } from "@/app/[locale]/(public)/news/_services/newsService";
import { useTranslations, useLocale } from "next-intl";
import { FeaturedLeadArticle } from "./FeaturedLeadArticle";
import { FeaturedSecondaryCard } from "./FeaturedSecondaryCard";
import { FeaturedNewsEmpty, FeaturedNewsComingSoon } from "./FeaturedNewsEmpty";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://supkem-drf.onrender.com";

interface FeaturedNewsProps {
  newsItems: NewsItem[];
  limit?: number;
}

export function FeaturedNews({ newsItems: initialNewsItems, limit = 3 }: FeaturedNewsProps) {
  const t = useTranslations("NewsPage.news");
  const t2 = useTranslations("NewsPage.article");
  const locale = useLocale();

  const { data: newsItems } = useSWR(
    [`${API_BASE}/api/v1/news/news/`, locale],
    ([url, loc]: [string, string]) =>
      fetch(url, { headers: { "Accept-Language": loc } })
        .then((r) => r.json())
        .then((d) => {
          const items = Array.isArray(d) ? d : d?.results ?? [];
          return items.filter((item: any) => item.is_published);
        }),
    { fallbackData: initialNewsItems, refreshInterval: 30000 },
  );

  const displayNews = limit > 0 ? newsItems.slice(0, limit) : newsItems;
  const hasMore = limit > 0 && newsItems.length > limit;

  return (
    <section className="max-w-7xl mx-auto px-6 space-y-12">
      <div className="flex items-center gap-4">
        <div className="p-4 bg-primary/5 rounded-2xl">
          <BookOpen className="text-primary" size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-black font-outfit text-primary tracking-tight">{t("heading")}</h2>
          <p className="text-foreground/60 font-medium">{t("desc")}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {displayNews.length > 0 ? (
          <>
            <FeaturedLeadArticle item={displayNews[0]} locale={locale} pressText={t2("press")} readMoreText={t("readMore")} />
            <div className="flex flex-col gap-8 h-full">
              {displayNews.slice(1).map((item: NewsItem, i: number) => (
                <FeaturedSecondaryCard key={item.slug || i} item={item} locale={locale} detailsText={t("details")} />
              ))}
              {newsItems.length <= 1 && (
                <FeaturedNewsComingSoon title={t("comingSoon")} desc={t("comingSoonDesc")} />
              )}
            </div>
          </>
        ) : (
          <FeaturedNewsEmpty noNewsText={t("noNews")} noNewsDescText={t("noNewsDesc")} />
        )}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-8">
          <Link
            href="/news/articles"
            className="px-8 py-4 bg-white hover:bg-primary/5 text-primary border-2 border-primary/20 rounded-full font-bold uppercase tracking-widest text-sm flex items-center gap-3 transition-all hover:gap-5"
          >
            {t("viewAll")} <ArrowRight size={18} />
          </Link>
        </div>
      )}
    </section>
  );
}
