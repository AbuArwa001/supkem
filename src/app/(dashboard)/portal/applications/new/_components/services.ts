import api from "@/lib/api";
import { Organization, Service } from "./types";

export const fetchOrganizations = (): Promise<Organization[]> =>
  api.get("/organizations/organizations/").then((res) => res.data.results || res.data);

export const fetchServices = (): Promise<Service[]> =>
  api.get("/services/services/").then((res) => res.data.results || res.data);

export const submitApplication = (payload: any): Promise<any> =>
  api.post("/applications/applications/", payload);
