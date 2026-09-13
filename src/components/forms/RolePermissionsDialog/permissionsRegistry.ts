import {
    Receipt,
    FileText,
    Award,
    Briefcase,
    Building2,
    Users,
    Newspaper,
    MapPin,
    ShieldCheck,
    LucideIcon
} from "lucide-react";
import type { Permission } from "./types";

export interface PermissionModuleMeta {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    badgeColor: string;
    models: string[];
}

export const PERMISSION_MODULES: PermissionModuleMeta[] = [
    {
        id: "finance",
        title: "Finance & Payments",
        description: "Payment ledgers, M-Pesa verification, reconciliation, and revenue analytics",
        icon: Receipt,
        badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
        models: ["payment"],
    },
    {
        id: "applications",
        title: "Applications & Submissions",
        description: "Citizen & institutional service requests, vetting workflows, and status reviews",
        icon: FileText,
        badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
        models: ["application"],
    },
    {
        id: "certificates_letters",
        title: "Certificates & Official Letters",
        description: "Official certificate issuance, serial numbers, and recommendation letters",
        icon: Award,
        badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
        models: ["certification", "letter"],
    },
    {
        id: "services",
        title: "Services & Tariffs CMS",
        description: "Official public services catalog, requirement definitions, and fee structures",
        icon: Briefcase,
        badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
        models: ["service", "servicecategory"],
    },
    {
        id: "organizations",
        title: "Mosques & Organizations",
        description: "Mosque directory, institutional registration, and regional committee profiles",
        icon: Building2,
        badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
        models: ["organization"],
    },
    {
        id: "users_roles",
        title: "Users & Access Control",
        description: "Staff accounts, regional officers, authority roles, and security policies",
        icon: Users,
        badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
        models: ["user", "role"],
    },
    {
        id: "news_media",
        title: "News & Media CMS",
        description: "Press releases, digital publications, video briefings, and media galleries",
        icon: Newspaper,
        badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
        models: ["news", "newspaper", "videobriefing", "newsgallery"],
    },
    {
        id: "locations",
        title: "Regional Locations & Councils",
        description: "Administrative regions, counties, and local executive councils",
        icon: MapPin,
        badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
        models: ["region", "countycouncil"],
    },
    {
        id: "configurations",
        title: "System Parameters & Governance",
        description: "Core platform parameters, maintenance windows, and leadership profiles",
        icon: ShieldCheck,
        badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
        models: ["systemparameter", "maintenance", "leadershipprofile"],
    },
];

// Disallowed models that should NEVER appear in role assignment
export const EXCLUDED_MODELS = new Set([
    "logentry",
    "contenttype",
    "session",
    "group",
    "permission",
    "shipment",
    "shipmentitem",
    "sale",
    "product",
    "productcategory",
    "logisticsreceipt",
    "currency",
    "exchangerate",
    "currencymargin",
    "unitofmeasure",
    "activitylog",
    "userorganization",
    "marriagedetails",
    "pilgrimdetails",
    "educationdetails",
    "travelvisadetails",
    "employmentdetails",
]);

