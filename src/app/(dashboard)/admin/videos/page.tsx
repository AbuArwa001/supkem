"use client";

import { Loader2, Film } from "lucide-react";
import { useVideosLogic } from "./_hooks/useVideosLogic";
import { VideoHeader } from "./_components/VideoHeader";
import { VideoCard } from "./_components/VideoCard";
import { VideoModal } from "./_components/VideoModal";

/**
 * Admin Videos Page
 * Manages video briefings and press content.
 */
export default function AdminVideos() {
  const {
    videos,
    loading,
    searchTerm,
    setSearchTerm,
    isModalOpen,
    setIsModalOpen,
    editingItem,
    formData,
    setFormData,
    isSubmitting,
    handleOpenModal,
    handleSubmit,
    handleDelete,
  } = useVideosLogic();

  return (
    <div className="space-y-10">
      <VideoHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onUploadClick={() => handleOpenModal()}
      />

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-primary" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {videos.map((item, i) => (
            <VideoCard
              key={item.id}
              item={item}
              index={i}
              onEdit={handleOpenModal}
              onDelete={handleDelete}
            />
          ))}

          {videos.length === 0 && (
            <div className="col-span-full py-20 text-center space-y-4">
              <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center mx-auto">
                <Film className="text-primary/20" size={40} />
              </div>
              <p className="text-foreground/40 font-bold">
                No video briefings found.
              </p>
            </div>
          )}
        </div>
      )}

      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        editingItem={editingItem}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
