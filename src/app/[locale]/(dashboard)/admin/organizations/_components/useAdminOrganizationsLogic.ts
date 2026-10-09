import { useState, useEffect, useMemo } from "react";

import { fetchOrganizations } from "./services";
import { Organization } from "./types";

export type OrganizationSortOption = "name_asc" | "name_desc" | "apps_desc" | "certs_desc" | "newest";

export function useAdminOrganizationsLogic() {
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [statusFilter, setStatusFilter] = useState("All");
    const [typeFilter, setTypeFilter] = useState("All");
    const [sortBy, setSortBy] = useState<OrganizationSortOption>("name_asc");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const loadOrgs = async () => {
            try {
                setIsLoading(true);
                const data = await fetchOrganizations();
                if (isMounted) setOrganizations(data);
            } catch (err) {
                console.error("Failed to fetch organizations", err);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };
        loadOrgs();
        return () => { isMounted = false; };
    }, []);

    const distinctTypes = useMemo(() => {
        const set = new Set<string>();
        organizations.forEach((org) => {
            if (org.type) set.add(org.type);
        });
        return Array.from(set).sort();
    }, [organizations]);

    const filteredOrgs = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        return organizations
            .filter((org) => {
                const matchesSearch =
                    !term ||
                    org.name?.toLowerCase().includes(term) ||
                    org.reg_number?.toLowerCase().includes(term) ||
                    org.pin_number?.toLowerCase().includes(term) ||
                    org.county_council_name?.toLowerCase().includes(term) ||
                    org.region_name?.toLowerCase().includes(term) ||
                    org.type?.toLowerCase().includes(term) ||
                    org.email?.toLowerCase().includes(term) ||
                    org.phone_number?.toLowerCase().includes(term);

                const accreditationStatus = org.accreditation_status || "Pending";
                const matchesStatus = statusFilter === "All" || accreditationStatus.toLowerCase() === statusFilter.toLowerCase();

                const matchesType = typeFilter === "All" || org.type === typeFilter;

                return matchesSearch && matchesStatus && matchesType;
            })
            .sort((a, b) => {
                if (sortBy === "name_asc") {
                    return (a.name || "").localeCompare(b.name || "");
                }
                if (sortBy === "name_desc") {
                    return (b.name || "").localeCompare(a.name || "");
                }
                if (sortBy === "apps_desc") {
                    return (b.apps_count || 0) - (a.apps_count || 0);
                }
                if (sortBy === "certs_desc") {
                    return (b.certs_count || 0) - (a.certs_count || 0);
                }
                if (sortBy === "newest") {
                    const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
                    const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
                    return dateB - dateA;
                }
                return 0;
            });
    }, [organizations, searchTerm, statusFilter, typeFilter, sortBy]);

    const statusCounts = useMemo(() => {
        const counts: Record<string, number> = {
            All: organizations.length,
            Pending: 0,
            Accredited: 0,
            Suspended: 0,
        };

        organizations.forEach((org) => {
            const status = org.accreditation_status || "Pending";
            counts[status] = (counts[status] || 0) + 1;
        });

        return counts;
    }, [organizations]);

    const stats = useMemo(() => {
        let totalApps = 0;
        let totalCerts = 0;
        organizations.forEach((org) => {
            totalApps += org.apps_count || 0;
            totalCerts += org.certs_count || 0;
        });

        return {
            total: organizations.length,
            accredited: statusCounts["Accredited"] || 0,
            pending: statusCounts["Pending"] || 0,
            suspended: statusCounts["Suspended"] || 0,
            totalApps,
            totalCerts,
        };
    }, [organizations, statusCounts]);

    const clearAllFilters = () => {
        setSearchTerm("");
        setStatusFilter("All");
        setTypeFilter("All");
        setSortBy("name_asc");
    };

    return {
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
        isLoading,
        statusCounts,
        stats,
        clearAllFilters,
    };
}

