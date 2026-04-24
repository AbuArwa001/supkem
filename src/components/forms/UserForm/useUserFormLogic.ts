import { useState, useEffect } from "react";
import { toast } from "sonner";
import { fetchRolesService, saveUserService } from "./services";
import type { UserFormData, Role } from "./types";

export function useUserFormLogic(user: any, onSuccess?: () => void) {
    const [roles, setRoles] = useState<Role[]>([]);
    const [isLoadingRoles, setIsLoadingRoles] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState<UserFormData>({
        first_name: user?.first_name || "",
        middle_name: user?.middle_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        password: "",
        role_id: user?.role?.id || "",
        location: user?.location || "Nairobi",
        phone_number: user?.phone_number || "",
        is_active: user?.is_active ?? true,
    });

    const updateField = (field: keyof UserFormData, value: string | boolean) => {
        setFormData(p => ({ ...p, [field]: value }));
    };

    useEffect(() => {
        const fetchRoles = async () => {
            setIsLoadingRoles(true);
            try {
                const data = await fetchRolesService();
                setRoles(data);
            } catch (error) {
                console.error("Failed to fetch roles", error);
            } finally {
                setIsLoadingRoles(false);
            }
        };
        fetchRoles();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const payload = { ...formData };
            if (user && !payload.password) delete payload.password;

            await saveUserService(user?.id, payload);
            toast.success(user ? "User updated successfully" : "User created successfully");
            onSuccess?.();
        } catch (error: any) {
            const errorData = error.response?.data;
            let errorMessage = "Failed to save user";
            if (errorData) {
                errorMessage = Object.entries(errorData)
                    .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(", ") : msgs}`)
                    .join(" | ");
            }
            toast.error(errorMessage);
        } finally {
            setIsSaving(false);
        }
    };

    return { formData, updateField, roles, isSaving, isLoadingRoles, handleSubmit };
}
