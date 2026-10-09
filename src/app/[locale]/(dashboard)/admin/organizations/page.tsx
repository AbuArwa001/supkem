"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Building2, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";

import { useAdminOrganizationsLogic } from "./_components/useAdminOrganizationsLogic";
import { OrganizationStats } from "./_components/OrganizationStats";
import { OrganizationHeader } from "./_components/OrganizationHeader";
import { OrganizationStatusFilters } from "./_components/OrganizationStatusFilters";
import { OrganizationCard } from "./_components/OrganizationCard";
import { OrganizationTable } from "./_components/OrganizationTable";
import { OrganizationSkeleton } from "./_components/OrganizationSkeleton";
import { RoleGuard } from "@/components/RoleGuard";

export default function AdminOrganizations() {
    return (
        <RoleGuard module="organizations">
            <AdminOrganizationsContent />
        </RoleGuard>
    );
}

function AdminOrganizationsContent() {
    const {
        organizations,
        filteredOrgs,
        searchTerm,
        setSearchTerm,
        viewMode,
        setViewMode,
        statusFilter,
        setStatusFilter,
        typeFilter,
        setTypeFilter,
        distinctTypes,
        sortBy,
        setSortBy,
        statusCounts,
        stats,
        isLoading,
        clearAllFilters,
    } = useAdminOrganizationsLogic();

    const t = useTranslations("Dashboard.admin.organizations");
    const isFiltered = searchTerm !== "" || statusFilter !== "All" || typeFilter !== "All" || sortBy !== "name_asc";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8 md:space-y-10 max-w-[1600px] mx-auto pb-24"
        >
            {/* Executive Metrics / KPI Summary */}
            <OrganizationStats
                stats={stats}
                activeStatus={statusFilter}
                onStatusSelect={setStatusFilter}
            />

            {/* Header & Filter Controls Bar */}
            <div className="space-y-4">
                <OrganizationHeader
                    totalCount={organizations.length}
                    filteredCount={filteredOrgs.length}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    typeFilter={typeFilter}
                    onTypeFilterChange={setTypeFilter}
                    distinctTypes={distinctTypes}
                    sortBy={sortBy}
                    onSortByChange={setSortBy}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                />

                {/* Status Segmented Tabs + Reset Button */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <OrganizationStatusFilters
                        activeFilter={statusFilter}
                        onFilterChange={setStatusFilter}
                        statusCounts={statusCounts}
                    />

                    {isFiltered && (
                        <button
                            type="button"
                            onClick={clearAllFilters}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs transition-colors cursor-pointer"
                        >
                            <RotateCcw size={13} />
                            <span>{t("empty.clear")}</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Content Area */}
            {isLoading ? (
                <OrganizationSkeleton viewMode={viewMode} />
            ) : filteredOrgs.length === 0 ? (
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
                            onClick={clearAllFilters}
                            className="mt-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-md shadow-primary/20 transition-all cursor-pointer flex items-center gap-2"
                        >
                            <RotateCcw size={14} />
                            {t("empty.clear")}
                        </button>
                    )}
                </motion.div>
            ) : viewMode === "list" ? (
                <OrganizationTable organizations={filteredOrgs} />
            ) : (
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence>
                        {filteredOrgs.map((org, i) => (
                            <OrganizationCard
                                key={org.id}
                                org={org}
                                index={i}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </motion.div>
    );
}
