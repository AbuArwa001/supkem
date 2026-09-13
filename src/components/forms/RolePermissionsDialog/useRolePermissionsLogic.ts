import { useState, useMemo, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { toast } from "sonner";
import {
    fetchPermissionsService,
    updateRolePermissionsService,
    updateRoleService,
    deleteRoleService
} from "./services";
import { usePermissions } from "@/hooks/usePermissions";
import type { Permission, Role } from "./types";
import {
    PERMISSION_MODULES,
    getModuleForPermission,
    PERMISSION_METADATA
} from "./permissionsRegistry";
import type { GroupedModule } from "./_components/PermissionsList";

export function useRolePermissionsLogic(isOpen: boolean, role: Role | null, onClose: () => void) {
    const { isSuperAdmin } = usePermissions();
    const [roleName, setRoleName] = useState("");
    const [search, setSearch] = useState("");
    const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
    const [expandedModuleIds, setExpandedModuleIds] = useState<string[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (role) {
            setSelectedIds(role.permissions.map(p => p.id));
            setRoleName(role.role_name);
            // Default expanded modules: all modules that have at least one permission assigned to this role
            const activeModuleIds = new Set<string>();
            role.permissions.forEach(perm => {
                const mod = getModuleForPermission(perm);
                if (mod) activeModuleIds.add(mod.id);
            });
            // If empty, expand finance and applications
            if (activeModuleIds.size === 0) {
                setExpandedModuleIds(["finance", "applications"]);
            } else {
                setExpandedModuleIds(Array.from(activeModuleIds));
            }
        }
    }, [role]);

    const { data: allPermissions, isLoading: isLoadingPerms } = useSWR<Permission[]>(
        isOpen ? "/users/permissions/" : null,
        fetchPermissionsService
    );

    // Filter out internal Django and non-app permissions
    const sanitizedPermissions = useMemo(() => {
        if (!allPermissions) return [];
        return allPermissions.filter(perm => getModuleForPermission(perm) !== null);
    }, [allPermissions]);

    // Build structured modules
    const modules = useMemo<GroupedModule[]>(() => {
        if (!sanitizedPermissions.length) return [];

        const searchLower = search.trim().toLowerCase();
        const map = new Map<string, Permission[]>();

        PERMISSION_MODULES.forEach((mod) => {
            map.set(mod.id, []);
        });

        sanitizedPermissions.forEach((perm) => {
            const mod = getModuleForPermission(perm);
            if (!mod) return;

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

    // Auto-expand on search
    useEffect(() => {
        if (search.trim()) {
            setExpandedModuleIds(modules.map((m) => m.meta.id));
        }
    }, [search, modules]);

    const togglePermission = (id: string | number) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const handleToggleSection = (ids: (string | number)[], selectAll: boolean) => {
        setSelectedIds(prev => {
            if (selectAll) {
                return Array.from(new Set([...prev, ...ids]));
            } else {
                return prev.filter(id => !ids.includes(id));
            }
        });
    };

    const handleToggleExpand = (moduleId: string) => {
        setExpandedModuleIds(prev =>
            prev.includes(moduleId) ? prev.filter(id => id !== moduleId) : [...prev, moduleId]
        );
    };

    const handleExpandAll = () => {
        if (expandedModuleIds.length === modules.length) {
            setExpandedModuleIds([]);
        } else {
            setExpandedModuleIds(modules.map(m => m.meta.id));
        }
    };

    const handleSelectAll = () => {
        const allIds = sanitizedPermissions.map(p => p.id);
        if (selectedIds.length === allIds.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(allIds);
        }
    };

    const isAllSelected = Boolean(
        sanitizedPermissions.length > 0 && selectedIds.length === sanitizedPermissions.length
    );

    const isAllExpanded = Boolean(
        modules.length > 0 && expandedModuleIds.length === modules.length
    );

    const handleSave = async () => {
        if (!role) return;
        const trimmedName = roleName.trim();
        if (!trimmedName) {
            toast.error("Role name cannot be empty.");
            return;
        }

        setIsSaving(true);
        try {
            if (!role.is_system_role && trimmedName !== role.role_name) {
                await updateRoleService(role.id, trimmedName, selectedIds);
                toast.success(`Role "${trimmedName}" updated successfully`);
            } else {
                await updateRolePermissionsService(role.id, selectedIds);
                toast.success(`Permissions for "${role.role_name}" updated successfully`);
            }
            mutate("/users/roles/");
            onClose();
        } catch (error: any) {
            const msg = error.response?.data?.detail || error.response?.data?.role_name?.[0] || "Failed to update role";
            toast.error(msg);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!role) return;
        if (role.is_system_role) {
            toast.error("Core system roles cannot be deleted.");
            return;
        }
        if (role.users_count && role.users_count > 0) {
            toast.error(`Cannot delete role: ${role.users_count} active user(s) are assigned to it.`);
            return;
        }

        setIsDeleting(true);
        try {
            await deleteRoleService(role.id);
            toast.success(`Role "${role.role_name}" deleted successfully.`);
            mutate("/users/roles/");
            onClose();
        } catch (error: any) {
            const msg = error.response?.data?.detail || "Failed to delete role.";
            toast.error(msg);
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        roleName,
        setRoleName,
        search,
        setSearch,
        selectedIds,
        isSaving,
        isDeleting,
        isLoadingPerms,
        modules,
        expandedModuleIds,
        isAllExpanded,
        handleToggleExpand,
        handleExpandAll,
        handleToggleSection,
        togglePermission,
        handleSave,
        handleDelete,
        handleSelectAll,
        isAllSelected,
        isSuperAdmin,
        totalPermissionsCount: sanitizedPermissions.length
    };
}
