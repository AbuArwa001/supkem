import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { 
    fetchOrgData, 
    fetchDefaultUsers, 
    searchUsers, 
    assignPersonnel, 
    removePersonnel, 
    suspendPersonnel, 
    updateOrgStatus 
} from "./services";
import { OrganizationDetail, Personnel, User } from "./types";

export function useOrganizationDetailLogic() {
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();

    const [org, setOrg] = useState<OrganizationDetail | null>(null);
    const [personnel, setPersonnel] = useState<Personnel[]>([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [defaultUsers, setDefaultUsers] = useState<User[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        const initData = async () => {
            setLoading(true);
            try {
                const [data, users] = await Promise.all([
                    fetchOrgData(id),
                    fetchDefaultUsers()
                ]);
                if (isMounted) {
                    setOrg(data.org);
                    setPersonnel(data.personnel);
                    setDefaultUsers(users);
                }
            } catch (err) {
                console.error("Failed to fetch organization data", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        initData();
        return () => { isMounted = false; };
    }, [id]);

    const handleSearchUsers = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        try {
            const results = await searchUsers(searchQuery);
            setSearchResults(results);
        } catch (err) {
            console.error("Failed to search users", err);
        } finally {
            setIsSearching(false);
        }
    };

    const handleAddPersonnel = async (userId: string) => {
        setActionLoading(userId);
        try {
            await assignPersonnel(id, userId);
            const { personnel } = await fetchOrgData(id);
            setPersonnel(personnel);
            setIsModalOpen(false);
            setSearchQuery("");
            setSearchResults([]);
        } catch (err) {
            console.error("Failed to add personnel", err);
        } finally {
            setActionLoading(null);
        }
    };

    const handleRemovePersonnel = async (userId: string) => {
        if (!window.confirm("Are you sure you want to remove this user from the organization?")) return;

        setActionLoading(userId);
        try {
            await removePersonnel(id, userId);
            setPersonnel(personnel.filter(p => p.user.id !== userId));
        } catch (err) {
            console.error("Failed to remove personnel", err);
        } finally {
            setActionLoading(null);
        }
    };

    const handleSuspendPersonnel = async (userId: string) => {
        setActionLoading(userId);
        try {
            await suspendPersonnel(id, userId);
            const { personnel } = await fetchOrgData(id);
            setPersonnel(personnel);
        } catch (err) {
            console.error("Failed to suspend personnel", err);
        } finally {
            setActionLoading(null);
        }
    };

    const handleUpdateStatus = async (status: string) => {
        setActionLoading('status_update');
        try {
            await updateOrgStatus(id, status);
            if (org) setOrg({ ...org, accreditation_status: status });
        } catch (err) {
            console.error("Failed to update status", err);
        } finally {
            setActionLoading(null);
        }
    };

    return {
        id,
        router,
        org,
        personnel,
        loading,
        isModalOpen,
        setIsModalOpen,
        searchQuery,
        setSearchQuery,
        searchResults,
        defaultUsers,
        isSearching,
        actionLoading,
        handleSearchUsers,
        handleAddPersonnel,
        handleRemovePersonnel,
        handleSuspendPersonnel,
        handleUpdateStatus
    };
}
