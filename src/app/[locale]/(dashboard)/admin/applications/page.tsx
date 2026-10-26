"use client";

import { useApplicationsLogic } from "./_hooks/useApplicationsLogic";
import { PaginationControl } from "@/components/PaginationControl";
import { RoleGuard } from "@/components/RoleGuard";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ApplicationsHeader } from "./_components/ApplicationsHeader";
import { ApplicationsFilterBar } from "./_components/ApplicationsFilterBar";
import { ApplicationsGrid } from "./_components/ApplicationsGrid";
import { ApplicationsBulkBar } from "./_components/ApplicationsBulkBar";

export default function AdminApplications() {
  return (
    <RoleGuard module="applications">
      <AdminApplicationsContent />
    </RoleGuard>
  );
}

function AdminApplicationsContent() {
  const {
    applications, filteredApps, paginatedApps, filter, setFilter,
    selectedService, setSelectedService, distinctServices, sortBy, setSortBy,
    searchTerm, setSearchTerm, isLoading, currentPage, setCurrentPage,
    pageSize, totalPages, selectedIds, toggleSelectApp, toggleSelectAll,
    clearSelection, isBulkProcessing, feedbackMessage,
    handleBulkApprove, handleBulkReject, handleBulkDelete,
  } = useApplicationsLogic();

  const isAllSelected = paginatedApps.length > 0 && selectedIds.length === paginatedApps.length;

  return (
    <div className="space-y-8 pb-24 max-w-7xl mx-auto">
      {feedbackMessage && (
        <div className={cn("p-4 rounded-2xl border flex items-center gap-3 text-sm font-medium",
          feedbackMessage.type === "success" ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-rose-50 text-rose-800 border-rose-200"
        )}>
          {feedbackMessage.type === "success" ? <CheckCircle2 size={18} className="text-emerald-600 shrink-0" /> : <AlertCircle size={18} className="text-rose-600 shrink-0" />}
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      <ApplicationsHeader totalCount={applications.length} filteredCount={filteredApps.length} />

      <ApplicationsFilterBar
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        selectedService={selectedService} setSelectedService={setSelectedService}
        distinctServices={distinctServices} sortBy={sortBy} setSortBy={setSortBy}
        filter={filter} setFilter={setFilter} isAllSelected={isAllSelected}
        hasPaginatedApps={paginatedApps.length > 0} toggleSelectAll={toggleSelectAll}
      />

      <ApplicationsGrid
        isLoading={isLoading} filteredApps={filteredApps} paginatedApps={paginatedApps}
        selectedIds={selectedIds} toggleSelectApp={toggleSelectApp}
      />

      {!isLoading && filteredApps.length > 0 && (
        <PaginationControl
          currentPage={currentPage} totalPages={totalPages}
          totalItems={filteredApps.length} pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      )}

      <ApplicationsBulkBar
        selectedCount={selectedIds.length} onClearSelection={clearSelection}
        isBulkProcessing={isBulkProcessing} handleBulkApprove={handleBulkApprove}
        handleBulkReject={handleBulkReject} handleBulkDelete={handleBulkDelete}
      />
    </div>
  );
}
