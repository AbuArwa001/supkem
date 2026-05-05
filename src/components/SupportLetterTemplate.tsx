"use client";

import { LetterHead } from "@/components/SupportLetter/LetterHead";
import { LetterMeta } from "@/components/SupportLetter/LetterMeta";
import { LetterBody } from "@/components/SupportLetter/LetterBody";
import { PilgrimSummaryGrid } from "@/components/SupportLetter/PilgrimSummaryGrid";
import { LetterSignOff } from "@/components/SupportLetter/LetterSignOff";
import { LetterFooter } from "@/components/SupportLetter/LetterFooter";
import type { SupportLetterTemplateProps } from "@/components/SupportLetter/types";

export default function SupportLetterTemplate({ certificate }: SupportLetterTemplateProps) {
  const pilgrimDetails = certificate.application_detail?.pilgrim_details;

  if (!pilgrimDetails) return null;

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full max-w-[800px] bg-white p-16 shadow-2xl relative overflow-hidden font-serif leading-relaxed text-slate-800">
      <LetterHead />

      <div className="py-12 space-y-8">
        <LetterMeta serialNumber={certificate.serial_number} today={today} />
        <LetterBody details={pilgrimDetails} />
        <PilgrimSummaryGrid details={pilgrimDetails} serialNumber={certificate.serial_number} />
        <LetterSignOff />
      </div>

      <LetterFooter />
    </div>
  );
}
