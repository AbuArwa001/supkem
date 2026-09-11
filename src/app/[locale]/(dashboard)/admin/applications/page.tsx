"use client";

import { motion } from "framer-motion";
import {
  Search,
  Filter,
  ArrowUpDown,
  X,
  CheckCircle2,
  XCircle,
  Trash2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useApplicationsLogic } from "@/app/[locale]/(dashboard)/admin/applications/_hooks/useApplicationsLogic";
import ApplicationCard from "@/app/[locale]/(dashboard)/admin/applications/_components/ApplicationCard";
import { PaginationControl } from "@/components/PaginationControl";
import { BulkActionBar } from "@/components/BulkActionBar";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const FILTER_OPTIONS = ["all", "pending", "approved", "rejected", "withdrawn"];

export default function AdminApplications() {
  const {
    applications,
    filteredApps,
    paginatedApps,
    filter,
    setFilter,
    selectedService,
    setSelectedService,
    distinctServices,
    sortBy,
    setSortBy,
    searchTerm,
    setSearchTerm,
    isLoading,
    currentPage,
    setCurrentPage,
    pageSize,
    totalPages,
    selectedIds,
    toggleSelectApp,
    toggleSelectAll,
    clearSelection,
    isBulkProcessing,
    feedbackMessage,
    handleBulkApprove,
    handleBulkReject,
    handleBulkDelete,
  } = useApplicationsLogic();

  const t = useTranslations("Dashboard.admin.applications");

  const isAllSelected =
    paginatedApps.length > 0 && selectedIds.length === paginatedApps.length;

  return (
    <div className="space-y-8 pb-24 max-w-7xl mx-auto">
      {/* Feedback Alert */}
      {feedbackMessage && (
        <div
          className={cn(
            "p-4 rounded-2xl border flex items-center gap-3 text-sm font-medium",
            feedbackMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-rose-50 text-rose-800 border-rose-200"
          )}
        >
          {feedbackMessage.type === "success" ? (
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle size={18} className="text-rose-600 shrink-0" />
          )}
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-black font-outfit tracking-tight text-primary">
              {t("heading")}
            </h1>
            {applications.length > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-black border border-primary/20">
                {filteredApps.length === applications.length
                  ? applications.length
                  : `${filteredApps.length} / ${applications.length}`}
              </span>
            )}
          </div>
          <p className="text-slate-500 font-medium text-sm sm:text-base max-w-xl">
            {t("desc")}
          </p>
        </div>
      </div>

      {/* Control Bar: Search, Service Filter, Arrangement, Status Tabs */}
      <div className="space-y-3 bg-white p-4 sm:p-5 rounded-[24px] border border-slate-200/80 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="sm:col-span-6 lg:col-span-5 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by ID, organization, service..."
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm font-medium rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-slate-400"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
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
              onChange={(e) => setSelectedService(e.target.value)}
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

          {/* Arrangement / Sort */}
          <div className="sm:col-span-12 lg:col-span-3 relative">
            <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
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

        {/* Bottom row: Status filter chips & Select All toggle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar w-full sm:w-auto">
            {FILTER_OPTIONS.map((filterOption) => {
              const isActive = filter === filterOption;
              return (
                <button
                  key={filterOption}
                  type="button"
                  onClick={() => setFilter(filterOption)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer",
                    isActive
                      ? "bg-white text-slate-900 shadow-xs font-black"
                      : "text-slate-500 hover:text-slate-800 hover:bg-white/40"
                  )}
                >
                  {t(`filters.${filterOption.toUpperCase()}`) || filterOption}
                </button>
              );
            })}
          </div>

          {paginatedApps.length > 0 && (
            <button
              type="button"
              onClick={toggleSelectAll}
              className="text-xs font-bold text-slate-600 hover:text-primary transition-colors flex items-center gap-2 cursor-pointer self-end sm:self-auto"
            >
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={toggleSelectAll}
                className="w-4 h-4 rounded text-primary focus:ring-primary/20 cursor-pointer accent-emerald-700"
              />
              {isAllSelected ? "Deselect page" : "Select all on page"}
            </button>
          )}
        </div>
      </div>

      {/* Grid of Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="bg-white rounded-[24px] border border-slate-100 p-6 animate-pulse space-y-4"
            >
              <div className="w-12 h-12 bg-slate-100 rounded-2xl" />
              <div className="space-y-2">
                <div className="h-5 w-3/4 bg-slate-100 rounded-lg" />
                <div className="h-4 w-1/2 bg-slate-50 rounded-lg" />
              </div>
              <div className="border-t border-slate-50 pt-4 space-y-2">
                <div className="h-3 w-2/3 bg-slate-50 rounded" />
              </div>
              <div className="h-10 w-full bg-slate-50 rounded-xl" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedApps.map((app, index) => (
            <ApplicationCard
              key={app.id}
              application={app}
              index={index}
              isSelected={selectedIds.includes(app.id)}
              onToggleSelect={toggleSelectApp}
            />
          ))}

          {filteredApps.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-full py-24 text-center space-y-4 rounded-[32px] border-2 border-dashed border-slate-200 bg-slate-50/50"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Search size={36} />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-black font-outfit text-slate-800">
                  {t("noApplications")}
                </h3>
                <p className="text-slate-500 font-medium text-sm">
                  {t("noApplicationsDesc")}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && filteredApps.length > 0 && (
        <PaginationControl
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredApps.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Floating Bulk Action Bar for Admin */}
      <BulkActionBar
        selectedCount={selectedIds.length}
        onClearSelection={clearSelection}
      >
        <button
          type="button"
          onClick={handleBulkApprove}
          disabled={isBulkProcessing}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-50"
        >
          {isBulkProcessing ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <CheckCircle2 size={14} />
          )}
          Approve
        </button>

        <button
          type="button"
          onClick={handleBulkReject}
          disabled={isBulkProcessing}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-amber-600/20 transition-all cursor-pointer disabled:opacity-50"
        >
          {isBulkProcessing ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <XCircle size={14} />
          )}
          Reject
        </button>

        <button
          type="button"
          onClick={handleBulkDelete}
          disabled={isBulkProcessing}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-rose-600/20 transition-all cursor-pointer disabled:opacity-50"
        >
          {isBulkProcessing ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Trash2 size={14} />
          )}
          Delete
        </button>
      </BulkActionBar>
    </div>
  );
}
