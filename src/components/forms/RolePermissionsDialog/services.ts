import api from "@/lib/api";
import type { Permission } from "./types";

export const fetchPermissionsService = async (): Promise<Permission[]> => {
    const res = await api.get("/users/permissions/");
    return res.data;
};

export const updateRolePermissionsService = async (
    roleId: string, 
    permissionIds: (string | number)[]
) => {
    const res = await api.patch(`/users/roles/${roleId}/`, {
        permissions: permissionIds,
    });
    return res.data;
};

export const createRoleService = async (
    roleName: string,
    permissionIds: (string | number)[]
) => {
    const res = await api.post("/users/roles/", {
        role_name: roleName,
        permission_ids: permissionIds,
    });
    return res.data;
};

