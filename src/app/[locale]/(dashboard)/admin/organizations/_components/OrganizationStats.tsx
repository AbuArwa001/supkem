"use client";

import { motion } from "framer-motion";
import { Building2, CheckCircle2, Clock, AlertTriangle, FileText, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

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

    const cards = [
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
            extraMetric: {
                apps: stats.totalApps,
                certs: stats.totalCerts,
            },
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {cards.map((card, i) => {
                const Icon = card.icon;
                const isSelected = activeStatus === card.id;

                return (
                    <motion.div
                        key={card.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.35 }}
                        onClick={() => onStatusSelect(card.id)}
                        className={cn(
                            "relative overflow-hidden rounded-2xl p-5 md:p-6 bg-linear-to-br transition-all duration-300 cursor-pointer select-none group shadow-sm hover:shadow-lg hover:-translate-y-0.5",
                            card.gradient,
                            isSelected && card.borderActive
                        )}
                    >
                        {/* Subtle background decorative shapes */}
                        <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/5 pointer-events-none group-hover:scale-125 transition-transform duration-500" />
                        <div className="absolute right-6 top-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
                            <Icon size={70} />
                        </div>

                        <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
                            <div className="flex items-center justify-between">
                                <div className={cn("p-2.5 rounded-xl backdrop-blur-xs", card.iconBg)}>
                                    <Icon size={20} />
                                </div>
                                {card.percentage !== undefined && stats.total > 0 ? (
                                    <span className={cn("text-[11px] font-bold px-2 py-0.5 rounded-md", card.badgeClass)}>
                                        {card.percentage}% of total
                                    </span>
                                ) : card.id === "All" ? (
                                    <span className={cn("text-[11px] font-bold px-2 py-0.5 rounded-md", card.badgeClass)}>
                                        Active Registry
                                    </span>
                                ) : (
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/80">
                                        <FileText size={12} /> {stats.totalApps} | <Award size={12} /> {stats.totalCerts}
                                    </div>
                                )}
                            </div>

                            <div>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-3xl font-black font-outfit tracking-tight">
                                        {card.value}
                                    </h3>
                                    <span className="text-xs font-semibold text-white/70">
                                        {card.label}
                                    </span>
                                </div>
                                <p className="text-xs text-white/80 font-medium mt-1 truncate">
                                    {card.desc}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
