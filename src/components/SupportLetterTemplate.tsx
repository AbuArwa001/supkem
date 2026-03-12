"use client";

import Image from "next/image";
import { Plane, User, MapPin, Calendar, ShieldCheck, Mail, Map } from "lucide-react";

interface SupportLetterTemplateProps {
    certificate: any;
}

export default function SupportLetterTemplate({ certificate }: SupportLetterTemplateProps) {
    const { application_detail } = certificate;
    const { pilgrim_details } = application_detail || {};

    if (!pilgrim_details) return null;

    const today = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="w-full max-w-[800px] bg-white p-16 shadow-2xl relative overflow-hidden font-serif leading-relaxed text-slate-800">
            {/* Header / Letterhead */}
            <div className="flex flex-col items-center text-center pb-8 border-b-2 border-primary/20">
                <Image src="/logo.svg" alt="SUPKEM Logo" width={80} height={80} className="mb-4" />
                <h1 className="text-2xl font-black uppercase tracking-widest text-primary font-outfit">Supreme Council of Kenya Muslims</h1>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">Official Letter of Support</p>

                <div className="mt-6 grid grid-cols-3 w-full text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <div className="flex items-center gap-2 justify-center border-r border-slate-100">
                        <Mail size={12} className="text-secondary" /> info@supkem.org
                    </div>
                    <div className="flex items-center gap-2 justify-center border-r border-slate-100">
                        <MapPin size={12} className="text-secondary" /> Nairobi, Kenya
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                        <ShieldCheck size={12} className="text-secondary" /> Verified Service
                    </div>
                </div>
            </div>

            {/* Letter Body */}
            <div className="py-12 space-y-8">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-bold">Our Ref: {certificate.serial_number}</p>
                        <p className="font-bold">Date: {today}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold uppercase tracking-wider text-primary">To Whom It May Concern</p>
                        <p className="text-sm font-medium">Embassy of the Kingdom of Saudi Arabia</p>
                        <p className="text-sm font-medium">Nairobi, Kenya</p>
                    </div>
                </div>

                <div className="pt-4">
                    <h2 className="text-xl font-bold uppercase underline decoration-primary decoration-2 underline-offset-8 text-center italic">
                        RE: RECOMMENDATION AND SUPPORT FOR {pilgrim_details.trip_type.toUpperCase()} PILGRIMAGE
                    </h2>
                </div>

                <div className="space-y-6 text-base text-justify">
                    <p>
                        This is to certify and confirm that <strong>{pilgrim_details.full_name}</strong>, a citizen of <strong>{pilgrim_details.nationality}</strong>
                        holding Passport Number <strong>{pilgrim_details.passport_number}</strong>, is a recognized and registered pilgrim under the
                        Supreme Council of Kenya Muslims (SUPKEM) facilitation program.
                    </p>

                    <p>
                        The applicant intends to perform the sacred <strong>{pilgrim_details.trip_type}</strong> pilgrimage in the Kingdom of Saudi Arabia,
                        with an expected departure date around <strong>{new Date(pilgrim_details.expected_travel_date).toLocaleDateString(undefined, { dateStyle: 'long' })}</strong>.
                    </p>

                    {pilgrim_details.travel_agent_name && (
                        <p>
                            We further confirm that the pilgrim has successfully connected with <strong>{pilgrim_details.travel_agent_name}</strong>,
                            who are among the licensed and approved facilitators recognized by our Council.
                        </p>
                    )}

                    <p>
                        We kindly request your esteemed office to grant the applicant the necessary visa and travel facilitation to enable them to
                        fulfill this significant religious obligation. The Supreme Council of Kenya Muslims vouches for the applicant's intent
                        and compliance with the pilgrimage requirements.
                    </p>
                </div>

                {/* Pilgrim Data Summary Grid */}
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 print:bg-white">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase">Pilgrim Name</p>
                        <p className="font-bold">{pilgrim_details.full_name}</p>
                    </div>
                    <div className="text-right space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase">Passport No.</p>
                        <p className="font-bold">{pilgrim_details.passport_number}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase">Date of Birth</p>
                        <p className="font-bold">{new Date(pilgrim_details.date_of_birth).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase">Serial No.</p>
                        <p className="font-bold">{certificate.serial_number}</p>
                    </div>
                </div>

                <div className="pt-10">
                    <p>Sincerely,</p>
                    <div className="mt-8 flex items-end justify-between">
                        <div className="space-y-1 border-t-2 border-slate-800 pt-4 w-64">
                            <p className="font-bold uppercase leading-none">Secretary General</p>
                            <p className="text-xs font-medium text-slate-500">Supreme Council of Kenya Muslims</p>
                        </div>

                        {/* Digital Verification Seal */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-24 h-24 rounded-full border-4 border-primary/20 flex items-center justify-center p-2">
                                <ShieldCheck size={48} className="text-primary opacity-20" />
                                <div className="absolute text-[8px] font-black text-primary/30 uppercase text-center w-20 leading-tight">
                                    Officially<br />Verified Site<br />SUPKEM HQ
                                </div>
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Digital Seal</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer QR/Verification */}
            <div className="mt-12 flex items-center justify-between gap-6 opacity-30 invert print:opacity-10">
                <div className="flex gap-4">
                    <Plane size={32} />
                    <Map size={32} />
                </div>
                <div className="h-px bg-slate-800 flex-1" />
                <div className="w-16 h-16 bg-slate-800 rounded-lg shrink-0 flex items-center justify-center text-white font-black text-xs">
                    QR SECURE
                </div>
            </div>
        </div>
    );
}
