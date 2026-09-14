import { useState, useEffect } from "react";

import { 
    fetchServicesApi, 
    fetchServiceCategoriesApi,
    createServiceCategoryApi,
    deleteServiceCategoryApi,
    createServiceApi, 
    updateServiceApi, 
    deleteServiceApi, 
    generateAIDescriptionApi 
} from "./services";
import { ServiceItem, ServiceFormData, ServiceCategoryItem } from "./types";

export function useAdminServicesLogic() {
    const [services, setServices] = useState<ServiceItem[]>([]);
    const [categories, setCategories] = useState<ServiceCategoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
    const [formData, setFormData] = useState<ServiceFormData>({
        name: "",
        category: "Accreditation",
        target_audience: "Both",
        document_type: "Certificate",
        description: "",
        fee: "",
        is_active: true,
        is_indefinite: true,
        validity_duration: "Indefinite",
        expiration_date: null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);


    const [isAIModalOpen, setIsAIModalOpen] = useState(false);
    const [aiPrompt, setAiPrompt] = useState("");
    const [isAIGenerating, setIsAIGenerating] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const loadData = async () => {
            setLoading(true);
            setLoadingCategories(true);
            try {
                const [servicesData, categoriesData] = await Promise.all([
                    fetchServicesApi(),
                    fetchServiceCategoriesApi()
                ]);
                if (isMounted) {
                    setServices(servicesData);
                    setCategories(categoriesData);
                }
            } catch (err) {
                console.error("Failed to fetch services or categories", err);
            } finally {
                if (isMounted) {
                    setLoading(false);
                    setLoadingCategories(false);
                }
            }
        };
        loadData();
        return () => { isMounted = false; };
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const data = await fetchServicesApi();
            setServices(data);
        } catch (err) {
            console.error("Failed to fetch services", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        setLoadingCategories(true);
        try {
            const data = await fetchServiceCategoriesApi();
            setCategories(data);
        } catch (err) {
            console.error("Failed to fetch categories", err);
        } finally {
            setLoadingCategories(false);
        }
    };

    const handleCreateCategory = async (data: { name: string; description?: string }): Promise<ServiceCategoryItem | null> => {
        try {
            const newCat = await createServiceCategoryApi(data);
            await fetchCategories();
            return newCat;
        } catch (err) {
            console.error("Failed to create category", err);
            throw err;
        }
    };

    const handleDeleteCategory = async (id: string, force?: boolean): Promise<boolean> => {
        try {
            await deleteServiceCategoryApi(id, force);
            await fetchCategories();
            return true;
        } catch (err) {
            console.error("Failed to delete category", err);
            throw err;
        }
    };

    const handleOpenModal = (item: ServiceItem | null = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                name: item.name || item.name_en || item.name_ar || "",
                category: item.category,
                target_audience: item.target_audience || "Both",
                document_type: item.document_type || "Certificate",
                description: item.description || item.description_en || item.description_ar || "",
                fee: item.fee,
                is_active: item.is_active,
                is_indefinite: item.is_indefinite !== undefined ? item.is_indefinite : true,
                validity_duration: item.validity_duration || "Indefinite",
                expiration_date: item.expiration_date || null,
            });
        } else {
            setEditingItem(null);
            const defaultCategory = categories.length > 0 ? categories[0].name : "Accreditation";
            setFormData({
                name: "",
                category: defaultCategory,
                target_audience: "Both",
                document_type: "Certificate",
                description: "",
                fee: "",
                is_active: true,
                is_indefinite: true,
                validity_duration: "Indefinite",
                expiration_date: null,
            });
        }
        setIsModalOpen(true);
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (editingItem) {
                await updateServiceApi(editingItem.id, formData);
            } else {
                await createServiceApi(formData);
            }
            setIsModalOpen(false);
            await fetchServices();
        } catch (err: any) {
            console.error("Failed to save service", err);
            const data = err.response?.data;
            const errorMsg = data?.detail ||
                (typeof data === 'object' ? Object.entries(data).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join('\n') : null) ||
                "Failed to save service. Please check the entered data.";
            alert(errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this service?")) {
            return;
        }

        try {
            await deleteServiceApi(id);
            await fetchServices();
        } catch (err: any) {
            console.error("Failed to delete service", err);
            const data = err.response?.data;
            if (data?.can_deactivate) {
                const shouldDeactivate = window.confirm(
                    `${data.detail}\n\nWould you like to deactivate this service instead so it cannot receive new applications?`
                );
                if (shouldDeactivate) {
                    try {
                        await deleteServiceApi(id, { deactivate: true });
                        await fetchServices();
                    } catch (deactErr: any) {
                        console.error("Failed to deactivate service", deactErr);
                        alert(deactErr.response?.data?.detail || "Failed to deactivate service.");
                    }
                }
            } else {
                alert(data?.detail || "Failed to delete service.");
            }
        }
    };

    const handleGenerateAI = async () => {
        if (!aiPrompt) return;
        setIsAIGenerating(true);
        try {
            const generatedText = await generateAIDescriptionApi(aiPrompt, formData);
            setFormData(prev => ({ ...prev, description: generatedText }));
            setIsAIModalOpen(false);
            setAiPrompt("");
        } catch (err) {
            console.error("Failed to generate description", err);
        } finally {
            setIsAIGenerating(false);
        }
    };

    const filteredServices = services.filter((s) =>
        (s.name || s.name_en || s.name_ar || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return {
        services: filteredServices,
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
        categories,

        loadingCategories,
        isCategoryModalOpen,
        setIsCategoryModalOpen,
        handleCreateCategory,
        handleDeleteCategory,
        handleOpenModal,
        handleSubmit,
        handleDelete,
        handleGenerateAI
    };
}

