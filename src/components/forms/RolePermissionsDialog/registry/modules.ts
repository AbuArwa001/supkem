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

export { EXCLUDED_MODELS } from "./excludedModels";

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
