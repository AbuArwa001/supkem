"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import {
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  Search,
  Building2,
  FileText,
  ChevronRight,
} from "lucide-react";
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

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  const filteredApps = applications.filter((app) => {
    // Status filter
    if (filterStatus === "approved" && app.status !== "Approved") return false;
    if (filterStatus === "review" && app.status !== "Under Review") return false;
    if (filterStatus === "pending" && !["Submitted", "Pending"].includes(app.status)) return false;

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchName = app.organization_name?.toLowerCase().includes(term);
      const matchService = app.service_name?.toLowerCase().includes(term);
      const matchId = app.display_id?.toLowerCase().includes(term);
      return matchName || matchService || matchId;
    }

    return true;
  });

  const getInitials = (name: string) => {
    if (!name) return "AP";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="xl:col-span-2 space-y-5">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-black font-outfit text-slate-900 tracking-tight">
            {t("recentApps")}
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Real-time pipeline of incoming submissions and certification requests
          </p>
        </div>

        <Link
          href="/admin/applications"
          className="text-xs font-black uppercase tracking-wider text-emerald-800 hover:text-emerald-900 flex items-center gap-1.5 group shrink-0"
        >
          {t("viewPipeline")}
          <ArrowUpRight
            size={16}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </Link>
      </div>

      {/* Control Bar: Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Status Filter Chips */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/60 rounded-2xl overflow-x-auto no-scrollbar">
          {[
            { key: "all", label: "All Submissions" },
            { key: "review", label: "Under Review" },
            { key: "approved", label: "Approved" },
            { key: "pending", label: "Pending" },
          ].map((tab) => {
            const isActive = filterStatus === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setFilterStatus(tab.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-white text-slate-900 shadow-sm font-extrabold"
                    : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute ltr:left-3.5 rtl:right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full ltr:pl-10 rtl:pr-10 pr-3 py-2 text-xs font-semibold rounded-2xl bg-white border border-slate-200/80 shadow-xs focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Table Container: Responsive Card List on Mobile, Table on Desktop */}
      <div className="bg-white border border-slate-200/80 rounded-[1.75rem] sm:rounded-[2.25rem] overflow-hidden shadow-sm">
        {/* Mobile View: Clean Card List */}
        <div className="block md:hidden divide-y divide-slate-100">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <Link
                  href={`/admin/applications/${app.id}`}
                  className="font-black text-sm text-slate-900 hover:text-emerald-700 transition-colors font-mono tracking-tight"
                >
                  {app.display_id}
                </Link>
                <span
                  className={cn(
                    "px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 border shadow-2xs shrink-0",
                    app.status === "Approved"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : app.status === "Rejected"
                        ? "bg-rose-50 text-rose-700 border-rose-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      app.status === "Approved"
                        ? "bg-emerald-500"
                        : app.status === "Rejected"
                          ? "bg-rose-500"
                          : "bg-amber-500 animate-pulse"
                    )}
                  />
                  {getStatusLabel(app.status)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 text-slate-700 text-xs font-black flex items-center justify-center shrink-0">
                  {getInitials(app.organization_name)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-sm text-slate-900 truncate">
                    {app.organization_name}
                  </p>
                  <p className="text-xs font-semibold text-slate-400 truncate flex items-center gap-1 mt-0.5">
                    <FileText size={12} className="shrink-0 text-slate-300" />
                    {app.service_name}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-50 text-xs">
                <span className="font-semibold text-slate-400">
                  {new Date(app.submitted_at).toLocaleDateString()}
                </span>
                <Link
                  href={`/admin/applications/${app.id}`}
                  className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                >
                  Review
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          ))}

          {filteredApps.length === 0 && (
            <div className="px-6 py-12 text-center text-slate-400 font-bold uppercase text-xs tracking-wider">
              {t("empty")}
            </div>
          )}
        </div>

        {/* Desktop View: Full Table */}
        <div className="hidden md:block overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 md:px-7 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  {t("appId")}
                </th>
                <th className="px-6 md:px-7 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  {t("orgDetail")}
                </th>
                <th className="px-6 md:px-7 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  {t("status")}
                </th>
                <th className="px-6 md:px-7 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">
                  {t("activity")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApps.map((app) => (
                <tr
                  key={app.id}
                  className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                >
                  <td className="px-6 md:px-7 py-5">
                    <Link
                      href={`/admin/applications/${app.id}`}
                      className="font-black text-sm text-slate-900 group-hover:text-emerald-700 transition-colors font-mono tracking-tight"
                    >
                      {app.display_id}
                    </Link>
                  </td>
                  <td className="px-6 md:px-7 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 text-slate-700 text-xs font-black flex items-center justify-center shrink-0">
                        {getInitials(app.organization_name)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-slate-900 truncate group-hover:text-emerald-800 transition-colors">
                          {app.organization_name}
                        </p>
                        <p className="text-[11px] font-semibold text-slate-400 truncate flex items-center gap-1 mt-0.5">
                          <FileText size={12} className="shrink-0 text-slate-300" />
                          {app.service_name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 md:px-7 py-5">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 border shadow-xs",
                        app.status === "Approved"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : app.status === "Rejected"
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          app.status === "Approved"
                            ? "bg-emerald-500"
                            : app.status === "Rejected"
                              ? "bg-rose-500"
                              : "bg-amber-500 animate-pulse"
                        )}
                      />
                      {getStatusLabel(app.status)}
                    </span>
                  </td>
                  <td className="px-6 md:px-7 py-5 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <span className="text-xs font-semibold text-slate-400">
                        {new Date(app.submitted_at).toLocaleDateString()}
                      </span>
                      <Link
                        href={`/admin/applications/${app.id}`}
                        className="p-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-400 transition-colors"
                        title="Review Application"
                      >
                        <ChevronRight size={16} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredApps.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-8 py-14 text-center text-slate-400 font-bold uppercase text-xs tracking-wider"
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
