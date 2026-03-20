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
    }
};
