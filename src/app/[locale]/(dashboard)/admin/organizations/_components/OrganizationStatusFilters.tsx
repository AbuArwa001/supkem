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

    const getStatusDot = (status: string) => {
        switch (status) {
            case "Accredited":
                return "bg-emerald-500";
            case "Pending":
                return "bg-amber-500 animate-pulse";
            case "Suspended":
                return "bg-rose-500";
            default:
                return "bg-primary";
        }
    };

    return (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <div className="flex bg-slate-100 border border-slate-200 p-1 rounded-2xl w-fit relative shadow-2xs">
                {statuses.map((status) => {
                    const isActive = activeFilter.toLowerCase() === status.toLowerCase();
                    const count = statusCounts[status] || 0;
                    
                    return (
                        <button
                            key={status}
                            type="button"
                            onClick={() => onFilterChange(status)}
                            className={cn(
                                "relative px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer select-none",
                                isActive ? "text-slate-900 font-extrabold" : "text-slate-500 hover:text-slate-800"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="statusFilterBg"
                                    className="absolute inset-0 bg-white rounded-xl shadow-xs border border-black/5"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                                />
                            )}
                            <span className={cn("relative z-10 w-2 h-2 rounded-full", getStatusDot(status))} />
                            <span className="relative z-10">{t(status.toLowerCase())}</span>
                            <span className={cn(
                                "relative z-10 px-2 py-0.5 rounded-full text-[11px] font-black transition-colors",
                                isActive 
                                    ? "bg-primary/10 text-primary" 
                                    : "bg-slate-200/80 text-slate-600"
                            )}>
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
