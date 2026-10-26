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
  const logic = useAdminServicesLogic();

  return (
    <div className="space-y-10">
      <ServicesHeader
        searchTerm={logic.searchTerm}
        onSearchChange={logic.setSearchTerm}
        onAddService={() => logic.handleOpenModal()}
        onManageCategories={() => logic.setIsCategoryModalOpen(true)}
      />

      <ServicesTable
        services={logic.services}
        loading={logic.loading}
        onEdit={logic.handleOpenModal}
        onDelete={logic.handleDelete}
      />

      <AnimatePresence>
        {logic.isModalOpen && (
          <ServiceFormModal
            editingItem={logic.editingItem}
            formData={logic.formData}
            categories={logic.categories}
            isSubmitting={logic.isSubmitting}
            setFormData={logic.setFormData}
            onSubmit={logic.handleSubmit}
            onClose={() => logic.setIsModalOpen(false)}
            onOpenAIGeneration={() => logic.setIsAIModalOpen(true)}
            onQuickAddCategory={async (name) => logic.handleCreateCategory({ name })}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {logic.isCategoryModalOpen && (
          <CategoryManagementModal
            categories={logic.categories}
            loading={logic.loadingCategories}
            onClose={() => logic.setIsCategoryModalOpen(false)}
            onAddCategory={logic.handleCreateCategory}
            onDeleteCategory={logic.handleDeleteCategory}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {logic.isAIModalOpen && (
          <AIGenerationModal
            prompt={logic.aiPrompt}
            isGenerating={logic.isAIGenerating}
            setPrompt={logic.setAiPrompt}
            onGenerate={logic.handleGenerateAI}
            onClose={() => logic.setIsAIModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
