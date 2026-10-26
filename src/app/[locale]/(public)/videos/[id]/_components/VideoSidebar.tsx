import { Link } from "@/i18n/routing";
import ShareButton from "@/components/news/ShareButton";

interface VideoSidebarProps {
    title: string;
    actionsLabel: string;
    moreMediaLabel: string;
    stayInformedTitle: string;
    followChannelsDesc: string;
    contactPressLabel: string;
}

export function VideoSidebar({
    title,
    actionsLabel,
    moreMediaLabel,
    stayInformedTitle,
    followChannelsDesc,
    contactPressLabel,
}: VideoSidebarProps) {
    return (
        <aside className="space-y-6">
            <div className="bg-white rounded-[16px] p-6 shadow-xl shadow-black/5 border border-slate-100 space-y-6">
                <p className="text-xs font-black uppercase tracking-widest text-foreground/40 px-2">
                    {actionsLabel}
                </p>
                <ShareButton title={title} />
                <Link
                    href="/news"
                    className="w-full py-4 bg-slate-50 text-primary rounded-[20px] font-bold text-sm hover:bg-primary/5 transition-all flex items-center justify-center gap-2 border border-slate-100"
                >
                    {moreMediaLabel}
                </Link>
            </div>

            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-[16px] p-8 text-white shadow-xl shadow-primary/20 space-y-4">
                <h3 className="text-xl font-bold font-outfit tracking-tight">{stayInformedTitle}</h3>
                <p className="text-sm opacity-80 leading-relaxed font-medium">{followChannelsDesc}</p>
                <div className="pt-2">
                    <Link
                        href="/contact"
                        className="text-xs font-black uppercase tracking-widest underline underline-offset-4 hover:text-white/80 transition-all"
                    >
                        {contactPressLabel}
                    </Link>
                </div>
            </div>
        </aside>
    );
}
