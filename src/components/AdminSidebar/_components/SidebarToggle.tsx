import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const SidebarToggle = ({
  isCollapsed,
  setIsCollapsed,
  locale,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  locale: string;
}) => {
  return (
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
  );
};
