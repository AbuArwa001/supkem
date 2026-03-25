"use client";

import { useApplicationsLogic } from "./_components/useApplicationsLogic";
import { ApplicationsHeader } from "./_components/ApplicationsHeader";
import { ApplicationsList } from "./_components/ApplicationsList";

export default function ApplicationsPage() {
  const {
    applications,
    error,
    isLoading,
    getStatusStyles,
    getStatusIcon,
  } = useApplicationsLogic();

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      <ApplicationsHeader />

      <ApplicationsList
        applications={applications}
        isLoading={isLoading}
        error={error}
        getStatusStyles={getStatusStyles}
        getStatusIcon={getStatusIcon}
      />
    </div>
  );
}

