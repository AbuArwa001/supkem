"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AdminSidebarProps } from "./types";
import { useAdminSidebarLogic } from "./useAdminSidebarLogic";
import { MobileOverlay } from "./_components/MobileOverlay";
import { SidebarToggle } from "./_components/SidebarToggle";
import { MobileCloseButton } from "./_components/MobileCloseButton";
import { SidebarLogo } from "./_components/SidebarLogo";
import { SidebarNav } from "./_components/SidebarNav";
import { UserSection } from "./_components/UserSection";

const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps) => {
  const {
    t,
    tp,
    locale,
    pathname,
    user,
    logout,
    isCollapsed,
    setIsCollapsed,
    menuItems,
  } = useAdminSidebarLogic();

  return (
    <>
      <MobileOverlay isOpen={isOpen} onClose={onClose} />
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 80 : 300 }}
        className={cn(
          "h-screen sticky top-0 bg-[#0A1A14] border-r ltr:border-r rtl:border-l border-white/5 flex flex-col z-[60] text-slate-300 overflow-x-hidden",
          "fixed lg:sticky",
          isOpen
            ? "translate-x-0"
            : "ltr:-translate-x-full rtl:translate-x-full lg:translate-x-0 rtl:lg:translate-x-0 ltr:lg:translate-x-0"
        )}
      >
        <SidebarToggle
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          locale={locale}
        />
        <MobileCloseButton onClose={onClose} />
        <SidebarLogo isCollapsed={isCollapsed} t={t} />
        <SidebarNav
          menuItems={menuItems}
          pathname={pathname}
          isCollapsed={isCollapsed}
          onClose={onClose}
          t={t}
        />
        <UserSection
          isCollapsed={isCollapsed}
          user={user}
          logout={logout}
          t={t}
          tp={tp}
        />
      </motion.aside>
    </>
  );
};

export default AdminSidebar;
