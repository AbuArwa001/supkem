import api from "@/lib/api";

import { ServiceItem, ServiceFormData } from "./types";

export async function fetchServicesApi(): Promise<ServiceItem[]> {
    const res = await api.get("/services/services/");
    return res.data.results || res.data;
}

export async function createServiceApi(data: ServiceFormData): Promise<void> {
    const payload: Record<string, any> = {
        name: data.name,
        name_en: data.name,
        description: data.description,
        description_en: data.description,
        category: data.category,
        target_audience: data.target_audience || "Both",
        fee: data.fee,
        is_active: data.is_active,
    };
    if ((data as any).name_ar) payload.name_ar = (data as any).name_ar;
    if ((data as any).description_ar) payload.description_ar = (data as any).description_ar;
    await api.post("/services/services/", payload);
}

export async function updateServiceApi(id: string, data: ServiceFormData): Promise<void> {
    const payload: Record<string, any> = {
        name: data.name,
        name_en: data.name,
        description: data.description,
        description_en: data.description,
        category: data.category,
        fee: data.fee,
        is_active: data.is_active,
    };
    if (data.target_audience) payload.target_audience = data.target_audience;
    if ((data as any).name_ar) payload.name_ar = (data as any).name_ar;
    if ((data as any).description_ar) payload.description_ar = (data as any).description_ar;
    await api.patch(`/services/services/${id}/`, payload);
}

export async function deleteServiceApi(id: string, options?: { deactivate?: boolean; cascade?: boolean }): Promise<any> {
    const params = new URLSearchParams();
    if (options?.deactivate) params.append("deactivate", "true");
    if (options?.cascade) params.append("cascade", "true");
    const query = params.toString() ? `?${params.toString()}` : "";
    const res = await api.delete(`/services/services/${id}/${query}`);
    return res.data;
}

export async function generateAIDescriptionApi(prompt: string, currentData: ServiceFormData): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const generatedText = `This ${currentData.category} service named "${currentData.name}" is designed to provide comprehensive support for individuals and organizations. \n\nKey features include:\n- Professional assessment and certification\n- Compliance with national standards\n- Transparent and efficient processing\n\nPrompt details: ${prompt}`;
            resolve(generatedText);
        }, 2000);
    });
}
