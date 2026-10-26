"use client";

import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";

import { useAdminOrganizationsLogic } from "./_components/useAdminOrganizationsLogic";
import { OrganizationStats } from "./_components/OrganizationStats";
import { OrganizationHeader } from "./_components/OrganizationHeader";
import { OrganizationStatusFilters } from "./_components/OrganizationStatusFilters";
import { OrganizationContentList } from "./_components/OrganizationContentList";
import { DeleteOrganizationModal } from "./_components/DeleteOrganizationModal";
import { RoleGuard } from "@/components/RoleGuard";

export default function AdminOrganizations() {
    return (
        <RoleGuard module="organizations">
            <AdminOrganizationsContent />
        </RoleGuard>
    );
}

function AdminOrganizationsContent() {
    const logic = useAdminOrganizationsLogic();
    const t = useTranslations("Dashboard.admin.organizations");
    const isFiltered = logic.searchTerm !== "" || logic.statusFilter !== "All" || logic.typeFilter !== "All" || logic.sortBy !== "name_asc";

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 md:space-y-10 max-w-[1600px] mx-auto pb-24">
            <OrganizationStats stats={logic.stats} activeStatus={logic.statusFilter} onStatusSelect={logic.setStatusFilter} />

            <div className="space-y-4">
                <OrganizationHeader
                    totalCount={logic.organizations.length}
                    filteredCount={logic.filteredOrgs.length}
                    searchTerm={logic.searchTerm}
                    onSearchChange={logic.setSearchTerm}
                    typeFilter={logic.typeFilter}
                    onTypeFilterChange={logic.setTypeFilter}
                    distinctTypes={logic.distinctTypes}
                    sortBy={logic.sortBy}
                    onSortByChange={logic.setSortBy}
                    viewMode={logic.viewMode}
                    onViewModeChange={logic.setViewMode}
                />

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <OrganizationStatusFilters activeFilter={logic.statusFilter} onFilterChange={logic.setStatusFilter} statusCounts={logic.statusCounts} />
                    {isFiltered && (
                        <button
                            type="button"
                            onClick={logic.clearAllFilters}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs transition-colors cursor-pointer"
                        >
                            <RotateCcw size={13} />
                            <span>{t("empty.clear")}</span>
                        </button>
                    )}
                </div>
            </div>

            <OrganizationContentList
                isLoading={logic.isLoading}
                organizations={logic.filteredOrgs}
                viewMode={logic.viewMode}
                isFiltered={isFiltered}
                onClearFilters={logic.clearAllFilters}
                onDelete={logic.openDeleteModal}
            />

            <DeleteOrganizationModal
                isOpen={logic.isDeleteModalOpen}
                onClose={logic.closeDeleteModal}
                onConfirm={logic.confirmDeleteOrganization}
                organization={logic.orgToDelete}
                isDeleting={logic.isDeleting}
            />
        </motion.div>
    );
}
