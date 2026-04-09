import { useState, useEffect } from "react";

import { fetchOrganizations } from "./services";
import { Organization } from "./types";

export function useAdminOrganizationsLogic() {
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [statusFilter, setStatusFilter] = useState("All");
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

    const filteredOrgs = organizations.filter((org) => {
        const matchesSearch = org.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const accreditationStatus = org.accreditation_status || "Pending";
        const matchesStatus = statusFilter === "All" || accreditationStatus === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    return {
        organizations,
        filteredOrgs,
        searchTerm,
        setSearchTerm,
        viewMode,
        setViewMode,
        statusFilter,
        setStatusFilter,
        isLoading
    };
}
