"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Trash2, FolderPlus, Tag, Loader2, Layers, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ServiceCategoryItem } from "./types";
import { useTranslations, useLocale } from "next-intl";

interface CategoryManagementModalProps {
    categories: ServiceCategoryItem[];
    loading: boolean;
    onClose: () => void;
    onAddCategory: (data: { name: string; description?: string }) => Promise<ServiceCategoryItem | null>;
    onDeleteCategory: (id: string, force?: boolean) => Promise<boolean>;
}

export function CategoryManagementModal({
    categories,
    loading,
    onClose,
    onAddCategory,
    onDeleteCategory,
}: CategoryManagementModalProps) {
    const t = useTranslations("Dashboard.admin.services.categoryModal");
    const locale = useLocale();
    const isAr = locale === "ar";

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsSubmitting(true);
        setErrorMsg(null);
        try {
            const res = await onAddCategory({ name: name.trim(), description: description.trim() });
            if (res) {
                setName("");
                setDescription("");
            }
        } catch (err: any) {
            const data = err.response?.data;
            const message = data?.name?.[0] || data?.detail || "Failed to create category.";
            setErrorMsg(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (category: ServiceCategoryItem) => {
        const hasServices = (category.services_count ?? 0) > 0;
        const confirmMsg = hasServices
            ? `Category '${category.name}' is currently used by ${category.services_count} service(s). Are you sure you want to force delete it?`
            : t("deleteConfirm", { name: category.name });

        if (!window.confirm(confirmMsg)) return;

        setDeletingId(category.id);
        setErrorMsg(null);
        try {
            await onDeleteCategory(category.id, hasServices);
        } catch (err: any) {
            const data = err.response?.data;
            setErrorMsg(data?.detail || "Failed to delete category.");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
            />

            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative w-full max-w-4xl bg-white rounded-[24px] shadow-2xl overflow-hidden shadow-primary/10 flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="p-6 sm:p-8 border-b border-border flex items-center justify-between bg-primary/[0.01]">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <Layers size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold font-outfit text-primary">
                                {t("title")}
                            </h2>
                            <p className="text-sm text-foreground/60 font-medium">
                                {t("subtitle")}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2.5 hover:bg-primary/5 rounded-xl transition-colors text-foreground/60 hover:text-primary"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Error Banner */}
                {errorMsg && (
                    <div className="mx-6 sm:mx-8 mt-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-700 text-sm">
                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                        <div className="flex-1 font-medium">{errorMsg}</div>
                        <button onClick={() => setErrorMsg(null)} className="text-rose-500 hover:text-rose-700">
                            <X size={16} />
                        </button>
                    </div>
                )}

                <div className="p-6 sm:p-8 overflow-y-auto space-y-8 custom-scrollbar">
                    {/* Create New Category Form */}
                    <div className="p-6 rounded-[20px] bg-primary/[0.02] border border-primary/10 space-y-4">
                        <div className="flex items-center gap-2">
                            <FolderPlus size={18} className="text-primary" />
                            <h3 className="font-bold text-primary font-outfit text-lg">
                                {t("newCategory")}
                            </h3>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-primary uppercase tracking-widest px-1">
                                        {t("name")} *
                                    </label>
                                    <input
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder={t("namePlaceholder")}
                                        className="w-full px-5 py-3.5 bg-white border border-border focus:border-primary/40 rounded-xl outline-none font-medium text-primary text-sm shadow-xs transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-primary uppercase tracking-widest px-1">
                                        {t("description")}
                                    </label>
                                    <input
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder={t("descPlaceholder")}
                                        className="w-full px-5 py-3.5 bg-white border border-border focus:border-primary/40 rounded-xl outline-none font-medium text-primary text-sm shadow-xs transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !name.trim()}
                                    className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm hover-lift premium-gradient shadow-md flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            {t("adding")}
                                        </>
                                    ) : (
                                        <>
                                            <Plus size={16} />
                                            {t("addButton")}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Existing Categories List */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-1">
                            <div className="flex items-center gap-2">
                                <Tag size={18} className="text-primary" />
                                <h3 className="font-bold text-primary font-outfit text-lg">
                                    {t("existingCategories")}
                                </h3>
                            </div>
                            <span className="text-xs font-black px-2.5 py-1 bg-primary/5 text-primary rounded-lg border border-primary/10">
                                {categories.length}
                            </span>
                        </div>

                        {loading ? (
                            <div className="py-12 flex items-center justify-center">
                                <Loader2 size={32} className="animate-spin text-primary" />
                            </div>
                        ) : categories.length === 0 ? (
                            <div className="py-12 text-center text-foreground/50 font-medium text-sm">
                                {t("noCategories")}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {categories.map((cat) => {
                                    const displayName = isAr
                                        ? (cat.name_ar || cat.name_en || cat.name)
                                        : (cat.name_en || cat.name || cat.name_ar);
                                    const displayDesc = isAr
                                        ? (cat.description_ar || cat.description_en || cat.description)
                                        : (cat.description_en || cat.description || cat.description_ar);
                                    const servicesCount = cat.services_count ?? 0;
                                    const isDeleting = deletingId === cat.id;

                                    return (
                                        <div
                                            key={cat.id}
                                            className="group p-4 rounded-2xl border border-border bg-white hover:border-primary/30 hover:shadow-md transition-all flex flex-col justify-between gap-3"
                                        >
                                            <div className="space-y-1.5">
                                                <div className="flex items-center justify-between gap-2">
                                                    <h4 className="font-bold text-sm text-primary group-hover:text-primary transition-colors truncate">
                                                        {displayName}
                                                    </h4>
                                                    <span
                                                        className={cn(
                                                            "text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border shrink-0",
                                                            servicesCount > 0
                                                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                                : "bg-slate-50 text-slate-500 border-slate-200"
                                                        )}
                                                    >
                                                        {t("servicesCount", { count: servicesCount })}
                                                    </span>
                                                </div>
                                                {displayDesc && (
                                                    <p className="text-xs text-foreground/50 line-clamp-2 leading-relaxed">
                                                        {displayDesc}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="pt-2 border-t border-border/60 flex items-center justify-end">
                                                <button
                                                    onClick={() => handleDelete(cat)}
                                                    disabled={isDeleting}
                                                    title={servicesCount > 0 ? "Linked to active services" : "Delete category"}
                                                    className="p-1.5 text-foreground/40 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                                                >
                                                    {isDeleting ? (
                                                        <Loader2 size={15} className="animate-spin text-rose-500" />
                                                    ) : (
                                                        <Trash2 size={15} />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-border bg-primary/[0.01] flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-8 py-3 bg-foreground/5 text-primary rounded-xl font-bold text-sm hover:bg-foreground/10 transition-all cursor-pointer"
                    >
                        {t("close")}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
