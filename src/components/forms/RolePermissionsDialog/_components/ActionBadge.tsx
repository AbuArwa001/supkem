import { Eye, PlusCircle, Edit3, Trash2, Sparkles } from "lucide-react";

export type PermissionActionType = "view" | "create" | "edit" | "delete" | "special";

export function inferAction(codename: string): PermissionActionType {
  if (codename.startsWith("view_")) return "view";
  if (codename.startsWith("add_")) return "create";
  if (codename.startsWith("change_")) return "edit";
  if (codename.startsWith("delete_")) return "delete";
  return "special";
}

export function ActionBadge({ action }: { action: PermissionActionType }) {
  switch (action) {
    case "view":
      return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200/80 text-[9px] font-black uppercase tracking-wider">
          <Eye className="w-2.5 h-2.5" />
          View
        </span>
      );
    case "create":
      return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[9px] font-black uppercase tracking-wider">
          <PlusCircle className="w-2.5 h-2.5" />
          Create
        </span>
      );
    case "edit":
      return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200/80 text-[9px] font-black uppercase tracking-wider">
          <Edit3 className="w-2.5 h-2.5" />
          Edit
        </span>
      );
    case "delete":
      return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200/80 text-[9px] font-black uppercase tracking-wider">
          <Trash2 className="w-2.5 h-2.5" />
          Delete
        </span>
      );
    case "special":
    default:
      return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200/80 text-[9px] font-black uppercase tracking-wider">
          <Sparkles className="w-2.5 h-2.5" />
          Action
        </span>
      );
  }
}
