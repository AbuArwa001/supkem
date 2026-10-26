import { ServiceItem, ServiceFormData } from "../types";

export function getServiceFormData(item: ServiceItem | null, defaultCategory: string): ServiceFormData {
  if (item) {
    return {
      name: item.name || item.name_en || item.name_ar || "",
      category: item.category,
      target_audience: item.target_audience || "Both",
      document_type: item.document_type || "Certificate",
      description: item.description || item.description_en || item.description_ar || "",
      fee: item.fee,
      is_active: item.is_active,
      is_indefinite: item.is_indefinite !== undefined ? item.is_indefinite : true,
      validity_duration: item.validity_duration || "Indefinite",
      expiration_date: item.expiration_date || item.end_date || null,
      start_date: item.start_date || null,
      end_date: item.end_date || item.expiration_date || null,
    };
  }
  return {
    name: "",
    category: defaultCategory,
    target_audience: "Both",
    document_type: "Certificate",
    description: "",
    fee: "",
    is_active: true,
    is_indefinite: true,
    validity_duration: "Indefinite",
    expiration_date: null,
    start_date: null,
    end_date: null,
  };
}
