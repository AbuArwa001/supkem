"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import { useRolePermissionsLogic } from "./useRolePermissionsLogic";
import { DialogHeaderUI } from "./_components/DialogHeaderUI";
import { PermissionsList } from "./_components/PermissionsList";
import { DialogFooterUI } from "./_components/DialogFooterUI";
import type { RolePermissionsDialogProps } from "./types";

export function RolePermissionsDialog({ isOpen, onClose, role }: RolePermissionsDialogProps) {
    const {
        search, setSearch,
        selectedIds, isSaving, isLoadingPerms,
        groupedPermissions, togglePermission, handleSave
    } = useRolePermissionsLogic(isOpen, role, onClose);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 overflow-hidden border-none shadow-premium rounded-[2rem] bg-white">
                <DialogHeaderUI roleName={role?.role_name} />
                
                <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Filter system permissions..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-11 h-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white font-medium text-sm transition-all shadow-none"
                        />
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
                    onClose={onClose} 
                    onSave={handleSave} 
                />
            </DialogContent>
        </Dialog>
    );
}
