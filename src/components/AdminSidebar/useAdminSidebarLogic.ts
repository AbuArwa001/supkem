import { useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import {
  LayoutDashboard,
  Building2,
  FileText,
  Award,
  Users,
  Settings,
  Video,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { MenuItem } from "./types";

export function useAdminSidebarLogic() {
  const t = useTranslations("Dashboard.admin.nav");
  const tp = useTranslations("Dashboard.portal.nav");
  const locale = useLocale();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems: MenuItem[] = [
    { name: t("overview"), href: "/admin", icon: LayoutDashboard },
    { name: t("organizations"), href: "/admin/organizations", icon: Building2 },
    { name: t("applications"), href: "/admin/applications", icon: FileText },
    { name: t("certificates"), href: "/admin/certificates", icon: Award },
    { name: t("newsCms"), href: "/admin/news", icon: FileText },
    { name: t("newsPapers"), href: "/admin/news-papers", icon: FileText },
    { name: t("leadership"), href: "/admin/leadership", icon: Users },
    { name: t("videoBriefings"), href: "/admin/videos", icon: Video },
    { name: t("services"), href: "/admin/services", icon: Settings },
    { name: t("users"), href: "/admin/users", icon: Users },
    { name: t("settings"), href: "/admin/settings", icon: Settings },
  ];

  return {
    t,
    tp,
    locale,
    pathname,
    user,
    logout,
    isCollapsed,
    setIsCollapsed,
    menuItems,
  };
}
