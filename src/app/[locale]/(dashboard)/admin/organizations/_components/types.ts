export interface Organization {
    id: string | number;
    name: string;
    accreditation_status: string;
    type: string;
    apps_count: number;
    certs_count: number;
    reg_number?: string;
    county_council?: string | number;
    county_council_name?: string;
    region_id?: string;
    region_name?: string;
    pin_number?: string;
    gps_location?: string;
    phone_number?: string;
    email?: string;
    website?: string;
    entered_by?: string;
    entered_by_name?: string;
    created_at?: string;
    updated_at?: string;
    [key: string]: any;
}
