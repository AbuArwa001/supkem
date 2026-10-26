"use client";

import { motion } from "framer-motion";
import { Building2, Edit3 } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { OrganizationDetail } from "./types";
import { OrganizationRegistryCards } from "./OrganizationRegistryCards";
import { OrganizationDigitalPresence } from "./OrganizationDigitalPresence";

interface OrganizationCoreInfoProps {
    org: OrganizationDetail;
    canEdit?: boolean;
    onEdit?: () => void;
}

export function OrganizationCoreInfo({ org, canEdit = false, onEdit }: OrganizationCoreInfoProps) {
    const t = useTranslations("Dashboard.admin.organizations.detail");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 sm:p-10 rounded-[24px] bg-white border border-border shadow-xl shadow-slate-200/50 space-y-8 relative overflow-hidden"
        >
            <div className="absolute top-0 end-0 w-64 h-64 bg-primary/[0.02] rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/5 text-primary rounded-[22px] flex items-center justify-center border border-primary/10 shadow-md shadow-primary/5 shrink-0">
                        <Building2 size={36} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black font-outfit text-primary tracking-tight">
                            {t("entityDetails")}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2.5 mt-1.5">
                            <span className="px-3.5 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                                {org.type}
                            </span>
                            <span className={cn(
                                "px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border",
                                org.accreditation_status === "Accredited"
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                    : org.accreditation_status === "Pending"
                                    ? "bg-amber-50 text-amber-700 border-amber-200"
                                    : "bg-rose-50 text-rose-700 border-rose-200"
                            )}>
                                {org.accreditation_status || "Pending"}
                            </span>
                        </div>
                    </div>
                </div>

                {canEdit && onEdit && (
                    <button
                        onClick={onEdit}
                        className="self-start sm:self-auto px-4 py-2.5 bg-slate-50 hover:bg-primary hover:text-white text-slate-700 border border-slate-200 hover:border-primary rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                    >
                        <Edit3 size={14} />
                        {t("editDetails")}
                    </button>
                )}
            </div>

            <OrganizationRegistryCards org={org} />
            <OrganizationDigitalPresence org={org} />
        </motion.div>
    );
}
