import api from "@/lib/api";

export interface Deadline {
    title: string;
    desc: string;
    type: "danger" | "warning" | "info";
    date?: string;
}

export interface DashboardStats {
    upcoming_deadlines: Deadline[];
}

/**
 * Service to handle deadlines-related API calls.
 */
export const DeadlineService = {
    /**
     * Fetches dashboard statistics including upcoming deadlines.
     * @returns Dashboard statistics.
     */
    async getStats(): Promise<DashboardStats> {
        const response = await api.get<DashboardStats>("/dashboard/stats/");
        return response.data;
    },
};
