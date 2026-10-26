"use client";

import { Building2, MapPin, Mail, Phone, Calendar, FileText } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface OrganizationCardProps {
  org: any;
}

export function OrganizationCard({ org }: OrganizationCardProps) {
  const t = useTranslations("Dashboard.portal.organizationsPage");

  return (
    <Link
      href={`/portal/organizations/${org.id}`}
      className="block bg-white border border-border/50 overflow-hidden hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all group rounded-[16px] relative"
    >
      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 pointer-events-none">
        <Building2 size={120} />
      </div>

      <div className="p-8 relative z-10 flex flex-col h-full">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary shrink-0 shadow-inner border border-primary/10">
            <Building2 size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-800 leading-tight tracking-tight group-hover:text-primary transition-colors">
              {org.name}
            </h3>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mt-1">{org.type}</p>
          </div>
        </div>

        <div className="space-y-4 flex-1">
          {org.registration_number && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0"><FileText size={14} /></div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t("regNo")}</p>
                <p className="text-sm font-semibold text-slate-700">{org.reg_number}</p>
              </div>
            </div>
          )}

          {org.county && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0"><MapPin size={14} /></div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t("location")}</p>
                <p className="text-sm font-semibold text-slate-700">{org.county_council_name}</p>
              </div>
            </div>
          )}

          {(org.email || org.phone) && (
            <div className="flex flex-col gap-2 pt-2 border-t border-border/50">
              {org.email && (
                <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                  <Mail size={14} className="text-slate-400" />{org.email}
                </div>
              )}
              {org.phone && (
                <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                  <Phone size={14} className="text-slate-400" />{org.phone}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-[11px] font-bold text-slate-400">
          <div className="flex items-center gap-1.5 uppercase tracking-widest">
            <Calendar size={12} />
            {t("joined")} {new Date(org.created_at || Date.now()).toLocaleDateString()}
          </div>
          <span
            className={cn(
              "px-2.5 py-1 rounded-full text-[9px] uppercase tracking-widest border",
              org.accreditation_status === "Accredited"
                ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                : org.accreditation_status === "Pending"
                ? "bg-amber-50 text-amber-600 border-amber-100"
                : "bg-red-50 text-red-600 border-red-100"
            )}
          >
            {org.accreditation_status === "Accredited"
              ? t("accredited")
              : org.accreditation_status === "Pending"
              ? t("pending")
              : (org.accreditation_status || t("pending"))}
          </span>
        </div>
      </div>
    </Link>
  );
}
