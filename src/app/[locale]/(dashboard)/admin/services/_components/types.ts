export interface ServiceItem {
    id: string;
    name: string;
    name_en?: string;
    name_ar?: string;
    category: string;
    description: string;
    description_en?: string;
    description_ar?: string;
    fee: string;
    document_type?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: any;
}

export interface ServiceCategoryItem {
    id: string;
    name: string;
    name_en?: string;
    name_ar?: string;
    description?: string;
    description_en?: string;
    description_ar?: string;
    services_count?: number;
    created_at?: string;
    updated_at?: string;
}

export interface ServiceFormData {
    name: string;
    category: string;
    target_audience?: string;
    document_type?: string;
    description: string;
    fee: string;
    is_active: boolean;
}

