"use client";

import { Link } from "@/i18n/routing";
import { Plus, FileText, Search, ArrowUpDown, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface ApplicationsHeaderProps {
  total: number;
  filteredTotal: number;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedService: string;
  onServiceChange: (val: string) => void;
  distinctServices: string[];
  statusFilter: string;
  onStatusFilterChange: (val: string) => void;
  sortBy: "newest" | "oldest" | "service_asc" | "status";
  onSortByChange: (val: "newest" | "oldest" | "service_asc" | "status") => void;
}

export function ApplicationsHeader({
  total,
  filteredTotal,
  searchTerm,
  onSearchChange,
  selectedService,
  onServiceChange,
  distinctServices,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortByChange,
}: ApplicationsHeaderProps) {
  const t = useTranslations("Dashboard.portal.applicationsPage");

  const STATUS_TABS = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "under review", label: "Under Review" },
    { key: "approved", label: "Approved" },
    { key: "rejected", label: "Rejected" },
    { key: "withdrawn", label: "Withdrawn" },
  ];

  return (
    <div className="space-y-6">
      {/* Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <FileText size={26} className="text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 font-outfit leading-tight">
                {t("title")}
              </h1>
              {total > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-black border border-primary/20">
                  {filteredTotal === total ? total : `${filteredTotal} / ${total}`}
                </span>
              )}
            </div>
            <p className="text-slate-500 font-medium mt-0.5 text-xs sm:text-sm">
              {t("subtitle")}
            </p>
          </div>
        </div>

        {/* New Application CTA */}
        <Link
          href="/portal/applications/new"
          className="flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all font-bold text-sm shrink-0"
        >
          <Plus size={18} />
          {t("newApp")}
        </Link>
      </div>

      {/* Control Bar: Search, Service Filter, Arrangement (Sort), and Status Tabs */}
      <div className="space-y-3 bg-white p-4 sm:p-5 rounded-[24px] border border-slate-200/80 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="sm:col-span-6 lg:col-span-5 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by ID, service, or organization..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm font-medium rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-slate-400"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Service Type Filter */}
          <div className="sm:col-span-6 lg:col-span-4 relative">
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            <select
              value={selectedService}
              onChange={(e) => onServiceChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm font-medium rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer text-slate-700"
            >
              <option value="all">All Service Types ({distinctServices.length})</option>
              {distinctServices.map((svc) => (
                <option key={svc} value={svc}>
                  {svc}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
              ▼
            </div>
          </div>

          {/* Arrangement / Sort By */}
          <div className="sm:col-span-12 lg:col-span-3 relative">
            <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value as any)}
              className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm font-medium rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer text-slate-700"
              title="Arrangement / Sort"
            >
              <option value="newest">Arrangement: Newest First</option>
              <option value="oldest">Arrangement: Oldest First</option>
              <option value="service_asc">Arrangement: Service (A-Z)</option>
              <option value="status">Arrangement: Status</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar pt-1">
          {STATUS_TABS.map((tab) => {
            const isActive = statusFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => onStatusFilterChange(tab.key)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer",
                  isActive
                    ? "bg-white text-slate-900 shadow-xs font-black"
                    : "text-slate-500 hover:text-slate-800 hover:bg-white/40"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
