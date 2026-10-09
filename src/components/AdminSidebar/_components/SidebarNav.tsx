import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MenuItem } from "../types";

export const SidebarNav = ({
  menuItems,
  pathname,
  isCollapsed,
  onClose,
  t,
}: {
  menuItems: MenuItem[];
  pathname: string;
  isCollapsed: boolean;
  onClose?: () => void;
  t: (key: string) => string;
}) => {
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
            {t("mainMenu")}
          </p>
        </div>
      )}
      {menuItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/admin" && pathname?.startsWith(`${item.href}/`));
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={cn(
              "flex items-center justify-between px-4 py-3.5 rounded-2xl font-medium transition-all group relative overflow-hidden shrink-0",
              isActive
                ? "text-white shadow-lg shadow-black/20 font-semibold"
                : "text-white/60 hover:bg-white/5 hover:text-white",
              isCollapsed ? "p-0 justify-center h-12 w-12" : "w-full"
            )}
          >
            {isActive && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-emerald-800/90 shadow-inner" />
                <div className="absolute ltr:left-0 rtl:right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-amber-400 rounded-full" />
              </>
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
                    ? "text-amber-400"
                    : "opacity-60 group-hover:opacity-100 group-hover:text-amber-400/70"
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
              <ChevronRight
                size={16}
                className="relative z-10 text-amber-400/80"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};