// Friendly human readable labels for permissions
export const PERMISSION_METADATA: Record<string, { label: string; action: "view" | "create" | "edit" | "delete" | "special"; summary?: string }> = {
    // Finance & Payments
    view_payment: {
        label: "View Payments & Transactions",
        action: "view",
        summary: "Inspect financial transaction logs, invoices, and payment receipts",
    },
    change_payment: {
        label: "Process & Update Payments",
        action: "edit",
        summary: "Update payment statuses, mark manual payments, and reconcile records",
    },
    add_payment: {
        label: "Record Manual Payment",
        action: "create",
        summary: "Create direct or offline payment entries on behalf of applicants",
    },
    delete_payment: {
        label: "Delete Payment Record",
        action: "delete",
        summary: "Remove erroneous or canceled payment records",
    },
    reconcile_payment: {
        label: "Reconcile & Verify M-Pesa",
        action: "special",
        summary: "Re-query Safaricom STK gateway to verify status of pending payments",
    },
    view_financial_analytics: {
        label: "View Financial Analytics",
        action: "view",
        summary: "Access revenue breakdowns, collection totals, and financial trend charts",
    },
    export_payment_reports: {
        label: "Export Payment Ledgers",
        action: "special",
        summary: "Download financial reports and payment audit CSVs",
    },

    // Applications
    view_application: {
        label: "View Applications",
        action: "view",
        summary: "Read citizen and organizational submitted applications",
    },
    add_application: {
        label: "Create Applications",
        action: "create",
        summary: "Draft and submit applications on behalf of citizens or institutions",
    },
    change_application: {
        label: "Review & Process Applications",
        action: "edit",
        summary: "Change application status (Approve, Reject, Under Review)",
    },
    delete_application: {
        label: "Delete Applications",
        action: "delete",
        summary: "Delete application submissions",
    },

    // Certifications & Letters
    view_certification: {
        label: "View Certificates",
        action: "view",
        summary: "Inspect issued certificates and serialization records",
    },
    add_certification: {
        label: "Issue New Certificate",
        action: "create",
        summary: "Generate and sign official certificates with QR codes",
    },
    change_certification: {
        label: "Update Certificate",
        action: "edit",
        summary: "Modify certificate metadata or renewal parameters",
    },
    delete_certification: {
        label: "Revoke / Delete Certificate",
        action: "delete",
        summary: "Revoke or permanently delete issued certificates",
    },
    view_letter: {
        label: "View Official Letters",
        action: "view",
        summary: "Read generated recommendation and introduction letters",
    },
    add_letter: {
        label: "Draft Official Letter",
        action: "create",
        summary: "Create recommendation or introductory letters",
    },
    change_letter: {
        label: "Edit Official Letter",
        action: "edit",
        summary: "Update letter body, signatories, or dispatch status",
    },
    delete_letter: {
        label: "Delete Official Letter",
        action: "delete",
        summary: "Remove letters from the system archive",
    },

    // Services
    view_service: {
        label: "View Services Catalog",
        action: "view",
        summary: "Browse service directories, tariffs, and requirements",
    },
    add_service: {
        label: "Create Service",
        action: "create",
        summary: "Define new institutional services and application workflows",
    },
    change_service: {
        label: "Edit Service & Fees",
        action: "edit",
        summary: "Update service pricing, requirements, and deadlines",
    },
    delete_service: {
        label: "Delete Service",
        action: "delete",
        summary: "Remove obsolete services from the catalog",
    },
    view_servicecategory: {
        label: "View Service Categories",
        action: "view",
        summary: "Browse service groupings (Religious, Educational, Legal)",
    },
    add_servicecategory: {
        label: "Create Service Category",
        action: "create",
        summary: "Create new categories to classify services",
    },
    change_servicecategory: {
        label: "Edit Service Category",
        action: "edit",
        summary: "Rename or reorder service categories",
    },
    delete_servicecategory: {
        label: "Delete Service Category",
        action: "delete",
        summary: "Delete service categories",
    },

    // Organizations
    view_organization: {
        label: "View Organizations & Mosques",
        action: "view",
        summary: "Browse registered mosques, schools, and institutions",
    },
    add_organization: {
        label: "Register Organization",
        action: "create",
        summary: "Register new mosques and institutional partners",
    },
    change_organization: {
        label: "Update Organization Profile",
        action: "edit",
        summary: "Update organization details, committee members, and status",
    },
    delete_organization: {
        label: "Delete Organization",
        action: "delete",
        summary: "Remove organizations from directory",
    },

    // Users & Roles
    view_user: {
        label: "View Staff & User Accounts",
        action: "view",
        summary: "Inspect user rosters, contact information, and roles",
    },
    add_user: {
        label: "Create User Accounts",
        action: "create",
        summary: "Provision accounts for officers, agents, and administrators",
    },
    change_user: {
        label: "Update User Accounts",
        action: "edit",
        summary: "Edit user credentials, status, or assigned roles",
    },
    delete_user: {
        label: "Deactivate / Delete Users",
        action: "delete",
        summary: "Remove or purge accounts from the system",
    },
    view_role: {
        label: "View Security Roles",
        action: "view",
        summary: "Inspect defined roles and their permission grants",
    },
    add_role: {
        label: "Create Security Roles",
        action: "create",
        summary: "Define new custom authority profiles",
    },
    change_role: {
        label: "Edit Security Roles",
        action: "edit",
        summary: "Modify role permissions and access privileges",
    },
    delete_role: {
        label: "Delete Security Roles",
        action: "delete",
        summary: "Delete custom user roles",
    },

    // News & Media
    view_news: {
        label: "View News Articles",
        action: "view",
    },
    add_news: {
        label: "Publish News Article",
        action: "create",
    },
    change_news: {
        label: "Edit News Article",
        action: "edit",
    },
    delete_news: {
        label: "Delete News Article",
        action: "delete",
    },
    view_newspaper: {
        label: "View Digital Newspapers",
        action: "view",
    },
    add_newspaper: {
        label: "Publish Digital Newspaper",
        action: "create",
    },
    change_newspaper: {
        label: "Edit Digital Newspaper",
        action: "edit",
    },
    delete_newspaper: {
        label: "Delete Digital Newspaper",
        action: "delete",
    },
    view_videobriefing: {
        label: "View Video Briefings",
        action: "view",
    },
    add_videobriefing: {
        label: "Post Video Briefing",
        action: "create",
    },
    change_videobriefing: {
        label: "Edit Video Briefing",
        action: "edit",
    },
    delete_videobriefing: {
        label: "Delete Video Briefing",
        action: "delete",
    },
    view_newsgallery: {
        label: "View Media Gallery",
        action: "view",
    },
    add_newsgallery: {
        label: "Upload Media Gallery",
        action: "create",
    },
    change_newsgallery: {
        label: "Edit Media Gallery",
        action: "edit",
    },
    delete_newsgallery: {
        label: "Delete Media Gallery",
        action: "delete",
    },

    // Locations
    view_region: {
        label: "View Regions",
        action: "view",
    },
    add_region: {
        label: "Add Region",
        action: "create",
    },
    change_region: {
        label: "Edit Region",
        action: "edit",
    },
    delete_region: {
        label: "Delete Region",
        action: "delete",
    },
    view_countycouncil: {
        label: "View County Councils",
        action: "view",
    },
    add_countycouncil: {
        label: "Add County Council",
        action: "create",
    },
    change_countycouncil: {
        label: "Edit County Council",
        action: "edit",
    },
    delete_countycouncil: {
        label: "Delete County Council",
        action: "delete",
    },

    // Configurations
    view_systemparameter: {
        label: "View System Parameters",
        action: "view",
    },
    add_systemparameter: {
        label: "Create System Parameter",
        action: "create",
    },
    change_systemparameter: {
        label: "Modify System Parameters",
        action: "edit",
    },
    delete_systemparameter: {
        label: "Delete System Parameter",
        action: "delete",
    },
    view_maintenance: {
        label: "View Maintenance Schedule",
        action: "view",
    },
    add_maintenance: {
        label: "Schedule Maintenance",
        action: "create",
    },
    change_maintenance: {
        label: "Update Maintenance Window",
        action: "edit",
    },
    delete_maintenance: {
        label: "Cancel Maintenance",
        action: "delete",
    },
    view_leadershipprofile: {
        label: "View Leadership Profiles",
        action: "view",
    },
    add_leadershipprofile: {
        label: "Add Leadership Profile",
        action: "create",
    },
    change_leadershipprofile: {
        label: "Edit Leadership Profile",
        action: "edit",
    },
    delete_leadershipprofile: {
        label: "Delete Leadership Profile",
        action: "delete",
    },
};

