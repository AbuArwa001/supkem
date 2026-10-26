"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRolePermissionsLogic } from "./useRolePermissionsLogic";
import { DialogHeaderUI } from "./_components/DialogHeaderUI";
import { PermissionsList } from "./_components/PermissionsList";
import { DialogFooterUI } from "./_components/DialogFooterUI";
import { RolePermissionsFilterBar } from "./_components/RolePermissionsFilterBar";
import type { RolePermissionsDialogProps } from "./types";

export function RolePermissionsDialog({ isOpen, onClose, role }: RolePermissionsDialogProps) {
  const {
    roleName, setRoleName,
    search, setSearch,
    selectedIds, isSaving, isDeleting, isLoadingPerms,
    modules, expandedModuleIds, isAllExpanded,
    handleToggleExpand, handleExpandAll, handleToggleSection,
    togglePermission, handleSave, handleDelete,
    handleSelectAll, isAllSelected, isSuperAdmin,
    totalPermissionsCount
  } = useRolePermissionsLogic(isOpen, role, onClose);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[92vh] flex flex-col p-0 overflow-hidden border-none shadow-2xl rounded-[2rem] bg-white">
        <DialogHeaderUI
          roleName={roleName}
          onRoleNameChange={setRoleName}
          isSystemRole={role?.is_system_role}
          usersCount={role?.users_count}
          canEditName={isSuperAdmin}
        />

        <div className="flex-1 overflow-y-auto p-7 space-y-5 no-scrollbar">
          <RolePermissionsFilterBar
            search={search}
            setSearch={setSearch}
            selectedCount={selectedIds.length}
            totalCount={totalPermissionsCount}
            isAllExpanded={isAllExpanded}
            onExpandAll={handleExpandAll}
            isAllSelected={isAllSelected}
            onSelectAll={handleSelectAll}
          />

          <PermissionsList
            isLoading={isLoadingPerms}
            modules={modules}
            selectedIds={selectedIds}
            onToggle={togglePermission}
            onToggleSection={handleToggleSection}
            expandedModuleIds={expandedModuleIds}
            onToggleExpand={handleToggleExpand}
          />
        </div>

        <DialogFooterUI
          isSaving={isSaving}
          isDeleting={isDeleting}
          canDelete={Boolean(isSuperAdmin && !role?.is_system_role)}
          onDelete={handleDelete}
          onClose={onClose}
          onSave={handleSave}
        />
      </DialogContent>
    </Dialog>
  );
}
