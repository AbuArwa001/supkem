"use client";

import { useApplicationsLogic } from "./_components/useApplicationsLogic";
import { ApplicationsHeader } from "./_components/ApplicationsHeader";
import { ApplicationsList } from "./_components/ApplicationsList";
import { PaginationControl } from "@/components/PaginationControl";
import { WithdrawAlertBanner } from "./_components/WithdrawAlertBanner";
import { ApplicationsBulkSection } from "./_components/ApplicationsBulkSection";

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

  return (
    <div className="space-y-8 pb-24 max-w-7xl mx-auto">
      <WithdrawAlertBanner message={withdrawMessage} />

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

      {!isLoading && filteredAndSortedApps.length > 0 && (
        <PaginationControl
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredAndSortedApps.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      )}

      <ApplicationsBulkSection
        selectedCount={selectedIds.length}
        onClearSelection={clearSelection}
        onBulkWithdraw={handleBulkWithdraw}
        isWithdrawing={isWithdrawing}
      />
    </div>
  );
}
