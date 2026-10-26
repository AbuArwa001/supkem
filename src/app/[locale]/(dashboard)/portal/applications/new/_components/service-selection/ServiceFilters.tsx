"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  categories: string[];
  totalServices: number;
  isAr: boolean;
}

export function ServiceFilters({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  categories,
  totalServices,
  isAr,
}: ServiceFiltersProps) {
  return (
    <div className="space-y-3 bg-slate-50/70 border border-slate-200/80 p-3 sm:p-4 rounded-2xl">
      <div className="relative">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 rtl:left-auto rtl:right-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={isAr ? "ابحث عن خدمة بالاسم أو الوصف..." : "Search services by name or keyword..."}
          className="w-full pl-10 pr-10 rtl:pl-10 rtl:pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rtl:right-auto rtl:left-3"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveCategory("all")}
          className={cn(
            "px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer",
            activeCategory === "all" ? "bg-primary text-white shadow-xs" : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
          )}
        >
          {isAr ? "جميع الخدمات" : "All Services"} ({totalServices})
        </button>
        {categories
          .filter((c) => c !== "all")
          .map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer",
                activeCategory.toLowerCase() === cat.toLowerCase()
                  ? "bg-primary text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
              )}
            >
              {cat}
            </button>
          ))}
      </div>
    </div>
  );
}
