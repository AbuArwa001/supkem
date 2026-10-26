"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ApplicationItem, ApplicationsTableProps } from "./applicationsTable/applicationsTableTypes";
import { filterApplications, getInitials } from "./applicationsTable/applicationsTableUtils";
import { ApplicationsFilterControls } from "./applicationsTable/ApplicationsFilterControls";
import { ApplicationMobileCard } from "./applicationsTable/ApplicationMobileCard";
import { ApplicationTableRow } from "./applicationsTable/ApplicationTableRow";

export type { ApplicationItem as Application, ApplicationsTableProps };

export const ApplicationsTable = ({ applications }: ApplicationsTableProps) => {
  const t = useTranslations("Dashboard.admin.tables");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "Approved": return t("statusLabels.approved");
      case "Rejected": return t("statusLabels.rejected");
      default: return t("statusLabels.pending");
    }
  };

  const filteredApps = filterApplications(applications, filterStatus, searchTerm) as ApplicationItem[];

  return (
    <div className="xl:col-span-2 space-y-5">
      <ApplicationsFilterControls
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="bg-white border border-slate-200/80 rounded-[1.75rem] sm:rounded-[2.25rem] overflow-hidden shadow-xs">
        <div className="block md:hidden divide-y divide-slate-100">
          {filteredApps.map((app) => (
            <ApplicationMobileCard
              key={app.id}
              app={app}
              statusLabel={getStatusLabel(app.status)}
              initials={getInitials(app.organization_name)}
            />
          ))}
          {filteredApps.length === 0 && (
            <div className="px-6 py-12 text-center text-slate-400 font-bold uppercase text-xs tracking-wider">
              {t("empty")}
            </div>
          )}
        </div>

        <div className="hidden md:block overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 md:px-7 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t("appId")}</th>
                <th className="px-6 md:px-7 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t("orgDetail")}</th>
                <th className="px-6 md:px-7 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t("status")}</th>
                <th className="px-6 md:px-7 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">{t("activity")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApps.map((app) => (
                <ApplicationTableRow
                  key={app.id}
                  app={app}
                  statusLabel={getStatusLabel(app.status)}
                  initials={getInitials(app.organization_name)}
                />
              ))}
              {filteredApps.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-14 text-center text-slate-400 font-bold uppercase text-xs tracking-wider">
                    {t("empty")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
