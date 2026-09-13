export type SystemRole =
  | "Super Admin"
  | "Admin"
  | "IT Officer"
  | "Finance Officer"
  | "Agent"
  | "Normal User";

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
 * Mapping of dashboard modules to authorized roles based on backend RBAC capability matrices.
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
 */
export function canAccessModule(user: any, module: PermissionModule): boolean {
  if (!user) return false;
  if (user.is_superuser) return true;

  const currentRole = getUserRoleName(user);
  if (currentRole === "Super Admin") return true;

  const allowedRoles = MODULE_ROLES_MAP[module];
  if (!allowedRoles) return false;

  return hasRole(user, allowedRoles);
}
