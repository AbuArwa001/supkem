import api from "@/lib/api";

import { ServiceItem, ServiceFormData } from "./types";

export async function fetchServicesApi(): Promise<ServiceItem[]> {
    const res = await api.get("/services/services/");
    return res.data.results || res.data;
}

export async function createServiceApi(data: ServiceFormData): Promise<void> {
    await api.post("/services/services/", data);
}

export async function updateServiceApi(id: string, data: ServiceFormData): Promise<void> {
    await api.patch(`/services/services/${id}/`, data);
}

export async function deleteServiceApi(id: string): Promise<void> {
    await api.delete(`/services/services/${id}/`);
}

// Simulating AI generation for now as in original code
export async function generateAIDescriptionApi(prompt: string, currentData: ServiceFormData): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const generatedText = `This ${currentData.category} service named "${currentData.name}" is designed to provide comprehensive support for individuals and organizations. \n\nKey features include:\n- Professional assessment and certification\n- Compliance with national standards\n- Transparent and efficient processing\n\nPrompt details: ${prompt}`;
            resolve(generatedText);
        }, 2000);
    });
}
