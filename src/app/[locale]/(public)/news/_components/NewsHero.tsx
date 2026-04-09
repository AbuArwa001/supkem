export function NewsHero() {
    return (
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-32 px-6 bg-slate-950">
            {/* Background Image with Slow Zoom */}
            <div className="absolute inset-0 z-0">
                <div className="relative w-full h-full opacity-40 animate-pulse">
                    <img
                        src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1600"
                        alt="News & Media"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Layered Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-10" />
                <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay z-10" />
            </div>

            <div className="max-w-4xl mx-auto relative z-20 text-center space-y-8">
                <div className="p-12 lg:p-16 rounded-[60px] bg-white/5 border border-white/10 backdrop-blur-2xl space-y-6 shadow-2xl">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-[0.2em] uppercase shadow-2xl mx-auto backdrop-blur-md">
                        Latest Announcements
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black font-outfit text-white tracking-tighter leading-none">
                        News & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 italic">Press</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-white/70 leading-relaxed font-medium max-w-2xl mx-auto">
                        Stay updated with the latest announcements, events, and reports from the Supreme Council.
                    </p>
                </div>
            </div>
        </section>
    );
}
