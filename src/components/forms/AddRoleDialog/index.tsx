"use client";

import { useState, useMemo, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    ShieldPlus,
    Search,
    Loader2,
    CheckSquare,
    Square,
    Sparkles,
    ChevronsUpDown,
    ChevronDown,
    ChevronUp,
    Receipt,
    Layers
} from "lucide-react";
import { PermissionsList, GroupedModule } from "../RolePermissionsDialog/_components/PermissionsList";
import { fetchPermissionsService, createRoleService } from "../RolePermissionsDialog/services";
import type { Permission } from "../RolePermissionsDialog/types";
import {
    PERMISSION_MODULES,
    ROLE_PRESETS,
    getModuleForPermission,
    PERMISSION_METADATA,
    RolePreset
} from "../RolePermissionsDialog/permissionsRegistry";

interface AddRoleDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export function AddRoleDialog({ isOpen, onClose, onSuccess }: AddRoleDialogProps) {
    const [roleName, setRoleName] = useState("");
    const [search, setSearch] = useState("");
    const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
    const [expandedModuleIds, setExpandedModuleIds] = useState<string[]>(["finance", "applications"]);
    const [isSaving, setIsSaving] = useState(false);
    const [nameError, setNameError] = useState("");

    const { data: allPermissions, isLoading: isLoadingPerms } = useSWR<Permission[]>(
        isOpen ? "/users/permissions/" : null,
        fetchPermissionsService
    );

    // Filter out internal Django and non-app permissions
    const sanitizedPermissions = useMemo(() => {
        if (!allPermissions) return [];
        return allPermissions.filter((perm) => getModuleForPermission(perm) !== null);
    }, [allPermissions]);

    // Build structured modules
    const modules = useMemo<GroupedModule[]>(() => {
        if (!sanitizedPermissions.length) return [];

        const searchLower = search.trim().toLowerCase();
        const map = new Map<string, Permission[]>();

        // Initialize modules order
        PERMISSION_MODULES.forEach((mod) => {
            map.set(mod.id, []);
        });

        sanitizedPermissions.forEach((perm) => {
            const mod = getModuleForPermission(perm);
            if (!mod) return;

            // Search filter
            if (searchLower) {
                const meta = PERMISSION_METADATA[perm.codename];
                const matches =
                    perm.name.toLowerCase().includes(searchLower) ||
                    perm.codename.toLowerCase().includes(searchLower) ||
                    mod.title.toLowerCase().includes(searchLower) ||
                    (meta?.label && meta.label.toLowerCase().includes(searchLower)) ||
                    (meta?.summary && meta.summary.toLowerCase().includes(searchLower));

                if (!matches) return;
            }

            const current = map.get(mod.id) || [];
            current.push(perm);
            map.set(mod.id, current);
        });

        const result: GroupedModule[] = [];
        PERMISSION_MODULES.forEach((meta) => {
            const perms = map.get(meta.id) || [];
            if (perms.length > 0) {
                result.push({ meta, permissions: perms });
            }
        });

        return result;
    }, [sanitizedPermissions, search]);

    // Automatically expand modules that have search matches
    useEffect(() => {
        if (search.trim()) {
            setExpandedModuleIds(modules.map((m) => m.meta.id));
        }
    }, [search, modules]);

