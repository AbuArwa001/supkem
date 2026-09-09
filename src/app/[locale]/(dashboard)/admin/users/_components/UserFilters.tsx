"use client";

import { Search, X, Download, Filter, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export type QuickTab = "all" | "active" | "pending" | "staff";

interface UserFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  quickTab: QuickTab;
  onQuickTabChange: (tab: QuickTab) => void;
  roleFilter: string;
  onRoleFilterChange: (role: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  availableRoles: { id: string; role_name: string }[];
  onResetFilters: () => void;
  isFiltered: boolean;
  onExportCsv: () => void;
  totalCount: number;
}

export const UserFilters = ({
  searchQuery,
  onSearchChange,
  quickTab,
  onQuickTabChange,
  roleFilter,
  onRoleFilterChange,
  statusFilter,
  onStatusFilterChange,
  availableRoles,
  onResetFilters,
  isFiltered,
  onExportCsv,
  totalCount,
}: UserFiltersProps) => {
  const t = useTranslations("Dashboard.admin.users");

  const tabs: { key: QuickTab; label: string }[] = [
    { key: "all", label: t("filters.all") },
    { key: "active", label: t("filters.active") },
    { key: "pending", label: t("filters.pending") },
    { key: "staff", label: t("filters.staff") },
  ];

  return (
    <div className="space-y-4">
      {/* Top row: Quick Tabs & Export */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Quick Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/60 rounded-2xl overflow-x-auto max-w-full no-scrollbar">
          {tabs.map((tab) => {
            const isActive = quickTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => onQuickTabChange(tab.key)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
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

        {/* Export Button */}
        <Button
          type="button"
          variant="outline"
          onClick={onExportCsv}
          className="rounded-2xl border-slate-200 hover:bg-slate-50 font-black text-xs uppercase tracking-widest h-11 px-5 flex items-center gap-2 text-slate-700 shadow-sm"
        >
          <Download className="h-4 w-4 text-slate-500" />
          {t("exportCsv")}
        </Button>
      </div>

      {/* Main search and dropdowns bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Search input (spans 6 or 7 cols) */}
        <div className="relative md:col-span-6 lg:col-span-6 group">
          <Search className="absolute ltr:left-5 rtl:right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
          <Input
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="ltr:pl-13 rtl:pr-13 ltr:pr-10 rtl:pl-10 h-13 rounded-2xl border border-slate-200 bg-white shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm font-semibold text-slate-800 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute ltr:right-4 rtl:left-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Role Selector */}
        <div className="md:col-span-3 lg:col-span-3">
          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => onRoleFilterChange(e.target.value)}
              className="w-full h-13 rounded-2xl border border-slate-200 bg-white px-4 text-xs font-black uppercase tracking-wider text-slate-700 shadow-sm focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 cursor-pointer"
            >
              <option value="">{t("filters.allRoles")}</option>
              {availableRoles.map((r) => (
                <option key={r.id} value={r.role_name}>
                  {r.role_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Selector */}
        <div className="md:col-span-3 lg:col-span-2">
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="w-full h-13 rounded-2xl border border-slate-200 bg-white px-4 text-xs font-black uppercase tracking-wider text-slate-700 shadow-sm focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 cursor-pointer"
          >
            <option value="">{t("filters.allStatuses")}</option>
            <option value="true">{t("filters.activeStatus")}</option>
            <option value="false">{t("filters.inactiveStatus")}</option>
          </select>
        </div>

        {/* Reset button (if filtered) */}
        {isFiltered && (
          <div className="md:col-span-12 lg:col-span-1 flex items-center">
            <Button
              type="button"
              variant="ghost"
              onClick={onResetFilters}
              title={t("filters.clear")}
              className="w-full h-13 rounded-2xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="lg:hidden">{t("filters.clear")}</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
