"use client";

import { motion } from "framer-motion";
import { User, Plane, Calendar, ShieldCheck, ChevronDown } from "lucide-react";
import { FormField, inputBase, inputReadOnly, borderFor } from "./ui/FormField";
import { cn } from "@/lib/utils";
import type { PilgrimDetails } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";

interface Props {
  data: PilgrimDetails;
  errors: Record<string, string>;
  onChange: (field: string, value: string | boolean) => void;
}

export function PilgrimDetailsForm({ data, errors, onChange }: Props) {
  const on = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    onChange(key, e.target.value);
  const field = (name: string) => cn(inputBase, borderFor(errors[name]));

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="p-8 rounded-[24px] bg-white border border-slate-200/90 shadow-xl shadow-slate-200/40 space-y-8">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/15 shadow-xs">
            <User size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black font-outfit text-slate-900">Pilgrim Particulars</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
              Personal & Travel details for official Hajj / Umrah certification
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Full Name"
            name="full_name"
            error={errors.full_name}
            required
            hint="Prefilled from your authenticated user profile."
          >
            <input
              type="text"
              name="full_name"
              readOnly
              className={cn(inputReadOnly, borderFor(errors.full_name))}
              value={data.full_name}
              onChange={on("full_name")}
            />
          </FormField>

          <FormField
            label="Passport / National ID Number"
            name="passport_number"
            error={errors.passport_number}
            required
          >
            <input
              type="text"
              name="passport_number"
              placeholder="e.g. A12345678 or ID Number"
              className={field("passport_number")}
              value={data.passport_number}
              onChange={on("passport_number")}
            />
          </FormField>

          <FormField
            label="Nationality"
            name="nationality"
            error={errors.nationality}
            required
          >
            <input
              type="text"
              name="nationality"
              placeholder="e.g. Kenyan"
              className={field("nationality")}
              value={data.nationality}
              onChange={on("nationality")}
            />
          </FormField>

          <FormField
            label="Date of Birth"
            name="date_of_birth"
            error={errors.date_of_birth}
            required
          >
            <input
              type="date"
              name="date_of_birth"
              className={field("date_of_birth")}
              value={data.date_of_birth}
              onChange={on("date_of_birth")}
            />
          </FormField>

          <FormField label="Gender" name="gender" required>
            <div className="relative">
              <select
                name="gender"
                className={cn(field("gender"), "appearance-none pr-10 cursor-pointer")}
                value={data.gender}
                onChange={on("gender")}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <ChevronDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </FormField>

          <FormField label="Trip Type" name="trip_type" required>
            <div className="relative">
              <select
                name="trip_type"
                className={cn(field("trip_type"), "appearance-none pr-10 cursor-pointer")}
                value={data.trip_type}
                onChange={on("trip_type")}
              >
                <option value="Hajj">Hajj</option>
                <option value="Umrah">Umrah</option>
              </select>
              <ChevronDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </FormField>

          <FormField
            label="Expected Travel Date"
            name="expected_travel_date"
            error={errors.expected_travel_date}
            required
          >
            <input
              type="date"
              name="expected_travel_date"
              className={field("expected_travel_date")}
              value={data.expected_travel_date}
              onChange={on("expected_travel_date")}
            />
          </FormField>

          <FormField
            label="Licensed Travel Agency Name"
            name="travel_agent_name"
            hint="Registered agency coordinating your package."
          >
            <input
              type="text"
              name="travel_agent_name"
              placeholder="e.g. Al-Quds Travel Agency"
              className={field("travel_agent_name")}
              value={data.travel_agent_name}
              onChange={on("travel_agent_name")}
            />
          </FormField>

          <div className="md:col-span-2 pt-2">
            <label className="flex items-start gap-4 p-5 bg-primary/[0.02] hover:bg-primary/[0.05] rounded-2xl border border-primary/15 cursor-pointer group transition-all duration-200 select-none">
              <input
                type="checkbox"
                name="guidance_requested"
                className="w-5 h-5 mt-0.5 rounded-lg text-primary focus:ring-primary border-slate-300 cursor-pointer accent-primary"
                checked={data.guidance_requested}
                onChange={(e) => onChange("guidance_requested", e.target.checked)}
              />
              <div className="space-y-1">
                <span className="font-bold text-slate-800 group-hover:text-primary transition-colors text-sm">
                  Request Official SUPKEM Educational &amp; Logistical Guidance
                </span>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Receive pre-departure seminars, Hajj fiqh guidance booklets, and support contacts while in the Holy Land.
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
