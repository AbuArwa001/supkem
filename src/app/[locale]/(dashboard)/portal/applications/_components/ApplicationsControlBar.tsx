"use client";

import { Search, ArrowUpDown, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ApplicationsControlBarProps {
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

const STATUS_TABS = [
  { key: "all", label: "All" }, { key: "pending", label: "Pending" },
  { key: "under review", label: "Under Review" }, { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" }, { key: "withdrawn", label: "Withdrawn" },
];

export function ApplicationsControlBar({
  searchTerm,
  onSearchChange,
  selectedService,
  onServiceChange,
  distinctServices,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortByChange,
}: ApplicationsControlBarProps) {
  return (
    <div className="space-y-3 bg-white p-4 sm:p-5 rounded-[24px] border border-slate-200/80 shadow-xs">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
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
            <button type="button" onClick={() => onSearchChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X size={14} />
            </button>
          )}
        </div>

        <div className="sm:col-span-6 lg:col-span-4 relative">
          <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          <select
            value={selectedService}
            onChange={(e) => onServiceChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm font-medium rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer text-slate-700"
          >
            <option value="all">All Service Types ({distinctServices.length})</option>
            {distinctServices.map((svc) => (<option key={svc} value={svc}>{svc}</option>))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
        </div>

        <div className="sm:col-span-12 lg:col-span-3 relative">
          <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value as any)}
            className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm font-medium rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer text-slate-700"
          >
            <option value="newest">Arrangement: Newest First</option>
            <option value="oldest">Arrangement: Oldest First</option>
            <option value="service_asc">Arrangement: Service (A-Z)</option>
            <option value="status">Arrangement: Status</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar pt-1">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onStatusFilterChange(tab.key)}
            className={cn("px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer", statusFilter === tab.key ? "bg-white text-slate-900 shadow-xs font-black" : "text-slate-500 hover:text-slate-800 hover:bg-white/40")}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
