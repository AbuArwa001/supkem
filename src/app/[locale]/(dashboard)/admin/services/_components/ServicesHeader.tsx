"use client";

import { Search, Plus, Layers } from "lucide-react";
import { useTranslations } from "next-intl";

interface ServicesHeaderProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onAddService: () => void;
    onManageCategories: () => void;
}

export function ServicesHeader({ searchTerm, onSearchChange, onAddService, onManageCategories }: ServicesHeaderProps) {
    const t = useTranslations("Dashboard.admin.services");

    return (
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1">
                <h1 className="text-4xl font-bold font-outfit text-primary tracking-tight">
                    {t("heading")}
                </h1>
                <p className="text-foreground/60 font-medium">
                    {t("desc")}
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                <div className="relative group w-full sm:w-auto">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors" />
                    <input
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder={t("search")}
                        className="pl-12 pr-4 py-3 bg-white border border-border focus:border-primary/20 rounded-2xl text-sm transition-all outline-none w-full sm:w-64 shadow-sm"
                    />
                </div>

                <button
                    onClick={onManageCategories}
                    className="px-5 py-3 bg-white hover:bg-primary/[0.04] text-primary border border-border hover:border-primary/30 rounded-2xl font-bold text-sm shadow-xs flex rtl:flex-row-reverse items-center justify-center gap-2 shrink-0 whitespace-nowrap w-full sm:w-auto transition-all cursor-pointer"
                >
                    <Layers size={18} /> {t("manageCategories")}
                </button>

                <button
                    onClick={onAddService}
                    className="px-6 py-3 bg-primary text-white rounded-2xl font-bold text-sm hover-lift premium-gradient shadow-lg flex rtl:flex-row-reverse items-center justify-center gap-2 shrink-0 whitespace-nowrap w-full sm:w-auto cursor-pointer"
                >
                    <Plus size={18} /> {t("addService")}
                </button>
            </div>
        </div>
    );
}


