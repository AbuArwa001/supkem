"use client";

import { motion } from "framer-motion";
import { X, Sparkles, DollarSign, CheckCircle2, Loader2, Award, FileText, Ban } from "lucide-react";
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

const CATEGORIES = [
    "Accreditation",
    "Halal",
    "Marriage",
    "Education",
    "Employment",
    "Pilgrimage",
    "Kosher",
    "Other",
];

const AUDIENCES = ["Both", "Organization", "Individual"];

const DOCUMENT_OPTIONS = [
    { value: "Certificate", labelKey: "docTypeCertificate" as const, icon: Award },
    { value: "Letter", labelKey: "docTypeLetter" as const, icon: FileText },
    { value: "None", labelKey: "docTypeNone" as const, icon: Ban },
];

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
                            <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">{t("category")}</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all"
                            >
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">{t("targetAudience")}</label>
                            <select
                                value={formData.target_audience || "Both"}
                                onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                                className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all"
                            >
                                {AUDIENCES.map(a => <option key={a} value={a}>{a}</option>)}
                            </select>
                        </div>
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
                    </div>

                    <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-1">
                            <label className="text-sm font-bold text-primary uppercase tracking-widest">
                                {t("documentType")}
                            </label>
                            <span className="text-xs text-foreground/50 font-medium">
                                {t("docTypeHelper")}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {DOCUMENT_OPTIONS.map((opt) => {
                                const Icon = opt.icon;
                                const isSelected = (formData.document_type || "Certificate") === opt.value;
                                return (
                                    <button
                                        type="button"
                                        key={opt.value}
                                        onClick={() => setFormData({ ...formData, document_type: opt.value })}
                                        className={cn(
                                            "flex items-center gap-3 p-4 rounded-2xl border text-left rtl:text-right transition-all cursor-pointer",
                                            isSelected
                                                ? "border-primary bg-primary/[0.06] text-primary shadow-sm ring-2 ring-primary/20"
                                                : "border-border hover:border-primary/30 bg-primary/[0.01] text-foreground/70"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all",
                                            isSelected ? "bg-primary text-white shadow-sm" : "bg-primary/5 text-primary"
                                        )}>
                                            <Icon size={18} />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-bold text-xs sm:text-sm truncate">{t(opt.labelKey)}</p>
                                        </div>
                                    </button>
                                );
                            })}
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

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">{t("statusLabel")}</label>
                        <div className="flex items-center gap-4 py-2">
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

