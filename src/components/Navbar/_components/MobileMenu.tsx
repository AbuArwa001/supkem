import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavbarLogicReturn } from "../types";

export const MobileMenu = ({ logic }: { logic: NavbarLogicReturn }) => {
  const { isOpen, setIsOpen, navLinks, pathname, t, locale, handleENClick, handleARClick } = logic;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-4 right-4 mt-2 bg-white/95 backdrop-blur-2xl shadow-2xl rounded-3xl p-6 md:hidden flex flex-col gap-2 border border-slate-200/60 overflow-hidden"
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
                  "text-lg font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-between group",
                  isActive
                    ? "bg-slate-900 text-white shadow-md"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
                <ChevronRight
                  size={16}
                  className={cn(
                    "transition-all group-hover:translate-x-1",
                    isActive ? "text-white" : "text-slate-300 group-hover:text-slate-900",
                  )}
                />
              </Link>
            );
          })}

          <div className="h-px bg-slate-100 my-4" />

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                {t("language")}
              </p>
              <div className="flex items-center gap-1 p-1 bg-white rounded-full border border-slate-200">
                <button 
                  onClick={() => { setIsOpen(false); handleENClick(); }}
                  className={cn(
                    "px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full",
                    locale === "en" ? "bg-slate-900 text-white" : "text-slate-400"
                  )}
                >
                  EN
                </button>
                <button
                  onClick={() => { setIsOpen(false); handleARClick(); }}
                  className={cn(
                    "px-4 py-1.5 text-[10px] font-black uppercase tracking-widest",
                    locale === "ar" ? "bg-slate-900 text-white rounded-full" : "text-slate-400"
                  )}
                >
                  AR
                </button>
              </div>
            </div>

            <Link href="/login" className="text-center py-4 bg-slate-50 text-slate-700 rounded-2xl font-bold hover:bg-slate-100 transition-colors border border-slate-200">
              {t("memberLogin")}
            </Link>
            <Link href="/register" className="text-center py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2">
              {t("applyNow")} <ChevronRight size={16} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
