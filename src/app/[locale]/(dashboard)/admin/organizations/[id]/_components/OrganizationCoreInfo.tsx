"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Building2,
    MapPin,
    Globe,
    Phone,
    Mail,
    ExternalLink,
    Edit3,
    Copy,
    Check,
    Navigation
} from "lucide-react";

import { cn } from "@/lib/utils";
import { OrganizationDetail } from "./types";

interface OrganizationCoreInfoProps {
    org: OrganizationDetail;
    canEdit?: boolean;
    onEdit?: () => void;
}

export function OrganizationCoreInfo({ org, canEdit = false, onEdit }: OrganizationCoreInfoProps) {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const handleCopy = (field: string, text: string) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const hasGps = Boolean(org.gps_location && org.gps_location !== "N/A");
    const mapsUrl = hasGps
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(org.gps_location)}`
        : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 sm:p-10 rounded-[24px] bg-white border border-border shadow-xl shadow-slate-200/50 space-y-8 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.02] rounded-full -translate-y-1/2 translate-x-1/2" />

            {/* Header section with Icon, Title, Badges, and Edit Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/5 text-primary rounded-[22px] flex items-center justify-center border border-primary/10 shadow-md shadow-primary/5 shrink-0">
                        <Building2 size={36} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black font-outfit text-primary tracking-tight">
                            Entity Details
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
                        Edit Details
                    </button>
                )}
            </div>

            {/* 4 Key Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                {/* Reg No Card */}
                <div className="p-4 rounded-2xl bg-primary/[0.02] border border-primary/10 space-y-1 relative group hover:border-primary/30 transition-all">
                    <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black uppercase tracking-widest text-foreground/50">
                            Reg No.
                        </p>
                        {org.reg_number && (
                            <button
                                onClick={() => handleCopy("reg", org.reg_number)}
                                className="text-slate-400 hover:text-primary transition-colors cursor-pointer"
                                title="Copy Reg No"
                            >
                                {copiedField === "reg" ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                            </button>
                        )}
                    </div>
                    <p className="text-base font-bold text-primary truncate" title={org.reg_number}>
                        {org.reg_number || "Not assigned"}
                    </p>
                </div>

                {/* PIN No Card */}
                <div className="p-4 rounded-2xl bg-primary/[0.02] border border-primary/10 space-y-1 relative group hover:border-primary/30 transition-all">
                    <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black uppercase tracking-widest text-foreground/50">
                            PIN No.
                        </p>
                        {org.pin_number && (
                            <button
                                onClick={() => handleCopy("pin", org.pin_number)}
                                className="text-slate-400 hover:text-primary transition-colors cursor-pointer"
                                title="Copy PIN"
                            >
                                {copiedField === "pin" ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                            </button>
                        )}
                    </div>
                    <p className="text-base font-bold text-primary truncate font-mono" title={org.pin_number}>
                        {org.pin_number || "Not assigned"}
                    </p>
                </div>

                {/* Location Card */}
                <div className="p-4 rounded-2xl bg-primary/[0.02] border border-primary/10 space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/50">
                        Jurisdiction
                    </p>
                    <p className="text-base font-bold text-primary flex items-center gap-1.5 truncate" title={org.county_council_name}>
                        <MapPin size={14} className="text-primary/60 shrink-0" />
                        <span className="truncate">{org.county_council_name || "Unassigned"}</span>
                    </p>
                    {org.region_name && (
                        <p className="text-[10px] text-slate-400 font-semibold truncate pl-5">
                            {org.region_name} Region
                        </p>
                    )}
                </div>

                {/* GPS Location Card */}
                <div className="p-4 rounded-2xl bg-primary/[0.02] border border-primary/10 space-y-1">
                    <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black uppercase tracking-widest text-foreground/50">
                            GPS Coordinates
                        </p>
                        {mapsUrl && (
                            <a
                                href={mapsUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-400 hover:text-primary transition-colors"
                                title="Open in Google Maps"
                            >
                                <Navigation size={12} />
                            </a>
                        )}
                    </div>
                    <p className="text-base font-bold text-primary truncate font-mono" title={org.gps_location}>
                        {hasGps ? org.gps_location : "N/A"}
                    </p>
                </div>
            </div>

            {/* Digital Presence Section */}
            <div className="space-y-4 pt-4 border-t border-border/60">
                <h4 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    Digital Presence &amp; Communications
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Website */}
                    <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-slate-50/50 hover:bg-white hover:border-primary/20 transition-all group">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                                <Globe size={18} className="text-primary/70 group-hover:text-primary transition-colors" />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Website</p>
                                <span className="text-sm font-bold text-slate-700 truncate block">
                                    {org.website ? org.website.replace(/^https?:\/\//, '').replace(/\/$/, '') : "Not provided"}
                                </span>
                            </div>
                        </div>
                        {org.website && (
                            <a
                                href={org.website.startsWith('http') ? org.website : `https://${org.website}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 text-primary/40 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors cursor-pointer"
                                title="Visit Website"
                            >
                                <ExternalLink size={16} />
                            </a>
                        )}
                    </div>

                    {/* Phone */}
                    <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-slate-50/50 hover:bg-white hover:border-primary/20 transition-all group">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                                <Phone size={18} className="text-primary/70 group-hover:text-primary transition-colors" />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Official Phone</p>
                                <span className="text-sm font-bold text-slate-700 truncate block">
                                    {org.phone_number || "Not provided"}
                                </span>
                            </div>
                        </div>
                        {org.phone_number && (
                            <a
                                href={`tel:${org.phone_number}`}
                                className="p-2 text-primary/40 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors cursor-pointer"
                                title="Call Phone"
                            >
                                <ExternalLink size={16} />
                            </a>
                        )}
                    </div>

                    {/* Email */}
                    <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-slate-50/50 hover:bg-white hover:border-primary/20 transition-all group">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                                <Mail size={18} className="text-primary/70 group-hover:text-primary transition-colors" />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Official Email</p>
                                <span className="text-sm font-bold text-slate-700 truncate block">
                                    {org.email || "Not provided"}
                                </span>
                            </div>
                        </div>
                        {org.email && (
                            <a
                                href={`mailto:${org.email}`}
                                className="p-2 text-primary/40 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors cursor-pointer"
                                title="Send Email"
                            >
                                <ExternalLink size={16} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

