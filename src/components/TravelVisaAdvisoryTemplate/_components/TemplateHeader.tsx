import Image from "next/image";
import { Mail, MapPin, Globe } from "lucide-react";

export const TemplateHeader = () => {
    return (
        <div className="flex flex-col items-center text-center pb-8 border-b-2 border-secondary/20">
            <Image src="/logo.svg" alt="SUPKEM Logo" width={80} height={80} className="mb-4" />
            <h1 className="text-2xl font-black uppercase tracking-widest text-primary font-outfit">Supreme Council of Kenya Muslims</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">Official Travel Advisory & Support</p>

            <div className="mt-6 grid grid-cols-3 w-full text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <div className="flex items-center gap-2 justify-center border-r border-slate-100">
                    <Mail size={12} className="text-secondary" /> visa@supkem.org
                </div>
                <div className="flex items-center gap-2 justify-center border-r border-slate-100">
                    <MapPin size={12} className="text-secondary" /> Nairobi, Kenya
                </div>
                <div className="flex items-center gap-2 justify-center">
                    <Globe size={12} className="text-secondary" /> International Liaison
                </div>
            </div>
        </div>
    );
};
