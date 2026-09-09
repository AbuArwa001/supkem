"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Building2, MapPin, ChevronRight, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Organization } from "./types";
import { useTranslations } from "next-intl";

interface OrganizationCardProps {
    org: Organization;
    index: number;
    viewMode: "grid" | "list";
}

export function OrganizationCard({ org, index, viewMode }: OrganizationCardProps) {
    const t = useTranslations("Dashboard.admin.organizations");
    
    const isAccredited = org.accreditation_status === "Accredited";
    const isPending = org.accreditation_status === "Pending" || !org.accreditation_status;
    const statusText = org.accreditation_status || "Pending";

    const statusBadgeClass = isAccredited 
        ? "bg-green-50 text-green-600 border-green-200" 
        : isPending 
            ? "bg-amber-50 text-amber-600 border-amber-200" 
            : "bg-red-50 text-red-600 border-red-200";

    const formatCount = (count: number) => {
        if (!count) return "00";
        return count > 0 && count < 10 ? `0${count}` : count.toString();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
            className={cn(
                "p-6 md:p-8 rounded-2xl bg-white border-2 border-border/60 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 group relative",
                viewMode === "list" && "flex flex-col md:flex-row md:items-center justify-between gap-6"
            )}
        >
            <div className={cn("flex items-start gap-5 md:gap-6", viewMode === "list" && "flex-1")}>
                <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300 border border-slate-200 group-hover:border-primary">
                    <Building2 size={28} className="md:w-8 md:h-8" />
                </div>
                <div className="space-y-3 flex-1 min-w-0">
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 mb-1">
                            <h4 className="text-lg md:text-xl font-bold font-outfit text-slate-800 group-hover:text-primary transition-colors leading-tight truncate">
                                {org.name}
                            </h4>
                            <span className={cn(
                                "inline-flex px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md shrink-0 border w-fit",
                                statusBadgeClass
                            )}>
                                {t.has(`filters.${statusText.toLowerCase()}`) 
                                    ? t(`filters.${statusText.toLowerCase()}`) 
                                    : statusText}
                            </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-2 py-0.5 rounded-md">
                                {t.has(`types.${(org.type || "").toLowerCase()}`) 
                                    ? t(`types.${(org.type || "").toLowerCase()}`) 
                                    : org.type}
                            </span>
                            <span className="text-slate-300">•</span>
                            <p className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5 bg-slate-100 px-2 py-0.5 rounded-md">
                                <MapPin size={12} className="text-slate-400" /> {t("location.nairobi")}
                            </p>
                        </div>
                    </div>

                    {viewMode === "grid" && (
                        <div className="flex gap-3 pt-4 mt-4 border-t border-slate-100">
                            <div className="flex flex-col justify-center bg-slate-50 p-3 rounded-xl flex-1 border border-slate-100 group-hover:border-primary/10 transition-colors">
                                <p className="text-xl md:text-2xl font-black text-slate-700 tracking-tight">
                                    {formatCount(org.apps_count)}
                                </p>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-0.5">{t("apps")}</p>
                            </div>
                            <div className="flex flex-col justify-center bg-slate-50 p-3 rounded-xl flex-1 border border-slate-100 group-hover:border-secondary/10 transition-colors">
                                <p className="text-xl md:text-2xl font-black text-slate-700 tracking-tight">
                                    {formatCount(org.certs_count)}
                                </p>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-0.5">{t("certs")}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className={cn(
                "flex items-center gap-3", 
                viewMode === "grid" ? "mt-6 pt-5 border-t border-slate-100" : "md:ml-6 md:border-l border-slate-100 md:pl-6 pt-4 md:pt-0 border-t md:border-t-0"
            )}>
                <Link
                    href={`/admin/organizations/${org.id}`}
                    className="flex-1 md:flex-none px-5 py-3 md:py-3.5 bg-white border-2 border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:border-primary hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                >
                    {t("viewRegistry")} 
                    <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                <button className="p-3 md:p-3.5 bg-white border-2 border-slate-200 rounded-xl text-slate-400 hover:text-primary hover:border-primary/30 transition-colors">
                    <MoreVertical size={18} />
                </button>
            </div>
        </motion.div>
    );
}

