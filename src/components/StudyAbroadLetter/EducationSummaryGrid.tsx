import { BookOpen, School } from "lucide-react";

import type { EducationDetails } from "@/components/StudyAbroadLetter/types";

interface EducationSummaryGridProps {
  details: EducationDetails;
  serialNumber: string;
}

/** 2×2 grid summarising institution, country, programme, and serial number. */
export function EducationSummaryGrid({ details, serialNumber }: EducationSummaryGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 print:bg-white">
      <DataCell label="Institution">
        <p className="font-bold flex items-center gap-2">
          <School size={14} className="text-secondary" /> {details.institution_name}
        </p>
      </DataCell>

      <DataCell label="Country" align="right">
        <p className="font-bold">{details.country}</p>
      </DataCell>

      <DataCell label="Program">
        <p className="font-bold flex items-center gap-2">
          <BookOpen size={14} className="text-secondary" /> {details.course_of_study}
        </p>
      </DataCell>

      <DataCell label="Verification Serial" align="right">
        <p className="font-bold">{serialNumber}</p>
      </DataCell>
    </div>
  );
}

function DataCell({
  label,
  align = "left",
  children,
}: {
  label: string;
  align?: "left" | "right";
  children: React.ReactNode;
}) {
  return (
    <div className={`space-y-1 ${align === "right" ? "text-right" : ""}`}>
      <p className="text-[10px] font-black text-slate-400 uppercase">{label}</p>
      {children}
    </div>
  );
}
