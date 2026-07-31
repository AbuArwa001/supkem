"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePortalSidebarLogic } from "./usePortalSidebarLogic";
import { MobileOverlay } from "./_components/MobileOverlay";
import { ToggleButtons } from "./_components/ToggleButtons";
import { LogoArea } from "./_components/LogoArea";
import { NavigationMenu } from "./_components/NavigationMenu";
import { UserArea } from "./_components/UserArea";

interface PortalSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const PortalSidebar = (props: PortalSidebarProps) => {
  const logic = usePortalSidebarLogic(props);
  const { isOpen, isCollapsed } = logic;

  return (
    <>
      <MobileOverlay logic={logic} />

      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 300,
        }}
        className={cn(
          "h-screen sticky top-0 bg-[#0A1A14] border-r ltr:border-r rtl:border-l border-white/5 flex flex-col z-[60] text-slate-300 overflow-x-hidden",
          "fixed lg:sticky",
          isOpen
            ? "translate-x-0"
            : "ltr:-translate-x-full rtl:translate-x-full lg:translate-x-0 rtl:lg:translate-x-0 ltr:lg:translate-x-0"
        )}
      >
        <ToggleButtons logic={logic} />
        <LogoArea logic={logic} />
        <NavigationMenu logic={logic} />
        <UserArea logic={logic} />
      </motion.aside>
    </>
  );
};

export default PortalSidebar;
