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

/** Modules that grant entry to the staff dashboard (/admin). */
export const STAFF_MODULES: PermissionModule[] = [
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

export const SETTINGS_MODULES: PermissionModule[] = [
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
