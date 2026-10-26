"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { AnimatePresence } from "framer-motion";
import { OrganizationHeader } from "@/app/[locale]/(dashboard)/admin/organizations/[id]/_components/OrganizationHeader";
import { OrganizationCoreInfo } from "@/app/[locale]/(dashboard)/admin/organizations/[id]/_components/OrganizationCoreInfo";
import { OrganizationRecords } from "@/app/[locale]/(dashboard)/admin/organizations/[id]/_components/OrganizationRecords";
import { OrganizationPersonnel } from "@/app/[locale]/(dashboard)/admin/organizations/[id]/_components/OrganizationPersonnel";
import { AddPersonnelModal } from "@/app/[locale]/(dashboard)/admin/organizations/[id]/_components/AddPersonnelModal";
import { EditOrganizationModal } from "@/app/[locale]/(dashboard)/admin/organizations/[id]/_components/EditOrganizationModal";
import { usePortalOrgDetailLogic } from "./_hooks/usePortalOrgDetailLogic";
import { AccreditationStandingCard } from "./_components/AccreditationStandingCard";
import { OrgDetailLoadingState, OrgDetailNotFoundState } from "./_components/OrgDetailStates";

export default function PortalOrganizationDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPersonnelModalOpen, setIsPersonnelModalOpen] = useState(false);

  const {
    org, setOrg, personnel, currentUserId, isAdmin, loading, searchQuery, setSearchQuery,
    searchResults, defaultUsers, isSearching, actionLoading, handleSearchUsers,
    handleAddPersonnel, handleRemovePersonnel, handleSuspendPersonnel,
  } = usePortalOrgDetailLogic(id as string);

  if (loading) return <OrgDetailLoadingState />;
  if (!org) return <OrgDetailNotFoundState />;

  return (
    <div className="space-y-10 pb-20 max-w-7xl mx-auto">
      <OrganizationHeader
        name={org.name} id={org.id} status={org.accreditation_status}
        contextTitle="SUPKEM APPLICANT PORTAL • INSTITUTION REGISTRY" canEdit={isAdmin}
        onEdit={() => setIsEditModalOpen(true)} onBack={() => router.push("/portal/organizations")}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <OrganizationCoreInfo org={org} canEdit={isAdmin} onEdit={() => setIsEditModalOpen(true)} />
          <OrganizationRecords
            appsCount={org.apps_count ?? 0} certsCount={org.certs_count ?? 0}
            applicationsHref="/portal/applications" certificatesHref="/portal/certificates"
          />
        </div>

        <div className="space-y-6">
          <OrganizationPersonnel
            personnel={personnel} canManage={isAdmin} currentUserId={currentUserId ?? undefined}
            actionLoading={actionLoading} onSuspendPersonnel={handleSuspendPersonnel}
            onRemovePersonnel={handleRemovePersonnel} onOpenModal={() => setIsPersonnelModalOpen(true)}
          />
          <AccreditationStandingCard status={org.accreditation_status} />
        </div>
      </div>

      <AnimatePresence>
        {isPersonnelModalOpen && (
          <AddPersonnelModal
            orgName={org.name} personnel={personnel} searchQuery={searchQuery}
            setSearchQuery={setSearchQuery} searchResults={searchResults} defaultUsers={defaultUsers}
            isSearching={isSearching} actionLoading={actionLoading} onSearchUsers={handleSearchUsers}
            onAddPersonnel={(userId) => handleAddPersonnel(userId, () => setIsPersonnelModalOpen(false))}
            onClose={() => setIsPersonnelModalOpen(false)}
          />
        )}
        {isEditModalOpen && (
          <EditOrganizationModal
            org={org} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}
            onSuccess={(updated) => setOrg((prev) => (prev ? { ...prev, ...updated } : updated))}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
