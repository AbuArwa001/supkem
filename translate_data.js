const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src/app/[locale]/(public)/strategic-focus/[slug]/_data/strategicPillarsData.ts');

const tsContext = `export interface StrategicStrategy {
    name: string;
    interventions: string[];
}

export interface StrategicSection {
    title: string;
    icon: string;
    content: string;
    strategies: StrategicStrategy[];
}

export interface StrategicPillar {
    title: string;
    subtitle: string;
    description: string;
    heroImage: string;
    sections: StrategicSection[];
}

export const STRATEGIC_PILLARS_EN: Record<string, StrategicPillar> = {
    "programmes": {
        title: "Programmes",
        subtitle: "Implementing transformative interventions",
        description: "Driving impactful interventions across critical sectors including education, economic empowerment, health, peace building, and climate change management.",
        heroImage: "/images/slider/olerezo_nb.jpg",
        sections: [
            {
                title: "Education",
                icon: "BookOpen",
                content: "Addressing low standards, poor infrastructure, and insufficient teaching capacity.",
                strategies: [
                    {
                        name: "Promotion of Access to Quality Education",
                        interventions: [
                            "Capacity building of teachers on competency-based curriculum.",
                            "Advocate for conversation of Madrasa teachers to TSC IRE teachers.",
                            "Build, maintain and manage schools from basic to university levels.",
                            "Provide scholarships for IRE teacher training students.",
                            "Sensitize communities on the need for education and technology."
                        ]
                    },
                    {
                        name: "Supporting Muslim Education Institutions",
                        interventions: [
                            "Advocate implementation of IRE within the competency-based curriculum.",
                            "Advocate for staffing of qualified IRE teachers.",
                            "Create partnerships to research matters affecting Muslim communities.",
                            "Collaborate on projects addressing low educational standards."
                        ]
                    }
                ]
            },
            {
                title: "Countering & Transforming Violent Extremism (CVE)",
                icon: "Shield",
                content: "Proactively preventing radicalization and supporting rehabilitation.",
                strategies: [
                    {
                        name: "Proactive Prevention",
                        interventions: [
                            "Awareness creation on the negative effects of violent extremism.",
                            "Strategic partnerships with like-minded organizations on CVE management.",
                            "Participation in the design, review, and implementation of CVE policies."
                        ]
                    },
                    {
                        name: "Rehabilitation and Reintegration",
                        interventions: [
                            "Awareness creation on rehabilitation opportunities.",
                            "Support rehabilitation and reintegration of radicalized individuals.",
                            "Psychosocial and livelihoods support to reintegrated individuals."
                        ]
                    }
                ]
            },
            {
                title: "Economic Empowerment",
                icon: "Briefcase",
                content: "Tackling high poverty levels and limited sharia-compliant opportunities.",
                strategies: [
                    {
                        name: "Access to Sustainable Livelihoods",
                        interventions: [
                            "Design and collaborate on livelihoods programmes.",
                            "Lobby for sharia-compliant economic policies.",
                            "Raise awareness on funding programs (women fund, youth fund, Uwezo)."
                        ]
                    },
                    {
                        name: "Making Markets Work for the Poor",
                        interventions: [
                            "Lobby and advocate for pro-poor economic policies.",
                            "Engage the private sector to create opportunities for poor communities."
                        ]
                    }
                ]
            },
            {
                title: "Health",
                icon: "Heart",
                content: "Improving access to universal healthcare and vital health information.",
                strategies: [
                    {
                        name: "Universal Health Care (UHC)",
                        interventions: [
                            "Partner with GoK-NHIF to facilitate UHC access.",
                            "Create awareness on UHC opportunities.",
                            "Partner with private sector health institutions."
                        ]
                    },
                    {
                        name: "Access to Information",
                        interventions: [
                            "Create awareness on reproductive healthcare.",
                            "Create awareness on communicable and non-communicable diseases."
                        ]
                    }
                ]
            },
            {
                title: "Peace Building and Conflict Transformation",
                icon: "Users",
                content: "Mitigating resource-based and inter-community conflicts.",
                strategies: [
                    {
                        name: "National & County Peace Building",
                        interventions: [
                            "Lobby and advocate in development and review of peace building laws.",
                            "Participate in the design and implementation of peace building initiatives.",
                            "Representation in strategic peace building and conflict resolution committees."
                        ]
                    },
                    {
                        name: "Conflict Resolution Efforts",
                        interventions: [
                            "Lobby for conflict resolution policies.",
                            "Implement mechanisms addressing conflicts within and between communities."
                        ]
                    }
                ]
            },
            {
                title: "Climate Change Resilience Building",
                icon: "Globe",
                content: "Addressing the disproportionate impact of climate change on ASAL areas.",
                strategies: [
                    {
                        name: "Promotion of Natural Resource Management",
                        interventions: [
                            "Design/review environment management campaigns (tree planting, clean up).",
                            "Create awareness on natural resource management and conservation."
                        ]
                    },
                    {
                        name: "Partnerships in Climate Change Management",
                        interventions: [
                            "Create partnerships on implementation of climate change management interventions."
                        ]
                    }
                ]
            }
        ]
    },
    "institutional-strengthening": {
        title: "Institutional Strengthening",
        subtitle: "Building solid internal structures",
        description: "Driving organizational effectiveness through intense resource mobilization, governance reform, HR development, and creating a conducive working environment.",
        heroImage: "/images/slider/image.png",
        sections: [
            {
                title: "Resource Mobilization",
                icon: "Briefcase",
                content: "Focusing on internal and external resource mobilization initiatives.",
                strategies: [
                    {
                        name: "Internal Resource Mobilization",
                        interventions: [
                            "Develop a business case on optimization of revenue from existing investments.",
                            "Proper management and accountability from existing investments.",
                            "Engage investment experts to develop sharia-compliant vehicles.",
                            "Develop internal capacity on resource mobilization."
                        ]
                    },
                    {
                        name: "External Resource Mobilization",
                        interventions: [
                            "Carry out donor mapping.",
                            "Develop and implement a resource mobilization strategy.",
                            "Engage in joint programming opportunities."
                        ]
                    }
                ]
            },
            {
                title: "Governance",
                icon: "Shield",
                content: "Reforming structures for efficiency and effective mandate implementation.",
                strategies: [
                    {
                        name: "Reforming Governance Structures",
                        interventions: [
                            "Develop and implement a functional organogram.",
                            "Develop requisite governance policies (Code of Conduct, APIs, operations).",
                            "Develop a board charter and review SUPKEM's constitution.",
                            "Conduct and publish annual financial and organizational audits."
                        ]
                    },
                    {
                        name: "Expanding Membership Base",
                        interventions: [
                            "Awareness campaigns on the mandate, vision, and mission.",
                            "Mass mobilization and recruitment of Muslim women, PWDs and youth."
                        ]
                    }
                ]
            },
            {
                title: "Human Resource Development",
                icon: "Users",
                content: "Streamlining and strengthening human resources for optimal delivery.",
                strategies: [
                    {
                        name: "Strengthen HR Policies & Systems",
                        interventions: [
                            "Develop a HR manual / policy.",
                            "Develop a business continuity plan.",
                            "Develop an organizational succession plan."
                        ]
                    },
                    {
                        name: "HR Competency Development",
                        interventions: [
                            "Map out required skills and conduct capacity gaps analysis.",
                            "Competitive recruitment for vacant positions.",
                            "Develop and implement a HR capacity building plan."
                        ]
                    }
                ]
            },
            {
                title: "Office and Equipment Improvement",
                icon: "Briefcase",
                content: "Improving working conditions at both internal and external branches.",
                strategies: [
                    {
                        name: "Creating a Conducive Work Environment",
                        interventions: [
                            "Office environment assessment.",
                            "Acquisition of a new headquarters for SUPKEM.",
                            "Office rehabilitation and equipping.",
                            "Create and maintain an updated asset register."
                        ]
                    }
                ]
            }
        ]
    },
    "partnership-and-collaboration": {
        title: "Partnership & Collaboration",
        subtitle: "Fostering strategic engagement",
        description: "Building strong alliances with the government, non-state actors, and faith-based institutions to represent and empower the Muslim community.",
        heroImage: "/images/slider/ole_olesapitb.jpg",
        sections: [
            {
                title: "Engagement with the Government of Kenya (GoK)",
                icon: "Shield",
                content: "Developing formal and informal engagement mechanisms at National and County levels.",
                strategies: [
                    {
                        name: "Formal and informal engagement",
                        interventions: [
                            "Lobby and advocate in development / review of policies.",
                            "Engage relevant parliamentary committees on legislative processes.",
                            "Proactively engage Government on matters of interest to the Muslim community.",
                            "Establish formal working relationships with Government structures.",
                            "Negotiate opportunities and advise agencies on policies affecting Muslims."
                        ]
                    }
                ]
            },
            {
                title: "Engagement with Non-State Actors",
                icon: "Users",
                content: "Regaining strategic influence in programming and representation.",
                strategies: [
                    {
                        name: "Collaboration in Design & Implementation",
                        interventions: [
                            "Mapping of relevant non-state actors.",
                            "Establishing formal working relationships (MoU, partnerships).",
                            "Participate in joint programming and funding mechanisms.",
                            "Create programming mechanisms and rules upheld by members."
                        ]
                    }
                ]
            },
            {
                title: "Engagement with Faith-Based Institutions",
                icon: "Heart",
                content: "Deepening interfaith dialogue to address shared moral and social concerns.",
                strategies: [
                    {
                        name: "Promotion of Interreligious Cohesion",
                        interventions: [
                            "Participate and represent members in interreligious forums."
                        ]
                    },
                    {
                        name: "Joint Programming",
                        interventions: [
                            "Mobilize Muslim institutions on programming opportunities."
                        ]
                    }
                ]
            },
            {
                title: "Hajj Program",
                icon: "Globe",
                content: "Facilitating performance of the 5th pillar of Islam.",
                strategies: [
                    {
                        name: "Facilitate Pilgrimage",
                        interventions: [
                            "Develop and implement policies for the Hajj program.",
                            "Develop a policy and code of conduct for hajj agents.",
                            "Vet and license approved hajj agents.",
                            "Prepare and publish annual reports on the Hajj program."
                        ]
                    }
                ]
            }
        ]
    },
    "cross-cutting-areas": {
        title: "Cross Cutting Areas",
        subtitle: "Ensuring effective delivery",
        description: "Underpinning all operations through rigorous research, monitoring, evaluation, reporting, learning, and strategic communication.",
        heroImage: "/images/slider/olesaudib.jpg",
        sections: [
            {
                title: "Research, Monitoring, Evaluation, Reporting and Learning (MERL)",
                icon: "FileText",
                content: "Enhancing capacity to inform programming and track results.",
                strategies: [
                    {
                        name: "Evidence-Based Approaches & Learning",
                        interventions: [
                            "Institute or collaborate in research opportunities.",
                            "Conduct research to inform program design and advocacy interventions.",
                            "Use M&E data to improve programme implementation strategies.",
                            "Documentation of learnings and sharing of good practices for scaling."
                        ]
                    },
                    {
                        name: "Results-Based Management",
                        interventions: [
                            "Develop and implement an MERL plan.",
                            "Effective monitoring on implementation of ongoing programmes.",
                            "Evaluation of programme performance (effectiveness, impact, sustainability)."
                        ]
                    }
                ]
            },
            {
                title: "Communication",
                icon: "Globe",
                content: "Enhancing SUPKEM's strategic positioning and influence.",
                strategies: [
                    {
                        name: "Effective Stakeholder Communication",
                        interventions: [
                            "Develop and implement a communication policy.",
                            "Develop and implement a communication strategy for various stakeholders.",
                            "Use of social media platforms to communicate achievements and activities."
                        ]
                    }
                ]
            }
        ]
    }
};

export const STRATEGIC_PILLARS_AR: Record<string, StrategicPillar> = {
    "programmes": {
        title: "البرامج",
        subtitle: "تنفيذ تدخلات تحويلية",
        description: "دفع التدخلات الفعالة عبر القطاعات الحيوية بما في ذلك التعليم والتمكين الاقتصادي والصحة وبناء السلام وإدارة تغير المناخ.",
        heroImage: "/images/slider/olerezo_nb.jpg",
        sections: [
            {
                title: "التعليم",
                icon: "BookOpen",
                content: "معالجة تدني المعايير التأسيسية للمناهج، وضعف البنية التحتية، وعدم كفاية القدرات التعليمية.",
                strategies: [
                    {
                        name: "تعزيز الوصول إلى التعليم الجيد",
                        interventions: [
                            "بناء قدرات المعلمين على المناهج القائمة على الكفاءة.",
                            "الدعوة إلى تحويل معلمي المدارس الدينية إلى معلمي لجنة خدمة المعلمين.",
                            "بناء وصيانة وإدارة المدارس من المستويات الأساسية إلى الجامعية.",
                            "تقديم منح دراسية لطلاب تدريب معلمي التربية الإسلامية الدينية.",
                            "توعية المجتمعات حول الحاجة إلى التعليم والتكنولوجيا."
                        ]
                    },
                    {
                        name: "دعم مؤسسات التعليم الإسلامي",
                        interventions: [
                            "الدعوة إلى تنفيذ التربية الإسلامية الدينية ضمن المناهج القائمة على الكفاءة.",
                            "الدعوة إلى توظيف معلمين مؤهلين للتربية الإسلامية الدينية.",
                            "إنشاء شراكات للبحث في الأمور التي تؤثر على المجتمعات الإسلامية.",
                            "التعاون في مشاريع لمعالجة المعايير التعليمية المنخفضة بالاقاليم."
                        ]
                    }
                ]
            },
            {
                title: "مواجهة وتحويل التطرف العنيف",
                icon: "Shield",
                content: "منع التطرف بشكل استباقي ودعم إعادة التأهيل.",
                strategies: [
                    {
                        name: "الوقاية الاستباقية",
                        interventions: [
                            "نشر الوعي حول الآثار السلبية للتطرف العنيف.",
                            "وضع شراكات استراتيجية مع المنظمات ذات التفكير المماثل.",
                            "المشاركة في تصميم ومراجعة وتنفيذ سياسات مواجهة التطرف."
                        ]
                    },
                    {
                        name: "إعادة التأهيل والاندماج",
                        interventions: [
                            "نشر الوعي حول فرص وبرامج إعادة التأهيل.",
                            "دعم إعادة تأهيل واندماج الأفراد الذين تعرضوا للتطرف سابقاً.",
                            "الدعم النفسي والاجتماعي ودعم سبل العيش المستقرة للأفراد."
                        ]
                    }
                ]
            },
            {
                title: "التمكين الاقتصادي",
                icon: "Briefcase",
                content: "معالجة المستويات العالية للفقر والفرص المحدودة المتوافقة مع الشريعة الإسلامية.",
                strategies: [
                    {
                        name: "الوصول إلى سبل عيش مستدامة",
                        interventions: [
                            "تصميم والتعاون في برامج سبل العيش الكريمة.",
                            "الضغط من أجل سياسات اقتصادية قوية متوافقة مع الشريعة.",
                            "زيادة الوعي ببرامج التمويل الحكومية المحلية."
                        ]
                    },
                    {
                        name: "جعل الأسواق تعمل من أجل المجتمعات",
                        interventions: [
                            "مناصرة السياسات الاقتصادية الداعمة للتنمية الشاملة.",
                            "إشراك القطاع الخاص والمؤسسات لخلق فرص جديدة للفقراء."
                        ]
                    }
                ]
            },
            {
                title: "الصحة",
                icon: "Heart",
                content: "تحسين الوصول إلى مجالات الرعاية الصحية الشاملة والمعلومات الصحية الحيوية.",
                strategies: [
                    {
                        name: "الرعاية الصحية الشاملة",
                        interventions: [
                            "الشراكة مع الصندوق القومي للتأمين الصحي التابع للحكومة لتسهيل الوصول للرعاية.",
                            "خلق الوعي بفرص التغطية الصحية الشاملة.",
                            "الشراكة المباشرة مع المؤسسات الصحية في القطاع الخاص."
                        ]
                    },
                    {
                        name: "تمكين الوصول إلى المعلومات",
                        interventions: [
                            "التوعية المستمرة بالخدمات الصحية الإنجابية.",
                            "التوعية بالأمراض المعدية والأمراض المزمنة غير المعدية."
                        ]
                    }
                ]
            },
            {
                title: "بناء السلام وتحويل النزاعات",
                icon: "Users",
                content: "التخفيف من حدة النزاعات القائمة على الموارد والنزاعات العرقية بين المجتمعات.",
                strategies: [
                    {
                        name: "بناء السلام الوطني وعلى مستوى المقاطعات",
                        interventions: [
                            "الضغط والمناصرة في مسيرة تطوير ومراجعة قوانين بناء السلام.",
                            "المشاركة الفعالة في تصميم وتنفيذ مبادرات السلام المشتركة.",
                            "التمثيل الرسمي في لجان بناء السلام الإستراتيجية."
                        ]
                    },
                    {
                        name: "جهود حل النزاعات",
                        interventions: [
                            "المطالبة المستمرة ودفع سياسات حل النزاعات القبلية.",
                            "تنفيذ وتفعيل آليات مجتمعية تعالج النزاعات البينية."
                        ]
                    }
                ]
            },
            {
                title: "بناء المرونة والتكيف مع تغير المناخ",
                icon: "Globe",
                content: "معالجة التأثير البيئي غير المتناسب لتغير المناخ على المناطق القاحلة والمهمشة.",
                strategies: [
                    {
                        name: "تعزيز جهود إدارة الموارد الطبيعية",
                        interventions: [
                            "تصميم وتوثيق حملات إدارة البيئة الحديثة.",
                            "خلق الوعي في القرى حول كيفية إدارة الموارد والحفاظ عليها."
                        ]
                    },
                    {
                        name: "الشراكات الإستراتيجية لإدارة المناخ",
                        interventions: [
                            "إنشاء شراكات ومذكرات لتمويل وتنفيذ تدخلات الإدارة المناخية المتطورة."
                        ]
                    }
                ]
            }
        ]
    },
    "institutional-strengthening": {
        title: "تعزيز وتنظيم المؤسسات",
        subtitle: "بناء هياكل داخلية صلبة وفعالة",
        description: "تعزيز الفعالية التنظيمية من خلال التعبئة المكثفة للموارد وإصلاح مسارات الحوكمة وتنمية رأس المال البشري.",
        heroImage: "/images/slider/image.png",
        sections: [
            {
                title: "تعبئة الموارد والاستثمار",
                icon: "Briefcase",
                content: "التركيز الدؤوب على مبادرات تعبئة الموارد البشرية والمالية، داخلياً وخارجياً.",
                strategies: [
                    {
                        name: "تعبئة الموارد الداخلية",
                        interventions: [
                            "تطوير خطط عمل تنظيمية لتحسين العائدات الحالية.",
                            "فرض الإدارة السليمة والمساءلة على الاستثمارات القائمة.",
                            "إشراك خبراء ومرجعيات استثمارية لتطوير أدوات مالية إسلامية.",
                            "تطوير القدرة الداخلية الاستيعابية لتعبئة الموارد."
                        ]
                    },
                    {
                        name: "تعبئة الموارد الخارجية",
                        interventions: [
                            "إجراء رسم خرائط جغرافي وتشغيلي للمانحين المحليين والدوليين.",
                            "تطوير وتنفيذ إستراتيجيات مكثفة لتعبئة التمويل الخارجي.",
                            "المشاركة الاستباقية في فرص البرامج التنموية المشتركة."
                        ]
                    }
                ]
            },
            {
                title: "مرتكزات الحوكمة",
                icon: "Shield",
                content: "إصلاح جميع الهياكل الإدارية الحالية لتحقيق الكفاءة والتنفيذ الفعال والشفاف.",
                strategies: [
                    {
                        name: "إصلاح هياكل الحوكمة",
                        interventions: [
                            "تطوير مسودات وتنفيذ هيكل تنظيمي וظيفي مرن.",
                            "تطوير لوائح الحوكمة الضرورية (مدونة سلوك، أدلة العمليات).",
                            "إعداد ميثاق إدارة جديد ومراجعة الدستور التنظيمي للمجلس.",
                            "إجراء ونشر التقارير المالية والتدقيقات السنوية للمجتمع بشفافية."
                        ]
                    },
                    {
                        name: "توسيع قاعدة العضوية",
                        interventions: [
                            "إدارة حملات إقليمية واسعة للتوعية بالولاية والرؤية الموحدة.",
                            "تعبئة وتجنيد متواصل وشأمل للنساء المسلمات والشباب والفئات المهمشة."
                        ]
                    }
                ]
            },
            {
                title: "تنمية رأس المال البشري",
                icon: "Users",
                content: "تبسيط وتعزيز الموارد البشرية الموجودة من أجل تحقيق أعلى مستويات الإنتاج والأداء التنفيذي.",
                strategies: [
                    {
                        name: "تقوية سياسات وأنظمة الموارد البشرية",
                        interventions: [
                            "إعداد وتنظيم دليل معياري وسياسات فعالة للموارد البشرية.",
                            "وضع وتأسيس خطة واضحة ومدروسة لاستمرارية الأعمال.",
                            "تطوير نموذج لخطة التعاقب الإداري الداخلي."
                        ]
                    },
                    {
                        name: "تنمية كفاءات كوادر الموارد البشرية",
                        interventions: [
                            "رسم خرائط المهارات التخصصية المطلوبة لتسيير العمل وتحليل فجوات الأداء.",
                            "تطبيق نظام التوظيف التنافسي الاحترافي لسد الشواغر الفورية.",
                            "تطوير وتنفيذ خطة متكاملة ومستدامة لبناء قدرات الموظفين دورياً."
                        ]
                    }
                ]
            },
            {
                title: "تحسين بيئة المكاتب والمعدات",
                icon: "Briefcase",
                content: "تحديث البيئة وتوفير ظروف عمل استثنائية ضمن الفروع الرئيسية والفرعية التابعة للمجلس.",
                strategies: [
                    {
                        name: "خلق بيئة عمل محفزة ومواتية",
                        interventions: [
                            "تقييم وفحص بيئة المكاتب بشكل منتظم للتحقق من سلامتها والتزامها.",
                            "حيازة وإنشاء مقر إداري جديد ومتكامل للمجلس الأعلى.",
                            "إعادة تأهيل جذري للصيانة وتحديث تقني لتجهيز المكاتب الحالية.",
                            "إنشاء ومتابعة سجل أصول مركزي ومُحدّث بانتظام."
                        ]
                    }
                ]
            }
        ]
    },
    "partnership-and-collaboration": {
        title: "الشراكات الاستراتيجية وسبل التعاون",
        subtitle: "تعزيز مسارات المشاركة الاستراتيجية الوثيقة",
        description: "بناء تحالفات متينة مع الحكومة والجهات الفاعلة المنظمة غير الحكومية والمؤسسات الدينية العتيدة لتمثيل ودعم المجتمع الإسلامي بامتياز.",
        heroImage: "/images/slider/ole_olesapitb.jpg",
        sections: [
            {
                title: "المشاركة المباشرة مع الحكومة المركزية والمقاطعات",
                icon: "Shield",
                content: "تطوير آليات وتطبيقات للمشاركة التنموية الرسمية على المستويين الوطني والمحلي.",
                strategies: [
                    {
                        name: "بروتوكولات التنسيق والمشاركة الرسمية وغير الرسمية",
                        interventions: [
                            "تكثيف أنشطة الضغط والمناصرة لضمان المشاركة في مراجعة التشريعات والسياسات.",
                            "إشراك اللجان البرلمانية والتنفيذية ذات الصلة المباشرة بمصالح المجتمع الإسلامي.",
                            "التفاعل المسبق والاستباقي مع صانعي القرار بشأن المسائل الحيوية الراهنة.",
                            "إنشاء وتقوية آليات وعلاقات العمل المؤسسية الرسمية مع الدوائر الحكومية المختلفة.",
                            "التفاوض الدبلوماسي والموضوعي لاقتناص فرص التمكين وتقديم المشورة الفعالة للجهات."
                        ]
                    }
                ]
            },
            {
                title: "تفعيل المشاركة مع الجهات الفاعلة والمنظمات غير الحكومية",
                icon: "Users",
                content: "استعادة المبادرة والنفوذ الاستراتيجي الواسع في تحديد الأولويات وفي برمجة التمثيل المؤثر.",
                strategies: [
                    {
                        name: "التآزر في تصميم وتوجيه آليات التنفيذ",
                        interventions: [
                            "الرصد الدقيق والفهرسة للجهات الفاعلة والهيئات غير الحكومية المعنية بالتنمية المحلية.",
                            "تأسيس وبرمجة علاقات عمل تشاركية، وتوقيع اتفاقيات وبروتوكولات تعاون ملزمة ومذكرات تفاهم رصينة.",
                            "ترسيخ التواجد والمساهمة المستمرة في آليات البرمجة المجتمعية وصناديق التمويل المشتركة.",
                            "تطوير قواعد مهنية وتشغيلية شفافة ومتكاملة لتنسيق مهام وإسهامات المنظمات الإقليمية والأعضاء التابعين."
                        ]
                    }
                ]
            },
            {
                title: "التعاون المثمر والمشاركة الجادة مع المؤسسات الدينية والمجتمعية",
                icon: "Heart",
                content: "دعم وتعميق وترسيخ أسس ومسارات الحوار الإيجابي والمعمق بين مختلف الأديان والمذاهب للتمكن من معالجة جميع التحديات والمخاوف.",
                strategies: [
                    {
                        name: "تعزيز وتمتين أواصر وحبال التماسك والترابط المجتمعي",
                        interventions: [
                            "المشاركة النوعية والجادة في أعمال ومجريات المحافل والجلسات والندوات والفعاليات الدينية."
                        ]
                    },
                    {
                        name: "مواءمة أولويات البرمجة والانشطة المشتركة",
                        interventions: [
                            "حشد التوجهات وتعبئة الموارد المتنوعة الكامنة لدى جميع المؤسسات المركزية لتحقيق أهداف البرامج الكبرى."
                        ]
                    }
                ]
            },
            {
                title: "مركزية برامج وفعاليات الحج",
                icon: "Globe",
                content: "تسخير وتقديم كافة الخدمات اللوجستية والدينية المتميزة والميسرة لحجاج بيت الله الحرام لأداء الركن الخامس للإسلام.",
                strategies: [
                    {
                        name: "تسهيل وتيسير أداء فريضة ومناسك الحج",
                        interventions: [
                            "بناء وتصميم واختبار سياسات منظمة لتأطير وتنفيذ الخطط والإجراءات الخاصة ببعثات وبرامج تنظيم الحج.",
                            "صياغة وبلورة آليات وقوائم ومحددات صارمة تنظم وتضبط عمل وكلاء ومقاولين حملات الحج والعمرة.",
                            "تطبيق أعلى المعايير القياسية للتدقيق الشامل الدقيق ومنح التراخيص والاعتمادات النهائية للوكلاء المؤهلين.",
                            "تحضير وصياغة وطباعة التقارير السنوية المفصلة الدقيقة حول كافة أنشطة وأعمال وحملات ومواسم الحج ونشرها للرأي."
                        ]
                    }
                ]
            }
        ]
    },
    "cross-cutting-areas": {
        title: "المجالات الفاعلة عبر القطاعات (Cross Cutting)",
        subtitle: "ضمان أسس ومقومات الإنجاز والتنفيذ الفعالة",
        description: "توفير الدعم والإسناد المتوازن لكل مجريات وأقسام العمليات التشغيلية، من خلال البحث المنهجي المستمر، والرصد المنتظم، والتقييم الداخلي.",
        heroImage: "/images/slider/olesaudib.jpg",
        sections: [
            {
                title: "البحث والتطوير والمراقبة والتقييم وإعداد التقارير والتعلم المستمر (MERL)",
                icon: "FileText",
                content: "رفع وتعزيز القدرة البحثية والاستقصائية المنهجية والتقنية لتطوير أدوات البرمجة وإدارة المشاريع وتتبع مؤشرات قياس النتائج.",
                strategies: [
                    {
                        name: "تأصيل المعارف عبر المنهجيات والأساليب القائمة على البراهين والأدلة والتعلم",
                        interventions: [
                            "إطلاق ومضاعفة أعداد وأنواع الأبحاث والدراسات لتوجيه مسار عمليات تصميم وبرمجة خطط العمل والمشاريع وتدعيم تدخلات وحملات التحشيد التوعوي.",
                            "تفعيل وتوظيف مخرجات ونظم وبيانات مؤشرات المراقبة الميدانية لتحسين وتطوير أداء ومخرجات إستراتيجيات إدارة وتنفيذ البرامج التطويرية."
                        ]
                    },
                    {
                        name: "أسس الإدارة المبنية والمركزة على قياس النتائج",
                        interventions: [
                            "وضع واعتماد وصيانة نموذج قياسي لآليات وتطبيقات المراقبة الميدانية المباشرة وغير المباشرة، لضبط عمليات وبرمجة وتطبيق البرامج الحالية القيد التنفيذ.",
                            "إطلاق سلسلة متتابعة من مسوحات واختبارات وتقييمات أداء البرامج المنفذة (لقياس مستويات ومعدلات الفعالية والأثر التشغيلي، وضمان درجات الاستدامة)."
                        ]
                    }
                ]
            },
            {
                title: "الاتصال الاستراتيجي",
                icon: "Globe",
                content: "تدعيم وتقوية وتحسين الموقف والتموقع المؤسسي الاستراتيجي والأثر الفعال للمجلس الأعلى على الصعيدين العملي والخطابي.",
                strategies: [
                    {
                        name: "تفعيل قنوات ووسائل الاتصال المجتمعي المؤسسية والشراكات بين أصحاب المصلحة",
                        interventions: [
                            "بناء هندسة معمارية إعلامية فعالة لتطوير وإنفاذ سياسة واستراتيجية اتصال إعلامية وجماهيرية مؤسسية واضحة وموجهة بوضوح للتفاعل مع الفئات والكيانات والجهات المتنوعة.",
                            "تنشيط واستخدام جميع الإمكانات والأدوات الرقمية لمنصات التواصل الاجتماعي والمواقع وتوظيفها بشكل مهني محترف للإبلاغ والإعلان المستمر والتسويق لإنجازات وأنشطة ومشاريع المجلس وتوسيع قاعدته الجماهيرية."
                        ]
                    }
                ]
            }
        ]
    }
};

export const getStrategicPillars = (locale: string) => {
    return locale === 'ar' ? STRATEGIC_PILLARS_AR : STRATEGIC_PILLARS_EN;
};
`;

fs.writeFileSync(targetPath, tsContext);
console.log('Successfully updated _data/strategicPillarsData.ts');
