"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Settings,
    Plus,
    Search,
    Edit2,
    Trash2,
    X,
    Sparkles,
    CheckCircle2,
    Loader2,
    DollarSign,
    Tag,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";

interface ServiceItem {
    id: string;
    name: string;
    category: string;
    description: string;
    fee: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export default function AdminServices() {
    const [services, setServices] = useState<ServiceItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAIModalOpen, setIsAIModalOpen] = useState(false);
    const [aiPrompt, setAiPrompt] = useState("");
    const [isAIGenerating, setIsAIGenerating] = useState(false);
    const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        category: "Accreditation",
        description: "",
        fee: "",
        is_active: true
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories = ["Accreditation", "Halal", "Kosher"];

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const res = await api.get("/services/services/");
            setServices(res.data.results || res.data);
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
                await api.patch(`/services/services/${editingItem.id}/`, formData);
            } else {
                await api.post("/services/services/", formData);
            }
            setIsModalOpen(false);
            fetchServices();
        } catch (err) {
            console.error("Failed to save service", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this service?")) {
            try {
                await api.delete(`/services/services/${id}/`);
                fetchServices();
            } catch (err) {
                console.error("Failed to delete service", err);
            }
        }
    };

    const handleGenerateAI = async () => {
        if (!aiPrompt) return;
        setIsAIGenerating(true);

        // Simulating AI generation for now.
        // In a real scenario, this would call a backend endpoint that interacts with LLM.
        setTimeout(() => {
            const generatedText = `This ${formData.category} service named "${formData.name}" is designed to provide comprehensive support for individuals and organizations. \n\nKey features include:\n- Professional assessment and certification\n- Compliance with national standards\n- Transparent and efficient processing\n\nPrompt details: ${aiPrompt}`;
            setFormData({ ...formData, description: generatedText });
            setIsAIGenerating(false);
            setIsAIModalOpen(false);
            setAiPrompt("");
        }, 2000);
    };

    const filteredServices = services.filter((s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-bold font-outfit text-primary tracking-tight">Services CMS</h1>
                    <p className="text-foreground/60 font-medium">Manage and configure organizational services.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors" />
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search services..."
                            className="pl-12 pr-4 py-3 bg-white border border-border focus:border-primary/20 rounded-2xl text-sm transition-all outline-none w-64 shadow-sm"
                        />
                    </div>

                    <button
                        onClick={() => handleOpenModal()}
                        className="px-6 py-3 bg-primary text-white rounded-2xl font-bold hover-lift premium-gradient shadow-lg flex items-center gap-2"
                    >
                        <Plus size={20} /> Add Service
                    </button>
                </div>
            </div>

            {/* List */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="animate-spin text-primary" size={40} />
                </div>
            ) : (
                <div className="bg-white border border-border rounded-[32px] overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                        <thead className="bg-primary/[0.02] border-b border-border">
                            <tr className="text-xs font-bold text-foreground/40 uppercase tracking-widest">
                                <th className="px-8 py-5">Service Details</th>
                                <th className="px-8 py-5">Category</th>
                                <th className="px-8 py-5">Fee</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {filteredServices.map((service) => (
                                <tr key={service.id} className="hover:bg-primary/[0.01] transition-colors group">
                                    <td className="px-8 py-6">
                                        <p className="font-bold text-primary group-hover:underline cursor-pointer">{service.name}</p>
                                        <p className="text-xs text-foreground/40 line-clamp-1 mt-1">{service.description || "No description provided."}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-[10px] font-black uppercase tracking-widest">
                                            {service.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="font-bold text-primary flex items-center gap-1">
                                            <span className="text-xs text-foreground/30 font-medium">KES</span>
                                            {Number(service.fee).toLocaleString()}
                                        </p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={cn(
                                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold",
                                            service.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                        )}>
                                            <div className={cn("w-1.5 h-1.5 rounded-full", service.is_active ? "bg-green-600" : "bg-red-600")} />
                                            {service.is_active ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleOpenModal(service)}
                                                className="p-2 bg-primary/5 text-primary rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(service.id)}
                                                className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredServices.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center mx-auto mb-4">
                                            <Settings className="text-primary/20" size={40} />
                                        </div>
                                        <p className="text-foreground/40 font-bold">No services found.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Service Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-3xl bg-white rounded-[20px] shadow-2xl overflow-hidden shadow-primary/10"
                        >
                            <div className="p-8 border-b border-border flex items-center justify-between">
                                <h2 className="text-2xl font-bold font-outfit text-primary">
                                    {editingItem ? "Edit Service" : "New Service"}
                                </h2>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-primary/5 rounded-xl transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">Service Name</label>
                                        <input
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Enter service name..."
                                            className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">Category</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all appearance-none"
                                        >
                                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between px-1">
                                        <label className="text-sm font-bold text-primary uppercase tracking-widest">Description</label>
                                        <button
                                            type="button"
                                            onClick={() => setIsAIModalOpen(true)}
                                            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-secondary hover:text-secondary/80 transition-colors"
                                        >
                                            <Sparkles size={14} /> Generate with AI
                                        </button>
                                    </div>
                                    <textarea
                                        rows={6}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Describe the service details..."
                                        className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all resize-none"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-primary uppercase tracking-widest px-1 text-primary">Fee (KES)</label>
                                        <div className="relative">
                                            <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" />
                                            <input
                                                required
                                                type="number"
                                                value={formData.fee}
                                                onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                                                placeholder="0.00"
                                                className="w-full pl-12 pr-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">Initial Status</label>
                                        <div className="flex items-center gap-4 py-4">
                                            <label className="flex items-center gap-2 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.is_active}
                                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                                    className="hidden"
                                                />
                                                <div className={cn(
                                                    "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                                                    formData.is_active ? "bg-primary border-primary" : "border-border group-hover:border-primary/30"
                                                )}>
                                                    {formData.is_active && <CheckCircle2 size={14} className="text-white" />}
                                                </div>
                                                <span className="font-bold text-primary text-sm">Active Service</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 flex items-center gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-8 py-4 bg-foreground/5 text-primary rounded-2xl font-bold hover:bg-foreground/10 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        disabled={isSubmitting}
                                        className="flex-[2] px-8 py-4 bg-primary text-white rounded-2xl font-bold hover-lift premium-gradient shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="animate-spin" size={20} />
                                                Saving...
                                            </>
                                        ) : (
                                            editingItem ? "Update Service" : "Create Service"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* AI Prompt Modal */}
            <AnimatePresence>
                {isAIModalOpen && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAIModalOpen(false)}
                            className="absolute inset-0 bg-secondary/20 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-lg bg-white rounded-[20px] shadow-2xl overflow-hidden p-10 space-y-8"
                        >
                            <div className="space-y-2 text-center">
                                <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-3xl flex items-center justify-center mx-auto mb-4">
                                    <Sparkles size={32} />
                                </div>
                                <h3 className="text-2xl font-bold font-outfit text-primary">AI Content Assistant</h3>
                                <p className="text-foreground/60">Tell me what this service is about, and I'll write a professional description for you.</p>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">Describe the service briefly...</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={aiPrompt}
                                    onChange={(e) => setAiPrompt(e.target.value)}
                                    placeholder="e.g. A halal certification for restaurants including site inspection and audit..."
                                    className="w-full px-6 py-4 bg-secondary/[0.02] border border-border focus:border-secondary/20 rounded-2xl outline-none font-medium text-primary transition-all resize-none"
                                />
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setIsAIModalOpen(false)}
                                    className="flex-1 px-6 py-4 bg-foreground/5 text-primary rounded-2xl font-bold hover:bg-foreground/10 transition-all font-outfit"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleGenerateAI}
                                    disabled={!aiPrompt || isAIGenerating}
                                    className="flex-[2] px-6 py-4 bg-secondary text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-secondary/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2 font-outfit"
                                >
                                    {isAIGenerating ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles size={20} /> Generate Now
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
