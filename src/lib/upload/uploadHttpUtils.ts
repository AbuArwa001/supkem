import Cookies from "js-cookie";
import { API_BASE_URL } from "@/lib/api";

export interface InitResponse {
  key: string;
  upload_id: string;
  part_size: number;
  parts: { part_number: number; url: string }[];
}

export async function postJson<T>(path: string, body: unknown): Promise<T> {
  const token = Cookies.get("access_token");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE_URL}/api/v1${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = new Error(`HTTP Error ${res.status}`) as Error & { status?: number };
    err.status = res.status;
    try {
      const json = await res.json();
      err.message = json.detail || err.message;
    } catch {
      /* ignore */
    }
    throw err;
  }
  return res.status === 204 ? (undefined as T) : res.json();
}
