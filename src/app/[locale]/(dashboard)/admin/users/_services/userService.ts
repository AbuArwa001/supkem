import api from "@/lib/api";

export interface UserStatsData {
  total: number;
  active: number;
  inactive: number;
  verified: number;
  unverified: number;
  staff: number;
  role_distribution: { role__role_name: string; count: number }[];
}

/**
 * Service for user management operations.
 */
export const userService = {
  fetcher: (url: string) => api.get(url).then((res) => res.data),

  deleteUser: async (id: string | number) => {
    return api.delete(`/users/users/${id}/`);
  },

  toggleActive: async (id: string | number, isActive?: boolean) => {
    return api.post(`/users/users/${id}/toggle_active/`, { is_active: isActive });
  },

  resendVerification: async (id: string | number) => {
    return api.post(`/users/users/${id}/resend_verification/`);
  },

  sendPasswordReset: async (email: string) => {
    return api.post(`/users/users/request_password_reset/`, { email });
  },

  bulkAction: async (
    userIds: (string | number)[],
    action: "activate" | "deactivate" | "delete"
  ) => {
    return api.post(`/users/users/bulk_action/`, { user_ids: userIds, action });
  },

  getStats: async (): Promise<UserStatsData> => {
    return api.get(`/users/users/stats/`).then((res) => res.data);
  },

  fetchRoles: async () => {
    return api.get(`/users/roles/`).then((res) => res.data);
  },
};
