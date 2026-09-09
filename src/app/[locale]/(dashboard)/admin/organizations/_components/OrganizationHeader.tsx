"use client";

import { Search, Grid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

import { motion } from "framer-motion";

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
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-border/50">
            <div className="space-y-2">
                <h1 className="text-4xl font-black font-outfit text-primary tracking-tight">
                    {t("heading")}
                </h1>
                <p className="text-foreground/60 font-medium flex items-center gap-2">
                    {t("desc", { totalCount })}
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 inline-block animate-pulse"></span>
                </p>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative group">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 group-focus-within:text-primary transition-colors" />
                    <input
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder={t("search")}
                        className="pl-11 pr-4 py-2.5 bg-white border-2 border-border/60 focus:border-primary rounded-xl text-sm transition-all outline-none w-64 md:w-80 shadow-sm focus:shadow-md focus:shadow-primary/5 font-medium placeholder:text-foreground/30"
                    />
                </div>

                <div className="flex bg-slate-50 border-2 border-border/60 rounded-xl p-1 relative shadow-sm">
                    <button
                        onClick={() => onViewModeChange("grid")}
                        className={cn(
                            "relative z-10 p-2 px-4 rounded-lg transition-colors font-medium flex items-center gap-2", 
                            viewMode === "grid" ? "text-primary" : "text-foreground/40 hover:text-foreground/70"
                        )}
                    >
                        <Grid size={16} />
                    </button>
                    <button
                        onClick={() => onViewModeChange("list")}
                        className={cn(
                            "relative z-10 p-2 px-4 rounded-lg transition-colors font-medium flex items-center gap-2", 
                            viewMode === "list" ? "text-primary" : "text-foreground/40 hover:text-foreground/70"
                        )}
                    >
                        <List size={16} />
                    </button>
                    
                    {/* Animated background indicator */}
                    <div className="absolute inset-y-1 left-1 right-1 pointer-events-none">
                        <motion.div
                            className="absolute top-0 bottom-0 w-1/2 bg-white rounded-lg shadow-sm border border-black/5"
                            initial={false}
                            animate={{
                                x: viewMode === "grid" ? 0 : "100%"
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

