"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";

interface MarriageCertificateTemplateProps {
    certificate: any;
}

export default function MarriageCertificateTemplate({ certificate }: MarriageCertificateTemplateProps) {
    const details = certificate.application?.marriage_details;
    if (!details) return null;

    const Row = ({ en, value, ar, className = "" }: { en: string; value: string; ar: string; className?: string }) => (
        <div className={cn("border-b border-slate-400 flex divide-x divide-slate-400 min-h-[40px]", className)}>
            <div className="w-[180px] p-2 bg-slate-50/50 flex items-center">
                <span className="text-[10px] font-bold text-slate-600 uppercase leading-tight font-sans">{en}</span>
            </div>
            <div className="flex-1 p-2 flex items-center px-4">
                <p className="text-sm font-black text-slate-900 uppercase font-mono tracking-tight">
                    {value || ""}
                </p>
            </div>
            <div className="w-[180px] p-2 bg-slate-50/50 flex items-center justify-end text-right">
                <span className="text-[12px] font-bold text-slate-800 leading-tight" dir="rtl">{ar}</span>
            </div>
        </div>
    );

    const SignatureBox = ({ label, arLabel, signLabel, signValue }: { label: string; arLabel: string; signLabel?: string; signValue?: string }) => (
        <div className="border border-slate-400 p-4 space-y-4">
            <div className="flex justify-between items-start">
                <p className="text-[10px] font-bold uppercase font-sans">{label}</p>
                <p className="text-[12px] font-bold" dir="rtl">{arLabel}</p>
            </div>
            <div className="pt-4 border-b border-slate-300 min-h-[60px] flex items-end justify-center">
                {signValue ? (
                    <span className="font-serif italic text-xl text-slate-400">{signValue}</span>
                ) : (
                    <span className="text-[10px] text-slate-300 italic">{signLabel}</span>
                )}
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-[800px] mx-auto p-10 bg-white text-slate-900 font-serif relative border-[12px] border-double border-slate-200 print:p-8 print:border-none">
            {/* Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none">
                <Image src="/logo.svg" alt="" width={500} height={500} />
            </div>

            <div className="relative z-10">
                {/* Top Header */}
                <div className="flex justify-between items-start mb-6">
                    <div className="text-left space-y-0.5">
                        <p className="text-[10px] font-black font-sans">FORM MM3 <span className="italic font-normal">r.9</span></p>
                        <p className="text-sm font-black tracking-tighter uppercase font-sans">ORIGINAL</p>
                    </div>
                    <div className="text-center space-y-1 flex-1">
                        <Image src="/logo.svg" alt="Republic of Kenya" width={70} height={70} className="mx-auto mb-2" />
                        <h2 className="text-sm font-black uppercase tracking-[0.2em] font-sans">Republic of Kenya</h2>
                        <h3 className="text-[10px] font-black uppercase font-sans">Marriage Act, 2014</h3>
                        <h1 className="text-lg font-black uppercase tracking-tight font-sans">Muslim Marriage Certificate</h1>
                        <p className="text-base font-bold mt-1" dir="rtl">شهادة الزواج للمسلمين</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-bold text-rose-700 font-sans">Serial No. <span className="text-xl font-black ml-1">{certificate.serial_number || "0000"}</span></p>
                    </div>
                </div>

                {/* Main Table Content */}
                <div className="border-[1.5px] border-slate-400 overflow-hidden">
                    <Row en="Marriage Entry No." value={details.marriage_entry_no} ar="رقم تسجيل الزواج" />
                    <Row en="Date of Marriage" value={new Date(details.date_of_marriage).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()} ar="تاريخ الزواج" />
                    <Row en="Husband's Name" value={details.husband_name} ar="إسم الزوج" />
                    <Row en="Husband's ID. No/Passport" value={details.husband_id_passport} ar="رقم البطاقة الشخصية/ جواز السفر للزوج" />
                    <Row en="Age" value={`${details.husband_age} YEARS OLD`} ar="عمر الزوج" />
                    <Row en="Marital Status" value={details.husband_marital_status} ar="الحالة الزوجية للزوج وقت هذا الزواج" />
                    <Row en="Occupation" value={details.husband_occupation} ar="وظيفة الزوج" />

                    {/* Residence Husband */}
                    <div className="border-b border-slate-400 flex divide-x divide-slate-400 min-h-[40px]">
                        <div className="w-[180px] p-2 bg-slate-50/50 flex items-center">
                            <span className="text-[10px] font-bold text-slate-600 uppercase leading-tight font-sans">Residence</span>
                        </div>
                        <div className="flex-1 flex divide-x divide-slate-400">
                            <div className="flex-1 p-2 flex flex-col items-center justify-center">
                                <span className="text-[8px] font-bold text-slate-400 uppercase">County الإقليم</span>
                                <p className="text-sm font-black uppercase">{details.husband_residence_county}</p>
                            </div>
                            <div className="flex-1 p-2 flex flex-col items-center justify-center">
                                <span className="text-[8px] font-bold text-slate-400 uppercase">Sub-County المحافظة</span>
                                <p className="text-sm font-black uppercase">{details.husband_residence_sub_county}</p>
                            </div>
                        </div>
                        <div className="w-[180px] p-2 bg-slate-50/50 flex items-center justify-end text-right">
                            <span className="text-[12px] font-bold text-slate-800 leading-tight" dir="rtl">محل إقامة الزوج</span>
                        </div>
                    </div>

                    <Row en="Wife's Name" value={details.wife_name} ar="إسم الزوجة" />
                    <Row en="Wife's ID. No/Passport" value={details.wife_id_passport} ar="رقم البطاقة الشخصية/ جواز السفر للزوجة" />
                    <Row en="Age" value={`${details.wife_age} YEARS OLD`} ar="عمر الزوجة" />
                    <Row en="Marital Status" value={details.wife_marital_status} ar="الحالة الزوجية للزوجة وقت هذا الزواج" />
                    <Row en="Occupation" value={details.wife_occupation} ar="وظيفة الزوجة" />

                    {/* Residence Wife */}
                    <div className="border-b border-slate-400 flex divide-x divide-slate-400 min-h-[40px]">
                        <div className="w-[180px] p-2 bg-slate-50/50 flex items-center">
                            <span className="text-[10px] font-bold text-slate-600 uppercase leading-tight font-sans">Residence</span>
                        </div>
                        <div className="flex-1 flex divide-x divide-slate-400">
                            <div className="flex-1 p-2 flex flex-col items-center justify-center">
                                <span className="text-[8px] font-bold text-slate-400 uppercase">County الإقليم</span>
                                <p className="text-sm font-black uppercase">{details.wife_residence_county}</p>
                            </div>
                            <div className="flex-1 p-2 flex flex-col items-center justify-center">
                                <span className="text-[8px] font-bold text-slate-400 uppercase">Sub-County المحافظة</span>
                                <p className="text-sm font-black uppercase">{details.wife_residence_sub_county}</p>
                            </div>
                        </div>
                        <div className="w-[180px] p-2 bg-slate-50/50 flex items-center justify-end text-right">
                            <span className="text-[12px] font-bold text-slate-800 leading-tight" dir="rtl">محل إقامة الزوجة</span>
                        </div>
                    </div>

                    <Row en="Wife's Waliyy and relationship" value={`${details.wife_waliyy_name}, ${details.wife_waliyy_relationship.toUpperCase()}`} ar="اسم ولي الزوجة ونوع القرابة" />
                    <Row en="Agreed Mahr" value={details.agreed_mahr} ar="المهر المتفق عليه" />
                    <Row en="Paid Mahr and Deferred Mahr" value={details.paid_mahr_and_deferred} ar="المهر المسلم والمهر المؤجل" />
                    <Row en="Particulars of gifts" value={details.particulars_of_gifts} ar="تفاصيل الهدايا" />
                    <Row en="Place of Marriage" value={details.place_of_marriage} ar="المكان الذي عقد فيه الزواج" />
                    <Row en="County of Marriage" value={details.county_of_marriage} ar="الاقليم الذي عقد فيه الزواج" />

                    <Row en="Husband's Signature or His Attorney" value="" ar="توقيع الزوج او وكيله" />
                    <Row en="Wife's/Guardian's Signature" value="" ar="توقيع الزوجة او وليها" />

                    <div className="border-b border-slate-400 flex divide-x divide-slate-400 min-h-[60px]">
                        <div className="w-[220px] p-2 flex flex-col justify-start">
                            <span className="text-[9px] font-bold uppercase font-sans leading-tight">Name of 1st Witness, Identity card no. and Signature</span>
                        </div>
                        <div className="flex-1 flex divide-x divide-slate-400">
                            <div className="flex-[2] p-2 flex items-center">
                                <p className="text-sm font-black uppercase">{details.witness_1_name}</p>
                            </div>
                            <div className="flex-1 p-2 flex flex-col justify-center border-l border-slate-400">
                                <span className="text-[8px] font-bold text-slate-400 uppercase">ID: {details.witness_1_id}</span>
                            </div>
                        </div>
                        <div className="w-[220px] p-2 flex items-center justify-end text-right">
                            <span className="text-[11px] font-bold text-slate-800 leading-tight" dir="rtl">إسم الشاهد الأول ورقم بطاقته الشخصية وتوقيعه</span>
                        </div>
                    </div>

                    <div className="border-b border-slate-400 flex divide-x divide-slate-400 min-h-[60px]">
                        <div className="w-[220px] p-2 flex flex-col justify-start">
                            <span className="text-[9px] font-bold uppercase font-sans leading-tight">Name of 2nd Witness, Identity card no. and Signature</span>
                        </div>
                        <div className="flex-1 flex divide-x divide-slate-400">
                            <div className="flex-[2] p-2 flex items-center">
                                <p className="text-sm font-black uppercase">{details.witness_2_name}</p>
                            </div>
                            <div className="flex-1 p-2 flex flex-col justify-center border-l border-slate-400">
                                <span className="text-[8px] font-bold text-slate-400 uppercase">ID: {details.witness_2_id}</span>
                            </div>
                        </div>
                        <div className="w-[220px] p-2 flex items-center justify-end text-right">
                            <span className="text-[11px] font-bold text-slate-800 leading-tight" dir="rtl">إسم الشاهد الثاني ورقم بطاقته الشخصية وتوقيعه</span>
                        </div>
                    </div>

                    <div className="flex divide-x divide-slate-400 min-h-[80px]">
                        <div className="w-[220px] p-2 flex flex-col justify-start">
                            <span className="text-[9px] font-bold uppercase font-sans leading-tight">Name and Signature of Muslim Marriage Officer</span>
                        </div>
                        <div className="flex-1 p-2 flex flex-col items-center justify-center space-y-1 relative">
                            <p className="text-lg font-black font-serif italic text-primary mt-2">
                                {details.marriage_officer_name || "Hon. Khamis Ramadhani"}
                            </p>
                            <p className="text-[10px] font-black uppercase border-t border-slate-900 pt-0.5">Principal Kadhi</p>

                            {/* Red Official Seal Watermark in the officer section */}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-24 h-24 border-4 border-rose-600/30 rounded-full flex items-center justify-center text-[8px] font-black text-rose-600/40 uppercase rotate-12 pointer-events-none">
                                OFFICIAL SEAL
                            </div>
                        </div>
                        <div className="w-[220px] p-2 flex items-center justify-end text-right">
                            <span className="text-[11px] font-bold text-slate-800 leading-tight" dir="rtl">إسم المأذون الشرعي الذي عقد النكاح وتوقيعه</span>
                        </div>
                    </div>
                </div>

                {/* Footer Date */}
                <div className="mt-4 flex justify-between items-end">
                    <div className="flex gap-4 items-end">
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase font-sans">Date of Issuance</p>
                            <p className="text-sm font-black border-b border-slate-900 min-w-[150px]">
                                {details.date_of_issuance ? new Date(details.date_of_issuance).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase() : ""}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[12px] font-bold text-right" dir="rtl">تاريخ الإصدار</p>
                        </div>
                    </div>

                    <div className="text-center space-y-2 opacity-60">
                        <ShieldCheck className="mx-auto text-primary" size={24} />
                        <p className="text-[8px] font-black uppercase tracking-widest max-w-[200px] leading-tight">
                            Authentic Document Issued by the Supreme Council of Kenya Muslims
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .divide-slate-400 > :not([hidden]) ~ :not([hidden]) {
                    border-color: #94a3b8;
                }
            `}</style>
        </div>
    );
}
