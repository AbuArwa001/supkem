import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Role } from "./accessControlTypes";
import { RoleCard } from "./RoleCard";

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface RoleGridProps {
  isLoading: boolean;
  filteredRoles: Role[];
  onSelectRole: (role: Role) => void;
}

export function RoleGrid({ isLoading, filteredRoles, onSelectRole }: RoleGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="border-none shadow-premium rounded-[2.5rem] overflow-hidden bg-white p-10">
            <Skeleton className="h-12 w-12 rounded-2xl mb-6" />
            <Skeleton className="h-8 w-2/3 mb-4" />
            <Skeleton className="h-24 w-full rounded-2xl" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {filteredRoles.map((role) => (
        <motion.div key={role.id} variants={item}>
          <RoleCard role={role} onClick={() => onSelectRole(role)} />
        </motion.div>
      ))}
    </div>
  );
}
