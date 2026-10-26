import { PermissionModule } from "./types";

/**
 * Baseline mapping of dashboard modules to built-in system roles, based on
 * backend RBAC capability matrices. Custom roles are NOT listed here — they are
 * resolved dynamically through MODULE_PERMISSIONS below.
 */
export const MODULE_ROLES_MAP: Record<PermissionModule, string[]> = {
  overview: ["Super Admin", "Admin", "IT Officer", "Finance Officer", "Agent"],
  organizations: ["Super Admin", "Admin", "IT Officer"],
  applications: ["Super Admin", "Admin", "Finance Officer", "Agent"],
  certificates: ["Super Admin", "Admin", "Finance Officer", "Agent"],
  letters: ["Super Admin", "Admin", "Agent"],
  services: ["Super Admin", "Admin", "Finance Officer", "Agent"],
  finance: ["Super Admin", "Admin", "Finance Officer"],
  news: ["Super Admin", "Admin"],
  newspapers: ["Super Admin", "Admin"],
  leadership: ["Super Admin", "Admin"],
  videos: ["Super Admin", "Admin"],
  deadlines: ["Super Admin", "Admin"],
  users: ["Super Admin", "Admin", "IT Officer"],
  settings: ["Super Admin", "Admin", "IT Officer"],
  settings_access_control: ["Super Admin", "IT Officer"],
  settings_integrations: ["Super Admin", "IT Officer"],
  settings_audit: ["Super Admin", "IT Officer"],
  settings_system_parameters: ["Super Admin", "Admin", "IT Officer"],
  settings_notifications: ["Super Admin", "Admin", "IT Officer"],
  settings_social: ["Super Admin", "Admin", "IT Officer"],
  settings_profile: ["Super Admin", "Admin", "IT Officer", "Finance Officer", "Agent"],
  portal: ["Super Admin", "Admin", "IT Officer", "Finance Officer", "Agent", "Normal User"],
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
