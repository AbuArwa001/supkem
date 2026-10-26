"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ExternalLink, AlertCircle, Search } from "lucide-react";
import { NotFoundDestination } from "./notFoundTypes";

interface NotFoundDestinationsGridProps {
  destinations: NotFoundDestination[];
  quickNavigationLabel: string;
  noMatchesText: string;
  returnHomeLabel: string;
  searchQuery: string;
  getHref: (path: string) => string;
}

export function NotFoundDestinationsGrid({
  destinations,
  quickNavigationLabel,
  noMatchesText,
  returnHomeLabel,
  searchQuery,
  getHref,
}: NotFoundDestinationsGridProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="w-full max-w-4xl">
      <div className="flex items-center justify-between mb-4 px-2">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400/90 font-outfit">{quickNavigationLabel}</span>
        {searchQuery && <span className="text-xs text-slate-400">{destinations.length} destination{destinations.length === 1 ? "" : "s"}</span>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {destinations.map((dest) => {
            const Icon = dest.icon;
            return (
              <motion.div key={dest.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }}>
                <Link href={getHref(dest.href)} className="group flex flex-col justify-between h-full p-4 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-950/30 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/40 text-left rtl:text-right">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[#C9A050] group-hover:text-emerald-300 group-hover:bg-emerald-500/20 transition-colors">
                        <Icon size={20} />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-emerald-300 uppercase tracking-wider">
                        {dest.badge}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors font-outfit mb-1">{dest.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{dest.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-emerald-400/70 group-hover:text-emerald-300 transition-colors">
                    <span className="font-semibold text-[11px]">{returnHomeLabel.split(" ")[0]} →</span>
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {destinations.length === 0 && (
        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 text-center space-y-3">
          <AlertCircle size={28} className="mx-auto text-amber-400 opacity-70" />
          <p className="text-sm text-slate-400">{noMatchesText}</p>
          <Link href={getHref(`/services?search=${encodeURIComponent(searchQuery)}`)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/30 border border-emerald-500/40 text-emerald-200 text-xs font-bold hover:bg-emerald-600/50 transition-colors">
            <Search size={14} /> Search catalog for &ldquo;{searchQuery}&rdquo;
          </Link>
        </div>
      )}
    </motion.div>
  );
}
