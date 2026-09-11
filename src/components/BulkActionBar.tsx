"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckSquare, X } from "lucide-react";

interface BulkActionBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  children: React.ReactNode;
}

export function BulkActionBar({
  selectedCount,
  onClearSelection,
  children,
}: BulkActionBarProps) {
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="fixed bottom-6 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-50 max-w-2xl w-full"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 sm:p-4 bg-slate-900/95 text-white rounded-2xl shadow-2xl backdrop-blur-md border border-slate-700/80">
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-primary/20 text-emerald-400 flex items-center justify-center font-black text-xs">
                  <CheckSquare size={16} />
                </div>
                <span className="text-xs sm:text-sm font-bold">
                  <span className="text-emerald-400 font-black">{selectedCount}</span> application{selectedCount > 1 ? "s" : ""} selected
                </span>
              </div>
              <button
                type="button"
                onClick={onClearSelection}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Deselect all"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
