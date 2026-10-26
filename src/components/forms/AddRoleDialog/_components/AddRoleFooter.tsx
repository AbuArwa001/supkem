import { Layers, Loader2, ShieldPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddRoleFooterProps {
  selectedCount: number;
  totalCount: number;
  isSaving: boolean;
  canSubmit: boolean;
  onCancel: () => void;
}

export function AddRoleFooter({
  selectedCount,
  totalCount,
  isSaving,
  canSubmit,
  onCancel,
}: AddRoleFooterProps) {
  return (
    <div className="p-5 px-7 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
        <Layers className="w-4 h-4 text-slate-400" />
        <span>
          {selectedCount} of {totalCount} operational actions granted
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isSaving}
          className="h-11 px-5 rounded-xl font-bold text-slate-500 hover:bg-slate-100"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSaving || !canSubmit}
          className="h-11 px-7 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 transition-all"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <ShieldPlus className="mr-2 h-4 w-4" />
              Create Role
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
