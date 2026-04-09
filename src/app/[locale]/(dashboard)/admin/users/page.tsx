"use client";

import { motion } from "framer-motion";
import { useUsersLogic } from "./_hooks/useUsersLogic";
import { AccessRestricted } from "./_components/AccessRestricted";
import { UserHeader } from "./_components/UserHeader";
import { UserSearch } from "./_components/UserSearch";
import { UsersTable } from "./_components/UsersTable";
import { UserDialogs } from "./_components/UserDialogs";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

/**
 * Team Management Page - Main Container.
 * Adheres to 200-line readability constraint.
 */
export default function UsersPage() {
  const {
    isAdmin,
    users,
    totalCount,
    isLoading,
    isValidating,
    mutate,
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    hasNext,
    hasPrev,
    isAddModalOpen,
    setIsAddModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    selectedUser,
    handleDelete,
    handleOpenEdit,
    isDetailOpen,
    setIsDetailOpen,
    handleOpenDetail,
  } = useUsersLogic();

  if (!isAdmin) {
    return <AccessRestricted />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-12"
    >
      <UserHeader
        onRefresh={() => mutate()}
        isValidating={isValidating}
        onAddClick={() => setIsAddModalOpen(true)}
      />

      <motion.div variants={itemVariants} className="space-y-8">
        <UserSearch
          value={searchQuery}
          onChange={(val) => {
            setSearchQuery(val);
            setPage(1);
          }}
        />

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
          searchQuery={searchQuery}
        />
      </motion.div>

      <UserDialogs
        isAddOpen={isAddModalOpen}
        onAddOpenChange={setIsAddModalOpen}
        isEditOpen={isEditModalOpen}
        onEditOpenChange={setIsEditModalOpen}
        isDetailOpen={isDetailOpen}
        onDetailOpenChange={setIsDetailOpen}
        selectedUser={selectedUser}
        onSuccess={mutate}
      />
    </motion.div>
  );
}
