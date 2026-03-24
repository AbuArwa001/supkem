"use client";

import { cn } from "@/lib/utils";

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
    } = useAdminOrganizationsLogic();

    return (
        <div className="space-y-10">
            <OrganizationHeader
                totalCount={organizations.length}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
            />

            <OrganizationStatusFilters
                activeFilter={statusFilter}
                onFilterChange={setStatusFilter}
            />

            <div className={cn(
                "grid gap-6",
                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            )}>
                {filteredOrgs.map((org, i) => (
                    <OrganizationCard
                        key={org.id}
                        org={org}
                        index={i}
                        viewMode={viewMode}
                    />
                ))}
            </div>
        </div>
    );
}

