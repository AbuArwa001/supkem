"use client";

import { Link } from "@/i18n/routing";
import { MoreVertical, Copy, Mail, Phone, ExternalLink, Shield, Trash2 } from "lucide-react";
import { Organization } from "./types";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface OrganizationDropdownMenuProps {
    org: Organization;
    onDelete?: (org: Organization) => void;
}

export function OrganizationDropdownMenu({ org, onDelete }: OrganizationDropdownMenuProps) {
    const t = useTranslations("Dashboard.admin.organizations");

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${label} ${t("actions.copied")}`);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer outline-none">
                <MoreVertical size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 rounded-xl p-1.5 shadow-lg border-slate-200">
                <DropdownMenuLabel className="text-xs font-bold text-slate-500 px-2 py-1 truncate">{org.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={`/admin/organizations/${org.id}`} className="flex items-center gap-2 px-2.5 py-2 text-xs font-semibold text-slate-700 hover:text-primary rounded-lg cursor-pointer">
                        <ExternalLink size={14} className="text-slate-400" />
                        {t("actions.viewDetails")}
                    </Link>
                </DropdownMenuItem>
                {org.reg_number && (
                    <DropdownMenuItem onClick={() => copyToClipboard(org.reg_number!, "Reg No.")} className="flex items-center gap-2 px-2.5 py-2 text-xs font-semibold text-slate-700 hover:text-primary rounded-lg cursor-pointer">
                        <Copy size={14} className="text-slate-400" />
                        {t("actions.copyReg")}: {org.reg_number}
                    </DropdownMenuItem>
                )}
                {org.pin_number && (
                    <DropdownMenuItem onClick={() => copyToClipboard(org.pin_number!, "PIN")} className="flex items-center gap-2 px-2.5 py-2 text-xs font-semibold text-slate-700 hover:text-primary rounded-lg cursor-pointer">
                        <Shield size={14} className="text-slate-400" />
                        {t("actions.copyPin")}: {org.pin_number}
                    </DropdownMenuItem>
                )}
                {org.email && (
                    <DropdownMenuItem asChild>
                        <a href={`mailto:${org.email}`} className="flex items-center gap-2 px-2.5 py-2 text-xs font-semibold text-slate-700 hover:text-primary rounded-lg cursor-pointer">
                            <Mail size={14} className="text-slate-400" />
                            {t("actions.sendEmail")}
                        </a>
                    </DropdownMenuItem>
                )}
                {org.phone_number && (
                    <DropdownMenuItem asChild>
                        <a href={`tel:${org.phone_number}`} className="flex items-center gap-2 px-2.5 py-2 text-xs font-semibold text-slate-700 hover:text-primary rounded-lg cursor-pointer">
                            <Phone size={14} className="text-slate-400" />
                            {t("actions.call")}
                        </a>
                    </DropdownMenuItem>
                )}
                {onDelete && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onDelete(org)} className="flex items-center gap-2 px-2.5 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer">
                            <Trash2 size={14} className="text-rose-500" />
                            {t("actions.delete")}
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
