"use client";

import Image from "next/image";
import { GraduationCap, Mail, MapPin, ShieldCheck, BookOpen, School } from "lucide-react";

interface StudyAbroadLetterTemplateProps {
    certificate: any;
}

export default function StudyAbroadLetterTemplate({ certificate }: StudyAbroadLetterTemplateProps) {
    const { application } = certificate;
    const { education_details } = application || {};

    if (!education_details) return null;

    const today = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="w-full max-w-[800px] bg-white p-16 shadow-2xl relative overflow-hidden font-serif leading-relaxed text-slate-800">
            {/* Header / Letterhead */}
            <div className="flex flex-col items-center text-center pb-8 border-b-2 border-emerald-600/20">
                <Image src="/logo.svg" alt="SUPKEM Logo" width={80} height={80} className="mb-4" />
                <h1 className="text-2xl font-black uppercase tracking-widest text-primary font-outfit">Supreme Council of Kenya Muslims</h1>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">Official Recommendation Letter</p>

                <div className="mt-6 grid grid-cols-3 w-full text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <div className="flex items-center gap-2 justify-center border-r border-slate-100">
                        <Mail size={12} className="text-secondary" /> info@supkem.org
                    </div>
                    <div className="flex items-center gap-2 justify-center border-r border-slate-100">
                        <MapPin size={12} className="text-secondary" /> Nairobi, Kenya
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                        <ShieldCheck size={12} className="text-secondary" /> Verified Education Dept.
                    </div>
                </div>
            </div>

            {/* Letter Body */}
            <div className="py-12 space-y-8">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-bold">Ref: SUPKEM/EDU/{certificate.serial_number}</p>
                        <p className="font-bold">Date: {today}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-black uppercase tracking-wider text-primary">To Whom It May Concern</p>
                        <p className="text-sm font-medium">Addressed to Admissions Office / Embassy</p>
                    </div>
                </div>

                <div className="pt-4">
                    <h2 className="text-xl font-bold uppercase underline decoration-primary decoration-2 underline-offset-8 text-center italic">
                        RE: RECOMMENDATION AND ENDORSEMENT FOR {education_details.full_name?.toUpperCase()}
                    </h2>
                </div>

                <div className="space-y-6 text-base text-justify">
                    <p>
                        It is with great pleasure that the Supreme Council of Kenya Muslims (SUPKEM) issues this official recommendation letter for
                        <strong> {education_details.full_name}</strong>, holder of Passport Number <strong>{education_details.passport_number}</strong>.
                    </p>

                    <p>
                        The applicant is a recognized member of the Muslim Ummah in Kenya and has expressed a profound interest in pursuing
                        <strong> {education_details.course_of_study}</strong> at <strong>{education_details.institution_name}</strong> in
                        <strong> {education_details.country}</strong>.
                    </p>

                    <p>
                        SUPKEM has reviewed the applicant’s academic aspirations and finds them aligned with our mission to empower Muslim youth through
                        quality education. We affirm the applicant’s commitment and endorse their application for admission and relevant travel documentation.
                    </p>

                    {education_details.scholarship_details && (
                        <div className="p-4 bg-slate-50 border-l-4 border-primary italic text-sm">
                            <p className="font-bold mb-1">Scholarship/Specific Purpose:</p>
                            <p>{education_details.scholarship_details}</p>
                        </div>
                    )}

                    <p>
                        We kindly request your esteemed office to grant <strong>{education_details.full_name}</strong> the necessary
                        visas, study permits, or admissions facilitation to enable them to achieve their educational goals.
                        The Council vouches for the integrity and character of the applicant.
                    </p>
                </div>

                {/* Data Summary Grid */}
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 print:bg-white">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase">Institution</p>
                        <p className="font-bold flex items-center gap-2"><School size={14} className="text-secondary" /> {education_details.institution_name}</p>
                    </div>
                    <div className="text-right space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase">Country</p>
                        <p className="font-bold">{education_details.country}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase">Program</p>
                        <p className="font-bold flex items-center gap-2"><BookOpen size={14} className="text-secondary" /> {education_details.course_of_study}</p>
                    </div>
                    <div className="text-right space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase">Verification Serial</p>
                        <p className="font-bold">{certificate.serial_number}</p>
                    </div>
                </div>

                <div className="pt-10">
                    <p>Yours Faithfully,</p>
                    <div className="mt-8 flex items-end justify-between">
                        <div className="space-y-1 border-t-2 border-slate-800 pt-4 w-64">
                            <p className="font-bold uppercase leading-none">Director of Education</p>
                            <p className="text-xs font-medium text-slate-500">Supreme Council of Kenya Muslims</p>
                        </div>

                        {/* Graduation Icon Watermark style */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-24 h-24 rounded-full border-4 border-primary/20 flex items-center justify-center p-2">
                                <GraduationCap size={48} className="text-primary opacity-20" />
                                <div className="absolute text-[8px] font-black text-primary/30 uppercase text-center w-20 leading-tight">
                                    Official<br />Endorsement<br />SUPKEM EDU
                                </div>
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">SUPKEM Seal</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Decorative Icons */}
            <div className="mt-12 flex items-center justify-between gap-6 opacity-30 invert print:opacity-10">
                <div className="flex gap-4">
                    <GraduationCap size={32} />
                    <BookOpen size={32} />
                </div>
                <div className="h-px bg-slate-800 flex-1" />
                <div className="w-16 h-16 bg-slate-800 rounded-lg shrink-0 flex items-center justify-center text-white font-black text-xs">
                    SUPKEM EDU
                </div>
            </div>
        </div>
    );
}
