"use client";

import { useTranslations } from "next-intl";
import { OrganizationSortOption } from "./useAdminOrganizationsLogic";
import { OrganizationFilterBar } from "./OrganizationFilterBar";

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

            <OrganizationFilterBar
                searchTerm={searchTerm}
                onSearchChange={onSearchChange}
                typeFilter={typeFilter}
                onTypeFilterChange={onTypeFilterChange}
                distinctTypes={distinctTypes}
                sortBy={sortBy}
                onSortByChange={onSortByChange}
                viewMode={viewMode}
                onViewModeChange={onViewModeChange}
            />
        </div>
    );
}
