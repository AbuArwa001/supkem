"use client";

import { Search, X, Grid, List, Filter } from "lucide-react";

interface Category {
    id: string;
    label: string;
}

interface NewsArticlesFilterBarProps {
    searchQuery: string;
    onSearchChange: (q: string) => void;
    viewMode: "grid" | "list";
    onViewModeChange: (m: "grid" | "list") => void;
    selectedCategory: string;
    onCategoryChange: (c: string) => void;
    categories: Category[];
    searchPlaceholder: string;
}

export function NewsArticlesFilterBar({
    searchQuery, onSearchChange, viewMode, onViewModeChange,
    selectedCategory, onCategoryChange, categories, searchPlaceholder,
}: NewsArticlesFilterBarProps) {
    return (
        <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-30">
            <div className="p-5 md:p-6 rounded-3xl bg-slate-900 border border-slate-800 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] space-y-4">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder={searchPlaceholder}
                            className="w-full bg-slate-950 border border-slate-700/80 focus:border-emerald-500 text-white rounded-2xl pl-12 pr-10 py-3.5 text-sm transition-all outline-none placeholder:text-slate-500 shadow-inner"
                        />
                        {searchQuery && (
                            <button onClick={() => onSearchChange("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1">
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 shrink-0 self-end md:self-auto">
                        <button
                            onClick={() => onViewModeChange("grid")}
                            className={`p-2.5 rounded-xl transition-all ${viewMode === "grid" ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "text-slate-400 hover:text-white"}`}
                            title="Grid View"
                        >
                            <Grid size={18} />
                        </button>
                        <button
                            onClick={() => onViewModeChange("list")}
                            className={`p-2.5 rounded-xl transition-all ${viewMode === "list" ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "text-slate-400 hover:text-white"}`}
                            title="List View"
                        >
                            <List size={18} />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 scrollbar-none">
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 pr-2 shrink-0">
                        <Filter size={14} className="text-emerald-400" /> Filter:
                    </span>
                    {categories.map((cat) => {
                        const isActive = selectedCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => onCategoryChange(cat.id)}
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
    );
}
