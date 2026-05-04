import { Link } from "@/i18n/routing";
import { LayoutDashboard, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavbarLogicReturn } from "../types";

export const AuthButtons = ({ logic }: { logic: NavbarLogicReturn }) => {
  const { isLoggedIn, t, scrolled } = logic;

  if (isLoggedIn) {
    return (
      <Link
        href="/admin"
        className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-slate-800 transition-all hover:scale-105 hover:shadow-lg hover:shadow-slate-900/20"
      >
        <LayoutDashboard size={16} />
        {t("dashboard")}
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/login"
        className={cn(
          "text-sm font-bold transition-all duration-300 px-4 py-2.5 rounded-full hover:bg-black/5",
          scrolled
            ? "text-slate-600 hover:text-slate-900"
            : "text-slate-700 hover:text-slate-900 hover:bg-slate-900/5",
        )}
      >
        {t("login")}
      </Link>
      <Link
        href="/register"
        className={cn(
          "px-7 py-2.5 rounded-full text-sm font-bold transition-all duration-500 hover:scale-105 shadow-md flex items-center gap-2 group",
          scrolled
            ? "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-slate-900/20"
            : "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-slate-900/20",
        )}
      >
        {t("applyNow")}{" "}
        <ChevronRight
          size={14}
          className="group-hover:translate-x-0.5 transition-transform"
        />
      </Link>
    </div>
  );
};
