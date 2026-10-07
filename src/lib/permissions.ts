/**
 * Built-in system roles. These are protected on the backend (cannot be renamed
 * or deleted) and several backend endpoints still authorise them by name, so
 * they keep a baseline module set. Any other role is treated as a *custom* role
 * whose access is derived purely from the permissions attached to it.
 */
export type SystemRole =
  | "Super Admin"
  | "Admin"
  | "IT Officer"
  | "Finance Officer"
  | "Agent"
  | "Normal User";

export const SYSTEM_ROLES: SystemRole[] = [
  "Super Admin",
  "Admin",
  "IT Officer",
  "Finance Officer",
  "Agent",
  "Normal User",
];

/** The default citizen role assigned at self-registration. */
export const CITIZEN_ROLE: SystemRole = "Normal User";

export type PermissionModule =
  | "overview"
  | "organizations"
  | "applications"
  | "certificates"
  | "letters"
  | "services"
  | "finance"
  | "news"
  | "newspapers"
  | "leadership"
  | "videos"
  | "deadlines"
  | "users"
  | "settings"
  | "settings_access_control"
  | "settings_integrations"
  | "settings_audit"
  | "settings_system_parameters"
  | "settings_notifications"
  | "settings_social"
  | "settings_profile"
  | "portal";

/**
 * Baseline mapping of dashboard modules to built-in system roles, based on
 * backend RBAC capability matrices. Custom roles are NOT listed here — they are
 * resolved dynamically through MODULE_PERMISSIONS below.
 */
export const MODULE_ROLES_MAP: Record<PermissionModule, string[]> = {
  // Overview is accessible by all administrative and field operations staff
  overview: [
    "Super Admin",
    "Admin",
    "IT Officer",
    "Finance Officer",
    "Agent",
  ],

  // Mosque and Institution Directory
  organizations: [
    "Super Admin",
    "Admin",
    "IT Officer",
  ],

  // Citizen & Institutional Applications
  applications: [
    "Super Admin",
    "Admin",
    "Finance Officer",
    "Agent",
  ],

  // Official Serialization and Certificates
  certificates: [
    "Super Admin",
    "Admin",
    "Finance Officer",
    "Agent",
  ],

  // Recommendation & Introduction Letters
  letters: [
    "Super Admin",
    "Admin",
    "Agent",
  ],

  // Official Services & Fee Configuration
  services: [
    "Super Admin",
    "Admin",
    "Finance Officer",
    "Agent",
  ],

  // Financial Analytics & Payment Ledger
  finance: [
    "Super Admin",
    "Admin",
    "Finance Officer",
  ],


  // Media & Public Communications
  news: [
    "Super Admin",
    "Admin",
  ],
  newspapers: [
    "Super Admin",
    "Admin",
  ],
  leadership: [
    "Super Admin",
    "Admin",
  ],
  videos: [
    "Super Admin",
    "Admin",
  ],
  deadlines: [
    "Super Admin",
    "Admin",
  ],

  // Team Directory & User Provisioning
  users: [
    "Super Admin",
    "Admin",
    "IT Officer",
  ],

  // System Settings Hub
  settings: [
    "Super Admin",
    "Admin",
    "IT Officer",
  ],
  settings_access_control: [
    "Super Admin",
    "IT Officer",
  ],
  settings_integrations: [
    "Super Admin",
    "IT Officer",
  ],
  settings_audit: [
    "Super Admin",
    "IT Officer",
  ],
  settings_system_parameters: [
    "Super Admin",
    "Admin",
    "IT Officer",
  ],
  settings_notifications: [
    "Super Admin",
    "Admin",
    "IT Officer",
  ],
  settings_social: [
    "Super Admin",
    "Admin",
    "IT Officer",
  ],
  settings_profile: [
    "Super Admin",
    "Admin",
    "IT Officer",
    "Finance Officer",
    "Agent",
  ],

  // Member / Citizen Portal
  portal: [
    "Super Admin",
    "Admin",
    "IT Officer",
    "Finance Officer",
    "Agent",
    "Normal User",
  ],
};

/**
 * Dynamic mapping of dashboard modules to backend (Django) permission
 * codenames. Holding ANY listed codename grants access to the module. These are
 * the same codenames a Super Admin ticks in Settings → Access Control.
 */
export const MODULE_PERMISSIONS: Partial<Record<PermissionModule, string[]>> = {
  overview: ["view_application"],
  organizations: ["view_organization", "add_organization", "change_organization"],
  applications: ["view_application", "change_application"],
  certificates: ["view_certification", "add_certification", "change_certification"],
  letters: ["view_letter", "add_letter", "change_letter"],
  services: ["view_service", "add_service", "change_service", "change_servicecategory"],
  finance: ["view_payment", "change_payment", "view_financial_analytics"],
  news: ["add_news", "change_news", "delete_news", "add_newsgallery", "change_newsgallery"],
  newspapers: ["add_newspaper", "change_newspaper", "delete_newspaper"],
  leadership: ["add_leadershipprofile", "change_leadershipprofile", "delete_leadershipprofile"],
  videos: ["add_videobriefing", "change_videobriefing", "delete_videobriefing"],
  deadlines: ["add_service", "change_service"],
  users: ["view_user", "add_user", "change_user"],
  settings_access_control: ["view_role", "add_role", "change_role"],
  settings_integrations: ["change_systemparameter"],
  settings_system_parameters: ["view_systemparameter", "change_systemparameter"],
  settings_notifications: ["change_systemparameter"],
  settings_social: ["change_systemparameter"],
};

