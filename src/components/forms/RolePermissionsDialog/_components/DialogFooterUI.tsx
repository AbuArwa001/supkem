import { useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, AlertTriangle } from "lucide-react";

interface DialogFooterUIProps {
    isSaving: boolean;
    isDeleting?: boolean;
    canDelete?: boolean;
    onClose: () => void;
    onSave: () => void;
    onDelete?: () => void;
}

export function DialogFooterUI({
    isSaving,
    isDeleting = false,
    canDelete = false,
    onClose,
    onSave,
    onDelete,
}: DialogFooterUIProps) {
    const [confirmDelete, setConfirmDelete] = useState(false);

    return (
        <DialogFooter className="p-6 sm:p-8 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shrink-0">
            <div className="flex items-center">
                {canDelete && onDelete ? (
                    confirmDelete ? (
                        <div className="flex items-center gap-2 p-1.5 px-2.5 bg-rose-50 border border-rose-200 rounded-2xl animate-in fade-in zoom-in-95 duration-200">
                            <span className="text-xs font-black text-rose-700 flex items-center gap-1.5 uppercase tracking-wider">
                                <AlertTriangle size={14} className="text-rose-600 shrink-0" />
                                Delete permanently?
                            </span>
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                disabled={isDeleting}
                                onClick={onDelete}
                                className="h-8 px-3 rounded-xl font-black text-xs uppercase tracking-wider bg-rose-600 hover:bg-rose-700 shadow-sm"
                            >
                                {isDeleting ? (
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                    "Yes, Delete"
                                )}
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setConfirmDelete(false)}
                                className="h-8 px-2 rounded-xl font-bold text-xs text-slate-500 hover:text-slate-800 hover:bg-white"
                            >
                                Cancel
                            </Button>
                        </div>
                    ) : (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setConfirmDelete(true)}
                            className="h-10 px-3.5 rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-100/60 text-xs font-black uppercase tracking-wider flex items-center gap-2 border border-rose-200/60 bg-rose-50/40 transition-all cursor-pointer"
                        >
                            <Trash2 size={15} />
                            <span>Delete Role</span>
                        </Button>
                    )
                ) : null}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <Button
                    variant="ghost"
                    onClick={onClose}
                    disabled={isSaving || isDeleting}
                    className="h-12 px-5 rounded-2xl font-bold text-slate-500 hover:bg-white border border-transparent hover:border-slate-100"
                >
                    Discard
                </Button>
                <Button
                    onClick={onSave}
                    disabled={isSaving || isDeleting}
                    className="h-12 px-7 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20"
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        "Sync Role & Policies"
                    )}
                </Button>
            </div>
        </DialogFooter>
    );
}
