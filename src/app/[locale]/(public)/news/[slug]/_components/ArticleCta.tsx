import { BookOpen, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";

interface ArticleCtaProps {
    readMoreText: string;
    browseDescText: string;
    allArticlesText: string;
}

export function ArticleCta({ readMoreText, browseDescText, allArticlesText }: ArticleCtaProps) {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-[24px] bg-emerald-950/40 border border-emerald-500/20 shadow-xl">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400">
                    <BookOpen size={22} />
                </div>
                <div>
                    <p className="font-bold text-white text-base">{readMoreText}</p>
                    <p className="text-sm text-slate-400">{browseDescText}</p>
                </div>
            </div>
            <Link
                href="/news/articles"
                className="px-6 py-3 bg-emerald-500 text-slate-950 rounded-2xl font-bold hover:bg-emerald-400 transition-all flex items-center gap-2 shrink-0 text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20"
            >
                <ArrowLeft size={14} /> {allArticlesText}
            </Link>
        </div>
    );
}
