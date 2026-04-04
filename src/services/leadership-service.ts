import api, { API_BASE_URL } from "@/lib/api";
import Cookies from "js-cookie";

export interface LeadershipProfile {
  id: string;
  name: string;
  title: string;
  photo: string | null;
  bio: string | null;
  order: number;
  is_active: boolean;
  twitter_url?: string;
  linkedin_url?: string;
  facebook_url?: string;
  created_at: string;
  updated_at: string;
}

async function postMultipart<T>(endpoint: string, data: FormData): Promise<T> {
  const token = Cookies.get("access_token");
  const response = await fetch(`${API_BASE_URL}/api/v1${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: data,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `HTTP Error ${response.status}`);
  }
  return response.json();
}

async function patchMultipart<T>(endpoint: string, data: FormData): Promise<T> {
  const token = Cookies.get("access_token");
  const response = await fetch(`${API_BASE_URL}/api/v1${endpoint}`, {
    method: "PATCH",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: data,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `HTTP Error ${response.status}`);
  }
  return response.json();
}

export const LeadershipService = {
  async getProfiles(all = false): Promise<LeadershipProfile[]> {
    const response = await api.get<LeadershipProfile[] | { results: LeadershipProfile[] }>(
      `/configurations/leadership/${all ? "?all=true" : ""}`
    );
    if (Array.isArray(response.data)) return response.data;
    return (response.data as any).results || [];
  },

  async createProfile(data: FormData): Promise<LeadershipProfile> {
    return await postMultipart<LeadershipProfile>("/configurations/leadership/", data);
  },

  async updateProfile(id: string, data: FormData): Promise<LeadershipProfile> {
    return await patchMultipart<LeadershipProfile>(`/configurations/leadership/${id}/`, data);
  },

  async deleteProfile(id: string): Promise<void> {
    await api.delete(`/configurations/leadership/${id}/`);
  },
};
