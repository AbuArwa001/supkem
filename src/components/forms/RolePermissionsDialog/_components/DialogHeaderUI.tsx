import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ShieldCheck } from "lucide-react";

export function DialogHeaderUI({ roleName }: { roleName?: string }) {
    return (
        <div className="bg-slate-900 p-8 text-white relative overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] -mt-20 -mr-20" />
            <DialogHeader className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                    <div className="bg-white/10 p-3 rounded-2xl">
                        <ShieldCheck className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div>
                        <DialogTitle className="text-2xl font-black uppercase tracking-tight">
                            Manage <span className="text-indigo-400">Permissions</span>
                        </DialogTitle>
                        <DialogDescription className="text-slate-400 font-medium">
                            Updating access baseline for <span className="text-white font-bold">{roleName}</span>
                        </DialogDescription>
                    </div>
                </div>
            </DialogHeader>
        </div>
    );
}
