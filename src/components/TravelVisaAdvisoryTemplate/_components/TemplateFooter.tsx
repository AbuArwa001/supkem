import { ShieldCheck, Plane, Globe } from "lucide-react";
import { CertificateQRCode } from "@/components/CertificateQRCode";

interface TemplateFooterProps {
    serialNumber?: string;
    qrCodeHash?: string;
}

export const TemplateFooter = ({ serialNumber, qrCodeHash }: TemplateFooterProps) => {
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
            <div className="mt-12 flex items-center justify-between gap-6">
                <div className="flex gap-4 opacity-40">
                    <Plane size={32} />
                    <Globe size={32} />
                </div>
                <div className="h-px bg-slate-300 flex-1" />
                <div className="shrink-0 flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-700">Official Visa Advisory</p>
                        <p className="text-[7px] font-bold uppercase text-slate-400">Scan to verify</p>
                    </div>
                    <div className="p-1 bg-white border border-slate-200 rounded-lg shadow-xs">
                        <CertificateQRCode
                            hash={qrCodeHash}
                            serialNumber={serialNumber}
                            size={56}
                            fgColor="#0f172a"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
