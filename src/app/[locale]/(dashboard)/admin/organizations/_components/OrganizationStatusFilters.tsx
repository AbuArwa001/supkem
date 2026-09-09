"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface OrganizationStatusFiltersProps {
    activeFilter: string;
    onFilterChange: (status: string) => void;
    statuses?: string[];
    statusCounts?: Record<string, number>;
}

export function OrganizationStatusFilters({
    activeFilter,
    onFilterChange,
    statuses = ["All", "Pending", "Accredited", "Suspended"],
    statusCounts = {}
}: OrganizationStatusFiltersProps) {
    const t = useTranslations("Dashboard.admin.organizations.filters");

    return (
        <div className="flex bg-slate-50 border-2 border-border/60 p-1.5 rounded-2xl w-fit relative shadow-sm">
            {statuses.map((status) => {
                const isActive = activeFilter === status;
                const count = statusCounts[status] || 0;
                
                return (
                    <button
                        key={status}
                        onClick={() => onFilterChange(status)}
                        className={cn(
                            "relative px-6 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2",
                            isActive ? "text-primary" : "text-foreground/50 hover:text-foreground/80"
                        )}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="statusFilterBg"
                                className="absolute inset-0 bg-white rounded-xl shadow-sm border border-black/5"
                                initial={false}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">{t(status.toLowerCase())}</span>
                        <span className={cn(
                            "relative z-10 px-2 py-0.5 rounded-full text-xs font-black transition-colors",
                            isActive ? "bg-primary/10 text-primary" : "bg-slate-200 text-slate-500 group-hover:bg-slate-300"
                        )}>
                            {count}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

