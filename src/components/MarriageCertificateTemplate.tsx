"use client";

import Image from "next/image";
import { Heart, User, MapPin, Calendar, Users, Gift, ShieldCheck } from "lucide-react";

interface MarriageCertificateTemplateProps {
    certificate: any;
}

export default function MarriageCertificateTemplate({ certificate }: MarriageCertificateTemplateProps) {
    const details = certificate.application?.marriage_details;
    if (!details) return null;

    return (
        <div className="w-full space-y-12 text-slate-800">
            {/* Header Header */}
            <div className="flex flex-col items-center space-y-4">
                <Image src="/logo.svg" alt="SUPKEM Logo" width={70} height={70} className="opacity-90 pb-2" />
                <div className="text-center space-y-1">
                    <h3 className="text-lg font-black tracking-[0.2em] uppercase text-primary">Supreme Council of Kenya Muslims</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Muslim Marriage & Divorce Registration Act</p>
                </div>
            </div>

            {/* Main Title Section */}
            <div className="relative py-10 border-y border-primary/10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Form MM3</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black font-outfit tracking-tight text-primary">Certificate of Marriage</h1>
                <div className="mt-4 flex items-center justify-center gap-4">
                    <div className="h-px w-12 bg-primary/10" />
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Serial No: {certificate.serial_number}</span>
                    <div className="h-px w-12 bg-primary/10" />
                </div>
            </div>

            {/* Marriage Body */}
            <div className="text-left space-y-12">
                <p className="text-center text-lg italic text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    This is to certify that a marriage was solemnized between the parties named below, according to the Islamic Law at the place and on the date mentioned herein.
                </p>

                {/* The Couple */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-slate-50/50 p-10 rounded-[40px] border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] text-primary select-none pointer-events-none">
                        <Heart size={300} fill="currentColor" />
                    </div>

                    {/* Husband */}
                    <div className="space-y-6 relative z-10">
                        <div className="flex items-center gap-3 text-blue-600">
                            <User size={20} />
                            <h4 className="text-xs font-black uppercase tracking-widest">Husband's Particulars</h4>
                        </div>
                        <div className="space-y-4">
                            <div className="pb-1 border-b border-slate-200">
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Full Name</p>
                                <p className="text-xl font-bold font-outfit text-slate-800 uppercase">{details.husband_name}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="pb-1 border-b border-slate-200">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">ID/Passport No</p>
                                    <p className="font-bold text-slate-800">{details.husband_id_passport}</p>
                                </div>
                                <div className="pb-1 border-b border-slate-200">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Age</p>
                                    <p className="font-bold text-slate-800">{details.husband_age}</p>
                                </div>
                            </div>
                            <div className="pb-1 border-b border-slate-200">
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Marital Status</p>
                                <p className="font-bold text-slate-800 uppercase">{details.husband_marital_status}</p>
                            </div>
                            <div className="pb-1 border-b border-slate-200">
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Occupation</p>
                                <p className="font-bold text-slate-800">{details.husband_occupation}</p>
                            </div>
                            <div className="pb-1 border-b border-slate-200">
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Residence</p>
                                <p className="font-bold text-slate-800">{details.husband_residence_sub_county}, {details.husband_residence_county}</p>
                            </div>
                        </div>
                    </div>

                    {/* Wife */}
                    <div className="space-y-6 relative z-10">
                        <div className="flex items-center gap-3 text-rose-600">
                            <Heart size={20} />
                            <h4 className="text-xs font-black uppercase tracking-widest">Wife's Particulars</h4>
                        </div>
                        <div className="space-y-4">
                            <div className="pb-1 border-b border-slate-200">
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Full Name</p>
                                <p className="text-xl font-bold font-outfit text-slate-800 uppercase">{details.wife_name}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="pb-1 border-b border-slate-200">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">ID/Passport No</p>
                                    <p className="font-bold text-slate-800">{details.wife_id_passport}</p>
                                </div>
                                <div className="pb-1 border-b border-slate-200">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Age</p>
                                    <p className="font-bold text-slate-800">{details.wife_age}</p>
                                </div>
                            </div>
                            <div className="pb-1 border-b border-slate-200">
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Marital Status</p>
                                <p className="font-bold text-slate-800 uppercase">{details.wife_marital_status}</p>
                            </div>
                            <div className="pb-1 border-b border-slate-200">
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Occupation</p>
                                <p className="font-bold text-slate-800">{details.wife_occupation}</p>
                            </div>
                            <div className="pb-1 border-b border-slate-200">
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Residence</p>
                                <p className="font-bold text-slate-800">{details.wife_residence_sub_county}, {details.wife_residence_county}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Event Info */}
                    <div className="p-8 rounded-3xl bg-primary/[0.02] border border-primary/5 space-y-6">
                        <div className="flex items-center gap-3 text-primary">
                            <Calendar size={18} />
                            <h4 className="text-xs font-black uppercase tracking-widest">Event Information</h4>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-2 border-b border-primary/10">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Date of Marriage</span>
                                <span className="font-bold text-slate-800 uppercase">{new Date(details.date_of_marriage).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-primary/10">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Place of Marriage</span>
                                <span className="font-bold text-slate-800 uppercase">{details.place_of_marriage}</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-primary/10">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">County</span>
                                <span className="font-bold text-slate-800 uppercase">{details.county_of_marriage}</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-primary/10">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Waliyy Name</span>
                                <span className="font-bold text-slate-800 uppercase">{details.wife_waliyy_name} ({details.wife_waliyy_relationship})</span>
                            </div>
                        </div>
                    </div>

                    {/* Financials Info */}
                    <div className="p-8 rounded-3xl bg-secondary/[0.03] border border-secondary/10 space-y-6">
                        <div className="flex items-center gap-3 text-secondary">
                            <Gift size={18} />
                            <h4 className="text-xs font-black uppercase tracking-widest">Financials & Mahr</h4>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-2 border-b border-secondary/10">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Agreed Mahr</span>
                                <span className="font-bold text-slate-800 uppercase tracking-tight">{details.agreed_mahr}</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-secondary/10">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Payment Details</span>
                                <span className="font-bold text-secondary uppercase text-[11px] leading-tight text-right max-w-[150px]">{details.paid_mahr_and_deferred}</span>
                            </div>
                            {details.particulars_of_gifts && (
                                <div className="space-y-2">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Particulars of Gifts</span>
                                    <p className="text-sm font-medium text-slate-600 line-clamp-2">{details.particulars_of_gifts}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Witnesses */}
                <div className="p-8 rounded-3xl border border-slate-100 space-y-6">
                    <div className="flex items-center gap-3 text-slate-500">
                        <Users size={18} />
                        <h4 className="text-xs font-black uppercase tracking-widest">Official Witnesses</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/50">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Witness One</p>
                                <p className="font-bold text-slate-800 uppercase">{details.witness_1_name}</p>
                            </div>
                            <span className="text-xs font-mono text-slate-400">ID: {details.witness_1_id}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/50">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Witness Two</p>
                                <p className="font-bold text-slate-800 uppercase">{details.witness_2_name}</p>
                            </div>
                            <span className="text-xs font-mono text-slate-400">ID: {details.witness_2_id}</span>
                        </div>
                    </div>
                </div>

                {/* Footer and Seals */}
                <div className="flex flex-col md:flex-row items-end justify-between pt-12 border-t border-slate-100 gap-10">
                    <div className="text-left space-y-6 w-full md:w-auto">
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Issuing Authority / Registrar</p>
                            <p className="text-lg font-black font-outfit text-primary uppercase">
                                {certificate.application?.organization_name || "SUPKEM HEADQUARTERS"}
                            </p>
                            <p className="text-xs font-medium text-slate-500 uppercase">Authorized Registrar under SUPKEM</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Issued On</p>
                            <p className="text-sm font-bold text-slate-800 uppercase">{new Date(certificate.issued_at).toLocaleDateString(undefined, { dateStyle: 'full' })}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-8 luxury-seal">
                        <div className="w-32 h-32 rounded-full border-4 border-double border-primary/20 flex items-center justify-center relative overflow-hidden bg-primary/[0.02]">
                            <div className="absolute inset-0 border border-primary/5 rounded-full m-1 animate-spin-slow opacity-20" />
                            <ShieldCheck size={48} className="text-primary/10" strokeWidth={1} />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-[8px] font-black uppercase tracking-widest text-primary/30 flex items-center gap-2 -rotate-12">
                                    Official <span className="w-1 h-1 rounded-full bg-primary/20" /> Seal
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
