import api from "@/lib/api";
import type { UserFormData, Role } from "./types";

export const fetchRolesService = async (): Promise<Role[]> => {
    const response = await api.get("/users/roles/");
    const data = response.data;
    return Array.isArray(data) ? data : data.results || [];
};

export const saveUserService = async (userId: string | undefined, payload: Partial<UserFormData>) => {
    if (userId) {
        await api.put(`/users/users/${userId}/`, payload);
    } else {
        await api.post("/users/users/", payload);
    }
};
