"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { MapPin, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Organization } from "./types";
import { useTranslations } from "next-intl";
import { getOrgTypeTheme } from "./orgUtils";
import { OrganizationCardHeader } from "./OrganizationCardHeader";
import { OrganizationCardMetrics } from "./OrganizationCardMetrics";

interface OrganizationCardProps {
    org: Organization;
    index: number;
    viewMode?: "grid" | "list";
    onDelete?: (org: Organization) => void;
}

export function OrganizationCard({ org, index, onDelete }: OrganizationCardProps) {
    const t = useTranslations("Dashboard.admin.organizations");
    const theme = getOrgTypeTheme(org.type);

    const isAccredited = org.accreditation_status === "Accredited";
    const isPending = org.accreditation_status === "Pending" || !org.accreditation_status;
    const statusText = org.accreditation_status || "Pending";

    const statusBadgeClass = isAccredited
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : isPending
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-rose-50 text-rose-700 border-rose-200";

    const statusDotClass = isAccredited ? "bg-emerald-500" : isPending ? "bg-amber-500 animate-pulse" : "bg-rose-500";
    const locationName = org.county_council_name ? `${org.county_council_name}${org.region_name ? `, ${org.region_name}` : ""}` : t("location.nairobi");

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.35, ease: "easeOut" }}
            className="group relative flex flex-col justify-between rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 overflow-hidden"
        >
            <div
                className={cn(
                    "absolute top-0 left-0 right-0 h-1 transition-all duration-300",
                    isAccredited ? "bg-emerald-500 group-hover:h-1.5" : isPending ? "bg-amber-500 group-hover:h-1.5" : "bg-rose-500 group-hover:h-1.5"
                )}
            />

            <div>
                <OrganizationCardHeader
                    org={org}
                    Icon={theme.icon}
                    iconBg={theme.iconBg}
                    statusBadgeClass={statusBadgeClass}
                    statusDotClass={statusDotClass}
                    statusText={statusText}
                    onDelete={onDelete}
                />

                <div className="space-y-2 mb-4">
                    <Link href={`/admin/organizations/${org.id}`} title={org.name} className="block group/title">
                        <h3 className="text-base sm:text-lg font-black font-outfit text-slate-800 group-hover/title:text-primary transition-colors line-clamp-2 leading-snug">
                            {org.name}
                        </h3>
                    </Link>

                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        <span className={cn("text-[11px] font-bold px-2 py-0.5 rounded-md border", theme.badgeBg, theme.badgeText)}>
                            {t.has(`types.${(org.type || "").toLowerCase()}`) ? t(`types.${(org.type || "").toLowerCase()}`) : org.type || "Entity"}
                        </span>
                        <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1 bg-slate-100/90 px-2 py-0.5 rounded-md truncate max-w-[200px]">
                            <MapPin size={11} className="text-slate-400 shrink-0" />
                            <span className="truncate">{locationName}</span>
                        </span>
                    </div>
                </div>

                <OrganizationCardMetrics org={org} />
            </div>

            <div className="pt-3 border-t border-slate-100">
                <Link
                    href={`/admin/organizations/${org.id}`}
                    className="w-full py-2.5 px-4 bg-slate-50 hover:bg-primary text-slate-700 hover:text-white border border-slate-200 hover:border-primary rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-2xs hover:shadow-md hover:shadow-primary/20 transition-all duration-300 group/btn"
                >
                    <span>{t("viewRegistry")}</span>
                    <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
            </div>
        </motion.div>
    );
}
