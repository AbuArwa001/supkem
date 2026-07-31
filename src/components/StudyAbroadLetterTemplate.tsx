"use client";

import { LetterHead } from "@/components/StudyAbroadLetter/LetterHead";
import { LetterMeta } from "@/components/StudyAbroadLetter/LetterMeta";
import { LetterBody } from "@/components/StudyAbroadLetter/LetterBody";
import { EducationSummaryGrid } from "@/components/StudyAbroadLetter/EducationSummaryGrid";
import { LetterSignOff } from "@/components/StudyAbroadLetter/LetterSignOff";
import { LetterFooter } from "@/components/StudyAbroadLetter/LetterFooter";
import type { StudyAbroadLetterTemplateProps } from "@/components/StudyAbroadLetter/types";

export default function StudyAbroadLetterTemplate({ certificate }: StudyAbroadLetterTemplateProps) {
  const educationDetails = certificate.application_detail?.education_details;

  if (!educationDetails) return null;

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
        <LetterBody details={educationDetails} />
        <EducationSummaryGrid details={educationDetails} serialNumber={certificate.serial_number} />
        <LetterSignOff />
      </div>

      <LetterFooter />
    </div>
  );
}
