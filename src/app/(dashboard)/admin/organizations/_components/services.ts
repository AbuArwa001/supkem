import api from "@/lib/api";

import { Organization } from "./types";

export async function fetchOrganizations(): Promise<Organization[]> {
    const res = await api.get("/organizations/organizations/");
    return res.data.results || res.data;
}
