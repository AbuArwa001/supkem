"use client";

import { motion } from "framer-motion";
import { Compass } from "lucide-react";

interface NotFoundEmblemProps {
  badge: string;
  title: string;
  description: string;
}

export function NotFoundEmblem({ badge, title, description }: NotFoundEmblemProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 shadow-lg shadow-emerald-950/60 mb-6"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
        </span>
        <span className="text-xs font-bold tracking-wider uppercase">{badge}</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative my-2 select-none"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-amber-500/15 to-emerald-500/10 blur-3xl rounded-full" />
        <div className="relative inline-flex items-center justify-center">
          <h1 className="text-[130px] sm:text-[180px] md:text-[220px] font-black font-outfit tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-emerald-100/30 to-white/5 drop-shadow-2xl">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, 4, -4, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-3xl bg-gradient-to-br from-emerald-900/70 via-[#0B4A2D]/80 to-slate-950/90 border border-emerald-400/30 backdrop-blur-2xl shadow-[0_15px_50px_rgba(11,74,45,0.6)] flex items-center justify-center relative group p-4 pointer-events-auto"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-amber-500/20 via-transparent to-emerald-400/20 opacity-60" />
              <div className="relative flex flex-col items-center justify-center text-center">
                <Compass size={56} className="text-[#C9A050] drop-shadow-[0_0_15px_rgba(201,160,80,0.5)] group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-300/80 mt-2 font-outfit">SUPKEM</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-2xl mx-auto space-y-4 mb-8"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-outfit text-white tracking-tight">
          {title}
        </h2>
        <p className="text-base sm:text-lg text-slate-300/80 font-normal leading-relaxed">
          {description}
        </p>
      </motion.div>
    </>
  );
}
