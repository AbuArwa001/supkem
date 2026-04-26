import { use } from "react";
import { notFound } from "next/navigation";
import { getStrategicPillars } from "./_data/strategicPillarsData";
import StrategicFocusHero from "./_components/StrategicFocusHero";
import StrategicFocusContent from "./_components/StrategicFocusContent";

export default function StrategicFocusPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
    const { slug, locale } = use(params);

    const pillars = getStrategicPillars(locale);
    const content = pillars[slug as keyof typeof pillars];

    if (!content) {
        notFound();
    }

    return (
        <main className="bg-slate-50 min-h-screen">
            <StrategicFocusHero content={content} />
            <StrategicFocusContent content={content} />
        </main>
    );
}
