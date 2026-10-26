"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Organization } from "./types";
import { OrganizationSkeleton } from "./OrganizationSkeleton";
import { OrganizationEmptyState } from "./OrganizationEmptyState";
import { OrganizationTable } from "./OrganizationTable";
import { OrganizationCard } from "./OrganizationCard";

interface OrganizationContentListProps {
    isLoading: boolean;
    organizations: Organization[];
    viewMode: "grid" | "list";
    isFiltered: boolean;
    onClearFilters: () => void;
    onDelete: (org: Organization) => void;
}

export function OrganizationContentList({
    isLoading,
    organizations,
    viewMode,
    isFiltered,
    onClearFilters,
    onDelete,
}: OrganizationContentListProps) {
    if (isLoading) {
        return <OrganizationSkeleton viewMode={viewMode} />;
    }

    if (organizations.length === 0) {
        return <OrganizationEmptyState isFiltered={isFiltered} onClearFilters={onClearFilters} />;
    }

    if (viewMode === "list") {
        return <OrganizationTable organizations={organizations} onDelete={onDelete} />;
    }

    return (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
                {organizations.map((org, i) => (
                    <OrganizationCard key={org.id} org={org} index={i} onDelete={onDelete} />
                ))}
            </AnimatePresence>
        </motion.div>
    );
}
