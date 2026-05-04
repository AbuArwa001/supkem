import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useTranslations, useLocale } from "next-intl";
import {
  LayoutDashboard,
  Building2,
  FileText,
  Award,
  Mail,
  Settings,
} from "lucide-react";
import { PortalSidebarLogicReturn } from "./types";

export const usePortalSidebarLogic = ({
  isOpen,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}): PortalSidebarLogicReturn => {
  const t = useTranslations("Dashboard.portal.nav");
  const locale = useLocale();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: t("dashboard"), href: "/portal", icon: LayoutDashboard },
    {
      name: t("organizations"),
      href: "/portal/organizations",
      icon: Building2,
    },
    { name: t("applications"), href: "/portal/applications", icon: FileText },
    { name: t("certificates"), href: "/portal/certificates", icon: Award },
    { name: t("letters"), href: "/portal/letters", icon: Mail },
    { name: t("profile"), href: "/portal/profile", icon: Settings },
  ];

  return {
    isOpen,
    onClose,
    isCollapsed,
    setIsCollapsed,
    t,
    locale,
    pathname,
    user,
    logout,
    menuItems,
  };
};
