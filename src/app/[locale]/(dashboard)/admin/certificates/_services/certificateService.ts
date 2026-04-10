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

  fetchEligibleApplications: async (): Promise<EligibleApplication[]> => {
    try {
      const res = await api.get("/applications/applications/approved_no_cert/");
      return res.data;
    } catch (err) {
      console.error("Failed to fetch eligible applications", err);
      return [];
    }
  },

  issueCertificate: async (applicationId: string): Promise<void> => {
    await api.post("/applications/certifications/", {
      application: applicationId
    });
  }
};
