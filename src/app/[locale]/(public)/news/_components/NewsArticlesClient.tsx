"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import {
    Search,
    Calendar,
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
import { SocialShareButtons } from "@/components/SocialShareButtons";
import { SocialFollowLinks } from "@/components/SocialFollowLinks";

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
    return Math.max(1, Math.ceil(words / 180));
};

// Categorization helper based on keywords
const getCategory = (item: NewsItem) => {
    const titleLower = item.title.toLowerCase();
    const contentLower = item.content.toLowerCase();
    const combined = titleLower + " " + contentLower;

    if (combined.includes("hajj") || combined.includes("umrah") || combined.includes("ramadan") || combined.includes("eid")) {
        return { label: "Hajj & Faith", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" };
    }
    if (combined.includes("health") || combined.includes("relief") || combined.includes("food") || combined.includes("community") || combined.includes("welfare")) {
        return { label: "Community & Welfare", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" };
    }
    if (combined.includes("education") || combined.includes("school") || combined.includes("scholarship") || combined.includes("youth")) {
        return { label: "Education", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" };
    }
    if (combined.includes("statement") || combined.includes("press") || combined.includes("council") || combined.includes("official")) {
        return { label: "Press Release", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" };
    }
    return { label: "General News", color: "bg-teal-500/20 text-teal-300 border-teal-500/30" };
};

export function NewsArticlesClient({ initialNewsItems }: NewsArticlesClientProps) {
    let tHero: any;
    let tNews: any;

    try {
        tHero = useTranslations("NewsPage.articlesPage");
    } catch {
        tHero = null;
    }

    try {
        tNews = useTranslations("NewsPage.news");
    } catch {
        tNews = null;
    }

    // Helper for safe translation lookup with graceful fallback
    const tSafe = (tFunc: any, key: string, fallback: string, values?: any) => {
        if (!tFunc) return fallback;
        try {
            const res = tFunc(key, values);
            if (!res || res.includes("NewsPage.") || res === key) {
                return fallback;
            }
            return res;
        } catch {
            return fallback;
        }
    };

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
        <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white pb-24">
            {/* 1. DISTINCT HIGH-IMPACT HERO SECTION */}
            <section className="relative min-h-[70vh] flex flex-col justify-between overflow-hidden pt-28 pb-20 px-6 bg-gradient-to-br from-slate-950 via-emerald-950/40 to-slate-950 border-b border-emerald-500/20 shadow-2xl">
                {/* Background Hero Banner Image with Overlays */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2000"
                        alt="SUPKEM Newsroom"
                        className="w-full h-full object-cover opacity-20 scale-105 filter blur-[2px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/90" />
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/60 via-transparent to-amber-950/40" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-emerald-500/15 blur-[160px] rounded-full pointer-events-none" />
                </div>

                <div className="max-w-7xl mx-auto w-full relative z-10 space-y-10">
                    {/* Top Navigation Bar Pill & Social Follow Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <Link
                            href="/news"
                            className="inline-flex items-center gap-2 text-slate-200 hover:text-emerald-400 transition-all font-semibold text-xs tracking-wider uppercase bg-slate-900/80 hover:bg-slate-800 px-5 py-2.5 rounded-full border border-slate-700/80 backdrop-blur-md shadow-xl"
                        >
                            <ArrowLeft size={14} className="text-emerald-400" /> {tSafe(tHero, "backToNews", "Back to News Hub")}
                        </Link>

                        {/* Official Social Media Follow Links */}
                        <div className="flex items-center gap-3">
                            <span className="hidden lg:inline-block text-xs font-bold text-slate-400 uppercase tracking-wider">Follow Us:</span>
                            <SocialFollowLinks variant="icons" />
                        </div>
                    </div>

                    {/* Central Floating Glassmorphic Hero Box */}
                    <div className="max-w-4xl mx-auto text-center space-y-8 p-8 md:p-14 rounded-[40px] bg-slate-900/70 border border-white/10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-[0.2em] uppercase shadow-lg mx-auto backdrop-blur-md">
                            <Sparkles size={14} className="animate-pulse text-amber-400" />
                            {tSafe(tHero, "badge", "SUPKEM Press & Official Archives")}
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-outfit text-white tracking-tight leading-[1.1]">
                            {tSafe(tHero, "title1", "News & Media")}{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-amber-500 italic">
                                {tSafe(tHero, "title2", "Articles Hub")}
                            </span>
                        </h1>

                        <p className="text-base md:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
                            {tSafe(tHero, "subtitle", "Explore verified press releases, community bulletins, strategic updates, and official statements from the Supreme Council of Kenya Muslims.")}
                        </p>

                        {/* Live Metrics Row Inside Hero */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-3">
                                <BookOpen size={20} className="text-emerald-400" />
                                <div className="text-left">
                                    <div className="text-xl font-bold font-outfit text-white">{initialNewsItems.length}</div>
                                    <div className="text-[11px] text-slate-400 font-medium">{tSafe(tHero, "totalArticles", "Published Articles")}</div>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-3">
                                <MapPin size={20} className="text-amber-400" />
                                <div className="text-left">
                                    <div className="text-xl font-bold font-outfit text-white">47 Counties</div>
                                    <div className="text-[11px] text-slate-400 font-medium">{tSafe(tHero, "countiesCovered", "Counties Covered")}</div>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-3">
                                <Newspaper size={20} className="text-purple-400" />
                                <div className="text-left">
                                    <div className="text-xl font-bold font-outfit text-white">100% Verified</div>
                                    <div className="text-[11px] text-slate-400 font-medium">{tSafe(tHero, "pressReleases", "Verified Press Bulletins")}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. SEARCH & FILTER TOOLBAR (FLOATING OVER THE HERO BOUNDARY) */}
            <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-30">
                <div className="p-5 md:p-6 rounded-3xl bg-slate-900 border border-slate-800 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] space-y-4">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        {/* Search Input */}
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={tSafe(tHero, "searchPlaceholder", "Search articles by title, keywords, or topics...")}
                                className="w-full bg-slate-950 border border-slate-700/80 focus:border-emerald-500 text-white rounded-2xl pl-12 pr-10 py-3.5 text-sm transition-all outline-none placeholder:text-slate-500 shadow-inner"
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

                        {/* View Switcher */}
                        <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 shrink-0 self-end md:self-auto">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2.5 rounded-xl transition-all ${
                                    viewMode === "grid"
                                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
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
                                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                                        : "text-slate-400 hover:text-white"
                                }`}
                                title="List View"
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Filter Categories */}
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
                                            : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white"
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
                {/* Results Meta Header */}
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                    <span>
                        {tSafe(
                            tHero,
                            "showingCount",
                            `Showing ${displayedArticles.length} of ${filteredNews.length} articles`,
                            { count: displayedArticles.length, total: filteredNews.length }
                        )}
                    </span>
                    {(searchQuery || selectedCategory !== "all") && (
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory("all");
                            }}
                            className="text-emerald-400 hover:underline flex items-center gap-1"
                        >
                            <X size={14} /> {tSafe(tHero, "resetFilters", "Reset Search & Filters")}
                        </button>
                    )}
                </div>

                {/* FEATURED SPOTLIGHT ARTICLE (When no search filter is active) */}
                {featuredArticle && (
                    <div className="group relative rounded-[32px] bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl hover:border-emerald-500/40 transition-all duration-500">
                        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                            {/* Featured Image Column */}
                            <div className="lg:col-span-7 relative min-h-[320px] md:min-h-[420px] overflow-hidden bg-slate-950">
                                <Link href={`/news/${featuredArticle.slug}`}>
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
                                </Link>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950/90 pointer-events-none" />

                                <div className="absolute top-6 left-6 flex items-center gap-2">
                                    <span className="px-3.5 py-1.5 rounded-full bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                                        <Sparkles size={12} /> {tSafe(tHero, "featuredBadge", "FEATURED STORY")}
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
                                            {calculateReadTime(featuredArticle.content)} {tSafe(tHero, "readTime", "min read")}
                                        </span>
                                    </div>

                                    <Link href={`/news/${featuredArticle.slug}`}>
                                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-outfit text-white leading-tight group-hover:text-emerald-300 transition-colors">
                                            {featuredArticle.title}
                                        </h2>
                                    </Link>

                                    <p className="text-slate-300 text-sm md:text-base leading-relaxed line-clamp-4 font-normal">
                                        {cleanContent(featuredArticle.content)}
                                    </p>
                                </div>

                                {/* Social Sharing Buttons for Featured Story */}
                                <div className="space-y-4 pt-4 border-t border-slate-800">
                                    <SocialShareButtons
                                        title={featuredArticle.title}
                                        url={typeof window !== "undefined" ? `${window.location.origin}/news/${featuredArticle.slug}` : undefined}
                                    />

                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                                                SP
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-white">SUPKEM Press</div>
                                                <div className="text-[10px] text-slate-400">Official Bulletin</div>
                                            </div>
                                        </div>

                                        <Link
                                            href={`/news/${featuredArticle.slug}`}
                                            className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all"
                                        >
                                            {tSafe(tHero, "readStory", "Read Full Story")} <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                    <div
                                        key={item.id}
                                        className="group p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col md:flex-row gap-6 shadow-lg"
                                    >
                                        <Link href={`/news/${item.slug}`} className="w-full md:w-64 h-48 rounded-2xl bg-slate-950 overflow-hidden relative shrink-0">
                                            <Image
                                                src={imageSource}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
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

                            return (
                                <div
                                    key={item.id}
                                    className="group rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-emerald-500/40 transition-all flex flex-col justify-between shadow-xl"
                                >
                                    <div className="flex flex-col h-full">
                                        <Link href={`/news/${item.slug}`} className="aspect-[16/10] bg-slate-950 relative overflow-hidden shrink-0">
                                            <Image
                                                src={imageSource}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                            />
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
                                                    <Link
                                                        href={`/news/${item.slug}`}
                                                        className="text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-2.5 transition-all"
                                                    >
                                                        {tSafe(tNews, "details", "Details")} <ArrowRight size={14} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* EMPTY SEARCH STATE */
                    <div className="py-20 text-center space-y-6 max-w-md mx-auto">
                        <div className="w-20 h-20 bg-slate-900 rounded-3xl border border-slate-800 flex items-center justify-center mx-auto text-emerald-400 shadow-xl">
                            <BookOpen size={36} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold font-outfit text-white">{tSafe(tHero, "noResultsTitle", "No articles match your search")}</h3>
                            <p className="text-slate-400 text-sm">{tSafe(tHero, "noResultsDesc", "Try adjusting your search terms or selecting a different category filter.")}</p>
                        </div>
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory("all");
                            }}
                            className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                        >
                            {tSafe(tHero, "resetFilters", "Reset Search & Filters")}
                        </button>
                    </div>
                )}

                {/* LOAD MORE BUTTON */}
                {hasMore && (
                    <div className="flex justify-center pt-8">
                        <button
                            onClick={() => setDisplayCount((prev) => prev + 6)}
                            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 rounded-2xl font-bold uppercase tracking-wider text-xs flex items-center gap-3 transition-all hover:scale-105 shadow-xl"
                        >
                            {tSafe(tHero, "loadMore", "Load More Articles")} <ChevronRight size={16} />
                        </button>
                    </div>
                )}

                {/* 4. PRESS & COMMUNICATIONS CTA BANNER + SOCIAL CHANNELS */}
                <div className="mt-20 p-8 md:p-12 rounded-[32px] bg-gradient-to-r from-emerald-950/80 via-slate-900 to-amber-950/60 border border-emerald-500/20 backdrop-blur-2xl shadow-2xl relative overflow-hidden space-y-8">
                    <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-3 text-center md:text-left max-w-2xl">
                            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
                                <FileText size={16} /> Press & Media Relations
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold font-outfit text-white">
                                {tSafe(tHero, "pressCtaTitle", "Looking for Media Kits or Official Press Statements?")}
                            </h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                {tSafe(tHero, "pressCtaDesc", "Contact the SUPKEM Communications Office for official commentary, press releases, or media inquiries.")}
                            </p>
                        </div>

                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black uppercase tracking-widest text-xs rounded-2xl transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 shrink-0"
                        >
                            {tSafe(tHero, "contactMedia", "Contact Communications Secretariat")}
                        </Link>
                    </div>

                    <div className="relative z-10 pt-6 border-t border-slate-800/80">
                        <SocialFollowLinks variant="pills" />
                    </div>
                </div>
            </div>
        </div>
    );
}
