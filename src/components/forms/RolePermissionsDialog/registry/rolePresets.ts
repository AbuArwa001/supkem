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
      "view_payment", "change_payment", "reconcile_payment",
      "view_financial_analytics", "export_payment_reports",
      "view_application", "view_service",
    ],
  },
  {
    id: "applications_officer",
    roleName: "Applications Officer",
    badge: "Operations",
    badgeColor: "bg-blue-500/10 text-blue-700 border-blue-200",
    description: "Process citizen applications, issue serial certificates, and draft official letters",
    codenames: [
      "view_application", "change_application", "add_application",
      "view_certification", "add_certification", "change_certification",
      "view_letter", "add_letter", "change_letter",
      "view_service", "view_organization",
    ],
  },
  {
    id: "it_officer",
    roleName: "IT Officer",
    badge: "System Administration",
    badgeColor: "bg-purple-500/10 text-purple-700 border-purple-200",
    description: "Staff credentials, role permissions, maintenance windows, and system settings",
    codenames: [
      "view_user", "add_user", "change_user", "view_role",
      "change_role", "view_systemparameter", "change_systemparameter",
      "view_maintenance", "change_maintenance",
    ],
  },
  {
    id: "communications_officer",
    roleName: "Communications Officer",
    badge: "Media & Press",
    badgeColor: "bg-rose-500/10 text-rose-700 border-rose-200",
    description: "Publish news releases, manage newspapers, upload photo galleries, and post videos",
    codenames: [
      "view_news", "add_news", "change_news",
      "view_newspaper", "add_newspaper", "change_newspaper",
      "view_videobriefing", "add_videobriefing", "change_videobriefing",
      "view_newsgallery", "add_newsgallery",
    ],
  },
  {
    id: "compliance_auditor",
    roleName: "Compliance Auditor",
    badge: "Audit & Oversight",
    badgeColor: "bg-amber-500/10 text-amber-700 border-amber-200",
    description: "Read-only inspection clearance across financial logs, applications, and settings",
    codenames: [
      "view_payment", "view_financial_analytics", "export_payment_reports",
      "view_application", "view_certification", "view_letter",
      "view_service", "view_organization", "view_user",
      "view_role", "view_systemparameter",
    ],
  },
];
