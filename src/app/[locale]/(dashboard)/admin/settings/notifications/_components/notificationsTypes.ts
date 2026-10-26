export interface SystemParameter {
  id: string;
  key: string;
  name: string;
  description: string;
  value: string;
  data_type: "string" | "number" | "boolean" | "json";
  category: "general" | "financial" | "notifications" | "system";
  updated_at: string;
}

export interface Role {
  id: string;
  role_name: string;
}
