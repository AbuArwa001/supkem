export interface Permission {
  id: string | number;
  name: string;
  codename: string;
}

export interface Role {
  id: string;
  role_name: string;
  permissions: Permission[];
  users_count?: number;
  is_system_role?: boolean;
  created_at: string;
  updated_at: string;
}

export const MODULE_DISPLAY: Record<string, string> = {
  payment: "Finance & Payments",
  application: "Applications",
  certification: "Certificates",
  letter: "Letters",
  service: "Services",
  servicecategory: "Service Categories",
  organization: "Organizations",
  user: "Users",
  role: "Roles",
  news: "News",
  newspaper: "Newspapers",
  videobriefing: "Video Briefings",
  newsgallery: "Media Gallery",
  region: "Regions",
  countycouncil: "County Councils",
  systemparameter: "System Parameters",
  maintenance: "Maintenance",
  leadershipprofile: "Leadership",
};

export const ACTION_COLOR: Record<string, string> = {
  view: "bg-sky-50 text-sky-700 border-sky-200",
  add: "bg-emerald-50 text-emerald-700 border-emerald-200",
  change: "bg-amber-50 text-amber-700 border-amber-200",
  delete: "bg-rose-50 text-rose-700 border-rose-200",
  reconcile: "bg-purple-50 text-purple-700 border-purple-200",
  export: "bg-purple-50 text-purple-700 border-purple-200",
};

export function formatPermission(codename: string) {
  const parts = codename.split("_");
  const action = parts[0];
  const model = parts.slice(1).join("_");

  return {
    action: action.charAt(0).toUpperCase() + action.slice(1),
    module: MODULE_DISPLAY[model] || model.charAt(0).toUpperCase() + model.slice(1),
    color: ACTION_COLOR[action] || "bg-slate-50 text-slate-600 border-slate-200",
  };
}
