import type { PilgrimDetails } from "@/components/SupportLetter/types";

interface PilgrimSummaryGridProps {
  details: PilgrimDetails;
  serialNumber: string;
}

/** 2×2 data grid summarising key pilgrim fields. */
export function PilgrimSummaryGrid({ details, serialNumber }: PilgrimSummaryGridProps) {
  const dob = new Date(details.date_of_birth).toLocaleDateString();

  return (
    <div className="grid grid-cols-2 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 print:bg-white">
      <DataCell label="Pilgrim Name" value={details.full_name} />
      <DataCell label="Passport No." value={details.passport_number} align="right" />
      <DataCell label="Date of Birth" value={dob} />
      <DataCell label="Serial No." value={serialNumber} align="right" />
    </div>
  );
}

function DataCell({
  label,
  value,
  align = "left",
}: {
  label: string;
  value: string;
  align?: "left" | "right";
}) {
  return (
    <div className={`space-y-1 ${align === "right" ? "text-right" : ""}`}>
      <p className="text-[10px] font-black text-slate-400 uppercase">{label}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
}
