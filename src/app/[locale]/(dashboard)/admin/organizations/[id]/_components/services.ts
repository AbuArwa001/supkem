import api from "@/lib/api";

import { OrganizationDetail, Personnel, User } from "./types";

export async function fetchOrgData(id: string): Promise<{ org: OrganizationDetail, personnel: Personnel[] }> {
    const [orgRes, personnelRes] = await Promise.all([
        api.get(`/organizations/organizations/${id}/`),
        api.get(`/organizations/organizations/${id}/personnel/`)
    ]);
    return { org: orgRes.data, personnel: personnelRes.data };
}

export async function fetchDefaultUsers(): Promise<User[]> {
    const res = await api.get(`/users/users/`);
    return res.data.results || res.data;
}

export async function searchUsers(query: string): Promise<User[]> {
    const res = await api.get(`/users/users/?search=${query}`);
    return res.data.results || res.data;
}

export async function assignPersonnel(orgId: string, userId: string): Promise<void> {
    await api.post(`/organizations/organizations/${orgId}/assign_personnel/`, {
        user_id: userId,
        status: "Member"
    });
}

export async function removePersonnel(orgId: string, userId: string): Promise<void> {
    await api.post(`/organizations/organizations/${orgId}/remove_personnel/`, {
        user_id: userId
    });
}

export async function suspendPersonnel(orgId: string, userId: string): Promise<void> {
    await api.post(`/organizations/organizations/${orgId}/suspend_personnel/`, {
        user_id: userId
    });
}

export async function updateOrgStatus(orgId: string, status: string): Promise<void> {
    await api.post(`/organizations/organizations/${orgId}/update_status/`, { status });
}

export async function updateOrganization(
    orgId: string | number,
    data: Partial<OrganizationDetail>
): Promise<OrganizationDetail> {
    const res = await api.patch(`/organizations/organizations/${orgId}/`, data);
    return res.data;
}

export async function fetchRegions(): Promise<any[]> {
    const res = await api.get("/locations/regions/");
    return res.data.results || res.data;
}

export async function fetchCountyCouncils(regionId?: string): Promise<any[]> {
    const url = regionId
        ? `/locations/county-councils/?region=${regionId}`
        : "/locations/county-councils/";
    const res = await api.get(url);
    return res.data.results || res.data;
}

