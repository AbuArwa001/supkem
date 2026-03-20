export interface Application {
    id: string | number;
    display_id: string;
    organization_name?: string;
    service_name: string;
    status: string;
    submitted_at?: string;
}