/** Modules that grant entry to the staff dashboard (/admin). */
const STAFF_MODULES: PermissionModule[] = [
  "organizations",
  "applications",
  "certificates",
  "letters",
  "services",
  "finance",
  "news",
  "newspapers",
  "leadership",
  "videos",
  "users",
  "settings_access_control",
  "settings_system_parameters",
];

const SETTINGS_MODULES: PermissionModule[] = [
  "settings_access_control",
  "settings_integrations",
  "settings_audit",
  "settings_system_parameters",
  "settings_notifications",
  "settings_social",
];

/** Dashboard route for each module, in landing-priority order. */
export const MODULE_ROUTES: [PermissionModule, string][] = [
  ["overview", "/admin"],
  ["applications", "/admin/applications"],
  ["organizations", "/admin/organizations"],
  ["certificates", "/admin/certificates"],
  ["letters", "/admin/letters"],
  ["finance", "/admin/finance"],
  ["news", "/admin/news"],
  ["newspapers", "/admin/news-papers"],
  ["leadership", "/admin/leadership"],
  ["videos", "/admin/videos"],
  ["services", "/admin/services"],
  ["users", "/admin/users"],
  ["settings", "/admin/settings"],
];

/**
 * Extracts and normalizes the active user's role name.
 */
export function getUserRoleName(user: any): string {
  if (!user) return "";
  if (user.is_superuser) return "Super Admin";
  
  const roleName = user.role?.role_name || user.role_name;
  if (roleName) return roleName.trim();

  if (user.is_staff) return "Admin";
  return "Normal User";
}

const normalize = (s: string) => s.toLowerCase().trim();

/** True when the user's role is one of the built-in system roles. */
export function isSystemRole(user: any): boolean {
  const role = normalize(getUserRoleName(user));
  return SYSTEM_ROLES.some((r) => normalize(r) === role);
}

/**
 * Returns the set of permission codenames attached to the user's role, as
 * served by the backend on /users/users/me/.
 */
export function getUserPermissionCodenames(user: any): Set<string> {
  const perms: any[] = user?.role?.permissions || [];
  return new Set(
    perms
      .map((p) => (typeof p === "string" ? p : p?.codename))
      .filter(Boolean)
  );
}

/** True when the user's role holds at least one of the given codenames. */
export function hasPermission(user: any, codenames: string | string[]): boolean {
  if (!user) return false;
  if (isSuperAdmin(user)) return true;
  const owned = getUserPermissionCodenames(user);
  const wanted = Array.isArray(codenames) ? codenames : [codenames];
  return wanted.some((c) => owned.has(c));
}

export function isSuperAdmin(user: any): boolean {
  if (!user) return false;
  return !!user.is_superuser || getUserRoleName(user) === "Super Admin";
}

/**
 * Checks whether the user has one of the specified roles.
 */
export function hasRole(user: any, allowedRoles: string | string[]): boolean {
  if (!user) return false;
  if (user.is_superuser) return true;

  const currentRole = getUserRoleName(user);
  if (currentRole === "Super Admin") return true;

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  return roles.some(
    (r) => r.toLowerCase().trim() === currentRole.toLowerCase().trim()
  );
}

/**
 * Checks whether the user is permitted to view/access a given module.
 *
 * Access is granted when EITHER the user's built-in system role includes the
 * module by default, OR the user's role has been granted a matching permission
 * by a Super Admin. The citizen role never gains staff modules through
 * permissions (it holds e.g. add_application for self-service submissions).
 */
export function canAccessModule(user: any, module: PermissionModule): boolean {
  if (!user) return false;
  if (isSuperAdmin(user)) return true;

  // 1. Baseline for built-in system roles
  if (hasRole(user, MODULE_ROLES_MAP[module] || [])) return true;

  // 2. Dynamic, permission-driven access
  if (module === "portal") return true;
  if (getUserRoleName(user) === CITIZEN_ROLE) return false;

  if (module === "settings") {
    return SETTINGS_MODULES.some((m) => canAccessModule(user, m));
  }
  if (module === "settings_profile") {
    return isStaff(user);
  }

  const codenames = MODULE_PERMISSIONS[module];
  return !!codenames && hasPermission(user, codenames);
}

/**
 * True when the user should be allowed into the staff dashboard (/admin).
 */
export function isStaff(user: any): boolean {
  if (!user) return false;
  if (isSuperAdmin(user) || user.is_staff) return true;
  if (hasRole(user, MODULE_ROLES_MAP.overview)) return true;
  if (getUserRoleName(user) === CITIZEN_ROLE) return false;

  return STAFF_MODULES.some((m) => {
    const codenames = MODULE_PERMISSIONS[m];
    return !!codenames && hasPermission(user, codenames);
  });
}

/**
 * Resolves the landing route for a user: the first dashboard module they can
 * access, or the citizen portal. Never returns a route the user would be
 * bounced from, which prevents blank-page redirect loops.
 */
export function getHomePath(user: any): string {
  if (!isStaff(user)) return "/portal";
  const first = MODULE_ROUTES.find(([m]) => canAccessModule(user, m));
  return first ? first[1] : "/portal";
}
