"use client";

import { motion } from "framer-motion";

export function NotFoundLatticeBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full bg-emerald-600/30 blur-[140px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full bg-amber-500/20 blur-[150px]"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#0B4A2D]/20 rounded-full blur-[160px]" />

      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03] text-emerald-300"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern id="islamic-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 80 40 L 40 80 L 0 40 Z M 0 0 L 40 40 L 0 80 M 80 0 L 40 40 L 80 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle cx="40" cy="40" r="14" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-grid)" />
      </svg>
    </div>
  );
}
