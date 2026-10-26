import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { fetchOrganizations, deleteOrganization } from "./services";
import { Organization } from "./types";
import { filterAndSortOrganizations, computeOrgStats } from "./organizationFilterUtils";

export type OrganizationSortOption = "name_asc" | "name_desc" | "apps_desc" | "certs_desc" | "newest";

export function useAdminOrganizationsLogic() {
    const t = useTranslations("Dashboard.admin.organizations");
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [statusFilter, setStatusFilter] = useState("All");
    const [typeFilter, setTypeFilter] = useState("All");
    const [sortBy, setSortBy] = useState<OrganizationSortOption>("name_asc");
    const [isLoading, setIsLoading] = useState(true);

    const [orgToDelete, setOrgToDelete] = useState<Organization | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let isMounted = true;
        (async () => {
            try {
                setIsLoading(true);
                const data = await fetchOrganizations();
                if (isMounted) setOrganizations(data);
            } catch (err) {
                console.error("Failed to fetch organizations", err);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        })();
        return () => { isMounted = false; };
    }, []);

    const distinctTypes = useMemo(() => {
        const set = new Set<string>();
        organizations.forEach((org) => { if (org.type) set.add(org.type); });
        return Array.from(set).sort();
    }, [organizations]);

    const filteredOrgs = useMemo(
        () => filterAndSortOrganizations(organizations, searchTerm, statusFilter, typeFilter, sortBy),
        [organizations, searchTerm, statusFilter, typeFilter, sortBy]
    );

    const { counts: statusCounts, stats } = useMemo(() => computeOrgStats(organizations), [organizations]);

    const clearAllFilters = () => {
        setSearchTerm("");
        setStatusFilter("All");
        setTypeFilter("All");
        setSortBy("name_asc");
    };

    const openDeleteModal = (org: Organization) => { setOrgToDelete(org); setIsDeleteModalOpen(true); };
    const closeDeleteModal = () => { if (!isDeleting) { setOrgToDelete(null); setIsDeleteModalOpen(false); } };

    const confirmDeleteOrganization = async () => {
        if (!orgToDelete) return;
        try {
            setIsDeleting(true);
            await deleteOrganization(orgToDelete.id);
            setOrganizations((prev) => prev.filter((o) => o.id !== orgToDelete.id));
            toast.success(t("deleteSuccess"));
            setIsDeleteModalOpen(false);
            setOrgToDelete(null);
        } catch (err) {
            console.error("Failed to delete organization", err);
            toast.error(t("deleteError"));
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        organizations, filteredOrgs, searchTerm, setSearchTerm, viewMode, setViewMode,
        statusFilter, setStatusFilter, typeFilter, setTypeFilter, distinctTypes,
        sortBy, setSortBy, isLoading, statusCounts, stats, clearAllFilters,
        orgToDelete, isDeleteModalOpen, isDeleting, openDeleteModal, closeDeleteModal, confirmDeleteOrganization
    };
}
