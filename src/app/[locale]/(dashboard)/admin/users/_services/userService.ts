import api from "@/lib/api";

/**
 * Service for user management operations.
 */
export const userService = {
  fetcher: (url: string) => api.get(url).then((res) => res.data),

  deleteUser: async (id: string | number) => {
    return api.delete(`/users/users/${id}/`);
  }
};
