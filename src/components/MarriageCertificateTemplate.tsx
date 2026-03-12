"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { ShieldCheck, Award } from "lucide-react";

interface MarriageCertificateTemplateProps {
    certificate: any;
}

export default function MarriageCertificateTemplate({ certificate }: MarriageCertificateTemplateProps) {
    const details = certificate.application?.marriage_details;
    if (!details) return null;

    const Row = ({ en, value, ar, className = "" }: { en: string; value: string; ar: string; className?: string }) => (
        <div className={cn("border-b border-slate-900 flex divide-x divide-slate-800 min-h-[42px]", className)}>
            <div className="w-[190px] p-2 bg-slate-100/30 flex items-center">
                <span className="text-[10px] font-bold text-slate-800 uppercase leading-tight font-sans tracking-tighter">{en}</span>
            </div>
            <div className="flex-1 p-2 flex items-center px-4">
                <p className="text-sm font-black text-slate-900 uppercase font-mono tracking-tight whitespace-pre-wrap">
                    {value || ""}
                </p>
            </div>
            <div className="w-[190px] p-2 bg-slate-100/30 flex items-center justify-end text-right">
                <span className="text-[12px] font-black text-slate-900 leading-tight" dir="rtl">{ar}</span>
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-[850px] mx-auto p-12 bg-[#fafaf8] text-slate-900 font-serif relative border-[16px] border-double border-slate-300 shadow-2xl print:shadow-none print:p-8 print:border-none overflow-hidden">
            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

            {/* Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none">
                <Image src="/logo.svg" alt="" width={600} height={600} />
            </div>

            <div className="relative z-10 border-[1px] border-slate-400 p-8 h-full">
                {/* Top Header */}
                <div className="flex justify-between items-start mb-10">
                    <div className="text-left space-y-0.5">
                        <p className="text-[11px] font-black font-sans tracking-widest">FORM MM3 <span className="italic font-normal">r.9</span></p>
                        <p className="text-sm font-black tracking-tighter uppercase font-sans border-b-2 border-slate-900 inline-block">ORIGINAL</p>
                    </div>
                    <div className="text-center space-y-1.5 flex-1 px-4">
                        <Image src="/logo.svg" alt="Republic of Kenya" width={85} height={85} className="mx-auto mb-3 drop-shadow-sm" />
                        <div className="space-y-0 text-slate-800">
                            <h2 className="text-base font-black uppercase tracking-[0.25em] font-sans">REPUBLIC OF KENYA</h2>
                            <p className="text-sm font-black" dir="rtl">جمهورية كينيا</p>
                        </div>
                        <h3 className="text-[11px] font-black uppercase font-sans tracking-[0.1em] text-slate-600">Marriage Act, 2014</h3>
                        <div className="h-0.5 w-32 bg-slate-900 mx-auto my-2" />
                        <h1 className="text-xl font-black uppercase tracking-tight font-sans bg-slate-900 text-white px-4 py-1 inline-block">Muslim Marriage Certificate</h1>
                        <p className="text-lg font-black mt-2 text-slate-800" dir="rtl">شهادة الزواج للمسلمين</p>
                    </div>
                    <div className="text-right flex flex-col items-end">
                        <div className="border-2 border-slate-300 p-1 rounded-sm mb-2">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 text-center">Serial No.</p>
                            <p className="text-2xl font-black text-rose-600 font-mono tracking-tighter bg-rose-50 px-3 py-1 rounded shadow-inner">
                                {certificate.serial_number || "0781"}
                            </p>
                        </div>
                        {/* Circle Court Stamp Placeholder */}
                        <div className="w-20 h-20 rounded-full border-[1.5px] border-slate-300/50 flex flex-col items-center justify-center text-[7px] font-black text-slate-300 uppercase leading-none text-center p-2">
                            <div className="border border-slate-300/50 rounded-full p-2 h-full w-full flex items-center justify-center">
                                KADHI'S <br /> COURT <br /> STAMP
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Table Content */}
                <div className="border-[2px] border-slate-900 overflow-hidden shadow-sm bg-white/40">
                    <Row en="Marriage Entry No." value={details.marriage_entry_no} ar="رقم تسجيل الزواج" />
                    <Row en="Date of Marriage" value={new Date(details.date_of_marriage).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()} ar="تاريخ الزواج" />
                    <Row en="Husband's Name" value={details.husband_name} ar="إسم الزوج" />
                    <Row en="Husband's ID. No/Passport" value={details.husband_id_passport} ar="رقم البطاقة الشخصية/ جواز السفر للزوج" />
                    <Row en="Age" value={`${details.husband_age} YEARS OLD`} ar="عمر الزوج" />
                    <Row en="Marital Status" value={details.husband_marital_status || "FIRST MARRIAGE"} ar="الحالة الزوجية للزوج وقت هذا الزواج" />
                    <Row en="Occupation" value={details.husband_occupation} ar="وظيفة الزوج" />

                    {/* Residence Husband */}
                    <div className="border-b border-slate-900 flex divide-x divide-slate-800 min-h-[45px]">
                        <div className="w-[190px] p-2 bg-slate-100/30 flex items-center">
                            <span className="text-[10px] font-bold text-slate-800 uppercase leading-tight font-sans tracking-tighter">Residence</span>
                        </div>
                        <div className="flex-1 flex divide-x divide-slate-800">
                            <div className="flex-1 p-2 flex flex-col items-center justify-center bg-white/60">
                                <span className="text-[9px] font-black text-slate-900 uppercase tracking-tighter flex items-center gap-1">County <span dir="rtl" className="text-[11px] font-black">الإقليم</span></span>
                                <p className="text-[13px] font-black uppercase font-mono">{details.husband_residence_county}</p>
                            </div>
                            <div className="flex-1 p-2 flex flex-col items-center justify-center bg-white/60">
                                <span className="text-[9px] font-black text-slate-900 uppercase tracking-tighter flex items-center gap-1">Sub-County <span dir="rtl" className="text-[11px] font-black">المحافظة</span></span>
                                <p className="text-[13px] font-black uppercase font-mono">{details.husband_residence_sub_county}</p>
                            </div>
                        </div>
                        <div className="w-[190px] p-2 bg-slate-100/30 flex items-center justify-end text-right">
                            <span className="text-[12px] font-black text-slate-900 leading-tight" dir="rtl">محل إقامة الزوج</span>
                        </div>
                    </div>

                    <Row en="Wife's Name" value={details.wife_name} ar="إسم الزوجة" />
                    <Row en="Wife's ID. No/Passport" value={details.wife_id_passport} ar="رقم البطاقة الشخصية/ جواز السفر للزوجة" />
                    <Row en="Age" value={`${details.wife_age} YEARS OLD`} ar="عمر الزوجة" />
                    <Row en="Marital Status" value={details.wife_marital_status || "VIRGIN"} ar="الحالة الزوجية للزوجة وقت هذا الزواج" />
                    <Row en="Occupation" value={details.wife_occupation} ar="وظيفة الزوجة" />

                    {/* Residence Wife */}
                    <div className="border-b border-slate-900 flex divide-x divide-slate-800 min-h-[45px]">
                        <div className="w-[190px] p-2 bg-slate-100/30 flex items-center">
                            <span className="text-[10px] font-bold text-slate-800 uppercase leading-tight font-sans tracking-tighter">Residence</span>
                        </div>
                        <div className="flex-1 flex divide-x divide-slate-800">
                            <div className="flex-1 p-2 flex flex-col items-center justify-center bg-white/60">
                                <span className="text-[9px] font-black text-slate-900 uppercase tracking-tighter flex items-center gap-1">County <span dir="rtl" className="text-[11px] font-black">الإقليم</span></span>
                                <p className="text-[13px] font-black uppercase font-mono">{details.wife_residence_county}</p>
                            </div>
                            <div className="flex-1 p-2 flex flex-col items-center justify-center bg-white/60">
                                <span className="text-[9px] font-black text-slate-900 uppercase tracking-tighter flex items-center gap-1">Sub-County <span dir="rtl" className="text-[11px] font-black">المحافظة</span></span>
                                <p className="text-[13px] font-black uppercase font-mono">{details.wife_residence_sub_county}</p>
                            </div>
                        </div>
                        <div className="w-[190px] p-2 bg-slate-100/30 flex items-center justify-end text-right">
                            <span className="text-[12px] font-black text-slate-900 leading-tight" dir="rtl">محل إقامة الزوجة</span>
                        </div>
                    </div>

                    <Row en="Wife's Waliyy and relationship" value={`${details.wife_waliyy_name}, ${details.wife_waliyy_relationship.toUpperCase()}`} ar="اسم ولي الزوجة ونوع القرابة" />
                    <Row en="Agreed Mahr" value={details.agreed_mahr} ar="المهر المتفق عليه" />
                    <Row en="Paid Mahr and Deferred Mahr" value={details.paid_mahr_and_deferred} ar="المهر المسلم والمهر المؤجل" />
                    <Row en="Particulars of gifts" value={details.particulars_of_gifts} ar="تفاصيل الهدايا" />
                    <Row en="Place of Marriage" value={details.place_of_marriage} ar="المكان الذي عقد فيه الزواج" />
                    <Row en="County of Marriage" value={details.county_of_marriage} ar="الاقليم الذي عقد فيه الزواج" />

                    {/* Husband/Wife Signature with Blue Ink Effect */}
                    <div className="border-b border-slate-900 flex divide-x divide-slate-800 min-h-[50px]">
                        <div className="w-[200px] p-2 flex flex-col justify-center">
                            <span className="text-[9px] font-black uppercase leading-tight">Husband's Signature or His Attorney</span>
                        </div>
                        <div className="flex-1 p-2 flex items-center justify-center relative">
                            <div className="w-32 h-10 border-b border-slate-400 border-dotted" />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.6] rotate-[-5deg]">
                                <span className="text-3xl font-signature text-blue-700 font-serif italic tracking-tighter">Sign</span>
                            </div>
                        </div>
                        <div className="w-[200px] p-2 flex items-center justify-end text-right">
                            <span className="text-[11px] font-black" dir="rtl">توقيع الزوج او وكيله</span>
                        </div>
                    </div>

                    <div className="border-b border-slate-900 flex divide-x divide-slate-800 min-h-[50px]">
                        <div className="w-[200px] p-2 flex flex-col justify-center">
                            <span className="text-[9px] font-black uppercase leading-tight">Wife's/Guardian's Signature</span>
                        </div>
                        <div className="flex-1 p-2 flex items-center justify-center relative">
                            <div className="w-32 h-10 border-b border-slate-400 border-dotted" />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.6] rotate-[3deg]">
                                <span className="text-3xl font-signature text-blue-700 font-serif italic tracking-tighter">Sign</span>
                            </div>
                        </div>
                        <div className="w-[200px] p-2 flex items-center justify-end text-right">
                            <span className="text-[11px] font-black" dir="rtl">توقيع الزوجة او وليها</span>
                        </div>
                    </div>

                    {/* Witnesses with Stamps */}
                    <div className="border-b border-slate-900 flex divide-x divide-slate-800 min-h-[80px]">
                        <div className="w-[230px] p-2 flex flex-col justify-start">
                            <span className="text-[9px] font-black uppercase font-sans leading-tight">Name of 1st Witness, Identity card no. and Signature</span>
                        </div>
                        <div className="flex-1 flex divide-x divide-slate-800 relative overflow-hidden">
                            <div className="flex-[2] p-2 flex items-center">
                                <p className="text-sm font-black uppercase font-mono">{details.witness_1_name}</p>
                            </div>
                            <div className="flex-1 p-2 flex flex-col justify-center border-l border-slate-800 bg-white/20">
                                <span className="text-[9px] font-black text-slate-500 uppercase">ID: <span className="text-slate-900">{details.witness_1_id}</span></span>
                            </div>
                            {/* Witness Stamp */}
                            <div className="absolute right-4 bottom-2 opacity-[0.15] scale-[2.5] -rotate-12 pointer-events-none translate-x-4">
                                <div className="w-12 h-12 rounded-full border-2 border-blue-900 flex items-center justify-center text-[10px] font-black text-blue-900">SEAL</div>
                            </div>
                        </div>
                        <div className="w-[230px] p-2 flex items-center justify-end text-right">
                            <span className="text-[12px] font-black text-slate-900 leading-tight" dir="rtl">إسم الشاهد الأول ورقم بطاقته الشخصية وتوقيعه</span>
                        </div>
                    </div>

                    <div className="border-b border-slate-900 flex divide-x divide-slate-800 min-h-[80px]">
                        <div className="w-[230px] p-2 flex flex-col justify-start">
                            <span className="text-[9px] font-black uppercase font-sans leading-tight">Name of 2nd Witness, Identity card no. and Signature</span>
                        </div>
                        <div className="flex-1 flex divide-x divide-slate-800 relative overflow-hidden">
                            <div className="flex-[2] p-2 flex items-center">
                                <p className="text-sm font-black uppercase font-mono">{details.witness_2_name}</p>
                            </div>
                            <div className="flex-1 p-2 flex flex-col justify-center border-l border-slate-800 bg-white/20">
                                <span className="text-[9px] font-black text-slate-500 uppercase">ID: <span className="text-slate-900">{details.witness_2_id}</span></span>
                            </div>
                            {/* Witness Stamp */}
                            <div className="absolute right-4 bottom-2 opacity-[0.15] scale-[2.5] rotate-14 pointer-events-none translate-x-4">
                                <div className="w-12 h-12 rounded-full border-2 border-blue-900 flex items-center justify-center text-[10px] font-black text-blue-900">SEAL</div>
                            </div>
                        </div>
                        <div className="w-[230px] p-2 flex items-center justify-end text-right">
                            <span className="text-[12px] font-black text-slate-900 leading-tight" dir="rtl">إسم الشاهد الثاني ورقم بطاقته الشخصية وتوقيعه</span>
                        </div>
                    </div>

                    <div className="flex divide-x divide-slate-800 min-h-[100px] relative">
                        <div className="w-[230px] p-2 flex flex-col justify-start">
                            <span className="text-[9px] font-black uppercase font-sans leading-tight">Name and Signature of Muslim Marriage Officer</span>
                        </div>
                        <div className="flex-1 p-2 flex flex-col items-center justify-center space-y-1 relative">
                            <p className="text-2xl font-black font-serif italic text-blue-800 mt-2 tracking-tighter drop-shadow-sm rotate-[-1deg]">
                                {details.marriage_officer_name || "Hon. Khamis Ramadhani"}
                            </p>
                            <p className="text-[11px] font-black uppercase border-t-2 border-slate-900 pt-0.5 tracking-widest bg-slate-900 text-white px-3">Principal Kadhi</p>

                            {/* Blue COURT Stamp in the officer section */}
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 w-32 h-32 border-[3px] border-blue-800/20 rounded-full flex flex-col items-center justify-center text-[9px] font-black text-blue-800/30 uppercase rotate-12 pointer-events-none border-double">
                                <span className="scale-[1.5]">KADHI'S COURT</span>
                                <span className="text-[7px] mt-1">REPUBLIC OF KENYA</span>
                            </div>
                        </div>
                        <div className="w-[230px] p-2 flex items-center justify-end text-right">
                            <span className="text-[12px] font-black text-slate-900 leading-tight" dir="rtl">إسم المأذون الشرعي الذي عقد النكاح وتوقيعه</span>
                        </div>
                    </div>
                </div>

                {/* Footer Date */}
                <div className="mt-8 flex justify-between items-end border-t-2 border-slate-200 pt-4">
                    <div className="flex gap-8 items-end">
                        <div className="space-y-1.5 flex flex-col items-start min-w-[200px]">
                            <p className="text-[9px] font-bold text-slate-500 uppercase font-sans tracking-[0.15em] border-b border-slate-200 w-full mb-1">Date of Issuance</p>
                            <p className="text-[15px] font-black text-slate-900 font-mono tracking-tighter">
                                {details.date_of_issuance ? new Date(details.date_of_issuance).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase() : ""}
                            </p>
                            <div className="h-0.5 w-full bg-slate-900 mt-1" />
                        </div>
                        <div className="space-y-1 pt-4">
                            <p className="text-[14px] font-black text-right text-slate-900" dir="rtl">تاريخ الإصدار</p>
                        </div>
                    </div>

                    <div className="text-center space-y-3 opacity-70 group hover:opacity-100 transition-opacity">
                        <div className="bg-primary/5 p-2 rounded-2xl inline-block border border-primary/10">
                            <ShieldCheck className="text-primary" size={28} />
                        </div>
                        <div className="space-y-0.5">
                            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-800">AUTHENTIC DOCUMENT</p>
                            <p className="text-[7px] font-black uppercase tracking-[0.1em] text-slate-500 max-w-[220px] leading-tight mx-auto">
                                Issued by the Supreme Council of Kenya Muslims <br /> Verified & Digitally Recorded
                            </p>
                        </div>
                    </div>
                </div>

                {/* Micro-Seals at the bottom corners for authenticity */}
                <div className="absolute bottom-2 left-2 rotate-12 opacity-10">
                    <Award size={16} />
                </div>
                <div className="absolute bottom-2 right-2 -rotate-12 opacity-10">
                    <Award size={16} />
                </div>
            </div>

            <style jsx>{`
                .divide-slate-800 > :not([hidden]) ~ :not([hidden]) {
                    border-color: #1e293b;
                }
                .font-mono {
                    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                }
            `}</style>
        </div>
    );
}
