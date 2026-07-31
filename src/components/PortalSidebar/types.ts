import { LucideIcon } from "lucide-react";

export interface MenuItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

export interface PortalSidebarLogicReturn {
  isOpen?: boolean;
  onClose?: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  t: (key: string) => string;
  locale: string;
  pathname: string;
  user: any;
  logout: () => void;
  menuItems: MenuItem[];
}
