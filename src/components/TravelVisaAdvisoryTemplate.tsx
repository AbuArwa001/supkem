"use client";

import Image from "next/image";
import { Plane, Mail, MapPin, ShieldCheck, Map, Globe } from "lucide-react";

interface TravelVisaAdvisoryTemplateProps {
    certificate: any;
}

export default function TravelVisaAdvisoryTemplate({ certificate }: TravelVisaAdvisoryTemplateProps) {
    const { application } = certificate;
    const { travel_visa_details } = application || {};

    if (!travel_visa_details) return null;

    const today = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="w-full max-w-[800px] bg-white p-16 shadow-2xl relative overflow-hidden font-serif leading-relaxed text-slate-800">
            {/* Header / Letterhead */}
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

            {/* Letter Body */}
            <div className="py-12 space-y-8">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-bold">Ref: SUPKEM/VISA/{certificate.serial_number}</p>
                        <p className="font-bold">Date: {today}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-black uppercase tracking-wider text-primary">To the Embassy / High Commission</p>
                        <p className="text-sm font-medium">Department of Visas & Consular Affairs</p>
                    </div>
                </div>

                <div className="pt-4">
                    <h2 className="text-xl font-bold uppercase underline decoration-secondary decoration-2 underline-offset-8 text-center italic">
                        RE: TRAVEL ADVISORY AND SUPPORT FOR {travel_visa_details.full_name?.toUpperCase()}
                    </h2>
                </div>

                <div className="space-y-6 text-base text-justify">
                    <p>
                        This is to certify that <strong>{travel_visa_details.full_name}</strong>, holder of Passport Number <strong>{travel_visa_details.passport_number}</strong>,
                        has sought Travel Advisory services from the Supreme Council of Kenya Muslims (SUPKEM) regarding their upcoming travel to
                        <strong> {travel_visa_details.destination_country}</strong>.
                    </p>

                    <p>
                        The Council has reviewed the applicant’s travel request and confirms that the purpose of travel is
                        <strong> {travel_visa_details.trip_purpose?.toUpperCase()}</strong>. Based on our verification, the applicant is
                        a bona-fide member of the Muslim community in Kenya traveling for the stated purpose.
                    </p>

                    <p>
                        The applicant is scheduled to travel on or about
                        <strong> {new Date(travel_visa_details.expected_travel_date).toLocaleDateString(undefined, { dateStyle: 'long' })}</strong>.
                    </p>

                    <p>
                        We kindly request your esteemed office to facilitate the applicant with the necessary visa and travel authorization to
                        ensure a smooth and successful journey. SUPKEM stands ready to provide further verification should it be required
                        by your consular department.
                    </p>
                </div>

                {/* Data Summary Grid */}
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 print:bg-white">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase">Destination</p>
                        <p className="font-bold flex items-center gap-2"><Map size={14} className="text-secondary" /> {travel_visa_details.destination_country}</p>
                    </div>
                    <div className="text-right space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase">Purpose of Trip</p>
                        <p className="font-bold">{travel_visa_details.trip_purpose}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase">Travel Date</p>
                        <p className="font-bold flex items-center gap-2"><Plane size={14} className="text-secondary" /> {new Date(travel_visa_details.expected_travel_date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase">Tracking Ref</p>
                        <p className="font-bold">{certificate.serial_number}</p>
                    </div>
                </div>

                <div className="pt-10">
                    <p>Sincerely,</p>
                    <div className="mt-8 flex items-end justify-between">
                        <div className="space-y-1 border-t-2 border-slate-800 pt-4 w-64">
                            <p className="font-bold uppercase leading-none">Foreign Affairs Liaison</p>
                            <p className="text-xs font-medium text-slate-500">Supreme Council of Kenya Muslims</p>
                        </div>

                        {/* Digital Verification Seal */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-24 h-24 rounded-full border-4 border-secondary/20 flex items-center justify-center p-2">
                                <ShieldCheck size={48} className="text-secondary opacity-20" />
                                <div className="absolute text-[8px] font-black text-secondary/30 uppercase text-center w-20 leading-tight">
                                    Consular<br />Verified<br />SUPKEM VISA
                                </div>
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Verification Seal</p>
                        </div>
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
        </div>
    );
}
