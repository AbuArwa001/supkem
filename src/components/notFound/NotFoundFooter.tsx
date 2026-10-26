import Link from "next/link";

interface NotFoundFooterProps {
  isRtl: boolean;
  getHref: (path: string) => string;
}

export function NotFoundFooter({ isRtl, getHref }: NotFoundFooterProps) {
  return (
    <footer className="relative z-10 w-full px-6 py-6 border-t border-white/5 bg-black/30 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left rtl:sm:text-right">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Supreme Council of Kenya Muslims (SUPKEM)</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-500">Official National Portal</span>
        </div>

        <div className="flex items-center gap-5 text-xs text-slate-400">
          <Link href={getHref("/services")} className="hover:text-emerald-300 transition-colors">
            {isRtl ? "الخدمات" : "Services"}
          </Link>
          <Link href={getHref("/verify")} className="hover:text-emerald-300 transition-colors">
            {isRtl ? "التحقق" : "Verification"}
          </Link>
          <Link href={getHref("/news")} className="hover:text-emerald-300 transition-colors">
            {isRtl ? "الأخبار" : "News"}
          </Link>
          <Link href={getHref("/contact")} className="hover:text-emerald-300 transition-colors">
            {isRtl ? "اتصل بنا" : "Contact"}
          </Link>
        </div>
      </div>
    </footer>
  );
}
