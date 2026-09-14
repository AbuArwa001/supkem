import api from "@/lib/api";

export interface Certificate {
  id: string;
  serial_number: string;
  qr_code_hash?: string;
  issued_at: string;
  expires_at: string | null;
  service_name?: string;
  organization_name?: string;
  user_name?: string;
  holder_name?: string;
  recipient?: string;
  subject?: string;
  language?: "en" | "ar";
  custom_text_en?: string;
  custom_text_ar?: string;
  digital_signature?: string;
  signatory_title?: string;
  application: string | number;
  application_detail?: {
    service_name: string;
    organization_name?: string;
    user_name?: string;
    holder_name?: string;
    pilgrim_details?: any;
    education_details?: any;
    travel_visa_details?: any;
    marriage_details?: any;
  };
}

/**
 * Service to handle certificate-related API calls.
 */
export const CertificateService = {
    /**
     * Fetches a certificate by its unique ID.
     * @param id The certificate ID from the URL.
     * @returns The certificate data.
     */
    async getCertificate(id: string): Promise<Certificate> {
        const response = await api.get<Certificate>(`/applications/certifications/${id}/`);
        return response.data;
    },
    async getLetter(id: string): Promise<Certificate> {
        const response = await api.get<Certificate>(`/applications/letters/${id}/`);
        return response.data;
    },
};
