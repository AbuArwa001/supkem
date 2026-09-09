"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

import { useAdminOrganizationsLogic } from "./_components/useAdminOrganizationsLogic";
import { OrganizationHeader } from "./_components/OrganizationHeader";
import { OrganizationStatusFilters } from "./_components/OrganizationStatusFilters";
import { OrganizationCard } from "./_components/OrganizationCard";

export default function AdminOrganizations() {
    const {
        organizations,
        filteredOrgs,
        searchTerm,
        setSearchTerm,
        viewMode,
        setViewMode,
        statusFilter,
        setStatusFilter,
        statusCounts,
        isLoading,
    } = useAdminOrganizationsLogic();

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8 md:space-y-10 max-w-[1600px] mx-auto pb-20"
        >
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <OrganizationHeader
                    totalCount={organizations.length}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
            >
                <OrganizationStatusFilters
                    activeFilter={statusFilter}
                    onFilterChange={setStatusFilter}
                    statusCounts={statusCounts}
                />
            </motion.div>

            {!isLoading && filteredOrgs.length === 0 ? (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white border-2 border-dashed border-slate-200 rounded-3xl"
                >
                    <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center mb-6">
                        <Building2 size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-700 mb-2">No organizations found</h3>
                    <p className="text-slate-500 max-w-md">
                        We couldn't find any organizations matching your current filters or search term. Try adjusting them to see more results.
                    </p>
                </motion.div>
            ) : (
                <motion.div 
                    layout
                    className={cn(
                        "grid gap-6",
                        viewMode === "grid" ? "grid-cols-[repeat(auto-fill,minmax(340px,1fr))]" : "grid-cols-1"
                    )}
                >
                    {filteredOrgs.map((org, i) => (
                        <OrganizationCard
                            key={org.id}
                            org={org}
                            index={i}
                            viewMode={viewMode}
                        />
                    ))}
                </motion.div>
            )}
        </div>
    );
}

