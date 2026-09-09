"use client";

// React/Next.js core
import { useParams } from "next/navigation";

// External libraries
import { ArrowLeft, Loader2 } from "lucide-react";

// Internal components
import OrganizationProfile from "@/app/[locale]/(dashboard)/admin/applications/[id]/_components/OrganizationProfile";
import ServiceDetails from "@/app/[locale]/(dashboard)/admin/applications/[id]/_components/ServiceDetails";
import ActionSidebar from "@/app/[locale]/(dashboard)/admin/applications/[id]/_components/ActionSidebar";
import { useApplicationDetailLogic } from "@/app/[locale]/(dashboard)/admin/applications/[id]/_hooks/useApplicationDetailLogic";

export default function ApplicationDetail() {
  const params = useParams();
  const id = params.id as string | string[];
  const { app, loading, submitting, handleAction, handleDelete, router } =
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
      <div className="flex flex-col md:flex-row md:items-center gap-6 bg-white p-8 rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <button
          onClick={() => router.back()}
          className="p-4 bg-slate-50 border border-slate-100 text-slate-600 rounded-full hover:bg-slate-900 hover:text-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 shrink-0"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="space-y-1.5">
          <h1 className="text-3xl lg:text-4xl font-black font-outfit text-slate-900">
            Review Application <span className="text-primary">{app.display_id}</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg">
            Submitted by <strong className="text-slate-900">{app.organization_name || "Applicant"}</strong> on{" "}
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
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}
