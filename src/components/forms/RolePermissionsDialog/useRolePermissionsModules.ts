import { useMemo, useEffect } from "react";
import useSWR from "swr";
import { fetchPermissionsService } from "./services";
import type { Permission } from "./types";
import { PERMISSION_MODULES, getModuleForPermission, PERMISSION_METADATA } from "./permissionsRegistry";
import type { GroupedModule } from "./_components/PermissionsList";

export function useRolePermissionsModules(isOpen: boolean, search: string) {
  const { data: allPermissions, isLoading: isLoadingPerms } = useSWR<Permission[]>(
    isOpen ? "/users/permissions/" : null,
    fetchPermissionsService
  );

  const sanitizedPermissions = useMemo(() => {
    if (!allPermissions) return [];
    return allPermissions.filter((perm) => getModuleForPermission(perm) !== null);
  }, [allPermissions]);

  const modules = useMemo<GroupedModule[]>(() => {
    if (!sanitizedPermissions.length) return [];

    const searchLower = search.trim().toLowerCase();
    const map = new Map<string, Permission[]>();

    PERMISSION_MODULES.forEach((mod) => {
      map.set(mod.id, []);
    });

    sanitizedPermissions.forEach((perm) => {
      const mod = getModuleForPermission(perm);
      if (!mod) return;

      if (searchLower) {
        const meta = PERMISSION_METADATA[perm.codename];
        const matches =
          perm.name.toLowerCase().includes(searchLower) ||
          perm.codename.toLowerCase().includes(searchLower) ||
          mod.title.toLowerCase().includes(searchLower) ||
          (meta?.label && meta.label.toLowerCase().includes(searchLower)) ||
          (meta?.summary && meta.summary.toLowerCase().includes(searchLower));

        if (!matches) return;
      }

      const current = map.get(mod.id) || [];
      current.push(perm);
      map.set(mod.id, current);
    });

    const result: GroupedModule[] = [];
    PERMISSION_MODULES.forEach((meta) => {
      const perms = map.get(meta.id) || [];
      if (perms.length > 0) {
        result.push({ meta, permissions: perms });
      }
    });

    return result;
  }, [sanitizedPermissions, search]);

  return { sanitizedPermissions, modules, isLoadingPerms };
}
