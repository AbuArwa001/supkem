export interface Certificate {
  id: string | number;
  organization_name?: string | null;
  application_detail?: {
    service_name?: string;
    user_name?: string | null;
  };
  service_name?: string;
  issued_at: string;
  serial_number: string;
}

export interface EligibleApplication {
  id: string;
  organization_name?: string | null;
  user_name?: string | null;
  service_name: string;
}
