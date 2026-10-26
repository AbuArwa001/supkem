"use client";

import { Settings, Loader2 } from "lucide-react";
import { ServiceItem } from "./types";
import { useTranslations, useLocale } from "next-intl";
import { ServiceTableRow } from "./ServiceTableRow";

interface ServicesTableProps {
  services: ServiceItem[];
  loading: boolean;
  onEdit: (item: ServiceItem) => void;
  onDelete: (id: string) => void;
}

export function ServicesTable({ services, loading, onEdit, onDelete }: ServicesTableProps) {
  const t = useTranslations("Dashboard.admin.services.table");
  const isAr = useLocale() === "ar";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="bg-white border border-border rounded-[16px] overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left rtl:text-right">
          <thead className="bg-primary/[0.02] border-b border-border">
            <tr className="text-xs font-bold text-foreground/40 uppercase tracking-widest">
              <th className="px-8 py-5 text-start">{t("details")}</th>
              <th className="px-8 py-5 text-start hidden md:table-cell">{t("category")}</th>
              <th className="px-8 py-5 text-start hidden xl:table-cell">{t("documentType")}</th>
              <th className="px-8 py-5 text-start hidden sm:table-cell">{t("fee")}</th>
              <th className="px-8 py-5 text-start hidden lg:table-cell">{t("status")}</th>
              <th className="px-8 py-5 text-end">{t("actions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {services.map((service) => (
              <ServiceTableRow
                key={service.id}
                service={service}
                isAr={isAr}
                t={t}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={6} className="px-8 py-20 text-center">
                  <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <Settings className="text-primary/20" size={40} />
                  </div>
                  <p className="text-foreground/40 font-bold">{t("noServices")}</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
