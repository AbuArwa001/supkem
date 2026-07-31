import { ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PortalSidebarLogicReturn } from "../types";

export const ToggleButtons = ({ logic }: { logic: PortalSidebarLogicReturn }) => {
  const { isCollapsed, setIsCollapsed, locale, onClose } = logic;

  return (
    <>
      {/* Retract Toggle Button (Desktop) */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:flex absolute ltr:-right-3 rtl:-left-3 top-20 w-6 h-6 bg-primary rounded-full items-center justify-center border border-white/10 text-white z-[70] transition-transform hover:scale-110"
      >
        <ChevronRight
          size={14}
          className={cn(
            "transition-transform duration-300",
            !isCollapsed && "ltr:rotate-180 rtl:rotate-0",
            !isCollapsed && locale === "ar" && "rotate-180"
          )}
        />
      </button>

      {/* Mobile Close Button */}
      <button
        onClick={onClose}
        className="lg:hidden absolute top-6 ltr:right-6 rtl:left-6 p-2 text-white/40 hover:text-white transition-colors"
      >
        <X size={24} />
      </button>
    </>
  );
};
