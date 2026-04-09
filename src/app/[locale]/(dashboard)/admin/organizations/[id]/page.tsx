"use client";

import { AnimatePresence } from "framer-motion";
import { Loader2, AlertTriangle } from "lucide-react";

import { useOrganizationDetailLogic } from "./_components/useOrganizationDetailLogic";
import { OrganizationHeader } from "./_components/OrganizationHeader";
import { OrganizationCoreInfo } from "./_components/OrganizationCoreInfo";
import { OrganizationRecords } from "./_components/OrganizationRecords";
import { OrganizationPersonnel } from "./_components/OrganizationPersonnel";
import { OrganizationAdministrativeActions } from "./_components/OrganizationAdministrativeActions";
import { AddPersonnelModal } from "./_components/AddPersonnelModal";

export default function OrganizationDetail() {
    const {
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
    } = useOrganizationDetailLogic();

    if (loading) {
        return (
            <div className="h-96 flex items-center justify-center flex-col gap-4">
                <Loader2 className="animate-spin text-primary" size={40} />
                <p className="text-primary/60 font-medium font-outfit">Loading Registry Profile...</p>
            </div>
        );
    }

    if (!org) {
        return (
            <div className="h-96 flex flex-col items-center justify-center gap-4 text-center">
                <AlertTriangle size={48} className="text-red-500/80" />
                <h2 className="text-2xl font-bold text-slate-800 font-outfit">Organization Not Found</h2>
                <p className="text-slate-500">The requested profile could not be located in the registry.</p>
                <button 
                    onClick={() => router.back()} 
                    className="mt-4 px-6 py-2 bg-primary text-white rounded-xl"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-12 pb-20 max-w-7xl mx-auto">
            <OrganizationHeader 
                name={org.name} 
                id={org.id} 
                onBack={() => router.back()} 
            />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-8">
                    <OrganizationCoreInfo org={org} />
                    <OrganizationRecords />
                </div>

                <div className="space-y-6">
                    <OrganizationPersonnel 
                        personnel={personnel}
                        actionLoading={actionLoading}
                        onSuspendPersonnel={handleSuspendPersonnel}
                        onRemovePersonnel={handleRemovePersonnel}
                        onOpenModal={() => setIsModalOpen(true)}
                    />

                    <OrganizationAdministrativeActions 
                        org={org}
                        actionLoading={actionLoading}
                        onUpdateStatus={handleUpdateStatus}
                    />
                </div>
            </div>

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
        </div>
    );
}
