export interface StrategicStrategy {
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

export const STRATEGIC_PILLARS: Record<string, StrategicPillar> = {
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
