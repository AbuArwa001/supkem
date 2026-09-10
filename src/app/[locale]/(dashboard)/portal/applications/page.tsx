"use client";

import { useState } from "react";
import { useApplicationsLogic } from "./_components/useApplicationsLogic";
import { ApplicationsHeader } from "./_components/ApplicationsHeader";
import { ApplicationsList } from "./_components/ApplicationsList";

export default function ApplicationsPage() {
  const [view, setView] = useState<"grid" | "list">("list");

  const {
    applications,
    error,
    isLoading,
    getStatusStyles,
    getStatusIcon,
  } = useApplicationsLogic();

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      <ApplicationsHeader
        view={view}
        onViewChange={setView}
        total={applications.length}
      />

      <ApplicationsList
        applications={applications}
        isLoading={isLoading}
        error={error}
        view={view}
        getStatusStyles={getStatusStyles}
        getStatusIcon={getStatusIcon}
      />
    </div>
  );
}
