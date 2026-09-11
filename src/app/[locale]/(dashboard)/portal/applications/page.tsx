"use client";

import { useState } from "react";
import { useApplicationsLogic } from "./_components/useApplicationsLogic";
import { ApplicationsHeader } from "./_components/ApplicationsHeader";
import { ApplicationsList } from "./_components/ApplicationsList";
import { PaginationControl } from "@/components/PaginationControl";
import { BulkActionBar } from "@/components/BulkActionBar";
import { WithdrawConfirmModal } from "@/components/WithdrawConfirmModal";
import { Ban, CheckCircle2, AlertCircle } from "lucide-react";

export default function ApplicationsPage() {
  const {
    applications,
    filteredAndSortedApps,
    paginatedApps,
    error,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedService,
    setSelectedService,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    distinctServices,
    selectedIds,
    toggleSelectApp,
    clearSelection,
    currentPage,
    setCurrentPage,
    pageSize,
    totalPages,
    isWithdrawing,
    withdrawMessage,
    handleBulkWithdraw,
    getStatusStyles,
    getStatusIcon,
  } = useApplicationsLogic();

  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  return (
    <div className="space-y-8 pb-24 max-w-7xl mx-auto">
      {/* Alert message if any */}
      {withdrawMessage && (
        <div
          className={`p-4 rounded-2xl border flex items-center gap-3 text-sm font-medium ${
            withdrawMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-rose-50 text-rose-800 border-rose-200"
          }`}
        >
          {withdrawMessage.type === "success" ? (
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle size={18} className="text-rose-600 shrink-0" />
          )}
          <span>{withdrawMessage.text}</span>
        </div>
      )}

      {/* Header with Search, Filter & Arrangement */}
      <ApplicationsHeader
        total={applications.length}
        filteredTotal={filteredAndSortedApps.length}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedService={selectedService}
        onServiceChange={setSelectedService}
        distinctServices={distinctServices}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />

      {/* Grid List */}
      <ApplicationsList
        applications={paginatedApps}
        isLoading={isLoading}
        error={error}
        view="grid"
        getStatusStyles={getStatusStyles}
        getStatusIcon={getStatusIcon}
        selectedIds={selectedIds}
        onToggleSelect={toggleSelectApp}
      />

      {/* Pagination */}
      {!isLoading && filteredAndSortedApps.length > 0 && (
        <PaginationControl
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredAndSortedApps.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Floating Bulk Action Bar for User */}
      <BulkActionBar
        selectedCount={selectedIds.length}
        onClearSelection={clearSelection}
      >
        <button
          type="button"
          onClick={() => setIsWithdrawModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-rose-600/20 transition-all cursor-pointer"
        >
          <Ban size={15} />
          Withdraw Selected
        </button>
      </BulkActionBar>

      {/* Withdraw Modal */}
      <WithdrawConfirmModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        onConfirm={async (reason) => {
          await handleBulkWithdraw(reason);
          setIsWithdrawModalOpen(false);
        }}
        count={selectedIds.length}
        isLoading={isWithdrawing}
      />
    </div>
  );
}
