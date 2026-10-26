import { Calendar, User, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";
import Image from "next/image";

interface ArticleHeroProps {
    title: string;
    featuredImage: string;
    createdAt: string;
    locale: string;
    backText: string;
    pressText: string;
}

export function ArticleHero({
    title, featuredImage, createdAt, locale, backText, pressText,
}: ArticleHeroProps) {
    const formattedDate = new Date(createdAt).toLocaleDateString(
        locale === "ar" ? "ar-KE" : "en-US",
        { year: "numeric", month: "long", day: "numeric" }
    );

    return (
        <header className="relative h-[65vh] min-h-[520px] flex items-end overflow-hidden">
            <div className="absolute inset-0">
                <Image src={featuredImage} alt={title} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
            </div>

            <div className="max-w-4xl mx-auto px-6 pb-16 w-full relative z-10 space-y-6">
                <Link
                    href="/news/articles"
                    className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs bg-slate-900/80 px-5 py-2.5 rounded-full border border-slate-700 backdrop-blur-md shadow-xl"
                >
                    <ArrowLeft size={14} className="text-emerald-400" /> {backText}
                </Link>
                <h1 className="text-4xl lg:text-6xl font-black font-outfit text-white leading-tight max-w-3xl">
                    {title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-300 uppercase tracking-widest">
                    <span className="flex items-center gap-2">
                        <Calendar size={14} className="text-amber-400" />
                        {formattedDate}
                    </span>
                    <span className="flex items-center gap-2">
                        <User size={14} className="text-emerald-400" /> {pressText}
                    </span>
                </div>
            </div>
        </header>
    );
}
