"use client";

import { motion } from "framer-motion";
import { Building2, MapPin, Globe, Phone, Mail, ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";

import { OrganizationDetail } from "./types";

interface OrganizationCoreInfoProps {
    org: OrganizationDetail;
}

export function OrganizationCoreInfo({ org }: OrganizationCoreInfoProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-10 rounded-[32px] bg-white border border-border shadow-xl shadow-slate-200/50 space-y-10 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.02] rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="flex items-center gap-6 relative z-10">
                <div className="w-20 h-20 bg-primary/5 text-primary rounded-[24px] flex items-center justify-center border border-primary/10 shadow-lg shadow-primary/5">
                    <Building2 size={40} />
                </div>
                <div>
                    <h3 className="text-2xl font-black font-outfit text-primary mb-2 tracking-tight">
                        Entity Details
                    </h3>
                    <div className="flex items-center gap-3">
                        <span className="px-4 py-1.5 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                            {org.type}
                        </span>
                        <span className={cn(
                            "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border",
                            org.accreditation_status === "Accredited" ? "bg-green-50 text-green-600 border-green-200" :
                                org.accreditation_status === "Pending" ? "bg-amber-50 text-amber-600 border-amber-200" :
                                    "bg-red-50 text-red-600 border-red-200"
                        )}>
                            {org.accreditation_status || "Pending"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                <div className="space-y-1.5 p-5 rounded-2xl bg-primary/[0.02] border border-primary/5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40">
                        Reg No.
                    </p>
                    <p
                        className="text-base font-bold text-primary truncate"
                        title={org.reg_number}
                    >
                        {org.reg_number}
                    </p>
                </div>
                <div className="space-y-1.5 p-5 rounded-2xl bg-primary/[0.02] border border-primary/5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40">
                        PIN No.
                    </p>
                    <p
                        className="text-base font-bold text-primary truncate font-mono"
                        title={org.pin_number}
                    >
                        {org.pin_number}
                    </p>
                </div>
                <div className="space-y-1.5 p-5 rounded-2xl bg-primary/[0.02] border border-primary/5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40">
                        Location
                    </p>
                    <p className="text-base font-bold text-primary flex items-center gap-1.5 truncate">
                        <MapPin size={14} className="text-primary/50" /> {org.county_council_name}
                    </p>
                </div>
                <div className="space-y-1.5 p-5 rounded-2xl bg-primary/[0.02] border border-primary/5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40">
                        GPS Location
                    </p>
                    <p className="text-base font-bold text-primary truncate font-mono">
                        {org.gps_location || "N/A"}
                    </p>
                </div>
            </div>

            <div className="space-y-6 pt-4 border-t border-border/50">
                <h4 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-secondary" /> Digital Presence
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-white hover:border-primary/20 transition-all group">
                        <div className="flex items-center gap-4 overflow-hidden">
                            <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                                <Globe size={18} className="text-primary/60 group-hover:text-primary transition-colors" />
                            </div>
                            <span className="text-sm font-bold text-slate-600 truncate">
                                {org.website ? org.website.replace('https://', '').replace('http://', '') : "Website not provided"}
                            </span>
                        </div>
                        {org.website && (
                            <a href={org.website.startsWith('http') ? org.website : `https://${org.website}`} target="_blank" rel="noreferrer" className="p-2 text-primary/40 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                                <ExternalLink size={16} />
                            </a>
                        )}
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-white hover:border-primary/20 transition-all group">
                        <div className="flex items-center gap-4 overflow-hidden">
                            <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                                <Phone size={18} className="text-primary/60 group-hover:text-primary transition-colors" />
                            </div>
                            <span className="text-sm font-bold text-slate-600 truncate">
                                {org.phone_number || "Phone not provided"}
                            </span>
                        </div>
                        {org.phone_number && (
                            <a href={`tel:${org.phone_number}`} className="p-2 text-primary/40 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                                <ExternalLink size={16} />
                            </a>
                        )}
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-white hover:border-primary/20 transition-all group">
                        <div className="flex items-center gap-4 overflow-hidden">
                            <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                                <Mail size={18} className="text-primary/60 group-hover:text-primary transition-colors" />
                            </div>
                            <span className="text-sm font-bold text-slate-600 truncate">
                                {org.email || "Email not provided"}
                            </span>
                        </div>
                        {org.email && (
                            <a href={`mailto:${org.email}`} className="p-2 text-primary/40 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                                <ExternalLink size={16} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
