"use client";

import { AnimatePresence } from "framer-motion";
import { OrganizationDetail, Personnel, User } from "./types";
import { AddPersonnelModal } from "./AddPersonnelModal";
import { EditOrganizationModal } from "./EditOrganizationModal";

interface OrganizationDetailModalsProps {
    org: OrganizationDetail;
    personnel: Personnel[];
    isModalOpen: boolean;
    isEditModalOpen: boolean;
    searchQuery: string;
    searchResults: User[];
    defaultUsers: User[];
    isSearching: boolean;
    actionLoading: string | null;
    setSearchQuery: (query: string) => void;
    handleSearchUsers: (e: React.FormEvent) => void;
    handleAddPersonnel: (userId: string) => void;
    setIsModalOpen: (open: boolean) => void;
    setIsEditModalOpen: (open: boolean) => void;
    handleOrganizationUpdated: (updated: OrganizationDetail) => void;
}

export function OrganizationDetailModals({
    org,
    personnel,
    isModalOpen,
    isEditModalOpen,
    searchQuery,
    searchResults,
    defaultUsers,
    isSearching,
    actionLoading,
    setSearchQuery,
    handleSearchUsers,
    handleAddPersonnel,
    setIsModalOpen,
    setIsEditModalOpen,
    handleOrganizationUpdated
}: OrganizationDetailModalsProps) {
    return (
        <>
            <AnimatePresence>
                {isModalOpen && (
                    <AddPersonnelModal
                        orgName={org.name}
                        personnel={personnel}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        searchResults={searchResults}
                        defaultUsers={defaultUsers}
                        isSearching={isSearching}
                        actionLoading={actionLoading}
                        onSearchUsers={handleSearchUsers}
                        onAddPersonnel={handleAddPersonnel}
                        onClose={() => setIsModalOpen(false)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isEditModalOpen && (
                    <EditOrganizationModal
                        org={org}
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        onSuccess={handleOrganizationUpdated}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
