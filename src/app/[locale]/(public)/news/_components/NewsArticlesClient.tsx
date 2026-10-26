"use client";

import { useState, useMemo } from "react";
import { BookOpen, X, ChevronRight } from "lucide-react";
import { NewsItem } from "@/app/[locale]/(public)/news/_services/newsService";
import { useTranslations } from "next-intl";
import { getCategory, tSafe } from "./news-articles/newsArticlesHelpers";
import { NewsArticlesHero } from "./news-articles/NewsArticlesHero";
import { NewsArticlesFilterBar } from "./news-articles/NewsArticlesFilterBar";
import { NewsFeaturedArticleCard } from "./news-articles/NewsFeaturedArticleCard";
import { NewsArticleGridCard } from "./news-articles/NewsArticleGridCard";
import { NewsArticleListCard } from "./news-articles/NewsArticleListCard";
import { NewsArticlesCta } from "./news-articles/NewsArticlesCta";

interface Props { initialNewsItems: NewsItem[]; }

export function NewsArticlesClient({ initialNewsItems }: Props) {
    const tHero = (() => { try { return useTranslations("NewsPage.articlesPage"); } catch { return null; } })();
    const tNews = (() => { try { return useTranslations("NewsPage.news"); } catch { return null; } })();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [displayCount, setDisplayCount] = useState(9);

    const categories = [
        { id: "all", label: tSafe(tHero, "allCategories", "All Categories") },
        { id: "Press Release", label: "Press Release" },
        { id: "Community & Welfare", label: "Community & Welfare" },
        { id: "Hajj & Faith", label: "Hajj & Faith" },
        { id: "Education", label: "Education" },
        { id: "General News", label: "General News" },
    ];

    const filtered = useMemo(() => initialNewsItems.filter((item) => {
        const matchesSearch = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all" || getCategory(item).label === selectedCategory;
        return matchesSearch && matchesCategory;
    }), [initialNewsItems, searchQuery, selectedCategory]);

    const displayed = filtered.slice(0, displayCount);
    const featured = !searchQuery && selectedCategory === "all" && filtered.length > 0 ? filtered[0] : null;
    const gridArticles = featured ? displayed.slice(1) : displayed;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white pb-24">
            <NewsArticlesHero tHero={tHero} totalArticles={initialNewsItems.length} />
            <NewsArticlesFilterBar
                searchQuery={searchQuery} onSearchChange={setSearchQuery} viewMode={viewMode}
                onViewModeChange={setViewMode} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory}
                categories={categories} searchPlaceholder={tSafe(tHero, "searchPlaceholder", "Search articles by title, keywords...")}
            />
            <div className="max-w-7xl mx-auto px-6 pt-12 space-y-12">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                    <span>{tSafe(tHero, "showingCount", `Showing ${displayed.length} of ${filtered.length} articles`, { count: displayed.length, total: filtered.length })}</span>
                    {(searchQuery || selectedCategory !== "all") && (
                        <button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }} className="text-emerald-400 hover:underline flex items-center gap-1">
                            <X size={14} /> {tSafe(tHero, "resetFilters", "Reset Search & Filters")}
                        </button>
                    )}
                </div>

                {featured && <NewsFeaturedArticleCard article={featured} tHero={tHero} />}

                {gridArticles.length > 0 ? (
                    <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "flex flex-col gap-6"}>
                        {gridArticles.map((item) => viewMode === "list"
                            ? <NewsArticleListCard key={item.id} item={item} tHero={tHero} tNews={tNews} />
                            : <NewsArticleGridCard key={item.id} item={item} tHero={tHero} tNews={tNews} />
                        )}
                    </div>
                ) : (
                    <div className="py-20 text-center space-y-6 max-w-md mx-auto">
                        <div className="w-20 h-20 bg-slate-900 rounded-3xl border border-slate-800 flex items-center justify-center mx-auto text-emerald-400 shadow-xl"><BookOpen size={36} /></div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold font-outfit text-white">{tSafe(tHero, "noResultsTitle", "No articles match your search")}</h3>
                            <p className="text-slate-400 text-sm">{tSafe(tHero, "noResultsDesc", "Try adjusting your search terms.")}</p>
                        </div>
                    </div>
                )}

                {displayCount < filtered.length && (
                    <div className="flex justify-center pt-8">
                        <button onClick={() => setDisplayCount((prev) => prev + 6)} className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 rounded-2xl font-bold uppercase tracking-wider text-xs flex items-center gap-3 transition-all hover:scale-105 shadow-xl">
                            {tSafe(tHero, "loadMore", "Load More Articles")} <ChevronRight size={16} />
                        </button>
                    </div>
                )}
                <NewsArticlesCta tHero={tHero} />
            </div>
        </div>
    );
}
