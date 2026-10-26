import type { Permission } from "../types";
import { PERMISSION_MODULES, EXCLUDED_MODELS, PermissionModuleMeta } from "./modules";

/**
 * Maps a raw permission to its target module definition
 */
export function getModuleForPermission(perm: Permission): PermissionModuleMeta | null {
  let model = perm.model?.toLowerCase();
  if (!model) {
    const parts = perm.codename.split("_");
    model = parts.slice(1).join("_").toLowerCase();
  }

  if (EXCLUDED_MODELS.has(model)) {
    return null;
  }

  if (model === "payment") {
    return PERMISSION_MODULES.find((m) => m.id === "finance") || null;
  }

  for (const mod of PERMISSION_MODULES) {
    if (mod.models.includes(model)) {
      return mod;
    }
  }

  if (perm.app_label) {
    const app = perm.app_label.toLowerCase();
    const appMap: Record<string, string> = {
      applications: "applications",
      services: "services",
      organizations: "organizations",
      users: "users_roles",
      news: "news_media",
      locations: "locations",
      configurations: "configurations",
    };
    const targetModuleId = appMap[app];
    if (targetModuleId) {
      return PERMISSION_MODULES.find((m) => m.id === targetModuleId) || null;
    }
  }

  return null;
}
