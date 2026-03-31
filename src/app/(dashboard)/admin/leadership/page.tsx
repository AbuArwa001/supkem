"use client";

import React from "react";
import { useLeadershipLogic } from "./_hooks/useLeadershipLogic";
import { LeadershipHeader } from "./_components/LeadershipHeader";
import { LeadershipGrid } from "./_components/LeadershipGrid";
import { LeadershipModal } from "./_components/LeadershipModal";

export default function AdminLeadership() {
  const {
    profiles,
    loading,
    searchTerm,
    setSearchTerm,
    isModalOpen,
    editingItem,
    formData,
    setFormData,
    isSubmitting,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
    handleDelete,
  } = useLeadershipLogic();

  return (
    <div className="space-y-12">
      <LeadershipHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCreateClick={() => handleOpenModal()}
      />

      <LeadershipGrid
        profiles={profiles}
        loading={loading}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
      />

      <LeadershipModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingItem={editingItem}
        formData={formData}
        setFormData={setFormData}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
