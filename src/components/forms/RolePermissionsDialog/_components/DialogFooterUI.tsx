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
        <DialogFooter className="p-6 sm:p-8 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div>
                {canDelete && onDelete && (
                    confirmDelete ? (
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
                                <AlertTriangle size={13} />
                                Delete Role?
                            </span>
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                disabled={isDeleting}
                                onClick={onDelete}
                                className="h-9 px-3 rounded-xl font-bold text-xs"
                            >
                                {isDeleting ? (
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                    "Confirm Delete"
                                )}
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setConfirmDelete(false)}
                                className="h-9 px-2.5 rounded-xl font-medium text-xs text-slate-500"
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
                            className="h-10 px-3 rounded-xl text-rose-500 hover:text-rose-700 hover:bg-rose-50 text-xs font-bold flex items-center gap-1.5"
                        >
                            <Trash2 size={14} />
                            <span>Delete Role</span>
                        </Button>
                    )
                )}
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