export interface RolePreset {
    id: string;
    roleName: string;
    badge: string;
    badgeColor: string;
    description: string;
    codenames: string[];
}

export const ROLE_PRESETS: RolePreset[] = [
    {
        id: "finance_officer",
        roleName: "Finance Officer",
        badge: "Finance & Accounting",
        badgeColor: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
        description: "Payment ledgers, transaction verification, M-Pesa query, and revenue analytics",
        codenames: [
            "view_payment",
            "change_payment",
            "reconcile_payment",
            "view_financial_analytics",
            "export_payment_reports",
            "view_application",
            "view_service",
        ],
    },
    {
        id: "applications_officer",
        roleName: "Applications Officer",
        badge: "Operations",
        badgeColor: "bg-blue-500/10 text-blue-700 border-blue-200",
        description: "Process citizen applications, issue serial certificates, and draft official letters",
        codenames: [
            "view_application",
            "change_application",
            "add_application",
            "view_certification",
            "add_certification",
            "change_certification",
            "view_letter",
            "add_letter",
            "change_letter",
            "view_service",
            "view_organization",
        ],
    },
    {
        id: "it_officer",
        roleName: "IT Officer",
        badge: "System Administration",
        badgeColor: "bg-purple-500/10 text-purple-700 border-purple-200",
        description: "Staff credentials, role permissions, maintenance windows, and system settings",
        codenames: [
            "view_user",
            "add_user",
            "change_user",
            "view_role",
            "change_role",
            "view_systemparameter",
            "change_systemparameter",
            "view_maintenance",
            "change_maintenance",
        ],
    },
    {
        id: "communications_officer",
        roleName: "Communications Officer",
        badge: "Media & Press",
        badgeColor: "bg-rose-500/10 text-rose-700 border-rose-200",
        description: "Publish news releases, manage newspapers, upload photo galleries, and post videos",
        codenames: [
            "view_news",
            "add_news",
            "change_news",
            "view_newspaper",
            "add_newspaper",
            "change_newspaper",
            "view_videobriefing",
            "add_videobriefing",
            "change_videobriefing",
            "view_newsgallery",
            "add_newsgallery",
        ],
    },
    {
        id: "compliance_auditor",
        roleName: "Compliance Auditor",
        badge: "Audit & Oversight",
        badgeColor: "bg-amber-500/10 text-amber-700 border-amber-200",
        description: "Read-only inspection clearance across financial logs, applications, and settings",
        codenames: [
            "view_payment",
            "view_financial_analytics",
            "export_payment_reports",
            "view_application",
            "view_certification",
            "view_letter",
            "view_service",
            "view_organization",
            "view_user",
            "view_role",
            "view_systemparameter",
        ],
    },
];

