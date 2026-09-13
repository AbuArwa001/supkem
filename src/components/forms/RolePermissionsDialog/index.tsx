"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, CheckSquare, Square, ChevronDown, ChevronUp } from "lucide-react";

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
                    {/* Controls row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Filter operational permissions..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-11 h-11 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white font-medium text-xs transition-all shadow-none"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                                >
                                    Clear
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                            <Badge className="bg-primary/10 text-primary border-none font-bold px-3 py-1 rounded-full uppercase tracking-wider text-[10px]">
                                {selectedIds.length} / {totalPermissionsCount} Selected
                            </Badge>

                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleExpandAll}
                                className="h-8 px-2.5 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900 border-slate-200"
                            >
                                {isAllExpanded ? (
                                    <>
                                        <ChevronUp className="w-3.5 h-3.5 mr-1" />
                                        Collapse All
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown className="w-3.5 h-3.5 mr-1" />
                                        Expand All
                                    </>
                                )}
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleSelectAll}
                                className="h-8 px-2.5 rounded-lg text-xs font-bold text-slate-600 hover:text-primary hover:bg-primary/5 border-slate-200"
                            >
                                {isAllSelected ? (
                                    <>
                                        <Square className="w-3.5 h-3.5 mr-1 text-slate-400" />
                                        Deselect All
                                    </>
                                ) : (
                                    <>
                                        <CheckSquare className="w-3.5 h-3.5 mr-1 text-primary" />
                                        Select All
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

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
