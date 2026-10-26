import {
  UserCircle,
  ShieldCheck,
  Bell,
  Cpu,
  Database,
  Share2,
  Plug,
} from "lucide-react";
import { SettingsCategoryItem } from "./SettingsCategoryCard";

export function getSettingsCategories(t: (key: string) => string): SettingsCategoryItem[] {
  return [
    {
      title: t("profileTitle"),
      description: t("profileDesc"),
      icon: UserCircle,
      color: "text-blue-600",
      bg: "bg-blue-50",
      link: "/admin/settings/profile",
      module: "settings_profile",
    },
    {
      title: t("socialTitle"),
      description: t("socialDesc"),
      icon: Share2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      link: "/admin/settings/social",
      module: "settings_social",
    },
    {
      title: t("systemParamsTitle"),
      description: t("systemParamsDesc"),
      icon: Cpu,
      color: "text-primary",
      bg: "bg-primary/5",
      link: "/admin/settings/system-parameters",
      module: "settings_system_parameters",
    },
    {
      title: t("notificationsTitle"),
      description: t("notificationsDesc"),
      icon: Bell,
      color: "text-amber-600",
      bg: "bg-amber-50",
      link: "/admin/settings/notifications",
      module: "settings_notifications",
    },
    {
      title: t("accessControlTitle"),
      description: t("accessControlDesc"),
      link: "/admin/settings/access-control",
      icon: ShieldCheck,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      module: "settings_access_control",
    },
    {
      title: t("auditTitle"),
      description: t("auditDesc"),
      link: "/admin/settings/audit",
      icon: Database,
      color: "text-slate-600",
      bg: "bg-slate-50",
      module: "settings_audit",
    },
    {
      title: t("integrationsTitle"),
      description: t("integrationsDesc"),
      link: "/admin/settings/integrations",
      icon: Plug,
      color: "text-violet-600",
      bg: "bg-violet-50",
      module: "settings_integrations",
    },
  ];
}
