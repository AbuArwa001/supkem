"use client";

import { useState, useMemo } from "react";
import useSWR, { mutate } from "swr";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldPlus, Search, Loader2, CheckSquare, Square, X } from "lucide-react";
import { PermissionsList } from "../RolePermissionsDialog/_components/PermissionsList";
import { fetchPermissionsService, createRoleService } from "../RolePermissionsDialog/services";
import type { Permission } from "../RolePermissionsDialog/types";

interface AddRoleDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

const MODULE_DISPLAY: Record<string, string> = {
    user: "Users",
    role: "Roles",
    permission: "Permissions",
    organization: "Organizations",
    application: "Applications",
    service: "Services",
    news: "News",
    location: "Locations",
};

export function AddRoleDialog({ isOpen, onClose, onSuccess }: AddRoleDialogProps) {
    const [roleName, setRoleName] = useState("");
    const [search, setSearch] = useState("");
    const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [nameError, setNameError] = useState("");

    const { data: allPermissions, isLoading: isLoadingPerms } = useSWR<Permission[]>(
        isOpen ? "/users/permissions/" : null,
        fetchPermissionsService
    );

    const togglePermission = (id: string | number) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const handleSelectAll = () => {
        if (!allPermissions) return;
        if (selectedIds.length === allPermissions.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(allPermissions.map(p => p.id));
        }
    };

    const filteredPermissions = allPermissions?.filter(perm =>
        perm.name.toLowerCase().includes(search.toLowerCase()) ||
        perm.codename.toLowerCase().includes(search.toLowerCase())
    );

    const groupedPermissions = useMemo(() => {
        if (!filteredPermissions) return {};
        const groups: Record<string, Permission[]> = {};
        filteredPermissions.forEach(perm => {
            const parts = perm.codename.split("_");
            const model = parts.slice(1).join("_");
            const groupName = MODULE_DISPLAY[model] || model.charAt(0).toUpperCase() + model.slice(1);
            if (!groups[groupName]) groups[groupName] = [];
            groups[groupName].push(perm);
        });
        return groups;
    }, [filteredPermissions]);

    const handleClose = () => {
        setRoleName("");
        setSearch("");
        setSelectedIds([]);
        setNameError("");
        onClose();
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedName = roleName.trim();
        if (!trimmedName) {
            setNameError("Please enter a role name.");
            return;
        }

        setNameError("");
        setIsSaving(true);
        try {
            await createRoleService(trimmedName, selectedIds);
            toast.success(`Role "${trimmedName}" created successfully.`);
            mutate("/users/roles/");
            if (onSuccess) onSuccess();
            handleClose();
        } catch (error: any) {
            const errorMsg =
                error.response?.data?.role_name?.[0] ||
                error.response?.data?.detail ||
                error.response?.data?.message ||
                "Failed to create role. Please check details and try again.";
            setNameError(error.response?.data?.role_name?.[0] || "");
            toast.error(errorMsg);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 overflow-hidden border-none shadow-premium rounded-[2rem] bg-white">
                {/* Header */}
                <div className="p-8 pb-6 border-b border-slate-100 flex items-start justify-between bg-gradient-to-r from-emerald-50/40 via-teal-50/20 to-white">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3.5 rounded-2xl text-primary">
                            <ShieldPlus size={28} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-900 font-outfit uppercase tracking-tight">
                                Create New Role
                            </h2>
                            <p className="text-slate-500 font-medium text-xs mt-0.5">
                                Define a system authority profile and assign baseline permission privileges.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form & Body */}
                <form onSubmit={handleSave} className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar">
                        {/* Role Name Input */}
                        <div className="space-y-2">
                            <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                                Role Name <span className="text-rose-500">*</span>
                            </label>
                            <Input
                                placeholder="e.g. Regional Coordinator, Auditor, Compliance Officer"
                                value={roleName}
                                onChange={(e) => {
                                    setRoleName(e.target.value);
                                    if (nameError) setNameError("");
                                }}
                                className={`h-12 rounded-xl bg-slate-50/50 font-semibold text-sm transition-all shadow-none ${
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
                                    Must be unique. This identifier defines the role in authentication policies.
                                </p>
                            )}
                        </div>

                        <div className="pt-2 border-t border-slate-100">
                            {/* Permission header with count & select all */}
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                                        Assign Permissions
                                    </h3>
                                    <p className="text-[11px] text-slate-400 font-medium">
                                        Select operational capabilities for this role (optional at creation).
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-primary/10 text-primary border-none font-bold px-3 py-1 rounded-full uppercase tracking-wider text-[10px]">
                                        {selectedIds.length} Selected
                                    </Badge>
                                    {allPermissions && allPermissions.length > 0 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={handleSelectAll}
                                            className="h-8 px-3 rounded-lg text-xs font-bold text-slate-600 hover:text-primary hover:bg-primary/5"
                                        >
                                            {selectedIds.length === allPermissions.length ? (
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
                                    )}
                                </div>
                            </div>

                            {/* Search */}
                            <div className="relative mb-6">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Filter available permissions..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-11 h-11 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white font-medium text-xs transition-all shadow-none"
                                />
                            </div>

                            {/* Permission list */}
                            <PermissionsList
                                isLoading={isLoadingPerms}
                                groupedPermissions={groupedPermissions}
                                selectedIds={selectedIds}
                                onToggle={togglePermission}
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3 shrink-0">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={handleClose}
                            disabled={isSaving}
                            className="h-12 px-6 rounded-xl font-bold text-slate-500 hover:bg-slate-100"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSaving || !roleName.trim()}
                            className="h-12 px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 transition-all"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <ShieldPlus className="mr-2 h-4 w-4" />
                                    Create Role
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
