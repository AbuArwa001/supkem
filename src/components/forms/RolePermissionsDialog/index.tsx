"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, CheckSquare, Square } from "lucide-react";

import { useRolePermissionsLogic } from "./useRolePermissionsLogic";
import { DialogHeaderUI } from "./_components/DialogHeaderUI";
import { PermissionsList } from "./_components/PermissionsList";
import { DialogFooterUI } from "./_components/DialogFooterUI";
import type { RolePermissionsDialogProps } from "./types";

export function RolePermissionsDialog({ isOpen, onClose, role }: RolePermissionsDialogProps) {
    const {
        roleName, setRoleName,
        search, setSearch,
        selectedIds, isSaving, isDeleting, isLoadingPerms,
        groupedPermissions, togglePermission, handleSave, handleDelete,
        handleSelectAll, isAllSelected, isSuperAdmin
    } = useRolePermissionsLogic(isOpen, role, onClose);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 overflow-hidden border-none shadow-premium rounded-[2rem] bg-white">
                <DialogHeaderUI
                    roleName={roleName}
                    onRoleNameChange={setRoleName}
                    isSystemRole={role?.is_system_role}
                    usersCount={role?.users_count}
                    canEditName={isSuperAdmin}
                />
                
                <div className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar">
                    {/* Controls row */}
                    <div className="flex items-center justify-between gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Filter system permissions..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-11 h-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white font-medium text-sm transition-all shadow-none"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge className="bg-indigo-50 text-indigo-700 border-none font-bold px-3 py-1 rounded-full uppercase tracking-wider text-[10px]">
                                {selectedIds.length} Selected
                            </Badge>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleSelectAll}
                                className="h-9 px-3 rounded-lg text-xs font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
                            >
                                {isAllSelected ? (
                                    <>
                                        <Square className="w-3.5 h-3.5 mr-1.5" />
                                        Deselect All
                                    </>
                                ) : (
                                    <>
                                        <CheckSquare className="w-3.5 h-3.5 mr-1.5" />
                                        Select All
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    <PermissionsList
                        isLoading={isLoadingPerms}
                        groupedPermissions={groupedPermissions}
                        selectedIds={selectedIds}
                        onToggle={togglePermission}
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
