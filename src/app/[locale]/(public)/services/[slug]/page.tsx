"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { CheckCircle2, FileCheck, Users, Briefcase, GraduationCap, HeartHandshake, ShieldCheck, Heart, Plane, FileText, BookOpen } from "lucide-react";

import { SERVICES_DATA } from "@/app/[locale]/(public)/services/[slug]/_data/servicesData";
import { ServiceHero } from "@/app/[locale]/(public)/services/[slug]/_components/ServiceHero";
import { ServiceArticle } from "@/app/[locale]/(public)/services/[slug]/_components/ServiceArticle";
import { ServiceSidebar } from "@/app/[locale]/(public)/services/[slug]/_components/ServiceSidebar";

const iconMap: Record<string, React.ElementType> = {
    FileCheck, Users, Briefcase, GraduationCap, HeartHandshake, ShieldCheck, Heart, Plane, FileText, BookOpen
};

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const service = SERVICES_DATA[slug];

    if (!service) {
        notFound();
    }

    const IconComponent = iconMap[service.icon] || CheckCircle2;

    return (
        <main className="bg-slate-50 min-h-screen pb-24">
            <ServiceHero service={service} IconComponent={IconComponent} />

            <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <ServiceArticle service={service} />
                    <ServiceSidebar features={service.features} IconComponent={IconComponent} />
                </div>
            </section>
        </main>
    );
}
