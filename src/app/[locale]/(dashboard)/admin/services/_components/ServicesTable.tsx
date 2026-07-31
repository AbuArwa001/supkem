"use client";

import { Edit2, Trash2, Settings, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ServiceItem } from "./types";
import { useTranslations } from "next-intl";

interface ServicesTableProps {
    services: ServiceItem[];
    loading: boolean;
    onEdit: (item: ServiceItem) => void;
    onDelete: (id: string) => void;
}

export function ServicesTable({ services, loading, onEdit, onDelete }: ServicesTableProps) {
    const t = useTranslations("Dashboard.admin.services.table");

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-primary" size={40} />
            </div>
        );
    }

    return (
        <div className="bg-white border border-border rounded-[16px] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right">
                    <thead className="bg-primary/[0.02] border-b border-border">
                        <tr className="text-xs font-bold text-foreground/40 uppercase tracking-widest">
                            <th className="px-8 py-5 text-start">{t("details")}</th>
                            <th className="px-8 py-5 text-start hidden md:table-cell">{t("category")}</th>
                            <th className="px-8 py-5 text-start hidden sm:table-cell">{t("fee")}</th>
                            <th className="px-8 py-5 text-start hidden lg:table-cell">{t("status")}</th>
                            <th className="px-8 py-5 text-end">{t("actions")}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                        {services.map((service) => (
                            <tr key={service.id} className="hover:bg-primary/[0.01] transition-colors group">
                                <td className="px-8 py-6">
                                    <p className="font-bold text-primary group-hover:underline cursor-pointer">{service.name}</p>
                                    <p className="text-xs text-foreground/40 line-clamp-1 mt-1">{service.description || t("noDesc")}</p>
                                </td>
                                <td className="px-8 py-6 hidden md:table-cell">
                                    <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-[10px] font-black uppercase tracking-widest">
                                        {service.category}
                                    </span>
                                </td>
                                <td className="px-8 py-6 hidden sm:table-cell">
                                    <p className="font-bold text-primary flex items-center gap-1">
                                        <span className="text-xs text-foreground/30 font-medium tracking-tight uppercase">KES</span>
                                        {Number(service.fee).toLocaleString()}
                                    </p>
                                </td>
                                <td className="px-8 py-6 hidden lg:table-cell">
                                    <span className={cn(
                                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold",
                                        service.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                    )}>
                                        <div className={cn("w-1.5 h-1.5 rounded-full", service.is_active ? "bg-green-600" : "bg-red-600")} />
                                        {service.is_active ? t("active") : t("inactive")}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-end">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(service)}
                                            className="p-2 bg-primary/5 text-primary rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(service.id)}
                                            className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {services.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-8 py-20 text-center">
                                    <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center mx-auto mb-4">
                                        <Settings className="text-primary/20" size={40} />
                                    </div>
                                    <p className="text-foreground/40 font-bold">{t("noServices")}</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

