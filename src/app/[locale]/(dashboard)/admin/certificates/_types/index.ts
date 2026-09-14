export interface Certificate {
  id: string | number;
  organization_name?: string | null;
  application_detail?: {
    service_name?: string;
    user_name?: string | null;
    service_document_type?: string;
  };
  service_name?: string;
  service_document_type?: string;
  issued_at: string;
  serial_number: string;
  qr_code_hash?: string;
  custom_text_en?: string | null;
  custom_text_ar?: string | null;
  language?: string;
  recipient?: string;
  subject?: string;
  signatory_title?: string;
  digital_signature?: string;
  [key: string]: any;
}

export interface EligibleApplication {
  id: string;
  organization_name?: string | null;
  user_name?: string | null;
  service_name: string;
  service_document_type?: string;
  [key: string]: any;
}
