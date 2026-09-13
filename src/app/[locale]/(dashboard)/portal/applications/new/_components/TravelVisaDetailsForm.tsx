"use client";

import { motion } from "framer-motion";
import { Plane, ChevronDown } from "lucide-react";
import { FormField, inputBase, inputReadOnly, borderFor } from "./ui/FormField";
import { cn } from "@/lib/utils";
import type { TravelVisaDetails } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";

interface Props {
  data: TravelVisaDetails;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function TravelVisaDetailsForm({ data, errors, onChange }: Props) {
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
            <Plane size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black font-outfit text-slate-900">Travel &amp; Visa Verification</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
              Embassy clearance and international travel recommendation
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
            label="Passport Number"
            name="passport_number"
            error={errors.passport_number}
          >
            <input
              type="text"
              name="passport_number"
              placeholder="e.g. A12345678"
              className={field("passport_number")}
              value={data.passport_number}
              onChange={on("passport_number")}
            />
          </FormField>

          <FormField
            label="Destination Country"
            name="destination_country"
            error={errors.destination_country}
            required
          >
            <input
              type="text"
              name="destination_country"
              placeholder="e.g. Kingdom of Saudi Arabia / UAE"
              className={field("destination_country")}
              value={data.destination_country}
              onChange={on("destination_country")}
            />
          </FormField>

          <FormField label="Purpose of Trip" name="trip_purpose" required>
            <div className="relative">
              <select
                name="trip_purpose"
                className={cn(field("trip_purpose"), "appearance-none pr-10 cursor-pointer")}
                value={data.trip_purpose}
                onChange={on("trip_purpose")}
              >
                <option value="Religious">Religious</option>
                <option value="Tourism">Tourism</option>
                <option value="Business">Business</option>
                <option value="Family Visit">Family Visit</option>
                <option value="Other">Other</option>
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
            colSpan
          >
            <input
              type="date"
              name="expected_travel_date"
              className={field("expected_travel_date")}
              value={data.expected_travel_date}
              onChange={on("expected_travel_date")}
            />
          </FormField>
        </div>
      </div>
    </motion.div>
  );
}