/**
 * Maps a raw permission to its target module definition
 */
export function getModuleForPermission(perm: Permission): PermissionModuleMeta | null {
    // 1. Check if model is explicitly excluded
    let model = perm.model?.toLowerCase();
    if (!model) {
        const parts = perm.codename.split("_");
        model = parts.slice(1).join("_").toLowerCase();
    }

    if (EXCLUDED_MODELS.has(model)) {
        return null;
    }

    // Special cases
    if (model === "payment") {
        return PERMISSION_MODULES.find(m => m.id === "finance") || null;
    }

    // Match module by models
    for (const mod of PERMISSION_MODULES) {
        if (mod.models.includes(model)) {
            return mod;
        }
    }

    // Fallback: Check app_label if present
    if (perm.app_label) {
        const app = perm.app_label.toLowerCase();
        if (app === "applications") {
            return PERMISSION_MODULES.find(m => m.id === "applications") || null;
        }
        if (app === "services") {
            return PERMISSION_MODULES.find(m => m.id === "services") || null;
        }
        if (app === "organizations") {
            return PERMISSION_MODULES.find(m => m.id === "organizations") || null;
        }
        if (app === "users") {
            return PERMISSION_MODULES.find(m => m.id === "users_roles") || null;
        }
        if (app === "news") {
            return PERMISSION_MODULES.find(m => m.id === "news_media") || null;
        }
        if (app === "locations") {
            return PERMISSION_MODULES.find(m => m.id === "locations") || null;
        }
        if (app === "configurations") {
            return PERMISSION_MODULES.find(m => m.id === "configurations") || null;
        }
    }

    return null;
}
