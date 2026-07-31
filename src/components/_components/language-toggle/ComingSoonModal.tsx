import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Languages } from "lucide-react";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  mounted: boolean;
}

export function ComingSoonModal({ isOpen, onClose, mounted }: ComingSoonModalProps) {
  const t = useTranslations("Navbar");

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
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
                onClick={onClose}
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

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(modalContent, document.body);
}
