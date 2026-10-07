"use client";

import { motion } from "framer-motion";
import { useUsersLogic } from "./_hooks/useUsersLogic";
import { AccessRestricted } from "./_components/AccessRestricted";
import { UserHeader } from "./_components/UserHeader";
import { UserStats } from "./_components/UserStats";
import { UserFilters } from "./_components/UserFilters";
import { UsersTable } from "./_components/UsersTable";
import { UserDialogs } from "./_components/UserDialogs";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

/**
 * Team Management Page - Absolute Premium Enterprise Edition.
 */
export default function UsersPage() {
  const {
    authLoading,
    isAdmin,
    users,
    totalCount,
    isLoading,
    isValidating,
    mutate,
    mutateStats,
    statsData,
    searchQuery,
    setSearchQuery,
    quickTab,
    setQuickTab,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    availableRoles,
    isFiltered,
    handleResetFilters,
    page,
    setPage,
    hasNext,
    hasPrev,
    sortField,
    sortOrder,
    handleSortChange,
    selectedUserIds,
    handleToggleSelectUser,
    handleSelectAll,
    isAddModalOpen,
    setIsAddModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    selectedUser,
    isDetailOpen,
    setIsDetailOpen,
    handleOpenDetail,
    handleOpenEdit,
    handleDelete,
    handleToggleActive,
    handleResendVerification,
    handleSendPasswordReset,
    handleBulkAction,
    handleExportCsv,
  } = useUsersLogic();

  if (authLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex justify-between items-end gap-6 pb-2">
          <div className="space-y-3">
            <div className="h-4 w-32 bg-slate-200 rounded-full" />
            <div className="h-10 w-72 bg-slate-200 rounded-2xl" />
            <div className="h-4 w-96 bg-slate-100 rounded-lg" />
          </div>
          <div className="flex gap-3">
            <div className="h-12 w-12 bg-slate-100 rounded-2xl" />
            <div className="h-12 w-36 bg-slate-200 rounded-2xl" />
          </div>
        </div>

        {/* Stat Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-40 bg-white border border-slate-100 rounded-[2rem] p-6 space-y-4 shadow-sm"
            >
              <div className="flex justify-between">
                <div className="h-12 w-12 bg-slate-100 rounded-2xl" />
                <div className="h-5 w-20 bg-slate-100 rounded-full" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-24 bg-slate-100 rounded" />
                <div className="h-8 w-20 bg-slate-200 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Table Area Skeleton */}
        <div className="h-[450px] bg-white border border-slate-100 rounded-[2.5rem] p-8 space-y-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="h-6 w-48 bg-slate-100 rounded-xl" />
            <div className="h-9 w-64 bg-slate-100 rounded-xl" />
          </div>
          <div className="space-y-4 pt-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 w-full bg-slate-50 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <AccessRestricted />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 md:space-y-10"
    >
      {/* Header */}
      <UserHeader
        onRefresh={() => {
          mutate();
          mutateStats();
        }}
        isValidating={isValidating}
        onAddClick={() => setIsAddModalOpen(true)}
        onExportCsv={handleExportCsv}
      />

      {/* KPI Stat Cards */}
      <motion.div variants={itemVariants}>
        <UserStats
          stats={statsData}
          totalCount={totalCount}
          isLoading={isLoading}
        />
      </motion.div>

      {/* Filter & Command Center */}
      <motion.div variants={itemVariants} className="space-y-6">
        <UserFilters
          searchQuery={searchQuery}
          onSearchChange={(val) => {
            setSearchQuery(val);
            setPage(1);
          }}
          quickTab={quickTab}
          onQuickTabChange={(tab) => {
            setQuickTab(tab);
            setPage(1);
          }}
          roleFilter={roleFilter}
          onRoleFilterChange={(role) => {
            setRoleFilter(role);
            setPage(1);
          }}
          statusFilter={statusFilter}
          onStatusFilterChange={(status) => {
            setStatusFilter(status);
            setPage(1);
          }}
          availableRoles={availableRoles}
          onResetFilters={handleResetFilters}
          isFiltered={isFiltered}
          onExportCsv={handleExportCsv}
          totalCount={totalCount}
        />

        {/* Data Grid with Bulk Actions */}
        <UsersTable
          users={users}
          totalCount={totalCount}
          isLoading={isLoading}
          page={page}
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => p + 1)}
          hasPrev={hasPrev}
          hasNext={hasNext}
          onView={handleOpenDetail}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
          onToggleActive={handleToggleActive}
          onResendVerification={handleResendVerification}
          onSendPasswordReset={handleSendPasswordReset}
          searchQuery={searchQuery}
          sortField={sortField}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
          selectedUserIds={selectedUserIds}
          onToggleSelectUser={handleToggleSelectUser}
          onSelectAll={handleSelectAll}
          onBulkAction={handleBulkAction}
          onExportSelected={handleExportCsv}
        />
      </motion.div>

      {/* Add / Edit / Dossier Dialogs */}
      <UserDialogs
        isAddOpen={isAddModalOpen}
        onAddOpenChange={setIsAddModalOpen}
        isEditOpen={isEditModalOpen}
        onEditOpenChange={setIsEditModalOpen}
        isDetailOpen={isDetailOpen}
        onDetailOpenChange={setIsDetailOpen}
        selectedUser={selectedUser}
        onSuccess={() => {
          mutate();
          mutateStats();
        }}
        onOpenEdit={handleOpenEdit}
        onToggleActive={handleToggleActive}
      />
    </motion.div>
  );
}
