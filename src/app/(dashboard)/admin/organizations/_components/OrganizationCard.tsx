"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import { Building2, MapPin, ChevronRight, MoreVertical } from "lucide-react";

import { cn } from "@/lib/utils";

import { Organization } from "./types";

interface OrganizationCardProps {
    org: Organization;
    index: number;
    viewMode: "grid" | "list";
}

export function OrganizationCard({ org, index, viewMode }: OrganizationCardProps) {
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
                "p-8 rounded-[20px] bg-white border border-border hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all group relative",
                viewMode === "list" && "flex items-center justify-between"
            )}
        >
            <div className={cn("flex items-start gap-6", viewMode === "list" && "flex-1")}>
                <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all border border-primary/10 group-hover:border-primary">
                    <Building2 size={32} />
                </div>
                <div className="space-y-4 flex-1">
                    <div>
                        <div className="flex items-start justify-between gap-4">
                            <h4 className="text-xl font-bold font-outfit text-primary group-hover:underline cursor-pointer leading-tight">
                                {org.name}
                            </h4>
                            <span className={cn(
                                "px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full shrink-0 border",
                                statusBadgeClass
                            )}>
                                {statusText}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-secondary">{org.type}</span>
                            <span className="text-foreground/20">•</span>
                            <p className="text-xs font-bold text-foreground/40 flex items-center gap-1">
                                <MapPin size={10} /> Nairobi, Kenya
                            </p>
                        </div>
                    </div>

                    {viewMode === "grid" && (
                        <div className="flex gap-4 pt-2 border-t border-border/50">
                            <div className="text-center bg-primary/[0.02] p-3 rounded-2xl flex-1 border border-primary/5 hover:bg-primary/5 transition-colors">
                                <p className="text-lg font-black text-primary">
                                    {formatCount(org.apps_count)}
                                </p>
                                <p className="text-[10px] uppercase font-bold text-foreground/40 tracking-widest leading-none">Apps</p>
                            </div>
                            <div className="text-center bg-secondary/[0.02] p-3 rounded-2xl flex-1 border border-secondary/5 hover:bg-secondary/5 transition-colors">
                                <p className="text-lg font-black text-secondary">
                                    {formatCount(org.certs_count)}
                                </p>
                                <p className="text-[10px] uppercase font-bold text-foreground/40 tracking-widest leading-none">Certs</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className={cn(
                "flex items-center gap-4", 
                viewMode === "grid" ? "mt-8 pt-6 border-t border-border/50" : "ml-8 border-l border-border/50 pl-8"
            )}>
                <Link
                    href={`/admin/organizations/${org.id}`}
                    className="flex-1 px-6 py-4 bg-primary/[0.03] text-primary rounded-2xl font-bold text-sm hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                >
                    View Registry <ChevronRight size={16} />
                </Link>
                <button className="p-4 bg-white border border-border rounded-2xl text-foreground/40 hover:text-primary hover:border-primary/20 transition-all">
                    <MoreVertical size={20} />
                </button>
            </div>
        </motion.div>
    );
}
