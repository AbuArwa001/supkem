"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Languages } from "lucide-react";

export function LanguageToggle() {
  const [showArabicComingSoon, setShowArabicComingSoon] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const isArabicEnabled = process.env.NEXT_PUBLIC_ENABLE_ARABIC_API === "true";

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleARClick = () => {
    if (isArabicEnabled) {
      router.replace({ pathname }, { locale: "ar" });
    } else {
      setShowArabicComingSoon(true);
    }
  };

  const handleENClick = () => {
    if (isArabicEnabled) {
      router.replace({ pathname }, { locale: "en" });
    }
  };

  const modalContent = (
    <AnimatePresence>
      {showArabicComingSoon && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowArabicComingSoon(false)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[16px] overflow-hidden shadow-2xl border border-white z-10"
          >
            <div className="p-10 text-center space-y-6">
              <div className="w-20 h-20 bg-emerald-50 rounded-[24px] flex items-center justify-center mx-auto mb-4 border border-emerald-100 rotate-6 group-hover:rotate-0 transition-transform duration-500">
                <Languages size={40} className="text-[#0b4a2d]" />
              </div>

              <div className="space-y-4">
                <h3 className="text-3xl font-black font-outfit text-slate-900 tracking-tight whitespace-pre-line">
                  {t("arabicComingSoon")}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {t("comingSoonDesc")}
                </p>
                <p
                  className="text-[#0b4a2d] font-bold leading-relaxed text-lg"
                  dir="rtl"
                >
                  {t("comingSoonDescSecondary")}
                </p>
              </div>

              <button
                onClick={() => setShowArabicComingSoon(false)}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 transition-all active:scale-95"
              >
                {t("jazakAllah")}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-full border border-slate-200">
        <button
          onClick={handleENClick}
          className={cn(
            "px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full transition-colors",
            locale === "en"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-400 hover:text-slate-600"
          )}
        >
          EN
        </button>
        <button
          onClick={handleARClick}
          className={cn(
            "px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full transition-colors",
            locale === "ar"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-400 hover:text-slate-600"
          )}
        >
          AR
        </button>
      </div>
      {mounted && typeof document !== "undefined"
        ? createPortal(modalContent, document.body)
        : null}
    </>
  );
}
