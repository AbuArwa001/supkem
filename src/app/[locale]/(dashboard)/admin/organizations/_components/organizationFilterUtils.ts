import { Organization } from "./types";
import { OrganizationSortOption } from "./useAdminOrganizationsLogic";

export function filterAndSortOrganizations(
    organizations: Organization[],
    searchTerm: string,
    statusFilter: string,
    typeFilter: string,
    sortBy: OrganizationSortOption
): Organization[] {
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
            if (sortBy === "name_asc") return (a.name || "").localeCompare(b.name || "");
            if (sortBy === "name_desc") return (b.name || "").localeCompare(a.name || "");
            if (sortBy === "apps_desc") return (b.apps_count || 0) - (a.apps_count || 0);
            if (sortBy === "certs_desc") return (b.certs_count || 0) - (a.certs_count || 0);
            if (sortBy === "newest") {
                const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
                const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
                return dateB - dateA;
            }
            return 0;
        });
}

export function computeOrgStats(organizations: Organization[]) {
    const counts: Record<string, number> = {
        All: organizations.length,
        Pending: 0,
        Accredited: 0,
        Suspended: 0,
    };
    let totalApps = 0;
    let totalCerts = 0;

    organizations.forEach((org) => {
        const status = org.accreditation_status || "Pending";
        counts[status] = (counts[status] || 0) + 1;
        totalApps += org.apps_count || 0;
        totalCerts += org.certs_count || 0;
    });

    return {
        counts,
        stats: {
            total: organizations.length,
            accredited: counts["Accredited"] || 0,
            pending: counts["Pending"] || 0,
            suspended: counts["Suspended"] || 0,
            totalApps,
            totalCerts,
        },
    };
}
