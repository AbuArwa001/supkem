"use client";

import { AnimatePresence } from "framer-motion";

import { useAdminServicesLogic } from "./_components/useAdminServicesLogic";
import { ServicesHeader } from "./_components/ServicesHeader";
import { ServicesTable } from "./_components/ServicesTable";
import { ServiceFormModal } from "./_components/ServiceFormModal";
import { AIGenerationModal } from "./_components/AIGenerationModal";
import { CategoryManagementModal } from "./_components/CategoryManagementModal";
import { RoleGuard } from "@/components/RoleGuard";

export default function AdminServices() {
    return (
        <RoleGuard module="services">
            <AdminServicesContent />
        </RoleGuard>
    );
}

function AdminServicesContent() {
    const {
        services,
        loading,
        searchTerm,
        setSearchTerm,
        categories,
        loadingCategories,
        isModalOpen,
        setIsModalOpen,
        isCategoryModalOpen,
        setIsCategoryModalOpen,
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
        handleGenerateAI,
        handleCreateCategory,
        handleDeleteCategory
    } = useAdminServicesLogic();

    return (
        <div className="space-y-10">
            <ServicesHeader 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onAddService={() => handleOpenModal()}
                onManageCategories={() => setIsCategoryModalOpen(true)}
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
                        categories={categories}
                        isSubmitting={isSubmitting}
                        setFormData={setFormData}
                        onSubmit={handleSubmit}
                        onClose={() => setIsModalOpen(false)}
                        onOpenAIGeneration={() => setIsAIModalOpen(true)}
                        onQuickAddCategory={async (name) => handleCreateCategory({ name })}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isCategoryModalOpen && (
                    <CategoryManagementModal 
                        categories={categories}
                        loading={loadingCategories}
                        onClose={() => setIsCategoryModalOpen(false)}
                        onAddCategory={handleCreateCategory}
                        onDeleteCategory={handleDeleteCategory}
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

