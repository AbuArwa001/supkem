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
  Receipt,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { MenuItem } from "./types";
import { canAccessModule, getUserRoleName } from "@/lib/permissions";

export function useAdminSidebarLogic() {
  const t = useTranslations("Dashboard.admin.nav");
  const tp = useTranslations("Dashboard.portal.nav");
  const locale = useLocale();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const roleName = getUserRoleName(user);

  let overviewLabel = t("overview");
  let financeLabel = "Finance & Payments";

  if (roleName === "Finance Officer") {
    overviewLabel = "Finance Overview";
    financeLabel = "Payments & Ledger";
  } else if (roleName === "IT Officer") {
    overviewLabel = "IT Operations";
  }

  const allMenuItems: MenuItem[] = [
    { name: overviewLabel, href: "/admin", icon: LayoutDashboard, module: "overview" },
    { name: t("organizations"), href: "/admin/organizations", icon: Building2, module: "organizations" },
    { name: t("applications"), href: "/admin/applications", icon: FileText, module: "applications" },
    { name: t("certificates"), href: "/admin/certificates", icon: Award, module: "certificates" },
    { name: "Letters", href: "/admin/letters", icon: FileText, module: "letters" },
    { name: financeLabel, href: "/admin/finance", icon: Receipt, module: "finance" },
    { name: t("newsCms"), href: "/admin/news", icon: FileText, module: "news" },
    { name: t("newsPapers"), href: "/admin/news-papers", icon: FileText, module: "newspapers" },
    { name: t("leadership"), href: "/admin/leadership", icon: Users, module: "leadership" },
    { name: t("videoBriefings"), href: "/admin/videos", icon: Video, module: "videos" },
    { name: t("services"), href: "/admin/services", icon: Settings, module: "services" },
    { name: t("users"), href: "/admin/users", icon: Users, module: "users" },
    { name: t("settings"), href: "/admin/settings", icon: Settings, module: "settings" },
  ];

  const menuItems = allMenuItems.filter(
    (item) => !item.module || canAccessModule(user, item.module)
  );

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
