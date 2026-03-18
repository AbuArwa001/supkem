import Link from "next/link";

export function ServicesCTA() {
    return (
        <section className="max-w-5xl mx-auto px-6">
            <div className="premium-gradient p-12 lg:p-20 rounded-[50px] text-white flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl">
                <div className="space-y-4 max-w-md">
                    <h2 className="text-4xl font-bold font-outfit">Need a custom certification?</h2>
                    <p className="text-white/70 font-medium">Our team is ready to guide you through complex registration and certification requirements.</p>
                </div>
                <Link href="/contact" className="px-10 py-5 bg-white text-primary rounded-2xl font-bold text-lg hover:bg-secondary hover:text-white transition-all shadow-xl whitespace-nowrap">
                    Contact Support
                </Link>
            </div>
        </section>
    );
}
