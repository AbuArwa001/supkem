import { Calendar, User, ArrowLeft, Film } from "lucide-react";
import { Link } from "@/i18n/routing";

interface VideoHeroProps {
    title: string;
    createdAt: string;
    locale: string;
    backText: string;
    pressBriefingText: string;
    supkemMediaText: string;
}

export function VideoHero({
    title,
    createdAt,
    locale,
    backText,
    pressBriefingText,
    supkemMediaText,
}: VideoHeroProps) {
    const formattedDate = new Date(createdAt).toLocaleDateString(
        locale === "ar" ? "ar-KE" : "en-US",
        { year: "numeric", month: "long", day: "numeric" }
    );

    return (
        <header className="relative bg-black pt-20 pb-12 lg:pt-32 lg:pb-24 px-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 space-y-8">
                <Link
                    href="/news"
                    className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs bg-white/5 px-4 py-2 rounded-full backdrop-blur-md"
                >
                    <ArrowLeft size={14} /> {backText}
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-12 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest">
                            <Film size={12} /> {pressBriefingText}
                        </div>
                        <h1 className="text-4xl lg:text-7xl font-black font-outfit text-white leading-tight tracking-tighter">
                            {title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-8 text-sm font-bold text-white/40 uppercase tracking-widest">
                            <span className="flex items-center gap-2.5">
                                <Calendar size={16} className="text-primary" />
                                {formattedDate}
                            </span>
                            <span className="flex items-center gap-2.5">
                                <User size={16} className="text-primary" />
                                {supkemMediaText}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
