export interface Role {
    id: string;
    role_name: string;
}

export interface UserFormData {
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    password?: string;
    role_id: string;
    location: string;
    phone_number: string;
    is_active: boolean;
}

export interface UserFormProps {
    onSuccess?: () => void;
    user?: any;
}
