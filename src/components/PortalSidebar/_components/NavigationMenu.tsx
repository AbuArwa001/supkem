import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PortalSidebarLogicReturn } from "../types";

export const NavigationMenu = ({ logic }: { logic: PortalSidebarLogicReturn }) => {
  const { isCollapsed, menuItems, pathname, onClose, t } = logic;

  return (
    <nav
      className={cn(
        "flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar flex flex-col",
        isCollapsed && "items-center px-2"
      )}
    >
      {!isCollapsed && (
        <div className="px-4 pb-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            {t("userMenu")}
          </p>
        </div>
      )}
      {menuItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={cn(
              "flex items-center justify-between px-4 py-3.5 rounded-2xl font-medium transition-all group relative overflow-hidden shrink-0",
              isActive
                ? "text-white shadow-lg"
                : "text-white/50 hover:bg-white/5 hover:text-white",
              isCollapsed ? "p-0 justify-center h-12 w-12" : "w-full"
            )}
          >
            {isActive && (
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50 opacity-90" />
            )}
            <div
              className={cn(
                "flex items-center gap-4 relative z-10 shrink-0",
                isCollapsed ? "justify-center w-full" : "w-full justify-start"
              )}
            >
              <item.icon
                size={20}
                className={cn(
                  "transition-colors shrink-0",
                  isActive
                    ? "text-secondary"
                    : "opacity-60 group-hover:opacity-100 group-hover:text-secondary/70"
                )}
              />
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="whitespace-nowrap overflow-hidden"
                >
                  {item.name}
                </motion.span>
              )}
            </div>
            {isActive && !isCollapsed && (
              <ChevronRight size={16} className="relative z-10 text-white/50" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};
