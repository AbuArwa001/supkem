"use client";

import { useState } from "react";
import { MapPin, Copy, Check, Navigation } from "lucide-react";
import { useTranslations } from "next-intl";
import { OrganizationDetail } from "./types";

interface OrganizationRegistryCardsProps {
    org: OrganizationDetail;
}

export function OrganizationRegistryCards({ org }: OrganizationRegistryCardsProps) {
    const t = useTranslations("Dashboard.admin.organizations.detail");
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            <div className="p-4 rounded-2xl bg-primary/[0.02] border border-primary/10 space-y-1 relative group hover:border-primary/30 transition-all">
                <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/50">{t("regNo")}</p>
                    {org.reg_number && (
                        <button onClick={() => handleCopy("reg", org.reg_number)} className="text-slate-400 hover:text-primary transition-colors cursor-pointer" title={t("copyRegNo")}>
                            {copiedField === "reg" ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                        </button>
                    )}
                </div>
                <p className="text-base font-bold text-primary truncate" title={org.reg_number}>{org.reg_number || t("notAssigned")}</p>
            </div>

            <div className="p-4 rounded-2xl bg-primary/[0.02] border border-primary/10 space-y-1 relative group hover:border-primary/30 transition-all">
                <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/50">{t("pinNo")}</p>
                    {org.pin_number && (
                        <button onClick={() => handleCopy("pin", org.pin_number)} className="text-slate-400 hover:text-primary transition-colors cursor-pointer" title={t("copyPin")}>
                            {copiedField === "pin" ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                        </button>
                    )}
                </div>
                <p className="text-base font-bold text-primary truncate font-mono" title={org.pin_number}>{org.pin_number || t("notAssigned")}</p>
            </div>

            <div className="p-4 rounded-2xl bg-primary/[0.02] border border-primary/10 space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/50">{t("jurisdiction")}</p>
                <p className="text-base font-bold text-primary flex items-center gap-1.5 truncate" title={org.county_council_name}>
                    <MapPin size={14} className="text-primary/60 shrink-0" />
                    <span className="truncate">{org.county_council_name || t("notAssigned")}</span>
                </p>
                {org.region_name && (
                    <p className="text-[10px] text-slate-400 font-semibold truncate ps-5">{org.region_name} {t("region")}</p>
                )}
            </div>

            <div className="p-4 rounded-2xl bg-primary/[0.02] border border-primary/10 space-y-1">
                <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/50">{t("gpsCoordinates")}</p>
                    {mapsUrl && (
                        <a href={mapsUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-primary transition-colors" title={t("openMaps")}>
                            <Navigation size={12} />
                        </a>
                    )}
                </div>
                <p className="text-base font-bold text-primary truncate font-mono" title={org.gps_location}>{hasGps ? org.gps_location : "N/A"}</p>
            </div>
        </div>
    );
}
