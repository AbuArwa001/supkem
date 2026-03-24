"use client";

import React from "react";
import { useNewsPaperLogic } from "./_hooks/useNewsPaperLogic";
import { NewsPaperHeader } from "./_components/NewsPaperHeader";
import { NewsPaperGrid } from "./_components/NewsPaperGrid";
import { NewsPaperModal } from "./_components/NewsPaperModal";

export default function AdminNewsPapers() {
  const {
    newsPapers,
    loading,
    searchTerm,
    setSearchTerm,
    isModalOpen,
    editingItem,
    formData,
    setFormData,
    isSubmitting,
    error,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
    handleDelete,
  } = useNewsPaperLogic();

  return (
    <div className="space-y-10">
      <NewsPaperHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCreateClick={() => handleOpenModal()}
      />

      <NewsPaperGrid
        newsPapers={newsPapers}
        loading={loading}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
      />

      <NewsPaperModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingItem={editingItem}
        formData={formData}
        setFormData={setFormData}
        isSubmitting={isSubmitting}
        error={error}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
