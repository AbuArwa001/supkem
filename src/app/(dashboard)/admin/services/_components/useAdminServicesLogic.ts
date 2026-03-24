import { useState, useEffect } from "react";

import { 
    fetchServicesApi, 
    createServiceApi, 
    updateServiceApi, 
    deleteServiceApi, 
    generateAIDescriptionApi 
} from "./services";
import { ServiceItem, ServiceFormData } from "./types";

export function useAdminServicesLogic() {
    const [services, setServices] = useState<ServiceItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
    const [formData, setFormData] = useState<ServiceFormData>({
        name: "",
        category: "Accreditation",
        description: "",
        fee: "",
        is_active: true
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [isAIModalOpen, setIsAIModalOpen] = useState(false);
    const [aiPrompt, setAiPrompt] = useState("");
    const [isAIGenerating, setIsAIGenerating] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const loadServices = async () => {
            setLoading(true);
            try {
                const data = await fetchServicesApi();
                if (isMounted) setServices(data);
            } catch (err) {
                console.error("Failed to fetch services", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        loadServices();
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

    const handleOpenModal = (item: ServiceItem | null = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                name: item.name,
                category: item.category,
                description: item.description,
                fee: item.fee,
                is_active: item.is_active
            });
        } else {
            setEditingItem(null);
            setFormData({
                name: "",
                category: "Accreditation",
                description: "",
                fee: "",
                is_active: true
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
        } catch (err) {
            console.error("Failed to save service", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this service?")) {
            try {
                await deleteServiceApi(id);
                await fetchServices();
            } catch (err) {
                console.error("Failed to delete service", err);
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
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        handleOpenModal,
        handleSubmit,
        handleDelete,
        handleGenerateAI
    };
}
