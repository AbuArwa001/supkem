import { Clock } from "lucide-react";

export default function TimelineStatus({ app }: { app: any }) {
  return (
    <div className="p-8 rounded-[20px] bg-white border border-border shadow-sm space-y-6">
      <h4 className="font-bold text-primary flex items-center gap-2">
        <Clock size={18} /> Timeline Status
      </h4>
      <div className="space-y-6">
        <div className="flex gap-4 relative">
          <div className="absolute left-[9px] top-6 bottom-[-24px] w-0.5 bg-primary/10" />
          <div className="w-5 h-5 rounded-full border-4 border-primary bg-white shrink-0 z-10" />
          <div>
            <p className="text-sm font-bold text-primary">
              Application Submitted
            </p>
            <p className="text-xs text-foreground/40 font-medium">
              By {app.organization_name || "Individual"}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-5 h-5 rounded-full border-4 border-amber-400 bg-white shrink-0 z-10" />
          <div>
            <p className="text-sm font-bold text-primary">
              Under Administrative Review
            </p>
            <p className="text-xs text-foreground/40 font-medium">
              Assigned to you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
