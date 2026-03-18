import { ContactForm } from "@/app/(public)/contact/_components/ContactForm";
import { ContactHero } from "@/app/(public)/contact/_components/ContactHero";
import { ContactInfo } from "@/app/(public)/contact/_components/ContactInfo";

export default function ContactPage() {
    return (
        <div className="bg-white">
            <ContactHero />

            {/* Contact Content */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                    <ContactInfo />
                    <ContactForm />
                </div>
            </section>
        </div>
    );
}
