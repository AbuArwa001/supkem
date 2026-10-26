import {
  PermissionModule,
  STAFF_MODULES,
  SETTINGS_MODULES,
  MODULE_ROUTES,
  CITIZEN_ROLE,
} from "./types";
import { MODULE_ROLES_MAP, MODULE_PERMISSIONS } from "./moduleMappings";
import {
  isSuperAdmin,
  hasRole,
  getUserRoleName,
  hasPermission,
} from "./roleChecks";

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

  if (hasRole(user, MODULE_ROLES_MAP[module] || [])) return true;

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
