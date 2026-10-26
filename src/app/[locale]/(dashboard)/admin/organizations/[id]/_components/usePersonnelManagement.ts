import { useState, Dispatch, SetStateAction } from "react";
import { searchUsers, assignPersonnel, removePersonnel, suspendPersonnel, fetchOrgData } from "./services";
import { Personnel, User } from "./types";

export function usePersonnelManagement(
    id: string,
    personnel: Personnel[],
    setPersonnel: Dispatch<SetStateAction<Personnel[]>>,
    actionLoading: string | null,
    setActionLoading: Dispatch<SetStateAction<string | null>>
) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [defaultUsers, setDefaultUsers] = useState<User[]>([]);
    const [isSearching, setIsSearching] = useState(false);

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
            const data = await fetchOrgData(id);
            setPersonnel(data.personnel);
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
            setPersonnel(personnel.filter((p) => p.user.id !== userId));
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
            const data = await fetchOrgData(id);
            setPersonnel(data.personnel);
        } catch (err) {
            console.error("Failed to suspend personnel", err);
        } finally {
            setActionLoading(null);
        }
    };

    return {
        isModalOpen,
        setIsModalOpen,
        searchQuery,
        setSearchQuery,
        searchResults,
        defaultUsers,
        setDefaultUsers,
        isSearching,
        handleSearchUsers,
        handleAddPersonnel,
        handleRemovePersonnel,
        handleSuspendPersonnel
    };
}
