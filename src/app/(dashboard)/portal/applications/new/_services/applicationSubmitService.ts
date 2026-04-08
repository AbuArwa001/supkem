// React/Next.js core
// External libraries
import api from "@/lib/api";

// Types
import type { Organization, Service } from "@/app/(dashboard)/portal/applications/new/_types";

export const applicationSubmitService = {
  fetchOrganizations: (): Promise<Organization[]> =>
    api.get("/organizations/organizations/").then((res) => res.data.results || res.data),

  fetchServices: (): Promise<Service[]> =>
    api.get("/services/services/").then((res) => res.data.results || res.data),

  submitApplication: (payload: Record<string, unknown>): Promise<{ id: string }> =>
    api.post("/applications/applications/", payload).then((res) => res.data),

  initiatePayment: (applicationId: string, phoneNumber: string): Promise<unknown> =>
    api
      .post(`/applications/applications/${applicationId}/initiate_payment/`, {
        phone_number: phoneNumber,
      })
      .then((res) => res.data),

  getApplication: (applicationId: string): Promise<{ payment?: { status: string } }> =>
    api.get(`/applications/applications/${applicationId}/`).then((res) => res.data),
};
