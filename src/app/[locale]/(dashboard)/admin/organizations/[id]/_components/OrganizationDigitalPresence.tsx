"use client";

import { Globe, Phone, Mail, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { OrganizationDetail } from "./types";

interface OrganizationDigitalPresenceProps {
    org: OrganizationDetail;
}

export function OrganizationDigitalPresence({ org }: OrganizationDigitalPresenceProps) {
    const t = useTranslations("Dashboard.admin.organizations.detail");

    return (
        <div className="space-y-4 pt-4 border-t border-border/60">
            <h4 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                {t("digitalPresence")}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-slate-50/50 hover:bg-white hover:border-primary/20 transition-all group">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                            <Globe size={18} className="text-primary/70 group-hover:text-primary transition-colors" />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">{t("website")}</p>
                            <span className="text-sm font-bold text-slate-700 truncate block">
                                {org.website ? org.website.replace(/^https?:\/\//, "").replace(/\/$/, "") : t("notProvided")}
                            </span>
                        </div>
                    </div>
                    {org.website && (
                        <a
                            href={org.website.startsWith("http") ? org.website : `https://${org.website}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 text-primary/40 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors cursor-pointer"
                            title={t("visitWebsite")}
                        >
                            <ExternalLink size={16} />
                        </a>
                    )}
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-slate-50/50 hover:bg-white hover:border-primary/20 transition-all group">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                            <Phone size={18} className="text-primary/70 group-hover:text-primary transition-colors" />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">{t("officialPhone")}</p>
                            <span className="text-sm font-bold text-slate-700 truncate block">{org.phone_number || t("notProvided")}</span>
                        </div>
                    </div>
                    {org.phone_number && (
                        <a href={`tel:${org.phone_number}`} className="p-2 text-primary/40 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors cursor-pointer" title={t("callPhone")}>
                            <ExternalLink size={16} />
                        </a>
                    )}
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-slate-50/50 hover:bg-white hover:border-primary/20 transition-all group">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                            <Mail size={18} className="text-primary/70 group-hover:text-primary transition-colors" />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">{t("officialEmail")}</p>
                            <span className="text-sm font-bold text-slate-700 truncate block">{org.email || t("notProvided")}</span>
                        </div>
                    </div>
                    {org.email && (
                        <a href={`mailto:${org.email}`} className="p-2 text-primary/40 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors cursor-pointer" title={t("sendEmail")}>
                            <ExternalLink size={16} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
