import { useState, useMemo, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { toast } from "sonner";
import { fetchPermissionsService, updateRolePermissionsService, updateRoleService, deleteRoleService } from "./services";
import { usePermissions } from "@/hooks/usePermissions";
import type { Permission, Role } from "./types";

const MODULE_DISPLAY: Record<string, string> = {
    user: "Users", role: "Roles", permission: "Permissions",
    organization: "Organizations", application: "Applications",
    service: "Services", news: "News", location: "Locations",
};

export function useRolePermissionsLogic(isOpen: boolean, role: Role | null, onClose: () => void) {
    const { isSuperAdmin } = usePermissions();
    const [roleName, setRoleName] = useState("");
    const [search, setSearch] = useState("");
    const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (role) {
            setSelectedIds(role.permissions.map(p => p.id));
            setRoleName(role.role_name);
        }
    }, [role]);

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

    const isAllSelected = Boolean(
        allPermissions && allPermissions.length > 0 && selectedIds.length === allPermissions.length
    );

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
            const msg = error.response?.data?.detail || "Failed to delete role";
            toast.error(msg);
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        roleName, setRoleName,
        search, setSearch, selectedIds, isSaving, isDeleting, isLoadingPerms,
        groupedPermissions, togglePermission, handleSave, handleDelete,
        handleSelectAll, isAllSelected, isSuperAdmin
    };
}
