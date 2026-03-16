import api from "@/lib/api";

/**
 * Service for fetching admin dashboard data.
 * Adheres to data layer separation constraint.
 */
export const dashboardService = {
  getStats: async () => {
    const res = await api.get("/dashboard/stats/");
    return res.data;
  }
};
