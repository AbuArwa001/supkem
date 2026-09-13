export interface Permission {
    id: string | number;
    name: string;
    codename: string;
    app_label?: string;
    model?: string;
}

export interface Role {
    id: string;
    role_name: string;
    permissions: Permission[];
    users_count?: number;
    is_system_role?: boolean;
    created_at?: string;
    updated_at?: string;
}


export interface RolePermissionsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    role: Role | null;
}
