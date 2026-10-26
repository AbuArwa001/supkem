"use client";

import { UserCheck, CreditCard, CheckCircle2 } from "lucide-react";
import { FormField, inputBase, borderFor } from "@/app/[locale]/(dashboard)/portal/applications/new/_components/ui/FormField";
import { cn } from "@/lib/utils";

interface WitnessCardProps {
  number: 1 | 2;
  title: string;
  nameField: string;
  idField: string;
  nameValue: string;
  idValue: string;
  nameError?: string;
  idError?: string;
  placeholderName: string;
  onChange: (field: string, value: string) => void;
}

export function WitnessCard({
  number,
  title,
  nameField,
  idField,
  nameValue,
  idValue,
  nameError,
  idError,
  placeholderName,
  onChange,
}: WitnessCardProps) {
  const isOne = number === 1;
  const fieldStyle = (val?: string, err?: string) =>
    cn(inputBase, borderFor(err), val && !err ? "border-emerald-500/40 bg-emerald-50/10 focus:border-emerald-600 focus:ring-emerald-500/10" : "");

  return (
    <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-800 font-outfit">
          <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs", isOne ? "bg-emerald-100 text-emerald-800" : "bg-teal-100 text-teal-800")}>
            {number}
          </div>
          <span>{title}</span>
        </div>
        {nameValue && idValue && <CheckCircle2 size={16} className="text-emerald-600" />}
      </div>

      <FormField label="Full Name" name={nameField} error={nameError} required>
        <div className="relative">
          <input
            type="text"
            name={nameField}
            placeholder={placeholderName}
            className={cn(fieldStyle(nameValue, nameError), "pl-11 bg-white")}
            value={nameValue}
            onChange={(e) => onChange(nameField, e.target.value)}
          />
          <UserCheck size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </FormField>

      <FormField label="National ID / Passport No." name={idField} error={idError} required>
        <div className="relative">
          <input
            type="text"
            name={idField}
            placeholder={isOne ? "e.g. 23456789" : "e.g. 34567890"}
            className={cn(fieldStyle(idValue, idError), "pl-11 bg-white font-mono")}
            value={idValue}
            onChange={(e) => onChange(idField, e.target.value)}
          />
          <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </FormField>
    </div>
  );
}
