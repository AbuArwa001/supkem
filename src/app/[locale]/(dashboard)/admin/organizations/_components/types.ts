export interface Organization {
    id: string | number;
    name: string;
    accreditation_status: string;
    type: string;
    apps_count: number;
    certs_count: number;
    [key: string]: any;
}
