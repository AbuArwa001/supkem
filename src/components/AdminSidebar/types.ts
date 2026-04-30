import { LucideIcon } from "lucide-react";

export interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export interface MenuItem {
  name: string;
  href: string;
  icon: LucideIcon;
}
