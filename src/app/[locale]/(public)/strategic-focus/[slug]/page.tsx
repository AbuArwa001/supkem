import { use } from "react";
import { notFound } from "next/navigation";
import { STRATEGIC_PILLARS } from "./_data/strategicPillarsData";
import StrategicFocusHero from "./_components/StrategicFocusHero";
import StrategicFocusContent from "./_components/StrategicFocusContent";

export default function StrategicFocusPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);

    const content = STRATEGIC_PILLARS[slug as keyof typeof STRATEGIC_PILLARS];

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
