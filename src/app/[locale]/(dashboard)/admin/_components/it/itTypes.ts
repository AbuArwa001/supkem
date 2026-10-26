import { LucideIcon } from "lucide-react";

export interface AuditItem {
  id: number | string;
  user_details?: { email?: string; name?: string };
  action: string;
  content_type_name: string;
  object_repr: string;
  ip_address?: string;
  timestamp: string;
}

export interface SystemStats {
  database_engine?: string;
  recent_activity_count?: number;
  user_stats?: {
    total: number;
    active: number;
  };
  model_counts?: Record<string, number>;
}

export interface QuickActionItem {
  title: string;
  desc: string;
  href: string;
  icon: LucideIcon;
  badge: string;
  color: string;
  lightBg: string;
}

export interface IntegrationStatusItem {
  name: string;
  service: string;
  icon: LucideIcon;
  status: string;
  type: string;
  accent: string;
}
