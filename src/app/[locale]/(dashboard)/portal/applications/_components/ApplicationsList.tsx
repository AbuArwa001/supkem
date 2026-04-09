import { FileText, AlertCircle } from "lucide-react";
import { ApplicationCard } from "./ApplicationCard";
import { Application } from "./types";

interface ApplicationsListProps {
  applications: Application[];
  isLoading: boolean;
  error: any;
  getStatusStyles: (status: string) => string;
  getStatusIcon: (status: string) => any;
}

export function ApplicationsList({
  applications,
  isLoading,
  error,
  getStatusStyles,
  getStatusIcon,
}: ApplicationsListProps) {
  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600">
        <AlertCircle size={20} />
        <span className="font-semibold text-sm">
          Failed to load applications. Please try refreshing the page.
        </span>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border/50 shadow-sm rounded-[16px] overflow-hidden">
      {isLoading ? (
        <div className="divide-y divide-border/30">
          {[1, 2, 3].map((skeleton) => (
            <div
              key={skeleton}
              className="p-6 md:p-8 animate-pulse flex items-center gap-6"
            >
              <div className="w-16 h-16 bg-slate-100 rounded-2xl shrink-0" />
              <div className="space-y-3 flex-1">
                <div className="h-5 w-1/3 bg-slate-100 rounded-lg" />
                <div className="h-4 w-1/4 bg-slate-50 rounded-lg" />
              </div>
              <div className="h-8 w-24 bg-slate-50 rounded-full shrink-0" />
            </div>
          ))}
        </div>
      ) : applications.length === 0 ? (
        <div className="p-16 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
              <FileText size={40} />
            </div>
            <h3 className="text-xl font-black text-slate-800 font-outfit">
              No Applications Found
            </h3>
            <p className="text-slate-500 font-medium text-sm max-w-sm">
              You haven't submitted any Halal certification applications yet.
            </p>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-border/50">
          {applications.map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              getStatusStyles={getStatusStyles}
              getStatusIcon={getStatusIcon}
            />
          ))}
        </div>
      )}
    </div>
  );
}
