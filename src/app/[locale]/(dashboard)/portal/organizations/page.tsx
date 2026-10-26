"use client";

import useSWR from "swr";
import { AlertCircle, Plus } from "lucide-react";
import api from "@/lib/api";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { OrganizationCard } from "./_components/OrganizationCard";
import { OrganizationEmptyState, OrganizationSkeleton } from "./_components/OrganizationEmptyState";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function OrganizationsPage() {
  const t = useTranslations("Dashboard.portal.organizationsPage");
  const { data, error, isLoading } = useSWR("/organizations/organizations/", fetcher);
  const organizations = Array.isArray(data) ? data : data?.results || [];

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-primary font-outfit leading-tight">
            {t("title")}
          </h2>
          <p className="text-slate-500 font-medium mt-2 text-sm max-w-md">{t("subtitle")}</p>
        </div>
        <Link
          href="/portal/organizations/new"
          className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all hover-lift"
        >
          <Plus size={20} />
          <span>{t("registerNew")}</span>
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600">
          <AlertCircle size={20} />
          <span className="font-semibold text-sm">{t("loadFailed")}</span>
        </div>
      )}

      {isLoading ? (
        <OrganizationSkeleton />
      ) : organizations.length === 0 ? (
        <OrganizationEmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {organizations.map((org: any) => (
            <OrganizationCard key={org.id} org={org} />
          ))}
        </div>
      )}
    </div>
  );
}
