export interface Permission {
    id: string | number;
    name: string;
    codename: string;
}

export interface Role {
    id: string;
    role_name: string;
    permissions: Permission[];
}

export interface RolePermissionsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    role: Role | null;
}
