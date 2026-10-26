import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface FloatingSaveBarProps {
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  onReset: () => void;
  onSave: () => void;
}

export function FloatingSaveBar({
  hasUnsavedChanges,
  isSaving,
  onReset,
  onSave,
}: FloatingSaveBarProps) {
  const t = useTranslations("Dashboard.admin.settings.social");

  return (
    <AnimatePresence>
      {hasUnsavedChanges && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="fixed bottom-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
        >
          <div className="bg-slate-900/95 backdrop-blur-md text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-4 pointer-events-auto max-w-xl w-full justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-semibold text-slate-200">
                {t("floatingUnsaved")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                disabled={isSaving}
                className="text-xs text-slate-300 hover:text-white hover:bg-slate-800 h-8"
              >
                {t("discard")}
              </Button>
              <Button
                size="sm"
                onClick={onSave}
                disabled={isSaving}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold gap-1.5 shadow-lg shadow-emerald-600/30 h-8"
              >
                {isSaving ? (
                  <RefreshCw size={13} className="animate-spin" />
                ) : (
                  <Save size={13} />
                )}
                {t("saveSettings")}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
