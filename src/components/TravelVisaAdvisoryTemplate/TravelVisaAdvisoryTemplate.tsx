"use client";

import { TravelVisaAdvisoryTemplateProps } from "./types";
import { useTravelVisaLogic } from "./useTravelVisaLogic";
import { TemplateHeader } from "./_components/TemplateHeader";
import { AdvisoryLetterBody } from "./_components/AdvisoryLetterBody";
import { DataSummaryGrid } from "./_components/DataSummaryGrid";
import { TemplateFooter } from "./_components/TemplateFooter";

export default function TravelVisaAdvisoryTemplate({ certificate }: TravelVisaAdvisoryTemplateProps) {
    const { travel_visa_details, today } = useTravelVisaLogic(certificate);

    if (!travel_visa_details) return null;

    return (
        <div className="w-full max-w-[800px] bg-white p-16 shadow-2xl relative overflow-hidden font-serif leading-relaxed text-slate-800">
            <TemplateHeader />

            <div className="py-12 space-y-8">
                <AdvisoryLetterBody 
                    travel_visa_details={travel_visa_details} 
                    serial_number={certificate.serial_number} 
                    today={today} 
                />
                
                <DataSummaryGrid 
                    travel_visa_details={travel_visa_details} 
                    serial_number={certificate.serial_number} 
                />
                
                <TemplateFooter />
            </div>
        </div>
    );
}
