import { ThumbsUp, ThumbsDown, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import TimelineStatus from "@/app/(dashboard)/admin/applications/[id]/_components/TimelineStatus";

interface ActionSidebarProps {
  app: any;
  submitting: boolean;
  handleAction: (status: string) => void;
  handleDelete: () => void;
}

export default function ActionSidebar({
  app,
  submitting,
  handleAction,
  handleDelete,
}: ActionSidebarProps) {
  return (
    <div className="space-y-8">
      <div className="p-8 rounded-[20px] bg-primary text-white shadow-2xl shadow-primary/20 space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        <div className="space-y-4 relative z-10">
          <p className="text-xs font-bold text-white/50 uppercase tracking-widest">
            Current Status
          </p>
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "w-4 h-4 rounded-full animate-pulse",
                app.status === "Approved"
                  ? "bg-green-400"
                  : app.status === "Rejected"
                    ? "bg-red-400"
                    : "bg-amber-400",
              )}
            />
            <h3 className="text-3xl font-bold font-outfit">{app.status}</h3>
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          <button
            onClick={() => handleAction("Approved")}
            disabled={submitting}
            className="w-full py-5 bg-white text-primary rounded-[24px] font-bold text-lg hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/10"
          >
            <ThumbsUp size={20} /> Approve Entry
          </button>
          <button
            onClick={() => handleAction("Rejected")}
            disabled={submitting}
            className="w-full py-5 bg-primary-foreground/10 text-white border border-white/20 rounded-[24px] font-bold text-lg hover:bg-red-600 hover:border-red-600 transition-all flex items-center justify-center gap-2"
          >
            <ThumbsDown size={20} /> Reject Submission
          </button>
        </div>
      </div>

      <TimelineStatus app={app} />

      <div className="pt-4 border-t border-border">
        <button
          onClick={handleDelete}
          disabled={submitting}
          className="w-full py-4 bg-red-50 text-red-500 border border-red-100 rounded-[20px] font-bold text-base hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <Trash2 size={20} /> Delete Application
        </button>
      </div>
    </div>
  );
}
