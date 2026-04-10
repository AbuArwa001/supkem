"use client";

import { Link } from "@/i18n/routing";
import { ArrowUpRight, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface Application {
  id: string | number;
  display_id: string;
  organization_name: string;
  service_name: string;
  status: string;
  submitted_at: string;
}

interface ApplicationsTableProps {
  applications: Application[];
}

export const ApplicationsTable = ({ applications }: ApplicationsTableProps) => {
  const t = useTranslations("Dashboard.admin.tables");

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "Approved":
        return t("statusLabels.approved");
      case "Rejected":
        return t("statusLabels.rejected");
      default:
        return t("statusLabels.pending");
    }
  };

  return (
    <div className="xl:col-span-2 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl md:text-2xl font-black font-outfit text-slate-900">
          {t("recentApps")}
        </h3>
        <Link
          href="/admin/applications"
          className="text-xs md:text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group whitespace-nowrap"
        >
          {t("viewPipeline")}{" "}
          <ArrowUpRight
            size={16}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </Link>
      </div>

      <div className="bg-white border border-slate-100 rounded-[14px] md:rounded-[16px] overflow-hidden shadow-lg shadow-slate-200/40">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 md:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  {t("appId")}
                </th>
                <th className="px-6 md:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  {t("orgDetail")}
                </th>
                <th className="px-6 md:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  {t("status")}
                </th>
                <th className="px-6 md:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">
                  {t("activity")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.map((app) => (
                <tr
                  key={app.id}
                  className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                >
                  <td className="px-6 md:px-8 py-5 md:py-6">
                    <Link
                      href={`/admin/applications/${app.id}`}
                      className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors"
                    >
                      {app.display_id}
                    </Link>
                  </td>
                  <td className="px-6 md:px-8 py-5 md:py-6">
                    <p className="font-bold text-sm md:text-base text-slate-900">
                      {app.organization_name}
                    </p>
                    <p className="text-[10px] md:text-xs font-semibold text-slate-500 mt-1">
                      {app.service_name}
                    </p>
                  </td>
                  <td className="px-6 md:px-8 py-5 md:py-6">
                    <span
                      className={cn(
                        "px-3 md:px-3.5 py-1 md:py-1.5 rounded-full text-[10px] md:text-[11px] font-bold inline-flex items-center gap-1.5 border",
                        app.status === "Approved"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                          : app.status === "Rejected"
                            ? "bg-red-50 text-red-700 border-red-100"
                            : "bg-amber-50 text-amber-700 border-amber-100",
                      )}
                    >
                      {app.status === "Approved" ? (
                        <CheckCircle2 size={12} />
                      ) : app.status === "Rejected" ? (
                        <AlertCircle size={12} />
                      ) : (
                        <Clock size={12} />
                      )}
                      {getStatusLabel(app.status)}
                    </span>
                  </td>
                  <td className="px-6 md:px-8 py-5 md:py-6 text-xs md:text-sm font-semibold text-slate-500 text-right">
                    {new Date(app.submitted_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-8 py-10 text-center text-slate-400 font-medium"
                  >
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

