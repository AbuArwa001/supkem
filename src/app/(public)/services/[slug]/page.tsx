"use client";

import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, FileCheck, Users, Briefcase, GraduationCap, HeartHandshake, ArrowRight, ShieldCheck, CheckCircle2, Heart, Plane, FileText, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { use } from "react";

// Using Lucide React Icons
const iconMap: Record<string, React.ElementType> = {
    FileCheck, Users, Briefcase, GraduationCap, HeartHandshake, ShieldCheck, Heart, Plane, FileText, BookOpen
};

// Detailed Mock Content for Services
const SERVICES_DATA = {
    "organization-registration": {
        title: "Organization Registration",
        subtitle: "Official recognition and enrollment",
        description: "Streamlined registration services for mosques, Islamic schools, and Muslim NGOs operating across Kenya, ensuring compliance and integration within the Ummah.",
        heroImage: "/images/slider/olesaudib.jpg",
        icon: "FileCheck",
        category: "Administrative",
        features: [
            "Digital Certificate issuance upon approval",
            "Official inclusion in the National Ummah Directory",
            "Guidance on regulatory compliance and governance"
        ],
        details: "Registering your organization under SUPKEM provides not only official recognition but also integrates your entity into a unified national network. This ensures you receive timely updates, access to capacity-building programs, and a unified voice in national matters affecting the Muslim community."
    },
    "halal-certification": {
        title: "Halal Certification",
        subtitle: "Rigorous vetting and accreditation",
        description: "Comprehensive Halal certification for businesses, food and beverage producers, and service providers to ensure strict compliance with Islamic dietary laws.",
        heroImage: "/images/slider/image.png",
        icon: "ShieldCheck", // fallback if "LOGO" was used previously
        category: "Certification",
        features: [
            "Rigorous on-site inspections and auditing",
            "Issuance of globally recognized Halal logo",
            "Continuous compliance monitoring and support"
        ],
        details: "Our Halal Certification process guarantees that products consumed by the Muslim Ummah adhere strictly to Sharia guidelines. We provide a transparent, efficient, and recognized certification process that boosts consumer confidence both locally and internationally."
    },
    "advocacy-legal-support": {
        title: "Advocacy & Legal Support",
        subtitle: "Representing the community's interest",
        description: "Dedicated representation for the Muslim community in legal matters, policy advocacy, and governmental affairs to protect constitutional rights.",
        heroImage: "/images/slider/ole_olesapitb.jpg",
        icon: "Briefcase",
        category: "Community",
        features: [
            "Legal counsel and representation for Islamic institutions",
            "Policy advocacy at National and County levels",
            "Protection against discrimination and marginalization"
        ],
        details: "SUPKEM stands as the unified voice for Muslims in Kenya. Our legal and advocacy wing works tirelessly with state and non-state actors to ensure that laws, policies, and national dialogues reflect and protect the interests, rights, and dignity of the Muslim Ummah."
    },
    "educational-programs": {
        title: "Educational Programs",
        subtitle: "Empowering the next generation",
        description: "Scholarship coordination, curriculum development support, and capacity building for Islamic educational institutions from primary to tertiary levels.",
        heroImage: "/images/slider/olerezo_nb.jpg",
        icon: "GraduationCap",
        category: "Education",
        features: [
            "Coordination of local and international scholarships",
            "Support for Integrated Islamic Education Curricula",
            "Teacher training and capacity building programs"
        ],
        details: "Education is a central pillar of societal progress. We collaborate with global educational partners and the Ministry of Education to secure scholarships, improve school infrastructure, and ensure Islamic Religious Education (IRE) standards are upheld."
    },
    "social-welfare": {
        title: "Social Welfare",
        subtitle: "Humanitarian aid and social support",
        description: "Coordinating Zakat distribution, emergency humanitarian aid, and sustainable social welfare programs during times of crisis and need.",
        heroImage: "/images/slider/olesaudib.jpg", // Reusing image
        icon: "HeartHandshake",
        category: "Welfare",
        features: [
            "Emergency relief and disaster management",
            "Transparent Zakat and Sadaqah distribution",
            "Support programs for orphans and the destitute"
        ],
        details: "Guided by the principles of compassion and charity in Islam, our Social Welfare department mobilizes resources to support the vulnerable. From drought relief in ASAL regions to urban poverty alleviation, we ensure aid reaches those who need it most."
    },
    "conflict-resolution": {
        title: "Conflict Resolution",
        subtitle: "Fostering peace within the Ummah",
        description: "Professional mediation and arbitration services designed to resolve organizational, community, and marital disputes within the framework of Islamic guidelines.",
        heroImage: "/images/slider/image.png", // Reusing image
        icon: "Users",
        category: "Legal",
        features: [
            "Mediation of mosque committee disputes",
            "Islamic marriage (Nikah) and divorce counselling",
            "Community cohesion and peace-building dialogues"
        ],
        details: "Peace and unity are paramount. Our conflict resolution services provide a neutral, Sharia-compliant platform to mediate disputes, averting protracted legal battles and preserving harmony within families, mosques, and the broader community."
    },
    "marriage-certificates": {
        title: "Marriage Certificates",
        subtitle: "Islamic marriage (Nikah) certification",
        description: "Official Islamic marriage certification recognized under Kenyan law, providing legal and religious validity to your union through professional Sharia-compliant processing.",
        heroImage: "/images/slider/olerezo_nb.jpg",
        icon: "Heart",
        category: "Individuals",
        features: [
            "Sharia-compliant Nikah certification",
            "Legal recognition under Kenyan Statutes",
            "Marriage counseling and pre-marital resources",
            "Secure digital record keeping"
        ],
        details: "A valid marriage certificate is essential for various legal and administrative procedures. SUPKEM provides certified Nikah documents that are recognized by the Registrar of Marriages in Kenya. We guide couples through the process, ensuring all religious requirements are met while aligning with national legal standards."
    },
    "hajj-umrah": {
        title: "Hajj & Umrah Facilitation",
        subtitle: "Guidance for the sacred journey",
        description: "Comprehensive support for pilgrims embarking on Hajj and Umrah, providing essential documentation, logistical coordination, and spiritual guidance.",
        heroImage: "/images/slider/olesaudib.jpg",
        icon: "Plane",
        category: "Individuals",
        features: [
            "Official embassy support letters",
            "Logistics and travel protocol guidance",
            "Pre-departure educational seminars",
            " pilgrim welfare coordination"
        ],
        details: "The journey to the Holy Lands is a significant milestone for every Muslim. Our department works closely with the Hajj Mission and travel agencies to ensure pilgrims are well-prepared. We provide the necessary recommendation letters for visa processing and conduct orientation sessions to help you perform your rituals with ease and focus."
    },
    "visa-advisory": {
        title: "Travel Visa Advisory",
        subtitle: "Support for religious and educational travel",
        description: "Expert advisory services and official recommendation letters to facilitate visa applications for religious pilgrimages and international educational pursuits.",
        heroImage: "/images/slider/ole_olesapitb.jpg",
        icon: "FileText",
        category: "Individuals",
        features: [
            "Specialized religious travel advisory",
            "Official SUPKEM recommendation letters",
            "Documentation review and verification",
            "Support for students and religious scholars"
        ],
        details: "Applying for visas for religious or educational travel can be complex. SUPKEM provides formal support letters to embassies, verifying the religious or academic nature of your travel. While we do not issue visas, our advisory service helps ensure your application is well-documented and meets the necessary criteria for consideration."
    },
    "study-abroad": {
        title: "Study Abroad Letters",
        subtitle: "Supporting educational aspirations",
        description: "Official recommendation and support letters for Muslim students applying for international scholarships and university placements across the globe.",
        heroImage: "/images/slider/olerezo_nb.jpg",
        icon: "BookOpen",
        category: "Individuals",
        features: [
            "University admission recommendation letters",
            "Scholarship support documentation",
            "Academic pathway and institution guidance",
            "Verification of student credentials"
        ],
        details: "We are committed to the academic advancement of the Muslim youth. For students seeking higher education abroad, SUPKEM provides official letters that vouch for the student's background and aspirations. These letters are often required or highly valued by international universities and scholarship boards as part of the admission and vetting process."
    }
};

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const service = SERVICES_DATA[slug as keyof typeof SERVICES_DATA];

    if (!service) {
        notFound();
    }

    const IconComponent = iconMap[service.icon] || CheckCircle2;

    return (
        <main className="bg-slate-50 min-h-screen pb-24">
            {/* Hero Section */}
            <section className="relative h-[55vh] flex items-center justify-center overflow-hidden">
                <Image
                    src={service.heroImage}
                    alt={service.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B211B]/95 via-[#0B211B]/80 to-[#0B211B]/40" />
                <div className="absolute inset-0 bg-black/20" />

                {/* Animated Mesh Overlay */}
                <div className="absolute inset-0 opacity-30 mix-blend-overlay mesh-gradient" />

                <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
                    <Link href="/services" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium tracking-wide text-sm">Back to all Services</span>
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl space-y-6"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                            <IconComponent size={14} className="text-secondary" />
                            {service.category}
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black font-outfit text-white leading-[1.1] tracking-tight drop-shadow-lg">
                            {service.title}
                        </h1>
                        <p className="text-xl lg:text-3xl text-white/80 font-medium leading-relaxed drop-shadow-md">
                            {service.subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Info Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        <div className="bg-white rounded-[20px] p-10 lg:p-14 shadow-2xl shadow-slate-200/50 border border-slate-100">
                            <h2 className="text-3xl font-bold font-outfit text-primary mb-6">Overview</h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-10">
                                {service.description}
                            </p>
                            <div className="w-20 h-1 bg-secondary/20 rounded-full mb-10" />
                            <h3 className="text-2xl font-bold font-outfit text-slate-800 mb-6">Service Details</h3>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                {service.details}
                            </p>
                        </div>
                    </motion.div>

                    {/* Sidebar Area */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-8"
                    >
                        {/* Features Card */}
                        <div className="bg-primary rounded-[32px] p-10 text-white shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full flex items-start justify-end p-6">
                                <IconComponent size={48} className="text-white/20 group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <h3 className="text-xl font-bold font-outfit mb-8 relative z-10">What's Included</h3>
                            <ul className="space-y-5 relative z-10">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex gap-4">
                                        <CheckCircle2 size={24} className="text-secondary shrink-0" />
                                        <span className="text-white/90 leading-snug">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Action Card */}
                        <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-lg text-center space-y-6">
                            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                                <FileCheck size={32} />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-slate-800 mb-2">Ready to Apply?</h4>
                                <p className="text-slate-500 text-sm">Start your application process digitally through our portal.</p>
                            </div>
                            <Link
                                href="/register"
                                className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-secondary hover:text-primary transition-all shadow-lg hover:shadow-xl group"
                            >
                                Start Application <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </section>
        </main>
    );
}
