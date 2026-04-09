"use client";

import { motion } from "framer-motion";
import { X, Sparkles, DollarSign, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ServiceFormData, ServiceItem } from "./types";
import { useTranslations } from "next-intl";

interface ServiceFormModalProps {
    editingItem: ServiceItem | null;
    formData: ServiceFormData;
    isSubmitting: boolean;
    setFormData: (data: ServiceFormData) => void;
    onSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
    onOpenAIGeneration: () => void;
}

const CATEGORIES = ["Accreditation", "Halal", "Kosher"];

export function ServiceFormModal({
    editingItem,
    formData,
    isSubmitting,
    setFormData,
    onSubmit,
    onClose,
    onOpenAIGeneration
}: ServiceFormModalProps) {
    const t = useTranslations("Dashboard.admin.services.modal");

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
                className="relative w-full max-w-3xl bg-white rounded-[20px] shadow-2xl overflow-hidden shadow-primary/10"
            >
                <div className="p-8 border-b border-border flex items-center justify-between">
                    <h2 className="text-2xl font-bold font-outfit text-primary">
                        {editingItem ? t("edit") : t("new")}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-primary/5 rounded-xl transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">{t("name")}</label>
                            <input
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder={t("namePlaceholder")}
                                className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">{t("name")}</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all appearance-none"
                            >
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-1">
                            <label className="text-sm font-bold text-primary uppercase tracking-widest">{t("desc")}</label>
                            <button
                                type="button"
                                onClick={onOpenAIGeneration}
                                className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-secondary hover:text-secondary/80 transition-colors"
                            >
                                <Sparkles size={14} /> {t("generateAI")}
                            </button>
                        </div>
                        <textarea
                            rows={6}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder={t("descPlaceholder")}
                            className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-primary uppercase tracking-widest px-1 text-primary">{t("feeLabel")}</label>
                            <div className="relative">
                                <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 ltr:left-4 rtl:right-4" />
                                <input
                                    required
                                    type="number"
                                    value={formData.fee}
                                    onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                                    placeholder="0.00"
                                    className="w-full ltr:pl-12 rtl:pr-12 px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">{t("statusLabel")}</label>
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
                                    <span className="font-bold text-primary text-sm">{t("activeService")}</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 flex items-center gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-8 py-4 bg-foreground/5 text-primary rounded-2xl font-bold hover:bg-foreground/10 transition-all"
                        >
                            {t("cancel")}
                        </button>
                        <button
                            disabled={isSubmitting}
                            className="flex-[2] px-8 py-4 bg-primary text-white rounded-2xl font-bold hover-lift premium-gradient shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    {t("saving")}
                                </>
                            ) : (
                                editingItem ? t("update") : t("create")
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

