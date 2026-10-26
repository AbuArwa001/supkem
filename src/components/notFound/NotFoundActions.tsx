"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ShieldCheck, ArrowRight, ArrowLeft, Check, Copy } from "lucide-react";
import { NotFoundDictionaryLocale } from "./notFoundTypes";

interface NotFoundActionsProps {
  dict: NotFoundDictionaryLocale;
  isRtl: boolean;
  currentPath: string;
  copied: boolean;
  onGoBack: () => void;
  onCopyUrl: () => void;
  getHref: (path: string) => string;
}

export function NotFoundActions({
  dict,
  isRtl,
  currentPath,
  copied,
  onGoBack,
  onCopyUrl,
  getHref,
}: NotFoundActionsProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <Link
          href={getHref("/")}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0B4A2D] via-[#106A42] to-[#0B4A2D] border border-emerald-400/40 text-white font-bold text-sm shadow-xl shadow-emerald-950/60 hover:shadow-emerald-700/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 font-outfit group"
        >
          <Home size={18} className="text-amber-300 group-hover:rotate-6 transition-transform" />
          <span>{dict.returnHome}</span>
        </Link>

        <Link
          href={getHref("/verify")}
          className="px-7 py-3.5 rounded-xl bg-white/5 border border-emerald-500/30 hover:bg-emerald-950/40 hover:border-emerald-400/50 text-emerald-300 font-semibold text-sm transition-all flex items-center gap-2.5 hover:scale-105"
        >
          <ShieldCheck size={18} className="text-emerald-400" />
          <span>{dict.destinations[0].title}</span>
        </Link>

        <button
          onClick={onGoBack}
          className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white font-medium text-sm transition-all cursor-pointer flex items-center gap-2"
        >
          {isRtl ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
          <span>{dict.goBack}</span>
        </button>
      </motion.div>

      {currentPath && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-400 max-w-xl"
        >
          <span className="text-slate-500">{dict.requestedUrl}:</span>
          <code className="font-mono text-emerald-300 text-[11px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20 max-w-[260px] sm:max-w-[340px] truncate">
            {currentPath}
          </code>
          <button
            onClick={onCopyUrl}
            className="inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition-colors cursor-pointer ml-1"
          >
            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            <span>{copied ? dict.urlCopied : dict.copyUrl}</span>
          </button>
          <span className="text-slate-600">•</span>
          <a
            href={`mailto:support@supkem.org?subject=${encodeURIComponent("Broken Link Report: " + currentPath)}&body=${encodeURIComponent("I encountered a 404 error at: " + currentPath + "\n\nPlease investigate.")}`}
            className="text-[11px] text-amber-400/80 hover:text-amber-300 transition-colors"
          >
            {dict.reportIssue}
          </a>
        </motion.div>
      )}
    </>
  );
}
