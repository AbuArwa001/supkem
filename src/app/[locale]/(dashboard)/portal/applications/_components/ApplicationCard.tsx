"use client";

import { Application } from "./types";
import { ApplicationGridCard } from "./ApplicationGridCard";
import { ApplicationListCard } from "./ApplicationListCard";

interface ApplicationCardProps {
  application: Application;
  view?: "grid" | "list";
  getStatusStyles: (status: string) => string;
  getStatusIcon: (status: string) => any;
  index: number;
  isSelected?: boolean;
  onToggleSelect?: (id: string | number) => void;
}

export function ApplicationCard({
  application,
  view = "grid",
  getStatusStyles,
  getStatusIcon,
  index,
  isSelected = false,
  onToggleSelect,
}: ApplicationCardProps) {
  if (view === "grid") {
    return (
      <ApplicationGridCard
        application={application}
        getStatusStyles={getStatusStyles}
        getStatusIcon={getStatusIcon}
        index={index}
        isSelected={isSelected}
        onToggleSelect={onToggleSelect}
      />
    );
  }

  return (
    <ApplicationListCard
      application={application}
      getStatusStyles={getStatusStyles}
      getStatusIcon={getStatusIcon}
      index={index}
    />
  );
}
