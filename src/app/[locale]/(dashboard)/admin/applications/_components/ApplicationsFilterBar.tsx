import React from "react";
import { Search, Filter, ArrowUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { ApplicationSortBy } from "../_hooks/applicationFilterUtils";

const FILTER_OPTIONS = ["all", "pending", "approved", "rejected", "withdrawn"];

interface ApplicationsFilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedService: string;
  setSelectedService: (svc: string) => void;
  distinctServices: string[];
  sortBy: ApplicationSortBy;
  setSortBy: (sort: ApplicationSortBy) => void;
  filter: string;
  setFilter: (f: string) => void;
  isAllSelected: boolean;
  hasPaginatedApps: boolean;
  toggleSelectAll: () => void;
}

export function ApplicationsFilterBar({
  searchTerm, setSearchTerm, selectedService, setSelectedService,
  distinctServices, sortBy, setSortBy, filter, setFilter,
  isAllSelected, hasPaginatedApps, toggleSelectAll,
}: ApplicationsFilterBarProps) {
  const t = useTranslations("Dashboard.admin.applications");

  return (
    <div className="space-y-3 bg-white p-4 sm:p-5 rounded-[24px] border border-slate-200/80 shadow-xs">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-6 lg:col-span-5 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by ID, organization, service..." className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm font-medium rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-slate-400" />
          {searchTerm && <button type="button" onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"><X size={14} /></button>}
        </div>

        <div className="sm:col-span-6 lg:col-span-4 relative">
          <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm font-medium rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer text-slate-700">
            <option value="all">All Service Types ({distinctServices.length})</option>
            {distinctServices.map((svc) => <option key={svc} value={svc}>{svc}</option>)}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
        </div>

        <div className="sm:col-span-12 lg:col-span-3 relative">
          <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as ApplicationSortBy)} className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm font-medium rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer text-slate-700" title="Arrangement / Sort">
            <option value="newest">Arrangement: Newest First</option>
            <option value="oldest">Arrangement: Oldest First</option>
            <option value="service_asc">Arrangement: Service (A-Z)</option>
            <option value="status">Arrangement: Status</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar w-full sm:w-auto">
          {FILTER_OPTIONS.map((f) => (
            <button key={f} type="button" onClick={() => setFilter(f)} className={cn("px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer", filter === f ? "bg-white text-slate-900 shadow-xs font-black" : "text-slate-500 hover:text-slate-800 hover:bg-white/40")}>
              {t(`filters.${f.toUpperCase()}`) || f}
            </button>
          ))}
        </div>

        {hasPaginatedApps && (
          <button type="button" onClick={toggleSelectAll} className="text-xs font-bold text-slate-600 hover:text-primary transition-colors flex items-center gap-2 cursor-pointer self-end sm:self-auto">
            <input type="checkbox" checked={isAllSelected} onChange={toggleSelectAll} className="w-4 h-4 rounded text-primary focus:ring-primary/20 cursor-pointer accent-emerald-700" />
            {isAllSelected ? "Deselect page" : "Select all on page"}
          </button>
        )}
      </div>
    </div>
  );
}
