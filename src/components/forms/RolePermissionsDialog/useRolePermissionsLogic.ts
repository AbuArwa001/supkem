import { useState, useMemo, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { toast } from "sonner";
import { fetchPermissionsService, updateRolePermissionsService } from "./services";
import type { Permission, Role } from "./types";

const MODULE_DISPLAY: Record<string, string> = {
    user: "Users", role: "Roles", permission: "Permissions",
    organization: "Organizations", application: "Applications",
    service: "Services", news: "News", location: "Locations",
};

export function useRolePermissionsLogic(isOpen: boolean, role: Role | null, onClose: () => void) {
    const [search, setSearch] = useState("");
    const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (role) setSelectedIds(role.permissions.map(p => p.id));
    }, [role]);

    const { data: allPermissions, isLoading: isLoadingPerms } = useSWR<Permission[]>(
        isOpen ? "/users/permissions/" : null,
        fetchPermissionsService
    );

    const togglePermission = (id: string | number) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
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

    const handleSave = async () => {
        if (!role) return;
        setIsSaving(true);
        try {
            await updateRolePermissionsService(role.id, selectedIds);
            toast.success("Role permissions updated successfully");
            mutate("/users/roles/");
            onClose();
        } catch (error: any) {
            toast.error(error.response?.data?.detail || "Failed to update role permissions");
        } finally {
            setIsSaving(false);
        }
    };

    return {
        search, setSearch, selectedIds, isSaving, isLoadingPerms,
        groupedPermissions, togglePermission, handleSave
    };
}
