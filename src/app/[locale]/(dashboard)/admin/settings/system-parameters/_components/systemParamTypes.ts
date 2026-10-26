import { Settings2, LayoutDashboard, DollarSign, Bell, Cpu } from "lucide-react";

export interface SystemParameter {
  id: string;
  key: string;
  name: string;
  description: string;
  value: string;
  data_type: "string" | "number" | "boolean" | "json";
  category: "general" | "financial" | "notifications" | "system" | "integrations";
  updated_at: string;
}

export type ParameterCategory = SystemParameter["category"];

export const CATEGORY_CONFIG: Record<string, { label: string; icon: any; color: string }> = {
  general: { label: "General", icon: LayoutDashboard, color: "text-indigo-600 bg-indigo-50" },
  financial: { label: "Financial", icon: DollarSign, color: "text-emerald-600 bg-emerald-50" },
  notifications: { label: "Notifications", icon: Bell, color: "text-rose-600 bg-rose-50" },
  system: { label: "System", icon: Cpu, color: "text-slate-600 bg-slate-50" },
  integrations: { label: "Integrations", icon: Settings2, color: "text-violet-600 bg-violet-50" },
};