    const togglePermission = (id: string | number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handleToggleSection = (ids: (string | number)[], selectAll: boolean) => {
        setSelectedIds((prev) => {
            if (selectAll) {
                const set = new Set([...prev, ...ids]);
                return Array.from(set);
            } else {
                return prev.filter((id) => !ids.includes(id));
            }
        });
    };

    const handleToggleExpand = (moduleId: string) => {
        setExpandedModuleIds((prev) =>
            prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
        );
    };

    const handleExpandAll = () => {
        if (expandedModuleIds.length === modules.length) {
            setExpandedModuleIds([]);
        } else {
            setExpandedModuleIds(modules.map((m) => m.meta.id));
        }
    };

    const handleSelectAll = () => {
        const allIds = sanitizedPermissions.map((p) => p.id);
        if (selectedIds.length === allIds.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(allIds);
        }
    };

    const applyRolePreset = (preset: RolePreset) => {
        if (!roleName.trim()) {
            setRoleName(preset.roleName);
        }
        if (nameError) setNameError("");

        // Find matching permission IDs from the preset's codenames
        const matchingIds: (string | number)[] = [];
        sanitizedPermissions.forEach((perm) => {
            if (preset.codenames.includes(perm.codename)) {
                matchingIds.push(perm.id);
            }
        });

        // Merge with existing or replace
        const newSelected = Array.from(new Set([...selectedIds, ...matchingIds]));
        setSelectedIds(newSelected);

        // Expand relevant module for this preset
        if (preset.id === "finance_officer") {
            setExpandedModuleIds((prev) => Array.from(new Set([...prev, "finance", "applications"])));
        } else if (preset.id === "applications_officer") {
            setExpandedModuleIds((prev) => Array.from(new Set([...prev, "applications", "certificates_letters"])));
        } else if (preset.id === "it_officer") {
            setExpandedModuleIds((prev) => Array.from(new Set([...prev, "users_roles", "configurations"])));
        } else if (preset.id === "communications_officer") {
            setExpandedModuleIds((prev) => Array.from(new Set([...prev, "news_media"])));
        }

        toast.success(`Preset "${preset.roleName}" applied: ${matchingIds.length} permissions assigned.`);
    };

    const handleClose = () => {
        setRoleName("");
        setSearch("");
        setSelectedIds([]);
        setNameError("");
        setExpandedModuleIds(["finance", "applications"]);
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

    const isAllSelected =
        sanitizedPermissions.length > 0 && selectedIds.length === sanitizedPermissions.length;
    const isAllExpanded = modules.length > 0 && expandedModuleIds.length === modules.length;

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-3xl max-h-[92vh] flex flex-col p-0 overflow-hidden border-none shadow-2xl rounded-[2rem] bg-white">
                {/* Header */}
                <div className="p-7 pb-5 border-b border-slate-100 flex items-start justify-between bg-gradient-to-r from-emerald-50/50 via-teal-50/20 to-white">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3.5 rounded-2xl text-primary ring-1 ring-primary/20">
                            <ShieldPlus size={26} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2.5">
                                <h2 className="text-xl font-black text-slate-900 font-outfit uppercase tracking-tight">
                                    Create New Authority Role
                                </h2>
                                <Badge className="bg-emerald-100/80 text-emerald-800 border-none font-bold text-[10px] uppercase tracking-wider px-2.5">
                                    RBAC
                                </Badge>
                            </div>
                            <p className="text-slate-500 font-medium text-xs mt-0.5">
                                Define an administrative role profile and configure operational module permissions.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form & Body */}
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

                        {/* Quick Role Templates / Presets */}
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50/90 to-slate-100/40 border border-slate-200/70 space-y-2.5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 font-outfit">
                                        Quick Role Templates
                                    </span>
                                </div>
                                <span className="text-[10px] text-slate-400 font-medium">
                                    Click to auto-assign recommended operational actions
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {ROLE_PRESETS.map((preset) => (
                                    <button
                                        key={preset.id}
                                        type="button"
                                        onClick={() => applyRolePreset(preset)}
                                        className={`group px-3 py-1.5 rounded-xl border text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${
                                            roleName.toLowerCase().includes(preset.roleName.toLowerCase())
                                                ? "bg-primary text-white border-primary shadow-xs shadow-primary/20"
                                                : "bg-white border-slate-200 hover:border-primary/40 hover:bg-primary/5 text-slate-700"
                                        }`}
                                    >
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-xs font-black uppercase tracking-tight font-outfit">
                                                {preset.roleName}
                                            </span>
                                            <span
                                                className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md border ${
                                                    roleName.toLowerCase().includes(preset.roleName.toLowerCase())
                                                        ? "bg-white/20 text-white border-white/30"
                                                        : preset.badgeColor
                                                }`}
                                            >
                                                {preset.badge}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Permissions Section Header & Controls */}
                        <div className="pt-2 border-t border-slate-100 space-y-3.5">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div>
                                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                                        Assign Operational Permissions
                                    </h3>
                                    <p className="text-[11px] text-slate-400 font-medium">
                                        Expand each module dropdown to toggle individual actions or batch-assign.
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 flex-wrap">
                                    <Badge className="bg-primary/10 text-primary border-none font-bold px-3 py-1 rounded-full uppercase tracking-wider text-[10px]">
                                        {selectedIds.length} Selected
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

                                    {sanitizedPermissions.length > 0 && (
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
                                    )}
                                </div>
                            </div>

                            {/* Search Filter */}
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Filter by action name, module (e.g. Finance, Applications)..."
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

                            {/* Collapsible Dropdown Modules List */}
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

                    {/* Footer */}
                    <div className="p-5 px-7 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                            <Layers className="w-4 h-4 text-slate-400" />
                            <span>
                                {selectedIds.length} of {sanitizedPermissions.length} operational actions granted
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={handleClose}
                                disabled={isSaving}
                                className="h-11 px-5 rounded-xl font-bold text-slate-500 hover:bg-slate-100"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSaving || !roleName.trim()}
                                className="h-11 px-7 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 transition-all"
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
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
