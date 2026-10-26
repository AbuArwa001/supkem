"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PermissionsList } from "../RolePermissionsDialog/_components/PermissionsList";
import { useAddRoleLogic } from "./useAddRoleLogic";
import { AddRoleHeader } from "./_components/AddRoleHeader";
import { RoleTemplatesSection } from "./_components/RoleTemplatesSection";
import { AddRolePermissionsControls } from "./_components/AddRolePermissionsControls";
import { AddRoleFooter } from "./_components/AddRoleFooter";

interface AddRoleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AddRoleDialog({ isOpen, onClose, onSuccess }: AddRoleDialogProps) {
  const {
    roleName, setRoleName, search, setSearch, selectedIds, expandedModuleIds,
    isSaving, nameError, setNameError, sanitizedPermissions, modules, isLoadingPerms,
    togglePermission, handleToggleSection, handleToggleExpand, handleExpandAll,
    handleSelectAll, applyRolePreset, handleClose, handleSave,
    isAllSelected, isAllExpanded,
  } = useAddRoleLogic({ isOpen, onClose, onSuccess });

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[92vh] flex flex-col p-0 overflow-hidden border-none shadow-2xl rounded-[2rem] bg-white">
        <AddRoleHeader />

        <form onSubmit={handleSave} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-7 space-y-6 no-scrollbar">
            {/* Role Name Input */}
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                Role Name <span className="text-rose-500">*</span>
              </label>
              <Input
                placeholder="e.g. Finance Officer, Applications Registrar, Compliance Auditor"
                value={roleName}
                onChange={(e) => {
                  setRoleName(e.target.value);
                  if (nameError) setNameError("");
                }}
                className={`h-12 rounded-xl bg-slate-50/60 font-semibold text-sm transition-all shadow-none ${
                  nameError
                    ? "border-rose-400 focus:border-rose-500 focus:ring-rose-200"
                    : "border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary/10"
                }`}
                autoFocus
              />
              {nameError ? (
                <p className="text-xs font-medium text-rose-500">{nameError}</p>
              ) : (
                <p className="text-[11px] text-slate-400 font-medium">
                  Unique identifier representing this role profile in authentication and capability policies.
                </p>
              )}
            </div>

            <RoleTemplatesSection roleName={roleName} onApplyPreset={applyRolePreset} />

            <div className="pt-2 border-t border-slate-100 space-y-3.5">
              <AddRolePermissionsControls
                selectedCount={selectedIds.length}
                totalCount={sanitizedPermissions.length}
                isAllExpanded={isAllExpanded}
                onExpandAll={handleExpandAll}
                isAllSelected={isAllSelected}
                onSelectAll={handleSelectAll}
                search={search}
                setSearch={setSearch}
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
          </div>

          <AddRoleFooter
            selectedCount={selectedIds.length}
            totalCount={sanitizedPermissions.length}
            isSaving={isSaving}
            canSubmit={Boolean(roleName.trim())}
            onCancel={handleClose}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
