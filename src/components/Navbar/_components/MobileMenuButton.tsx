import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavbarLogicReturn } from "../types";

export const MobileMenuButton = ({ logic }: { logic: NavbarLogicReturn }) => {
  const { isOpen, setIsOpen, scrolled } = logic;

  return (
    <button
      className={cn(
        "md:hidden p-2.5 rounded-full backdrop-blur-md border transition-all duration-300",
        scrolled
          ? "bg-white/50 border-slate-200 text-slate-800"
          : "bg-white/80 border-slate-200 text-slate-900",
      )}
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? <X size={20} /> : <Menu size={20} />}
    </button>
  );
};
