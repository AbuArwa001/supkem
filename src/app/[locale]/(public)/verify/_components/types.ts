export interface VerificationData {
  is_valid: boolean;
  status: "Active" | "Expired" | "NotFound" | string;
  document_type: "Certificate" | "Letter" | string;
  serial_number: string;
  qr_code_hash: string;
  service_name: string;
  service_category?: string;
  organization_name?: string | null;
  holder_name?: string | null;
  custom_text_en?: string | null;
  custom_text_ar?: string | null;
  recipient?: string;
  subject?: string;
  issued_at: string;
  expires_at?: string | null;
  signatory_title?: string;
  has_digital_signature: boolean;
  language?: string;
  application_id?: string | null;
  detail?: string;
}
