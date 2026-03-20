import api from "@/lib/api";
import { Application } from "@/app/(dashboard)/admin/applications/_types";

export const applicationService = {
    fetchApplications: async (): Promise<Application[]> => {
        try {
            const res = await api.get("/applications/applications/");
            return res.data.results || res.data;
        } catch (err) {
            console.error("Failed to fetch applications", err);
            return [];
        }
    },
    fetchApplicationById: async (id: string | number): Promise<any> => {
        const res = await api.get(`/applications/applications/${id}/`);
        return res.data;
    },
    updateApplicationStatus: async (id: string | number, status: string): Promise<void> => {
        await api.post(`/applications/applications/${id}/update_status/`, { status });
    }
};
