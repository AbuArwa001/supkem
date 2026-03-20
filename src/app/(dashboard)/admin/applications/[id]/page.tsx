"use client";

// React/Next.js core
import { useParams } from "next/navigation";

// External libraries
import { ArrowLeft, Loader2 } from "lucide-react";

// Internal components
import OrganizationProfile from "@/app/(dashboard)/admin/applications/[id]/_components/OrganizationProfile";
import ServiceDetails from "@/app/(dashboard)/admin/applications/[id]/_components/ServiceDetails";
import ActionSidebar from "@/app/(dashboard)/admin/applications/[id]/_components/ActionSidebar";
import { useApplicationDetailLogic } from "@/app/(dashboard)/admin/applications/[id]/_hooks/useApplicationDetailLogic";

export default function ApplicationDetail() {
  const params = useParams();
  const id = params.id as string | string[];
  const { app, loading, submitting, handleAction, router } =
    useApplicationDetailLogic(id);

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (!app) {
    return <div>Application not found</div>;
  }

  return (
    <div className="space-y-12 pb-20">
      <div className="flex items-center gap-6">
        <button
          onClick={() => router.back()}
          className="p-3 bg-white border border-border rounded-2xl hover:bg-primary hover:text-white transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-outfit text-primary">
            Review Application {app.display_id}
          </h1>
          <p className="text-foreground/40 font-medium">
            Submitted by {app.organization_name || "Applicant"} on{" "}
            {new Date(app.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <OrganizationProfile app={app} />
          <ServiceDetails app={app} />
        </div>

        <ActionSidebar
          app={app}
          submitting={submitting}
          handleAction={handleAction}
        />
      </div>
    </div>
  );
}
