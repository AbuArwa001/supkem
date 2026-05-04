import { cn } from "@/lib/utils";
import { NavbarLogicReturn } from "../types";

export const LanguageToggle = ({ logic }: { logic: NavbarLogicReturn }) => {
  const { locale, handleENClick, handleARClick } = logic;

  return (
    <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-full border border-slate-200">
      <button 
        onClick={handleENClick}
        className={cn(
          "px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full transition-colors",
          locale === "en" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
        )}
      >
        EN
      </button>
      <button
        onClick={handleARClick}
        className={cn(
          "px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full transition-colors",
          locale === "ar" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
        )}
      >
        AR
      </button>
    </div>
  );
};
