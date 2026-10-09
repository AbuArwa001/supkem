"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import {
    MapPin,
    ChevronRight,
    MoreVertical,
    FileText,
    Award,
    Copy,
    Mail,
    Phone,
    ExternalLink,
    CheckCircle2,
    Clock,
    AlertTriangle,
    Shield,
    Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Organization } from "./types";
import { useTranslations } from "next-intl";
import { getOrgTypeTheme } from "./orgUtils";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface OrganizationCardProps {
    org: Organization;
    index: number;
    viewMode?: "grid" | "list";
    onDelete?: (org: Organization) => void;
}

export function OrganizationCard({ org, index, onDelete }: OrganizationCardProps) {
    const t = useTranslations("Dashboard.admin.organizations");
    const theme = getOrgTypeTheme(org.type);
    const Icon = theme.icon;

    const isAccredited = org.accreditation_status === "Accredited";
    const isPending = org.accreditation_status === "Pending" || !org.accreditation_status;
    const isSuspended = org.accreditation_status === "Suspended";
    const statusText = org.accreditation_status || "Pending";

    const statusBadgeClass = isAccredited
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : isPending
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-rose-50 text-rose-700 border-rose-200";

    const statusDotClass = isAccredited
        ? "bg-emerald-500"
        : isPending
        ? "bg-amber-500 animate-pulse"
        : "bg-rose-500";

    const StatusIcon = isAccredited ? CheckCircle2 : isPending ? Clock : AlertTriangle;

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${label} ${t("actions.copied")}`);
    };

    const locationName = org.county_council_name 
        ? `${org.county_council_name}${org.region_name ? `, ${org.region_name}` : ""}`
        : t("location.nairobi");

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.35, ease: "easeOut" }}
            className={cn(
                "group relative flex flex-col justify-between rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 overflow-hidden"
            )}
        >
            {/* Top Accent Line based on status */}
            <div
                className={cn(
                    "absolute top-0 left-0 right-0 h-1 transition-all duration-300",
                    isAccredited
                        ? "bg-emerald-500 group-hover:h-1.5"
                        : isPending
                        ? "bg-amber-500 group-hover:h-1.5"
                        : "bg-rose-500 group-hover:h-1.5"
                )}
            />

            <div>
                {/* Header: Icon, Status Pill & Quick Dropdown */}
                <div className="flex items-start justify-between gap-3 mb-4">
                    <div
                        className={cn(
                            "w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 border border-black/5 transition-all duration-300 shadow-2xs group-hover:scale-105",
                            theme.iconBg
                        )}
                    >
                        <Icon size={24} />
                    </div>

                    <div className="flex items-center gap-2">
                        <span
                            className={cn(
                                "inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider rounded-lg border shadow-2xs",
                                statusBadgeClass
                            )}
                        >
                            <span className={cn("w-1.5 h-1.5 rounded-full", statusDotClass)} />
                            {t.has(`filters.${statusText.toLowerCase()}`)
                                ? t(`filters.${statusText.toLowerCase()}`)
                                : statusText}
                        </span>

                        <DropdownMenu>
                            <DropdownMenuTrigger className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer outline-none">
                                <MoreVertical size={16} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-52 rounded-xl p-1.5 shadow-lg border-slate-200">
                                <DropdownMenuLabel className="text-xs font-bold text-slate-500 px-2 py-1">
                                    {org.name}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link
                                        href={`/admin/organizations/${org.id}`}
                                        className="flex items-center gap-2 px-2.5 py-2 text-xs font-semibold text-slate-700 hover:text-primary rounded-lg cursor-pointer"
                                    >
                                        <ExternalLink size={14} className="text-slate-400" />
                                        {t("actions.viewDetails")}
                                    </Link>
                                </DropdownMenuItem>
                                {org.reg_number && (
                                    <DropdownMenuItem
                                        onClick={() => copyToClipboard(org.reg_number!, "Reg No.")}
                                        className="flex items-center gap-2 px-2.5 py-2 text-xs font-semibold text-slate-700 hover:text-primary rounded-lg cursor-pointer"
                                    >
                                        <Copy size={14} className="text-slate-400" />
                                        {t("actions.copyReg")}: {org.reg_number}
                                    </DropdownMenuItem>
                                )}
                                {org.pin_number && (
                                    <DropdownMenuItem
                                        onClick={() => copyToClipboard(org.pin_number!, "PIN")}
                                        className="flex items-center gap-2 px-2.5 py-2 text-xs font-semibold text-slate-700 hover:text-primary rounded-lg cursor-pointer"
                                    >
                                        <Shield size={14} className="text-slate-400" />
                                        {t("actions.copyPin")}: {org.pin_number}
                                    </DropdownMenuItem>
                                )}
                                {org.email && (
                                    <DropdownMenuItem asChild>
                                        <a
                                            href={`mailto:${org.email}`}
                                            className="flex items-center gap-2 px-2.5 py-2 text-xs font-semibold text-slate-700 hover:text-primary rounded-lg cursor-pointer"
                                        >
                                            <Mail size={14} className="text-slate-400" />
                                            {t("actions.sendEmail")}
                                        </a>
                                    </DropdownMenuItem>
                                )}
                                {org.phone_number && (
                                    <DropdownMenuItem asChild>
                                        <a
                                            href={`tel:${org.phone_number}`}
                                            className="flex items-center gap-2 px-2.5 py-2 text-xs font-semibold text-slate-700 hover:text-primary rounded-lg cursor-pointer"
                                        >
                                            <Phone size={14} className="text-slate-400" />
                                            {t("actions.call")}
                                        </a>
                                    </DropdownMenuItem>
                                )}
                                {onDelete && (
                                    <>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() => onDelete(org)}
                                            className="flex items-center gap-2 px-2.5 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer"
                                        >
                                            <Trash2 size={14} className="text-rose-500" />
                                            {t("actions.delete")}
                                        </DropdownMenuItem>
                                    </>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Organization Title & Type / Location Tags */}
                <div className="space-y-2 mb-4">
                    <Link
                        href={`/admin/organizations/${org.id}`}
                        title={org.name}
                        className="block group/title"
                    >
                        <h3 className="text-base sm:text-lg font-black font-outfit text-slate-800 group-hover/title:text-primary transition-colors line-clamp-2 leading-snug">
                            {org.name}
                        </h3>
                    </Link>

                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        <span
                            className={cn(
                                "text-[11px] font-bold px-2 py-0.5 rounded-md border",
                                theme.badgeBg,
                                theme.badgeText
                            )}
                        >
                            {t.has(`types.${(org.type || "").toLowerCase()}`)
                                ? t(`types.${(org.type || "").toLowerCase()}`)
                                : org.type || "Entity"}
                        </span>
                        <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1 bg-slate-100/90 px-2 py-0.5 rounded-md truncate max-w-[200px]">
                            <MapPin size={11} className="text-slate-400 shrink-0" />
                            <span className="truncate">{locationName}</span>
                        </span>
                    </div>
                </div>

                {/* Identifiers: Reg No & PIN */}
                {(org.reg_number || org.pin_number) && (
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-4">
                        {org.reg_number && (
                            <button
                                type="button"
                                onClick={() => copyToClipboard(org.reg_number!, "Reg No.")}
                                className="flex items-center gap-1 hover:text-primary font-mono font-medium transition-colors cursor-pointer"
                                title="Click to copy Reg No"
                            >
                                <span className="text-slate-400 font-sans text-[10px] uppercase font-bold">Reg:</span>
                                <span>{org.reg_number}</span>
                                <Copy size={11} className="text-slate-400 hover:text-primary shrink-0" />
                            </button>
                        )}
                        {org.reg_number && org.pin_number && <span className="text-slate-300">•</span>}
                        {org.pin_number && (
                            <button
                                type="button"
                                onClick={() => copyToClipboard(org.pin_number!, "PIN")}
                                className="flex items-center gap-1 hover:text-primary font-mono font-medium transition-colors cursor-pointer"
                                title="Click to copy PIN"
                            >
                                <span className="text-slate-400 font-sans text-[10px] uppercase font-bold">PIN:</span>
                                <span>{org.pin_number}</span>
                                <Copy size={11} className="text-slate-400 hover:text-primary shrink-0" />
                            </button>
                        )}
                    </div>
                )}

                {/* Activity Metric Cards (Applications & Certificates) */}
                <div className="grid grid-cols-2 gap-2.5 pt-1 mb-5">
                    <div className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100/80 p-2.5 rounded-xl border border-slate-100 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <FileText size={15} />
                        </div>
                        <div>
                            <p className="text-base font-black text-slate-800 leading-none">
                                {org.apps_count || 0}
                            </p>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-1">
                                {t("apps")}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100/80 p-2.5 rounded-xl border border-slate-100 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                            <Award size={15} />
                        </div>
                        <div>
                            <p className="text-base font-black text-slate-800 leading-none">
                                {org.certs_count || 0}
                            </p>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-1">
                                {t("certs")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Footer */}
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
