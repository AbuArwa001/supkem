"use client";

import { Search, Grid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface OrganizationHeaderProps {
    totalCount: number;
    searchTerm: string;
    onSearchChange: (value: string) => void;
    viewMode: "grid" | "list";
    onViewModeChange: (mode: "grid" | "list") => void;
}

export function OrganizationHeader({
    totalCount,
    searchTerm,
    onSearchChange,
    viewMode,
    onViewModeChange
}: OrganizationHeaderProps) {
    const t = useTranslations("Dashboard.admin.organizations");

    return (
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1">
                <h1 className="text-4xl font-bold font-outfit text-primary tracking-tight">
                    {t("heading")}
                </h1>
                <p className="text-foreground/60 font-medium">
                    {t("desc", { totalCount })}
                </p>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative group">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors" />
                    <input
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder={t("search")}
                        className="pl-12 pr-4 py-3 bg-white border border-border focus:border-primary/20 rounded-2xl text-sm transition-all outline-none w-64 shadow-sm"
                    />
                </div>

                <div className="flex bg-white border border-border rounded-2xl p-1 shadow-sm">
                    <button
                        onClick={() => onViewModeChange("grid")}
                        className={cn(
                            "p-2 px-4 rounded-xl transition-all", 
                            viewMode === "grid" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-foreground/40 hover:bg-primary/5"
                        )}
                    >
                        <Grid size={18} />
                    </button>
                    <button
                        onClick={() => onViewModeChange("list")}
                        className={cn(
                            "p-2 px-4 rounded-xl transition-all", 
                            viewMode === "list" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-foreground/40 hover:bg-primary/5"
                        )}
                    >
                        <List size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}

