"use client";

import { Link } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";
import { Organization } from "./types";
import { useTranslations } from "next-intl";
import { OrganizationDropdownMenu } from "./OrganizationDropdownMenu";

interface OrganizationRowActionsProps {
    org: Organization;
    onDelete?: (org: Organization) => void;
}

export function OrganizationRowActions({ org, onDelete }: OrganizationRowActionsProps) {
    const t = useTranslations("Dashboard.admin.organizations");

    return (
        <div className="flex items-center justify-end gap-2">
            <Link
                href={`/admin/organizations/${org.id}`}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-primary text-slate-700 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs group/btn"
            >
                <span>{t("viewRegistry")}</span>
                <ChevronRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>

            <OrganizationDropdownMenu org={org} onDelete={onDelete} />
        </div>
    );
}
