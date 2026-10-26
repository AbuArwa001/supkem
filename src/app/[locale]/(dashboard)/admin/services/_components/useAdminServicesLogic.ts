import { useState, useEffect } from "react";
import {
  fetchServicesApi, fetchServiceCategoriesApi, createServiceCategoryApi,
  deleteServiceCategoryApi, createServiceApi, updateServiceApi, generateAIDescriptionApi,
} from "./services";
import { ServiceItem, ServiceCategoryItem } from "./types";
import { getServiceFormData } from "./service-helpers/serviceFormDefaults";
import { handleServiceDelete } from "./service-helpers/serviceDeleteHandler";

export function useAdminServicesLogic() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [categories, setCategories] = useState<ServiceCategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
  const [formData, setFormData] = useState(() => getServiceFormData(null, "Accreditation"));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isAIGenerating, setIsAIGenerating] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try { setServices(await fetchServicesApi()); } finally { setLoading(false); }
  };

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try { setCategories(await fetchServiceCategoriesApi()); } finally { setLoadingCategories(false); }
  };

  useEffect(() => {
    let mounted = true;
    Promise.all([fetchServicesApi(), fetchServiceCategoriesApi()]).then(([s, c]) => {
      if (mounted) { setServices(s); setCategories(c); setLoading(false); setLoadingCategories(false); }
    });
    return () => { mounted = false; };
  }, []);

  const handleCreateCategory = async (data: { name: string; description?: string }) => {
    const newCat = await createServiceCategoryApi(data);
    await fetchCategories();
    return newCat;
  };

  const handleDeleteCategory = async (id: string, force?: boolean) => {
    await deleteServiceCategoryApi(id, force);
    await fetchCategories();
    return true;
  };

  const handleOpenModal = (item: ServiceItem | null = null) => {
    setEditingItem(item);
    setFormData(getServiceFormData(item, categories[0]?.name || "Accreditation"));
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingItem) await updateServiceApi(editingItem.id, formData);
      else await createServiceApi(formData);
      setIsModalOpen(false);
      await fetchServices();
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to save service. Please check entered data.");
    } finally { setIsSubmitting(false); }
  };

  const handleGenerateAI = async () => {
    if (!aiPrompt) return;
    setIsAIGenerating(true);
    try {
      const generatedText = await generateAIDescriptionApi(aiPrompt, formData);
      setFormData((prev) => ({ ...prev, description: generatedText }));
      setIsAIModalOpen(false);
      setAiPrompt("");
    } finally { setIsAIGenerating(false); }
  };

  const filteredServices = services.filter((s) =>
    (s.name || s.name_en || s.name_ar || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    services: filteredServices, loading, searchTerm, setSearchTerm, isModalOpen, setIsModalOpen,
    isAIModalOpen, setIsAIModalOpen, aiPrompt, setAiPrompt, isAIGenerating, editingItem,
    formData, setFormData, isSubmitting, categories, loadingCategories, isCategoryModalOpen,
    setIsCategoryModalOpen, handleCreateCategory, handleDeleteCategory, handleOpenModal,
    handleSubmit, handleDelete: (id: string) => handleServiceDelete(id, fetchServices), handleGenerateAI,
  };
}
