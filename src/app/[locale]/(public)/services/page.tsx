import { ServicesCTA } from "@/app/[locale]/(public)/services/_components/ServicesCTA";
import { ServicesGrid } from "@/app/[locale]/(public)/services/_components/ServicesGrid";
import { ServicesHero } from "@/app/[locale]/(public)/services/_components/ServicesHero";

export default function ServicesPage() {
    return (
        <div className="space-y-24 pb-24">
            <ServicesHero />
            <ServicesGrid />
            <ServicesCTA />
        </div>
    );
}
