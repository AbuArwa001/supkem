"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Organization } from "./types";
import { useTranslations } from "next-intl";
import { OrganizationDropdownMenu } from "./OrganizationDropdownMenu";

interface OrganizationCardHeaderProps {
    org: Organization;
    Icon: LucideIcon;
    iconBg: string;
    statusBadgeClass: string;
    statusDotClass: string;
    statusText: string;
    onDelete?: (org: Organization) => void;
}

export function OrganizationCardHeader({
    org,
    Icon,
    iconBg,
    statusBadgeClass,
    statusDotClass,
    statusText,
    onDelete,
}: OrganizationCardHeaderProps) {
    const t = useTranslations("Dashboard.admin.organizations");

    return (
        <div className="flex items-start justify-between gap-3 mb-4">
            <div className={cn("w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 border border-black/5 transition-all duration-300 shadow-2xs group-hover:scale-105", iconBg)}>
                <Icon size={24} />
            </div>

            <div className="flex items-center gap-2">
                <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider rounded-lg border shadow-2xs", statusBadgeClass)}>
                    <span className={cn("w-1.5 h-1.5 rounded-full", statusDotClass)} />
                    {t.has(`filters.${statusText.toLowerCase()}`) ? t(`filters.${statusText.toLowerCase()}`) : statusText}
                </span>

                <OrganizationDropdownMenu org={org} onDelete={onDelete} />
            </div>
        </div>
    );
}
