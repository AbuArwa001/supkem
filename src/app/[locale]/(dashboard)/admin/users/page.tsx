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
