"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

import { X, Sparkles, DollarSign, CheckCircle2, Loader2, Award, FileText, Ban, Plus, Infinity, Clock, Calendar, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ServiceFormData, ServiceItem, ServiceCategoryItem } from "./types";
import { useTranslations } from "next-intl";

interface ServiceFormModalProps {
    editingItem: ServiceItem | null;
    formData: ServiceFormData;
    categories: ServiceCategoryItem[];
    isSubmitting: boolean;
    setFormData: (data: ServiceFormData) => void;
    onSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
    onOpenAIGeneration: () => void;
    onQuickAddCategory?: (name: string) => Promise<ServiceCategoryItem | null>;
}

const DEFAULT_CATEGORIES = [
    "Accreditation",
    "Halal",
    "Marriage",
    "Education",
    "Employment",
    "Pilgrimage",
    "Kosher",
    "Travel",
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
    categories,
    isSubmitting,
    setFormData,
    onSubmit,
    onClose,
    onOpenAIGeneration,
    onQuickAddCategory,
}: ServiceFormModalProps) {
    const t = useTranslations("Dashboard.admin.services.modal");
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [isAddingCategoryLoading, setIsAddingCategoryLoading] = useState(false);

    const categoryNames = useMemo(() => {
        const names = new Set<string>();
        categories.forEach(c => {
            if (c.name) names.add(c.name);
        });
        if (names.size === 0) {
            DEFAULT_CATEGORIES.forEach(c => names.add(c));
        }
        if (formData.category) {
            names.add(formData.category);
        }
        return Array.from(names);
    }, [categories, formData.category]);

    const handleCreateCategoryInline = async () => {
        if (!newCategoryName.trim()) return;
        setIsAddingCategoryLoading(true);
        try {
            if (onQuickAddCategory) {
                const created = await onQuickAddCategory(newCategoryName.trim());
                if (created) {
                    setFormData({ ...formData, category: created.name });
                } else {
                    setFormData({ ...formData, category: newCategoryName.trim() });
                }
            } else {
                setFormData({ ...formData, category: newCategoryName.trim() });
            }
            setNewCategoryName("");
            setIsAddingCategory(false);
        } catch (err) {
            console.error("Failed to add category inline", err);
        } finally {
            setIsAddingCategoryLoading(false);
        }
    };

    const validityMode: "indefinite" | "duration" | "dates" = useMemo(() => {
        if (formData.is_indefinite !== false) return "indefinite";
        if (
            formData.start_date ||
            formData.validity_duration === "Date Range" ||
            formData.validity_duration === "Custom Date Range" ||
            (formData.end_date && !["6 Months", "1 Year", "2 Years", "3 Years", "5 Years"].includes(formData.validity_duration || ""))
        ) {
            return "dates";
        }
        return "duration";
    }, [formData.is_indefinite, formData.start_date, formData.end_date, formData.validity_duration]);

    const dateSpan = useMemo(() => {
        const startStr = formData.start_date;
        const endStr = formData.end_date || formData.expiration_date;
        if (!startStr || !endStr) return null;
        const start = new Date(startStr);
        const end = new Date(endStr);
        const diffTime = end.getTime() - start.getTime();
        if (isNaN(diffTime) || diffTime < 0) {
            return { error: true, days: 0, text: "" };
        }
        const days = Math.round(diffTime / (1000 * 60 * 60 * 24));
        let text = `${days} days`;
        if (days >= 360 && days <= 370) text = "1 year";
        else if (days >= 720 && days <= 740) text = "2 years";
        else if (days >= 1080 && days <= 1110) text = "3 years";
        else if (days >= 1800 && days <= 1850) text = "5 years";
        else if (days >= 28 && days <= 32) text = "1 month";
        else if (days >= 175 && days <= 190) text = "6 months";
        else if (days > 30) {
            const months = Math.round(days / 30.4);
            text = `~${months} months`;
        }
        return { error: false, days, text };
    }, [formData.start_date, formData.end_date, formData.expiration_date]);

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
                            <div className="flex items-center justify-between px-1">
                                <label className="text-sm font-bold text-primary uppercase tracking-widest">{t("category")}</label>
                                {!isAddingCategory ? (
                                    <button
                                        type="button"
                                        onClick={() => setIsAddingCategory(true)}
                                        className="text-xs font-bold text-secondary hover:text-secondary/80 flex items-center gap-1 transition-colors cursor-pointer"
                                    >
                                        <Plus size={13} /> {t("addNewCategory")}
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => { setIsAddingCategory(false); setNewCategoryName(""); }}
                                        className="text-xs font-bold text-foreground/50 hover:text-foreground transition-colors cursor-pointer"
                                    >
                                        {t("cancel")}
                                    </button>
                                )}
                            </div>

                            {!isAddingCategory ? (
                                <select
                                    value={formData.category}
                                    onChange={(e) => {
                                        if (e.target.value === "__NEW__") {
                                            setIsAddingCategory(true);
                                        } else {
                                            setFormData({ ...formData, category: e.target.value });
                                        }
                                    }}
                                    className="w-full px-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all cursor-pointer"
                                >
                                    {categoryNames.map(c => <option key={c} value={c}>{c}</option>)}
                                    <option value="__NEW__">{t("addNewCategory")}</option>
                                </select>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <input
                                        autoFocus
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        placeholder={t("namePlaceholder")}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                handleCreateCategoryInline();
                                            }
                                        }}
                                        className="flex-1 px-5 py-4 bg-primary/[0.02] border border-primary/40 rounded-2xl outline-none font-medium text-primary text-sm transition-all"
                                    />
                                    <button
                                        type="button"
                                        disabled={isAddingCategoryLoading || !newCategoryName.trim()}
                                        onClick={handleCreateCategoryInline}
                                        className="px-5 py-4 bg-primary text-white font-bold rounded-2xl text-xs hover-lift flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shrink-0 shadow-sm"
                                    >
                                        {isAddingCategoryLoading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                                        {t("create")}
                                    </button>
                                </div>
                            )}
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

                    {/* Certificate Validity & Expiration Policy */}
                    {formData.document_type === "Certificate" && (
                        <div className="p-5 rounded-2xl bg-primary/[0.02] border border-border space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-sm font-bold text-primary flex items-center gap-2">
                                        <Award size={16} className="text-primary" />
                                        <span>{t("validityTitle")}</span>
                                    </h4>
                                    <p className="text-xs text-foreground/50 font-medium mt-0.5">
                                        {t("validitySubtitle")}
                                    </p>
                                </div>
                                <span className={cn(
                                    "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border",
                                    validityMode === "indefinite"
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        : validityMode === "dates"
                                        ? "bg-purple-50 text-purple-700 border-purple-200"
                                        : "bg-blue-50 text-blue-700 border-blue-200"
                                )}>
                                    {validityMode === "indefinite"
                                        ? "Indefinite Validity"
                                        : validityMode === "dates"
                                        ? "Start & End Dates"
                                        : `Fixed Duration (${formData.validity_duration || "1 Year"})`}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {/* Option 1: Indefinite */}
                                <button
                                    type="button"
                                    onClick={() => setFormData({
                                        ...formData,
                                        is_indefinite: true,
                                        validity_duration: "Indefinite",
                                        start_date: null,
                                        end_date: null,
                                        expiration_date: null
                                    })}
                                    className={cn(
                                        "p-4 rounded-xl border-2 text-left rtl:text-right transition-all cursor-pointer flex items-start gap-3",
                                        validityMode === "indefinite"
                                            ? "border-emerald-600 bg-emerald-50/50 shadow-xs ring-2 ring-emerald-500/10"
                                            : "border-border bg-white hover:border-primary/30"
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                                        validityMode === "indefinite" ? "bg-emerald-600 text-white" : "bg-primary/5 text-primary"
                                    )}>
                                        <Infinity size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-primary">{t("indefiniteTitle")}</p>
                                        <p className="text-[11px] text-foreground/60 mt-0.5 leading-relaxed">
                                            {t("indefiniteDesc")}
                                        </p>
                                    </div>
                                </button>

                                {/* Option 2: Fixed Duration */}
                                <button
                                    type="button"
                                    onClick={() => setFormData({
                                        ...formData,
                                        is_indefinite: false,
                                        validity_duration: (formData.validity_duration && !["Indefinite", "Date Range", "Custom Date Range"].includes(formData.validity_duration))
                                            ? formData.validity_duration
                                            : "1 Year",
                                        start_date: null,
                                        end_date: null,
                                        expiration_date: null
                                    })}
                                    className={cn(
                                        "p-4 rounded-xl border-2 text-left rtl:text-right transition-all cursor-pointer flex items-start gap-3",
                                        validityMode === "duration"
                                            ? "border-primary bg-primary/[0.06] shadow-xs ring-2 ring-primary/10"
                                            : "border-border bg-white hover:border-primary/30"
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                                        validityMode === "duration" ? "bg-primary text-white" : "bg-primary/5 text-primary"
                                    )}>
                                        <Clock size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-primary">{t("fixedDurationTitle")}</p>
                                        <p className="text-[11px] text-foreground/60 mt-0.5 leading-relaxed">
                                            {t("fixedDurationDesc")}
                                        </p>
                                    </div>
                                </button>

                                {/* Option 3: Start & End Dates */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        const today = new Date().toISOString().split("T")[0];
                                        const nextYear = new Date();
                                        nextYear.setFullYear(nextYear.getFullYear() + 1);
                                        const nextYearStr = nextYear.toISOString().split("T")[0];
                                        setFormData({
                                            ...formData,
                                            is_indefinite: false,
                                            validity_duration: "Date Range",
                                            start_date: formData.start_date || today,
                                            end_date: formData.end_date || formData.expiration_date || nextYearStr,
                                            expiration_date: formData.end_date || formData.expiration_date || nextYearStr
                                        });
                                    }}
                                    className={cn(
                                        "p-4 rounded-xl border-2 text-left rtl:text-right transition-all cursor-pointer flex items-start gap-3",
                                        validityMode === "dates"
                                            ? "border-purple-600 bg-purple-50/50 shadow-xs ring-2 ring-purple-500/10"
                                            : "border-border bg-white hover:border-primary/30"
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                                        validityMode === "dates" ? "bg-purple-600 text-white" : "bg-primary/5 text-primary"
                                    )}>
                                        <Calendar size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-primary">{t("dateRangeTitle")}</p>
                                        <p className="text-[11px] text-foreground/60 mt-0.5 leading-relaxed">
                                            {t("dateRangeDesc")}
                                        </p>
                                    </div>
                                </button>
                            </div>

                            {/* Subpanel 1: Fixed Duration selection */}
                            {validityMode === "duration" && (
                                <div className="pt-2 border-t border-border/60 space-y-3">
                                    <label className="text-xs font-bold text-primary uppercase tracking-wider block">
                                        {t("selectValidityPeriod")}
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                        {["6 Months", "1 Year", "2 Years", "3 Years", "5 Years"].map((dur) => (
                                            <button
                                                type="button"
                                                key={dur}
                                                onClick={() => setFormData({ ...formData, validity_duration: dur })}
                                                className={cn(
                                                    "py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center",
                                                    formData.validity_duration === dur
                                                        ? "bg-primary text-white border-primary shadow-xs"
                                                        : "bg-white text-foreground/70 border-border hover:border-primary/40"
                                                )}
                                            >
                                                {dur}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Subpanel 2: Start & End Dates selection */}
                            {validityMode === "dates" && (
                                <div className="pt-3 border-t border-border/60 space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* Start Date */}
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <label className="text-xs font-bold text-primary uppercase tracking-wider">
                                                    {t("startDateLabel")}
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const today = new Date().toISOString().split("T")[0];
                                                        setFormData({ ...formData, start_date: today });
                                                    }}
                                                    className="text-[11px] font-bold text-primary hover:underline cursor-pointer"
                                                >
                                                    {t("today")}
                                                </button>
                                            </div>
                                            <input
                                                type="date"
                                                required
                                                value={formData.start_date || ""}
                                                onChange={(e) => {
                                                    const newStart = e.target.value;
                                                    setFormData({ ...formData, start_date: newStart });
                                                }}
                                                className="w-full px-4 py-2.5 bg-white border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/10 rounded-xl text-xs font-semibold text-primary outline-none transition-all"
                                            />
                                        </div>

                                        {/* End Date */}
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <label className="text-xs font-bold text-primary uppercase tracking-wider">
                                                    {t("endDateLabel")}
                                                </label>
                                                {formData.start_date && (
                                                    <span className="text-[10px] text-foreground/50 font-medium">
                                                        Min: {formData.start_date}
                                                    </span>
                                                )}
                                            </div>
                                            <input
                                                type="date"
                                                required
                                                value={formData.end_date || formData.expiration_date || ""}
                                                min={formData.start_date || undefined}
                                                onChange={(e) => {
                                                    const newEnd = e.target.value;
                                                    setFormData({
                                                        ...formData,
                                                        end_date: newEnd,
                                                        expiration_date: newEnd
                                                    });
                                                }}
                                                className={cn(
                                                    "w-full px-4 py-2.5 bg-white border rounded-xl text-xs font-semibold outline-none transition-all",
                                                    dateSpan?.error
                                                        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 text-red-600"
                                                        : "border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-primary"
                                                )}
                                            />
                                        </div>
                                    </div>

                                    {/* Quick Presets for End Date */}
                                    <div className="space-y-1.5">
                                        <span className="text-[11px] font-bold text-foreground/60">
                                            {t("quickPresets")}:
                                        </span>
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                { label: "+6 Months", months: 6 },
                                                { label: "+1 Year", months: 12 },
                                                { label: "+2 Years", months: 24 },
                                                { label: "+3 Years", months: 36 },
                                                { label: "+5 Years", months: 60 },
                                            ].map((preset) => (
                                                <button
                                                    type="button"
                                                    key={preset.label}
                                                    onClick={() => {
                                                        const base = formData.start_date ? new Date(formData.start_date) : new Date();
                                                        base.setMonth(base.getMonth() + preset.months);
                                                        const endStr = base.toISOString().split("T")[0];
                                                        setFormData({
                                                            ...formData,
                                                            end_date: endStr,
                                                            expiration_date: endStr
                                                        });
                                                    }}
                                                    className="px-2.5 py-1 text-xs font-bold rounded-lg border border-border bg-white text-foreground/70 hover:border-primary/40 hover:text-primary hover:bg-primary/[0.04] transition-all cursor-pointer"
                                                >
                                                    {preset.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Validation / Summary Feedback */}
                                    {dateSpan?.error ? (
                                        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                                            <AlertCircle size={15} className="shrink-0 text-red-500" />
                                            <span>{t("invalidDateRange")}</span>
                                        </div>
                                    ) : dateSpan ? (
                                        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-purple-50/70 border border-purple-200/80 text-purple-900 text-xs font-semibold">
                                            <Calendar size={15} className="shrink-0 text-purple-600" />
                                            <span>
                                                {t("validitySummary", {
                                                    days: dateSpan.days,
                                                    span: dateSpan.text,
                                                    start: formData.start_date || "",
                                                    end: formData.end_date || formData.expiration_date || ""
                                                })}
                                            </span>
                                        </div>
                                    ) : null}
                                </div>
                            )}
                        </div>
                    )}

                    {/* For Non-Certificate Services: Optional Schedule Window */}
                    {formData.document_type !== "Certificate" && (
                        <div className="p-5 rounded-2xl bg-primary/[0.02] border border-border space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-primary" />
                                    <h4 className="text-sm font-bold text-primary">
                                        {t("dateRangeTitle")} (Optional)
                                    </h4>
                                </div>
                                {(formData.start_date || formData.end_date) && (
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, start_date: null, end_date: null, expiration_date: null })}
                                        className="text-[11px] font-bold text-red-500 hover:underline cursor-pointer"
                                    >
                                        Clear Dates
                                    </button>
                                )}
                            </div>
                            <p className="text-xs text-foreground/50 font-medium">
                                Define an optional designated active window or intake period for this service.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-primary uppercase tracking-wider block">
                                        {t("startDateLabel")}
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.start_date || ""}
                                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value || null })}
                                        className="w-full px-4 py-2.5 bg-white border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/10 rounded-xl text-xs font-semibold text-primary outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-primary uppercase tracking-wider block">
                                        {t("endDateLabel")}
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.end_date || formData.expiration_date || ""}
                                        min={formData.start_date || undefined}
                                        onChange={(e) => {
                                            const val = e.target.value || null;
                                            setFormData({ ...formData, end_date: val, expiration_date: val });
                                        }}
                                        className="w-full px-4 py-2.5 bg-white border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/10 rounded-xl text-xs font-semibold text-primary outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

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

