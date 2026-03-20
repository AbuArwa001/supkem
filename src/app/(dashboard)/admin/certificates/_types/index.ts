export interface Certificate {
  id: string | number;
  organization_name: string;
  application_detail?: {
    service_name?: string;
  };
  service_name?: string;
  issued_at: string;
  serial_number: string;
}

export interface EligibleApplication {
  id: string;
  organization_name: string;
  service_name: string;
}
