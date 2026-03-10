"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Heart, User, MapPin, Calendar, Users, Gift, ShieldCheck } from "lucide-react";

interface MarriageCertificateTemplateProps {
    certificate: any;
}

export default function MarriageCertificateTemplate({ certificate }: MarriageCertificateTemplateProps) {
    const details = certificate.application?.marriage_details;
    if (!details) return null;

    const LabelPair = ({ en, ar, value, className = "" }: { en: string; ar: string; value: string; className?: string }) => (
        <div className={cn("border-b border-slate-300 py-2 flex justify-between items-end gap-4", className)}>
            <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 uppercase leading-tight">{en}</span>
                <span className="text-[10px] font-bold text-slate-800 text-right leading-tight" dir="rtl">{ar}</span>
            </div>
            <p className="text-sm font-black text-slate-900 border-l border-slate-200 pl-4 flex-1 uppercase">
                {value || "................................................"}
            </p>
        </div>
    );

    return (
        <div className="w-full max-w-4xl mx-auto p-12 bg-white text-slate-900 font-serif relative overflow-hidden print:p-0">
            {/* Background Crest Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
                <Image src="/logo.svg" alt="" width={600} height={600} />
            </div>

            {/* Header Section */}
            <div className="relative z-10 space-y-8">
                <div className="flex justify-between items-start">
                    <div className="text-left">
                        <p className="text-xs font-bold uppercase tracking-widest">FORM MM3</p>
                        <p className="text-xs font-bold uppercase">ORIGINAL</p>
                    </div>
                    <div className="text-center space-y-2">
                        <Image src="/logo.svg" alt="Republic of Kenya" width={60} height={60} className="mx-auto" />
                        <h2 className="text-sm font-black uppercase tracking-widest">Republic of Kenya</h2>
                        <h3 className="text-xs font-bold uppercase">Marriage Act 2014</h3>
                        <h1 className="text-lg font-black uppercase border-b-2 border-slate-900 inline-block px-4">Muslim Marriage Certificate</h1>
                        <p className="text-sm font-bold" dir="rtl">شهادة الزواج الإسلامي</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-bold text-rose-600">Serial No. <span className="text-lg font-black">{certificate.serial_number || "0751"}</span></p>
                    </div>
                </div>

                {/* Information Grid */}
                <div className="grid grid-cols-1 gap-1 border-t-2 border-slate-900 pt-6">
                    <LabelPair en="Place of Marriage" ar="مكان عقد الزواج" value={details.place_of_marriage} />
                    <LabelPair en="Date of Marriage" ar="تاريخ الزواج" value={new Date(details.date_of_marriage).toLocaleDateString(undefined, { dateStyle: 'long' })} />

                    <div className="grid grid-cols-2 gap-4">
                        <LabelPair en="Husband's Full Name" ar="إسم الزوج بالكامل" value={details.husband_name} />
                        <LabelPair en="Wife's Full Name" ar="إسم الزوجة بالكامل" value={details.wife_name} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <LabelPair en="Husband's ID/Passport" ar="رقم الهوية / الجواز" value={details.husband_id_passport} />
                        <LabelPair en="Wife's ID/Passport" ar="رقم الهوية / الجواز" value={details.wife_id_passport} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <LabelPair en="Husband's Age" ar="عمر الزوج" value={details.husband_age} />
                        <LabelPair en="Wife's Age" ar="عمر الزوجة" value={details.wife_age} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <LabelPair en="Husband's Marital Status" ar="حالة الزوج الإجتماعية" value={details.husband_marital_status} />
                        <LabelPair en="Wife's Marital Status" ar="حالة الزوجة الإجتماعية" value={details.wife_marital_status} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <LabelPair en="Husband's Occupation" ar="مهنة الزوج" value={details.husband_occupation} />
                        <LabelPair en="Wife's Occupation" ar="مهنة الزوجة" value={details.wife_occupation} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-2 gap-2">
                            <LabelPair en="County" ar="المقاطعة" value={details.husband_residence_county} />
                            <LabelPair en="Sub-County" ar="المقاطعة الفرعية" value={details.husband_residence_sub_county} />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <LabelPair en="County" ar="المقاطعة" value={details.wife_residence_county} />
                            <LabelPair en="Sub-County" ar="المقاطعة الفرعية" value={details.wife_residence_sub_county} />
                        </div>
                    </div>

                    <LabelPair en="Waliyy Name & Relationship" ar="إسم الولي وعلاقته بها" value={`${details.wife_waliyy_name} (${details.wife_waliyy_relationship})`} />

                    <div className="grid grid-cols-2 gap-4">
                        <LabelPair en="Agreed Mahr" ar="المهر المتفق عليه" value={details.agreed_mahr} />
                        <LabelPair en="Paid / Deferred" ar="معجل / مؤجل" value={details.paid_mahr_and_deferred} />
                    </div>

                    <LabelPair en="Witness 1 Name & ID" ar="إسم الشاهد الأول ورقم هويته" value={`${details.witness_1_name} (ID: ${details.witness_1_id})`} />
                    <LabelPair en="Witness 2 Name & ID" ar="إسم الشاهد الثاني ورقم هويته" value={`${details.witness_2_name} (ID: ${details.witness_2_id})`} />
                </div>

                {/* Signatures and Stamps */}
                <div className="pt-10 grid grid-cols-1 md:grid-cols-3 gap-12 items-end">
                    <div className="space-y-4 text-center">
                        <div className="h-20 border-b border-slate-400 flex items-center justify-center italic text-slate-300 text-xs">Husband Signature</div>
                        <p className="text-[10px] font-bold uppercase">Signature of Husband / توقيع الزوج</p>
                    </div>
                    <div className="space-y-4 text-center">
                        <div className="h-20 border-b border-slate-400 flex items-center justify-center italic text-slate-300 text-xs">Wife Signature</div>
                        <p className="text-[10px] font-bold uppercase">Signature of Wife / توقيع الزوجة</p>
                    </div>
                    <div className="space-y-4 text-center">
                        <div className="h-32 w-32 mx-auto rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center text-[8px] uppercase font-black text-slate-300 rotate-12">
                            Official SUPKEM Stamp
                        </div>
                        <p className="text-[10px] font-bold uppercase">SUPKEM Official Stamp</p>
                    </div>
                </div>

                <div className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-20 items-end border-t border-slate-100">
                    <div className="space-y-6">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase text-slate-400">Registrar</p>
                            <p className="text-sm font-black uppercase underline decoration-2 underline-offset-4">
                                {certificate.application?.organization_name || "SUPKEM HEADQUARTERS"}
                            </p>
                            <p className="text-[10px] font-bold uppercase text-slate-500">Authorized Marriage Registrar</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase text-slate-400">Date of Issue / تاريخ الإصدار</p>
                            <p className="text-sm font-black">{new Date(certificate.issued_at).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                        </div>
                    </div>
                    <div className="space-y-4 text-center border-2 border-slate-900 p-6 rounded-xl">
                        <ShieldCheck size={32} className="mx-auto text-slate-900 opacity-20 mb-2" />
                        <p className="text-[10px] font-black uppercase italic">Valid Muslim Marriage Certificate</p>
                        <p className="text-[8px] font-bold text-slate-500 max-w-[200px] mx-auto leading-tight">
                            This document is both Islamically valid and legally recognized under the Laws of Kenya (Marriage Act 2014).
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
