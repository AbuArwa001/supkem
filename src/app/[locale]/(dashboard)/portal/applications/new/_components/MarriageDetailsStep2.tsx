"use client";

import { motion } from "framer-motion";
import { FileCheck } from "lucide-react";
import { FinancialsGuardianship } from "./marriage/FinancialsGuardianship";
import { EventWitnesses } from "./marriage/EventWitnesses";

interface MarriageDetailsStep2Props {
  data: any;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function MarriageDetailsStep2({ data, errors, onChange }: MarriageDetailsStep2Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <FinancialsGuardianship data={data} errors={errors} onChange={onChange} />
      <EventWitnesses data={data} errors={errors} onChange={onChange} />
    </motion.div>
  );
}
