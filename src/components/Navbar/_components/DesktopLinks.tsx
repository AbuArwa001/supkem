import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { NavbarLogicReturn } from "../types";

export const DesktopLinks = ({ logic }: { logic: NavbarLogicReturn }) => {
  const { navLinks, pathname, scrolled } = logic;

  return (
    <div
      className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full border transition-all duration-300"
      style={{
        backgroundColor: scrolled
          ? "rgba(255, 255, 255, 0.5)"
          : "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(12px)",
        borderColor: scrolled
          ? "rgba(226, 232, 240, 0.8)"
          : "rgba(226, 232, 240, 0.6)",
      }}
    >
      {navLinks.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.href !== "/" && pathname?.startsWith(link.href));
        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105",
              isActive
                ? "bg-slate-900 text-white shadow-md"
                : scrolled
                  ? "text-slate-700 hover:text-slate-900 hover:bg-slate-900/5"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-900/5",
            )}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
};
