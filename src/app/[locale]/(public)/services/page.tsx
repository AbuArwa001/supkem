import { ServicesCTA } from "@/app/(public)/services/_components/ServicesCTA";
import { ServicesGrid } from "@/app/(public)/services/_components/ServicesGrid";
import { ServicesHero } from "@/app/(public)/services/_components/ServicesHero";

export default function ServicesPage() {
    return (
        <div className="space-y-24 pb-24">
            <ServicesHero />
            <ServicesGrid />
            <ServicesCTA />
        </div>
    );
}
