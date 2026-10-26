import Cookies from 'js-cookie';
import { API_BASE_URL } from "@/lib/api";

function extractErrorMessage(text: string, status: number): string {
    let errorMsg = `HTTP Error ${status}`;
    if (text.includes('<title>')) {
        const titleMatch = text.match(/<title>(.*?)<\/title>/);
        if (titleMatch) {
            errorMsg = titleMatch[1].replace("Exception value:", "").trim();
        }
    } else {
        try {
            const json = JSON.parse(text);
            errorMsg = json.detail || JSON.stringify(json);
        } catch {
            errorMsg = text.substring(0, 500);
        }
    }
    return errorMsg;
}

export async function postMultipart<T>(endpoint: string, data: FormData): Promise<T> {
    const token = Cookies.get('access_token');
    const response = await fetch(`${API_BASE_URL}/api/v1${endpoint}`, {
        method: 'POST',
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        },
        body: data,
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(extractErrorMessage(text, response.status));
    }
    return response.json();
}

export async function patchMultipart<T>(endpoint: string, data: FormData): Promise<T> {
    const token = Cookies.get('access_token');
    const response = await fetch(`${API_BASE_URL}/api/v1${endpoint}`, {
        method: 'PATCH',
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        },
        body: data,
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(extractErrorMessage(text, response.status));
    }
    return response.json();
}
