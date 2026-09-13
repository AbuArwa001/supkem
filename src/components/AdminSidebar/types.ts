import { LucideIcon } from "lucide-react";
import { PermissionModule } from "@/lib/permissions";

export interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export interface MenuItem {
  name: string;
  href: string;
  icon: LucideIcon;
  module?: PermissionModule;
}
