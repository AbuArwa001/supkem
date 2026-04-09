"use client";

import { cn } from "@/lib/utils";

interface OrganizationStatusFiltersProps {
    activeFilter: string;
    onFilterChange: (status: string) => void;
    statuses?: string[];
}

export function OrganizationStatusFilters({
    activeFilter,
    onFilterChange,
    statuses = ["All", "Pending", "Accredited", "Suspended"]
}: OrganizationStatusFiltersProps) {
    return (
        <div className="flex bg-slate-100 p-1 rounded-2xl w-fit">
            {statuses.map((status) => (
                <button
                    key={status}
                    onClick={() => onFilterChange(status)}
                    className={cn(
                        "px-6 py-2 rounded-xl text-sm font-bold transition-all",
                        activeFilter === status
                            ? "bg-white text-primary shadow-sm"
                            : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
                    )}
                >
                    {status}
                </button>
            ))}
        </div>
    );
}
