import api from "@/lib/api";
import { Certificate, EligibleApplication } from "@/app/[locale]/(dashboard)/admin/certificates/_types";

export const certificateService = {
  fetchCertificates: async (): Promise<Certificate[]> => {
    try {
      const res = await api.get("/applications/certifications/");
      return res.data.results || res.data;
    } catch (err) {
      console.error("Failed to fetch certificates", err);
      return [];
    }
  },

  fetchLetters: async (): Promise<Certificate[]> => {
    try {
      const res = await api.get("/applications/letters/");
      return res.data.results || res.data;
    } catch (err) {
      console.error("Failed to fetch letters", err);
      return [];
    }
  },

  fetchEligibleApplications: async (docType?: string): Promise<EligibleApplication[]> => {
    try {
      const url = docType 
        ? `/applications/applications/approved_no_cert/?document_type=${encodeURIComponent(docType)}`
        : "/applications/applications/approved_no_cert/";
      const res = await api.get(url);
      return res.data;
    } catch (err) {
      console.error("Failed to fetch eligible applications", err);
      return [];
    }
  },

  issueDocument: async (payload: any): Promise<void> => {
    const isLetter = payload.documentType === "Letter";
    const endpoint = isLetter ? "/applications/letters/" : "/applications/certifications/";
    
    const body: any = {
      application: payload.applicationId,
      language: payload.language,
      custom_text_en: payload.customTextEn,
      custom_text_ar: payload.customTextAr,
      digital_signature: payload.digitalSignature,
    };

    if (payload.signatoryTitle) {
      body.signatory_title = payload.signatoryTitle;
    }

    if (isLetter) {
      if (payload.recipient) body.recipient = payload.recipient;
      if (payload.subject) body.subject = payload.subject;
    }

    await api.post(endpoint, body);
  }
};
