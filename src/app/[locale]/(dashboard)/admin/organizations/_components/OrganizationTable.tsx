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

interface OrganizationTableProps {
    organizations: Organization[];
    onDelete?: (org: Organization) => void;
}

export function OrganizationTable({ organizations, onDelete }: OrganizationTableProps) {
    const t = useTranslations("Dashboard.admin.organizations");

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${label} ${t("actions.copied")}`);
    };

    return (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-black uppercase tracking-wider text-slate-500">
                            <th className="py-4 px-6">Organization</th>
                            <th className="py-4 px-4">Status</th>
                            <th className="py-4 px-4">Location</th>
                            <th className="py-4 px-4">Reg No / PIN</th>
                            <th className="py-4 px-4 text-center">Activity</th>
                            <th className="py-4 px-6 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {organizations.map((org, index) => {
                            const theme = getOrgTypeTheme(org.type);
                            const Icon = theme.icon;

                            const isAccredited = org.accreditation_status === "Accredited";
                            const isPending = org.accreditation_status === "Pending" || !org.accreditation_status;
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

                            const locationName = org.county_council_name
                                ? `${org.county_council_name}${org.region_name ? `, ${org.region_name}` : ""}`
                                : t("location.nairobi");

                            return (
                                <motion.tr
                                    key={org.id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: Math.min(index * 0.03, 0.25), duration: 0.25 }}
                                    className="hover:bg-slate-50/80 transition-colors group"
                                >
                                    {/* Organization Name & Type */}
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3.5">
                                            <div
                                                className={cn(
                                                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-black/5 transition-colors",
                                                    theme.iconBg
                                                )}
                                            >
                                                <Icon size={18} />
                                            </div>
                                            <div className="min-w-0">
                                                <Link
                                                    href={`/admin/organizations/${org.id}`}
                                                    className="font-bold text-slate-800 hover:text-primary transition-colors block truncate max-w-xs md:max-w-md"
                                                >
                                                    {org.name}
                                                </Link>
                                                <span
                                                    className={cn(
                                                        "inline-block text-[10px] font-bold px-1.5 py-0.5 rounded border mt-0.5",
                                                        theme.badgeBg,
                                                        theme.badgeText
                                                    )}
                                                >
                                                    {t.has(`types.${(org.type || "").toLowerCase()}`)
                                                        ? t(`types.${(org.type || "").toLowerCase()}`)
                                                        : org.type || "Entity"}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Status Badge */}
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        <span
                                            className={cn(
                                                "inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider rounded-lg border",
                                                statusBadgeClass
                                            )}
                                        >
                                            <span className={cn("w-1.5 h-1.5 rounded-full", statusDotClass)} />
                                            {t.has(`filters.${statusText.toLowerCase()}`)
                                                ? t(`filters.${statusText.toLowerCase()}`)
                                                : statusText}
                                        </span>
                                    </td>

                                    {/* Location */}
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                                            <MapPin size={13} className="text-slate-400 shrink-0" />
                                            <span className="truncate max-w-[160px]">{locationName}</span>
                                        </div>
                                    </td>

                                    {/* Reg No / PIN */}
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        <div className="flex flex-col gap-0.5 text-xs font-mono text-slate-600">
                                            {org.reg_number && (
                                                <button
                                                    type="button"
                                                    onClick={() => copyToClipboard(org.reg_number!, "Reg No.")}
                                                    className="flex items-center gap-1 hover:text-primary transition-colors text-left cursor-pointer"
                                                >
                                                    <span className="text-[10px] text-slate-400 font-sans uppercase font-bold">Reg:</span>
                                                    <span>{org.reg_number}</span>
                                                    <Copy size={10} className="text-slate-400 hover:text-primary" />
                                                </button>
                                            )}
                                            {org.pin_number && (
                                                <button
                                                    type="button"
                                                    onClick={() => copyToClipboard(org.pin_number!, "PIN")}
                                                    className="flex items-center gap-1 hover:text-primary transition-colors text-left cursor-pointer"
                                                >
                                                    <span className="text-[10px] text-slate-400 font-sans uppercase font-bold">PIN:</span>
                                                    <span>{org.pin_number}</span>
                                                    <Copy size={10} className="text-slate-400 hover:text-primary" />
                                                </button>
                                            )}
                                            {!org.reg_number && !org.pin_number && (
                                                <span className="text-slate-400 italic text-[11px] font-sans">N/A</span>
                                            )}
                                        </div>
                                    </td>

                                    {/* Activity Counts */}
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        <div className="flex items-center justify-center gap-2">
                                            <span
                                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-bold"
                                                title="Applications"
                                            >
                                                <FileText size={12} className="text-primary" />
                                                {org.apps_count || 0}
                                            </span>
                                            <span
                                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-bold"
                                                title="Certificates"
                                            >
                                                <Award size={12} className="text-amber-600" />
                                                {org.certs_count || 0}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td className="py-4 px-6 text-right whitespace-nowrap">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/organizations/${org.id}`}
                                                className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-primary text-slate-700 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs group/btn"
                                            >
                                                <span>{t("viewRegistry")}</span>
                                                <ChevronRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                            </Link>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer outline-none">
                                                    <MoreVertical size={16} />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-52 rounded-xl p-1.5 shadow-lg border-slate-200">
                                                    <DropdownMenuLabel className="text-xs font-bold text-slate-500 px-2 py-1 truncate">
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
                                                            {t("actions.copyReg")}
                                                        </DropdownMenuItem>
                                                    )}
                                                    {org.pin_number && (
                                                        <DropdownMenuItem
                                                            onClick={() => copyToClipboard(org.pin_number!, "PIN")}
                                                            className="flex items-center gap-2 px-2.5 py-2 text-xs font-semibold text-slate-700 hover:text-primary rounded-lg cursor-pointer"
                                                        >
                                                            <Shield size={14} className="text-slate-400" />
                                                            {t("actions.copyPin")}
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
                                    </td>
                                </motion.tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
