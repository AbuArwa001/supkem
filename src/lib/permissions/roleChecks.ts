import { SYSTEM_ROLES } from "./types";

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

export function isSuperAdmin(user: any): boolean {
  if (!user) return false;
  return !!user.is_superuser || getUserRoleName(user) === "Super Admin";
}

/** True when the user's role holds at least one of the given codenames. */
export function hasPermission(user: any, codenames: string | string[]): boolean {
  if (!user) return false;
  if (isSuperAdmin(user)) return true;
  const owned = getUserPermissionCodenames(user);
  const wanted = Array.isArray(codenames) ? codenames : [codenames];
  return wanted.some((c) => owned.has(c));
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
