import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";

interface NotFoundHeaderProps {
  isRtl: boolean;
  dict: { goBack: string; returnHome: string };
  onGoBack: () => void;
  getHref: (path: string) => string;
}

export function NotFoundHeader({ isRtl, dict, onGoBack, getHref }: NotFoundHeaderProps) {
  return (
    <header className="relative z-10 w-full px-6 py-6 border-b border-white/5 bg-black/20 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href={getHref("/")} className="flex items-center gap-3 group transition-transform hover:scale-[1.02]">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-amber-500/10 border border-emerald-500/30 flex items-center justify-center p-1.5 shadow-lg shadow-emerald-950/50">
            <Image src="/logo.svg" alt="SUPKEM Logo" width={28} height={28} className="object-contain" priority />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-white tracking-wide font-outfit">SUPKEM</span>
            <span className="text-[10px] text-emerald-400/80 uppercase tracking-wider font-semibold">
              {isRtl ? "المجلس الأعلى لمسلمي كينيا" : "Supreme Council of Kenya Muslims"}
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={onGoBack}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            {isRtl ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
            <span>{dict.goBack}</span>
          </button>
          <Link
            href={getHref("/")}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-600/30 hover:text-white transition-all shadow-sm"
          >
            <Home size={14} />
            <span>{dict.returnHome}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
