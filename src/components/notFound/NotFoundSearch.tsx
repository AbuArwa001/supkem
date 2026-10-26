"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";

interface NotFoundSearchProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  pressEnterText: string;
}

export function NotFoundSearch({
  searchQuery,
  onSearchChange,
  onKeyDown,
  placeholder,
  pressEnterText,
}: NotFoundSearchProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-xl mb-10"
    >
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/30 via-[#C9A050]/40 to-emerald-500/30 rounded-2xl blur-sm opacity-50 group-hover:opacity-100 transition duration-500" />
        <div className="relative flex items-center bg-slate-950/80 backdrop-blur-xl border border-white/15 rounded-2xl px-4 py-3 shadow-2xl">
          <Search className="w-5 h-5 text-emerald-400 shrink-0 mr-3 rtl:mr-0 rtl:ml-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className="w-full bg-transparent text-white placeholder:text-slate-500 text-sm sm:text-base outline-none focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={16} />
            </button>
          )}
          <div className="hidden sm:flex items-center gap-1.5 pl-3 rtl:pl-0 rtl:pr-3 border-l rtl:border-l-0 rtl:border-r border-white/10 text-[11px] text-slate-400 font-mono shrink-0">
            <span>↵</span>
            <span className="text-[10px] uppercase">{pressEnterText}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
