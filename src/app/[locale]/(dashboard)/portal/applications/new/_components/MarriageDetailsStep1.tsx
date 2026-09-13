"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { HusbandParticulars } from "./marriage/HusbandParticulars";
import { WifeParticulars } from "./marriage/WifeParticulars";

interface MarriageDetailsStep1Props {
  data: any;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function MarriageDetailsStep1({ data, errors, onChange }: MarriageDetailsStep1Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <HusbandParticulars data={data} errors={errors} onChange={onChange} />
      <WifeParticulars data={data} errors={errors} onChange={onChange} />
    </motion.div>
  );
}
