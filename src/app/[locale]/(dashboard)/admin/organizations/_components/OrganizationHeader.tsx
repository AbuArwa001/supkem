"use client";

import { Search, Grid, List, X, Filter, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { OrganizationSortOption } from "./useAdminOrganizationsLogic";

interface OrganizationHeaderProps {
    totalCount: number;
    filteredCount: number;
    searchTerm: string;
    onSearchChange: (value: string) => void;
    typeFilter: string;
    onTypeFilterChange: (type: string) => void;
    distinctTypes: string[];
    sortBy: OrganizationSortOption;
    onSortByChange: (sort: OrganizationSortOption) => void;
    viewMode: "grid" | "list";
    onViewModeChange: (mode: "grid" | "list") => void;
}

export function OrganizationHeader({
    totalCount,
    filteredCount,
    searchTerm,
    onSearchChange,
    typeFilter,
    onTypeFilterChange,
    distinctTypes,
    sortBy,
    onSortByChange,
    viewMode,
    onViewModeChange,
}: OrganizationHeaderProps) {
    const t = useTranslations("Dashboard.admin.organizations");

    return (
        <div className="space-y-6">
            {/* Title & Subtitle Banner */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl sm:text-4xl font-black font-outfit text-primary tracking-tight">
                            {t("heading")}
                        </h1>
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black border border-primary/20">
                            {filteredCount === totalCount ? `${totalCount} Entities` : `${filteredCount} / ${totalCount}`}
                        </span>
                    </div>
                    <p className="text-slate-500 font-medium text-sm sm:text-base flex items-center gap-2">
                        {t("desc", { totalCount })}
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
                    </p>
                </div>
            </div>

            {/* Filter & Control Bar */}
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                    {/* Search Input */}
                    <div className="sm:col-span-12 lg:col-span-5 relative group">
                        <Search
                            size={16}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
                        />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder={t("search")}
                            className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm font-medium rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-slate-400"
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={() => onSearchChange("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    {/* Type Filter Select */}
                    <div className="sm:col-span-6 lg:col-span-3 relative">
                        <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                        <select
                            value={typeFilter}
                            onChange={(e) => onTypeFilterChange(e.target.value)}
                            className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm font-medium rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer text-slate-700"
                        >
                            <option value="All">{t("allTypes")}</option>
                            {distinctTypes.map((type) => (
                                <option key={type} value={type}>
                                    {t.has(`types.${type.toLowerCase()}`) ? t(`types.${type.toLowerCase()}`) : type}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                            ▼
                        </div>
                    </div>

                    {/* Sort Select */}
                    <div className="sm:col-span-6 lg:col-span-2.5 relative">
                        <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                        <select
                            value={sortBy}
                            onChange={(e) => onSortByChange(e.target.value as OrganizationSortOption)}
                            className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm font-medium rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer text-slate-700"
                        >
                            <option value="name_asc">{t("sort.name_asc")}</option>
                            <option value="name_desc">{t("sort.name_desc")}</option>
                            <option value="apps_desc">{t("sort.apps_desc")}</option>
                            <option value="certs_desc">{t("sort.certs_desc")}</option>
                            <option value="newest">{t("sort.newest")}</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                            ▼
                        </div>
                    </div>

                    {/* View Mode Switcher */}
                    <div className="sm:col-span-12 lg:col-span-1.5 flex justify-end">
                        <div className="flex bg-slate-100 border border-slate-200 rounded-xl p-1 relative w-fit">
                            <button
                                type="button"
                                onClick={() => onViewModeChange("grid")}
                                title="Grid View"
                                className={cn(
                                    "relative z-10 p-2 rounded-lg transition-colors flex items-center justify-center cursor-pointer",
                                    viewMode === "grid" ? "text-primary" : "text-slate-400 hover:text-slate-700"
                                )}
                            >
                                <Grid size={16} />
                            </button>
                            <button
                                type="button"
                                onClick={() => onViewModeChange("list")}
                                title="List View"
                                className={cn(
                                    "relative z-10 p-2 rounded-lg transition-colors flex items-center justify-center cursor-pointer",
                                    viewMode === "list" ? "text-primary" : "text-slate-400 hover:text-slate-700"
                                )}
                            >
                                <List size={16} />
                            </button>

                            {/* Sliding active indicator */}
                            <motion.div
                                className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-xs border border-black/5"
                                initial={false}
                                animate={{
                                    left: viewMode === "grid" ? "4px" : "calc(50% + 0px)",
                                }}
                                transition={{ type: "spring", stiffness: 450, damping: 35 }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
