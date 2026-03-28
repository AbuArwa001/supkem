"use client";

import React from "react";
import { useNewsLogic } from "./_hooks/useNewsLogic";
import { NewsHeader } from "./_components/NewsHeader";
import { NewsGrid } from "./_components/NewsGrid";
import { NewsModal } from "./_components/NewsModal";

/**
 * Admin News CMS Page
 * Refactored to follow strict readability constraints.
 */
export default function AdminNews() {
  const {
    news,
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
    pendingGalleryFiles,
    savedGallery,
    isDeletingGalleryId,
    handleAddGalleryFiles,
    handleRemovePendingFile,
    handleDeleteSavedImage,
  } = useNewsLogic();

  return (
    <div className="space-y-10">
      <NewsHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCreateClick={() => handleOpenModal()}
      />

      <NewsGrid
        news={news}
        loading={loading}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
      />

      <NewsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingItem={editingItem}
        formData={formData}
        setFormData={setFormData}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        pendingGalleryFiles={pendingGalleryFiles}
        savedGallery={savedGallery}
        isDeletingGalleryId={isDeletingGalleryId}
        onAddGalleryFiles={handleAddGalleryFiles}
        onRemovePendingFile={handleRemovePendingFile}
        onDeleteSavedImage={handleDeleteSavedImage}
      />
    </div>
  );
}
