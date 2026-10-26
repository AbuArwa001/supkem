"use client";

import { motion } from "framer-motion";
import { FileText, Award, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface OrgStatCardData {
    id: string;
    label: string;
    desc: string;
    value: number;
    percentage?: number;
    icon: LucideIcon;
    gradient: string;
    iconBg: string;
    badgeClass: string;
    borderActive: string;
}

interface OrgStatCardProps {
    card: OrgStatCardData;
    isSelected: boolean;
    index: number;
    stats: { total: number; totalApps: number; totalCerts: number };
    onSelect: () => void;
}

export function OrgStatCard({ card, isSelected, index, stats, onSelect }: OrgStatCardProps) {
    const Icon = card.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.35 }}
            onClick={onSelect}
            className={cn(
                "relative overflow-hidden rounded-2xl p-5 md:p-6 bg-linear-to-br transition-all duration-300 cursor-pointer select-none group shadow-sm hover:shadow-lg hover:-translate-y-0.5",
                card.gradient,
                isSelected && card.borderActive
            )}
        >
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
}
