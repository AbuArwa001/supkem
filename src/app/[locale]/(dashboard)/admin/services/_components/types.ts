export interface ServiceItem {
    id: string;
    name: string;
    category: string;
    description: string;
    fee: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: any;
}

export interface ServiceFormData {
    name: string;
    category: string;
    description: string;
    fee: string;
    is_active: boolean;
}
