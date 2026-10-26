"use client";

import { motion } from "framer-motion";
import { Building2, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";

interface OrganizationEmptyStateProps {
    isFiltered: boolean;
    onClearFilters: () => void;
}

export function OrganizationEmptyState({ isFiltered, onClearFilters }: OrganizationEmptyStateProps) {
    const t = useTranslations("Dashboard.admin.organizations");

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white border-2 border-dashed border-slate-200 rounded-3xl space-y-4 shadow-2xs"
        >
            <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center shadow-inner">
                <Building2 size={38} />
            </div>
            <div className="space-y-1 max-w-md">
                <h3 className="text-xl sm:text-2xl font-black font-outfit text-slate-800">
                    {t("empty.title")}
                </h3>
                <p className="text-slate-500 text-sm font-medium">
                    {t("empty.desc")}
                </p>
            </div>
            {isFiltered && (
                <button
                    type="button"
                    onClick={onClearFilters}
                    className="mt-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-md shadow-primary/20 transition-all cursor-pointer flex items-center gap-2"
                >
                    <RotateCcw size={14} />
                    {t("empty.clear")}
                </button>
            )}
        </motion.div>
    );
}
