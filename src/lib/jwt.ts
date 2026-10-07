import Cookies from "js-cookie";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api";

export interface JwtPayload {
  token_type?: string;
  exp: number;
  iat?: number;
  jti?: string;
  user_id?: string;
  [key: string]: any;
}

/**
 * Parses JWT payload without third-party library.
 */
export function parseJwt(token: string): JwtPayload | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

/**
 * Refreshes access token via backend /api/v1/token/refresh/ endpoint.
 */
export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = Cookies.get("refresh_token");
  if (!refreshToken) return null;

  try {
    const url = API_BASE_URL ? `${API_BASE_URL}/api/v1/token/refresh/` : "/api/v1/token/refresh/";
    const res = await axios.post(url, {
      refresh: refreshToken,
    });
    const newAccess = res.data?.access;
    if (newAccess) {
      Cookies.set("access_token", newAccess, { secure: true, sameSite: "strict" });
      return newAccess;
    }
    return null;
  } catch (error) {
    return null;
  }
}
