"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import {
    Search,
    Calendar,
    User,
    ArrowRight,
    ArrowLeft,
    Sparkles,
    BookOpen,
    Clock,
    X,
    Grid,
    List,
    FileText,
    Filter,
    ShieldCheck,
    MapPin,
    Newspaper,
    ChevronRight,
} from "lucide-react";
import { API_BASE_URL } from "@/lib/api";
import { NewsItem } from "@/app/[locale]/(public)/news/_services/newsService";
import { useTranslations } from "next-intl";

interface NewsArticlesClientProps {
    initialNewsItems: NewsItem[];
}

const extractFirstImage = (content: string) => {
    if (!content) return null;
    const match = content.match(/!\[.*?\]\((.*?)\)/);
    return match ? match[1] : null;
};

const cleanContent = (content: string) => {
    if (!content) return "";
    return content
        .replace(/!\[.*?\]\(.*?\)/g, "") // remove images
        .replace(/[#*`_~>\[\]\(\)]/g, "") // remove markdown symbols
        .replace(/\n+/g, " ")
        .trim();
};

const calculateReadTime = (content: string) => {
    const text = cleanContent(content);
    const words = text.split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 180));
    return minutes;
};

// Categorization helper based on keywords
const getCategory = (item: NewsItem) => {
    const titleLower = item.title.toLowerCase();
    const contentLower = item.content.toLowerCase();
    const combined = titleLower + " " + contentLower;

    if (combined.includes("hajj") || combined.includes("umrah") || combined.includes("ramadan") || combined.includes("eid")) {
        return { label: "Hajj & Faith", color: "bg-amber-500/10 text-amber-600 border-amber-500/20" };
    }
    if (combined.includes("health") || combined.includes("relief") || combined.includes("food") || combined.includes("community") || combined.includes("welfare")) {
        return { label: "Community & Welfare", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" };
    }
    if (combined.includes("education") || combined.includes("school") || combined.includes("scholarship") || combined.includes("youth")) {
        return { label: "Education", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" };
    }
    if (combined.includes("statement") || combined.includes("press") || combined.includes("council") || combined.includes("official")) {
        return { label: "Press Release", color: "bg-purple-500/10 text-purple-600 border-purple-500/20" };
    }
    return { label: "General News", color: "bg-teal-500/10 text-teal-600 border-teal-500/20" };
};

export function NewsArticlesClient({ initialNewsItems }: NewsArticlesClientProps) {
    const tHero = useTranslations("NewsPage.articlesPage");
    const tNews = useTranslations("NewsPage.news");

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [displayCount, setDisplayCount] = useState(9);

    const categories = [
        { id: "all", label: tHero("allCategories") },
        { id: "Press Release", label: "Press Release" },
        { id: "Community & Welfare", label: "Community & Welfare" },
        { id: "Hajj & Faith", label: "Hajj & Faith" },
        { id: "Education", label: "Education" },
        { id: "General News", label: "General News" },
    ];

    // Filter & Search Logic
    const filteredNews = useMemo(() => {
        return initialNewsItems.filter((item) => {
            const matchesSearch =
                searchQuery === "" ||
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.content.toLowerCase().includes(searchQuery.toLowerCase());

            const itemCategory = getCategory(item).label;
            const matchesCategory = selectedCategory === "all" || itemCategory === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [initialNewsItems, searchQuery, selectedCategory]);

    const displayedArticles = filteredNews.slice(0, displayCount);
    const hasMore = displayCount < filteredNews.length;

    // Featured Article (Top article when no active search/category filter or matching top item)
    const featuredArticle = searchQuery === "" && selectedCategory === "all" && filteredNews.length > 0 ? filteredNews[0] : null;
    const gridArticles = featuredArticle ? displayedArticles.slice(1) : displayedArticles;

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-emerald-500 selection:text-white pb-24">
            {/* 1. HERO SECTION */}
            <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 pt-28 pb-20 px-6 border-b border-white/5">
                {/* Glowing Ambient Background Elements */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />
                <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10 space-y-8">
                    {/* Top Navigation Pill */}
                    <div className="flex items-center justify-between">
                        <Link
                            href="/news"
                            className="inline-flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-all font-semibold text-xs tracking-wider uppercase bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full border border-white/10 backdrop-blur-md shadow-lg"
                        >
                            <ArrowLeft size={14} className="text-emerald-400" /> {tHero("backToNews")}
                        </Link>

                        <div className="hidden sm:flex items-center gap-3 text-xs font-semibold text-slate-400">
                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <ShieldCheck size={14} /> Official Media Portal
                            </span>
                        </div>
                    </div>

                    {/* Hero Headline Content */}
                    <div className="text-center max-w-4xl mx-auto space-y-6 pt-4">
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-[0.2em] uppercase shadow-inner mx-auto">
                            <Sparkles size={14} className="animate-pulse text-amber-400" />
                            {tHero("badge")}
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-outfit text-white tracking-tight leading-[1.1]">
                            {tHero("title1")}{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-amber-500 italic">
                                {tHero("title2")}
                            </span>
                        </h1>

                        <p className="text-base md:text-xl text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto">
                            {tHero("subtitle")}
                        </p>
                    </div>

                    {/* Stats Highlights Bar */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto pt-6">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center gap-4 hover:border-emerald-500/30 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                                <BookOpen size={22} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold font-outfit text-white">{initialNewsItems.length}</div>
                                <div className="text-xs text-slate-400 font-medium">{tHero("totalArticles")}</div>
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center gap-4 hover:border-emerald-500/30 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                                <MapPin size={22} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold font-outfit text-white">47 Counties</div>
                                <div className="text-xs text-slate-400 font-medium">{tHero("countiesCovered")}</div>
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center gap-4 hover:border-emerald-500/30 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                                <Newspaper size={22} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold font-outfit text-white">100% Verified</div>
                                <div className="text-xs text-slate-400 font-medium">{tHero("pressReleases")}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. SEARCH & FILTER TOOLBAR */}
            <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
                <div className="p-4 md:p-6 rounded-3xl bg-slate-800/90 border border-slate-700/80 backdrop-blur-2xl shadow-2xl space-y-4">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        {/* Search Bar */}
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={tHero("searchPlaceholder")}
                                className="w-full bg-slate-900/90 border border-slate-700 focus:border-emerald-500 text-white rounded-2xl pl-12 pr-10 py-3.5 text-sm transition-all outline-none placeholder:text-slate-500"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-700 shrink-0 self-end md:self-auto">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2.5 rounded-xl transition-all ${
                                    viewMode === "grid"
                                        ? "bg-emerald-500 text-white shadow-lg"
                                        : "text-slate-400 hover:text-white"
                                }`}
                                title="Grid View"
                            >
                                <Grid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2.5 rounded-xl transition-all ${
                                    viewMode === "list"
                                        ? "bg-emerald-500 text-white shadow-lg"
                                        : "text-slate-400 hover:text-white"
                                }`}
                                title="List View"
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 scrollbar-none">
                        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 pr-2 shrink-0">
                            <Filter size={14} className="text-emerald-400" /> Filter:
                        </span>
                        {categories.map((cat) => {
                            const isActive = selectedCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                                        isActive
                                            ? "bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/20"
                                            : "bg-slate-900/60 text-slate-300 border-slate-700/60 hover:bg-slate-700 hover:text-white"
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* 3. MAIN CONTENT CONTAINER */}
            <div className="max-w-7xl mx-auto px-6 pt-12 space-y-12">
                {/* Results Meta Info */}
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                    <span>
                        {tHero("showingCount", { count: displayedArticles.length, total: filteredNews.length })}
                    </span>
                    {(searchQuery || selectedCategory !== "all") && (
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory("all");
                            }}
                            className="text-emerald-400 hover:underline flex items-center gap-1"
                        >
                            <X size={14} /> {tHero("resetFilters")}
                        </button>
                    )}
                </div>

                {/* FEATURED SPOTLIGHT ARTICLE (When no search filter is active) */}
                {featuredArticle && (
                    <div className="group relative rounded-[32px] bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 overflow-hidden shadow-2xl hover:border-emerald-500/40 transition-all duration-500">
                        <Link href={`/news/${featuredArticle.slug}`} className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                            {/* Featured Image Column */}
                            <div className="lg:col-span-7 relative min-h-[320px] md:min-h-[420px] overflow-hidden bg-slate-950">
                                {(() => {
                                    const extractedImg = extractFirstImage(featuredArticle.content);
                                    const imageSource = featuredArticle.featured_image
                                        ? (featuredArticle.featured_image.startsWith('http')
                                            ? featuredArticle.featured_image
                                            : `${API_BASE_URL}${featuredArticle.featured_image.startsWith('/') ? '' : '/'}${featuredArticle.featured_image}`)
                                        : (extractedImg || "https://images.unsplash.com/photo-1541872703-74c5e4001bc2?auto=format&fit=crop&q=80&w=1200");

                                    return (
                                        <Image
                                            src={imageSource}
                                            alt={featuredArticle.title}
                                            fill
                                            priority
                                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        />
                                    );
                                })()}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900/90" />
                                
                                <div className="absolute top-6 left-6 flex items-center gap-2">
                                    <span className="px-3.5 py-1.5 rounded-full bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                                        <Sparkles size={12} /> {tHero("featuredBadge")}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${getCategory(featuredArticle).color}`}>
                                        {getCategory(featuredArticle).label}
                                    </span>
                                </div>
                            </div>

                            {/* Featured Text Column */}
                            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar size={14} className="text-amber-400" />
                                            {new Date(featuredArticle.created_at).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock size={14} className="text-emerald-400" />
                                            {calculateReadTime(featuredArticle.content)} {tHero("readTime")}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-outfit text-white leading-tight group-hover:text-emerald-300 transition-colors">
                                        {featuredArticle.title}
                                    </h2>

                                    <p className="text-slate-300 text-sm md:text-base leading-relaxed line-clamp-4 font-normal">
                                        {cleanContent(featuredArticle.content)}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                                            SP
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-white">SUPKEM Press</div>
                                            <div className="text-[10px] text-slate-400">Official Bulletin</div>
                                        </div>
                                    </div>

                                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                                        {tHero("readStory")} <ArrowRight size={16} />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                {/* ARTICLES GRID / LIST VIEW */}
                {gridArticles.length > 0 ? (
                    <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "flex flex-col gap-6"}>
                        {gridArticles.map((item) => {
                            const extractedImg = extractFirstImage(item.content);
                            const imageSource = item.featured_image
                                ? (item.featured_image.startsWith('http')
                                    ? item.featured_image
                                    : `${API_BASE_URL}${item.featured_image.startsWith('/') ? '' : '/'}${item.featured_image}`)
                                : (extractedImg || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800");

                            const category = getCategory(item);
                            const readTime = calculateReadTime(item.content);

                            if (viewMode === "list") {
                                return (
                                    <Link
                                        key={item.id}
                                        href={`/news/${item.slug}`}
                                        className="group p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/40 hover:bg-slate-800 transition-all flex flex-col md:flex-row gap-6 shadow-lg"
                                    >
                                        <div className="w-full md:w-64 h-48 rounded-2xl bg-slate-900 overflow-hidden relative shrink-0">
                                            <Image
                                                src={imageSource}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase border backdrop-blur-md ${category.color}`}>
                                                {category.label}
                                            </span>
                                        </div>

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
                                                        {readTime} {tHero("readTime")}
                                                    </span>
                                                </div>

                                                <h3 className="text-xl font-bold font-outfit text-white group-hover:text-emerald-400 transition-colors">
                                                    {item.title}
                                                </h3>

                                                <p className="text-slate-300 text-sm leading-relaxed line-clamp-2">
                                                    {cleanContent(item.content)}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                                                <span className="text-xs text-slate-400 font-medium">SUPKEM Press Secretariat</span>
                                                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                                                    {tNews("details")} <ChevronRight size={14} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            }

                            return (
                                <div
                                    key={item.id}
                                    className="group rounded-3xl bg-slate-800/80 border border-slate-700/80 overflow-hidden hover:border-emerald-500/40 hover:bg-slate-800 transition-all flex flex-col justify-between shadow-xl"
                                >
                                    <Link href={`/news/${item.slug}`} className="flex flex-col h-full">
                                        <div className="aspect-[16/10] bg-slate-900 relative overflow-hidden shrink-0">
                                            <Image
                                                src={imageSource}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                                            <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${category.color}`}>
                                                {category.label}
                                            </span>
                                        </div>

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
                                                        {readTime} {tHero("readTime")}
                                                    </span>
                                                </div>

                                                <h3 className="text-xl font-bold font-outfit text-white group-hover:text-emerald-300 transition-colors leading-snug">
                                                    {item.title}
                                                </h3>

                                                <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                                                    {cleanContent(item.content)}
                                                </p>
                                            </div>

                                            <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs font-bold">
                                                <span className="text-slate-400 font-medium">SUPKEM Press</span>
                                                <span className="text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                                                    {tNews("details")} <ArrowRight size={14} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* EMPTY SEARCH STATE */
                    <div className="py-20 text-center space-y-6 max-w-md mx-auto">
                        <div className="w-20 h-20 bg-slate-800 rounded-3xl border border-slate-700 flex items-center justify-center mx-auto text-emerald-400 shadow-xl">
                            <BookOpen size={36} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold font-outfit text-white">{tHero("noResultsTitle")}</h3>
                            <p className="text-slate-400 text-sm">{tHero("noResultsDesc")}</p>
                        </div>
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory("all");
                            }}
                            className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                        >
                            {tHero("resetFilters")}
                        </button>
                    </div>
                )}

                {/* LOAD MORE BUTTON */}
                {hasMore && (
                    <div className="flex justify-center pt-8">
                        <button
                            onClick={() => setDisplayCount((prev) => prev + 6)}
                            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-2xl font-bold uppercase tracking-wider text-xs flex items-center gap-3 transition-all hover:scale-105 shadow-xl"
                        >
                            {tHero("loadMore")} <ChevronRight size={16} />
                        </button>
                    </div>
                )}

                {/* 4. PRESS & COMMUNICATIONS CTA BANNER */}
                <div className="mt-20 p-8 md:p-12 rounded-[32px] bg-gradient-to-r from-emerald-950/80 via-slate-900 to-amber-950/60 border border-emerald-500/20 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
                    <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-3 text-center md:text-left max-w-2xl">
                            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
                                <FileText size={16} /> Press & Media Relations
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold font-outfit text-white">
                                {tHero("pressCtaTitle")}
                            </h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                {tHero("pressCtaDesc")}
                            </p>
                        </div>

                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black uppercase tracking-widest text-xs rounded-2xl transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 shrink-0"
                        >
                            {tHero("contactMedia")}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
