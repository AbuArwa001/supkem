import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface DialogFooterUIProps {
    isSaving: boolean;
    onClose: () => void;
    onSave: () => void;
}

export function DialogFooterUI({ isSaving, onClose, onSave }: DialogFooterUIProps) {
    return (
        <DialogFooter className="p-8 border-t border-slate-50 bg-slate-50/30 flex-row gap-3 shrink-0">
            <Button
                variant="ghost"
                onClick={onClose}
                className="flex-1 h-14 rounded-2xl font-bold text-slate-500 hover:bg-white border border-transparent hover:border-slate-100"
            >
                Discard
            </Button>
            <Button
                onClick={onSave}
                disabled={isSaving}
                className="flex-[1.5] h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20"
            >
                {isSaving ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                    </>
                ) : (
                    "Sync Policy"
                )}
            </Button>
        </DialogFooter>
    );
}
