"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Download, Trash2, X, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface UserBulkActionBarProps {
  selectedCount: number;
  onBulkAction: (action: "activate" | "deactivate" | "delete" | "resend_verification") => void;
  onExportSelected: () => void;
  onDeselectAll: () => void;
}

export function UserBulkActionBar(props: UserBulkActionBarProps) {
  const { selectedCount, onBulkAction, onExportSelected, onDeselectAll } = props;
  const tb = useTranslations("Dashboard.admin.users.bulk");

  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="sticky top-4 z-20 mx-6 -mb-14 p-3 bg-slate-900 text-white rounded-2xl shadow-2xl flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 pl-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-200">{tb("selected", { count: selectedCount })}</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button type="button" size="sm" variant="ghost" onClick={() => onBulkAction("activate")} className="h-8 rounded-xl text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950 font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" />{tb("activate")}
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => onBulkAction("deactivate")} className="h-8 rounded-xl text-amber-400 hover:text-amber-300 hover:bg-amber-950 font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <XCircle className="h-3.5 w-3.5" />{tb("suspend")}
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => onBulkAction("resend_verification")} className="h-8 rounded-xl text-sky-400 hover:text-sky-300 hover:bg-sky-950 font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />{tb("resendVerification")}
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={onExportSelected} className="h-8 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <Download className="h-3.5 w-3.5" />{tb("export")}
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => onBulkAction("delete")} className="h-8 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-950 font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <Trash2 className="h-3.5 w-3.5" />{tb("delete")}
            </Button>
            <div className="h-4 w-px bg-slate-700 mx-1" />
            <Button type="button" size="sm" variant="ghost" onClick={onDeselectAll} title={tb("deselect")} className="h-8 w-8 p-0 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
