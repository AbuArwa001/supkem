// External libraries
import api from "@/lib/api";

export const portalApplicationService = {
  fetchById: async (id: string | string[]): Promise<unknown> => {
    const res = await api.get(`/applications/applications/${id}/`);
    return res.data;
  },

  withdraw: async (id: string | string[], reason?: string): Promise<unknown> => {
    const res = await api.post(`/applications/applications/${id}/withdraw/`, { reason });
    return res.data;
  },
};
