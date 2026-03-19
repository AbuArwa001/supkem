export interface ServiceData {
    title: string;
    subtitle: string;
    description: string;
    heroImage: string;
    icon: string;
    category: string;
    features: string[];
    details: string;
}

export const SERVICES_DATA: Record<string, ServiceData> = {
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
        icon: "ShieldCheck",
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
        heroImage: "/images/slider/olesaudib.jpg",
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
        heroImage: "/images/slider/image.png",
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
