"use client";

import { Building2, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import { OrgStatCard, OrgStatCardData } from "./OrgStatCard";

interface OrganizationStatsProps {
    stats: {
        total: number;
        accredited: number;
        pending: number;
        suspended: number;
        totalApps: number;
        totalCerts: number;
    };
    activeStatus: string;
    onStatusSelect: (status: string) => void;
}

export function OrganizationStats({ stats, activeStatus, onStatusSelect }: OrganizationStatsProps) {
    const t = useTranslations("Dashboard.admin.organizations");

    const cards: OrgStatCardData[] = [
        {
            id: "All",
            label: t("stats.totalEntities"),
            desc: t("stats.totalEntitiesDesc"),
            value: stats.total,
            icon: Building2,
            gradient: "from-slate-900 to-slate-800 text-white",
            iconBg: "bg-white/10 text-white",
            badgeClass: "bg-white/20 text-white",
            borderActive: "ring-2 ring-slate-800 ring-offset-2",
        },
        {
            id: "Accredited",
            label: t("stats.accreditedEntities"),
            desc: t("stats.accreditedDesc"),
            value: stats.accredited,
            percentage: stats.total > 0 ? Math.round((stats.accredited / stats.total) * 100) : 0,
            icon: CheckCircle2,
            gradient: "from-emerald-600 to-teal-700 text-white",
            iconBg: "bg-white/15 text-emerald-100",
            badgeClass: "bg-emerald-500/30 text-emerald-100",
            borderActive: "ring-2 ring-emerald-600 ring-offset-2",
        },
        {
            id: "Pending",
            label: t("stats.pendingEntities"),
            desc: t("stats.pendingDesc"),
            value: stats.pending,
            percentage: stats.total > 0 ? Math.round((stats.pending / stats.total) * 100) : 0,
            icon: Clock,
            gradient: "from-amber-500 to-orange-600 text-white",
            iconBg: "bg-white/15 text-amber-100",
            badgeClass: "bg-amber-400/30 text-amber-100",
            borderActive: "ring-2 ring-amber-500 ring-offset-2",
        },
        {
            id: "Suspended",
            label: t("stats.suspendedEntities"),
            desc: t("stats.suspendedDesc"),
            value: stats.suspended,
            icon: AlertTriangle,
            gradient: "from-rose-600 to-red-700 text-white",
            iconBg: "bg-white/15 text-rose-100",
            badgeClass: "bg-rose-500/30 text-rose-100",
            borderActive: "ring-2 ring-rose-600 ring-offset-2",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {cards.map((card, i) => (
                <OrgStatCard
                    key={card.id}
                    card={card}
                    isSelected={activeStatus === card.id}
                    index={i}
                    stats={stats}
                    onSelect={() => onStatusSelect(card.id)}
                />
            ))}
        </div>
    );
}
