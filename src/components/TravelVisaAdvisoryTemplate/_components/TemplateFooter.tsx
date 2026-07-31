import { ShieldCheck, Plane, Globe } from "lucide-react";

export const TemplateFooter = () => {
    return (
        <>
            <div className="pt-10">
                <p>Sincerely,</p>
                <div className="mt-8 flex items-end justify-between">
                    <div className="space-y-1 border-t-2 border-slate-800 pt-4 w-64">
                        <p className="font-bold uppercase leading-none">Foreign Affairs Liaison</p>
                        <p className="text-xs font-medium text-slate-500">Supreme Council of Kenya Muslims</p>
                    </div>

                    {/* Digital Verification Seal */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-24 h-24 rounded-full border-4 border-secondary/20 flex items-center justify-center p-2 relative">
                            <ShieldCheck size={48} className="text-secondary opacity-20" />
                            <div className="absolute text-[8px] font-black text-secondary/30 uppercase text-center w-20 leading-tight">
                                Consular<br />Verified<br />SUPKEM VISA
                            </div>
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Verification Seal</p>
                    </div>
                </div>
            </div>

            {/* Footer QR/Verification */}
            <div className="mt-12 flex items-center justify-between gap-6 opacity-30 invert print:opacity-10">
                <div className="flex gap-4">
                    <Plane size={32} />
                    <Globe size={32} />
                </div>
                <div className="h-px bg-slate-800 flex-1" />
                <div className="w-16 h-16 bg-slate-800 rounded-lg shrink-0 flex items-center justify-center text-white font-black text-xs">
                    SUPKEM VISA
                </div>
            </div>
        </>
    );
};
