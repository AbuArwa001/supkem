"use client";

import { AnimatePresence } from "framer-motion";

import { useAdminServicesLogic } from "./_components/useAdminServicesLogic";
import { ServicesHeader } from "./_components/ServicesHeader";
import { ServicesTable } from "./_components/ServicesTable";
import { ServiceFormModal } from "./_components/ServiceFormModal";
import { AIGenerationModal } from "./_components/AIGenerationModal";

export default function AdminServices() {
    const {
        services,
        loading,
        searchTerm,
        setSearchTerm,
        isModalOpen,
        setIsModalOpen,
        isAIModalOpen,
        setIsAIModalOpen,
        aiPrompt,
        setAiPrompt,
        isAIGenerating,
        editingItem,
        formData,
        setFormData,
        isSubmitting,
        handleOpenModal,
        handleSubmit,
        handleDelete,
        handleGenerateAI
    } = useAdminServicesLogic();

    return (
        <div className="space-y-10">
            <ServicesHeader 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onAddService={() => handleOpenModal()}
            />

            <ServicesTable 
                services={services}
                loading={loading}
                onEdit={handleOpenModal}
                onDelete={handleDelete}
            />

            <AnimatePresence>
                {isModalOpen && (
                    <ServiceFormModal 
                        editingItem={editingItem}
                        formData={formData}
                        isSubmitting={isSubmitting}
                        setFormData={setFormData}
                        onSubmit={handleSubmit}
                        onClose={() => setIsModalOpen(false)}
                        onOpenAIGeneration={() => setIsAIModalOpen(true)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isAIModalOpen && (
                    <AIGenerationModal 
                        prompt={aiPrompt}
                        isGenerating={isAIGenerating}
                        setPrompt={setAiPrompt}
                        onGenerate={handleGenerateAI}
                        onClose={() => setIsAIModalOpen(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
