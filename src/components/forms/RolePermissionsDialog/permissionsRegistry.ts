export * from "./registry/modules";
export * from "./registry/rolePresets";
export * from "./registry/getModuleForPermission";
import { CORE_PERMISSION_METADATA } from "./registry/metadataCore";
import { ADMIN_PERMISSION_METADATA } from "./registry/metadataAdmin";

export const PERMISSION_METADATA = {
  ...CORE_PERMISSION_METADATA,
  ...ADMIN_PERMISSION_METADATA,
};
