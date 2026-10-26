"use client";

import { FileText, Award, Copy } from "lucide-react";
import { Organization } from "./types";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface OrganizationCardMetricsProps {
    org: Organization;
}

export function OrganizationCardMetrics({ org }: OrganizationCardMetricsProps) {
    const t = useTranslations("Dashboard.admin.organizations");

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${label} ${t("actions.copied")}`);
    };

    return (
        <>
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

            <div className="grid grid-cols-2 gap-2.5 pt-1 mb-5">
                <div className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100/80 p-2.5 rounded-xl border border-slate-100 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <FileText size={15} />
                    </div>
                    <div>
                        <p className="text-base font-black text-slate-800 leading-none">{org.apps_count || 0}</p>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-1">{t("apps")}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100/80 p-2.5 rounded-xl border border-slate-100 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                        <Award size={15} />
                    </div>
                    <div>
                        <p className="text-base font-black text-slate-800 leading-none">{org.certs_count || 0}</p>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-1">{t("certs")}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
