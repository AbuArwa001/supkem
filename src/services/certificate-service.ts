import api from "@/lib/api";

export interface Certificate {
    id: string;
    serial_number: string;
    service_name: string;
    organization_name: string;
    issued_at: string;
    expires_at: string | null;
    application: string | number;
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
};
