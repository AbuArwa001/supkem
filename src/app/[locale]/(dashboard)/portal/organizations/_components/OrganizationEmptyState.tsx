"use client";

import { Link } from "@/i18n/routing";
import { Building2, Plus } from "lucide-react";
import { useTranslations } from "next-intl";

export function OrganizationEmptyState() {
  const t = useTranslations("Dashboard.portal.organizationsPage");

  return (
    <div className="bg-white border border-border/50 rounded-[16px] p-16 text-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
          <Building2 size={40} />
        </div>
        <h3 className="text-xl font-black text-slate-800 font-outfit">{t("noOrgs")}</h3>
        <p className="text-slate-500 font-medium text-sm max-w-sm">{t("noOrgsDesc")}</p>
        <Link
          href="/portal/organizations/new"
          className="mt-6 px-10 py-4 bg-primary text-white rounded-[20px] font-bold shadow-xl shadow-primary/10 hover-lift flex items-center gap-2"
        >
          <Plus size={18} /> {t("registerFirst")}
        </Link>
      </div>
    </div>
  );
}

export function OrganizationSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((skeleton) => (
        <div key={skeleton} className="bg-white border border-border/50 rounded-[16px] p-6 h-64 animate-pulse">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl mb-4" />
          <div className="h-6 w-3/4 bg-slate-100 rounded-lg mb-4" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-slate-50 rounded-lg" />
            <div className="h-4 w-5/6 bg-slate-50 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
