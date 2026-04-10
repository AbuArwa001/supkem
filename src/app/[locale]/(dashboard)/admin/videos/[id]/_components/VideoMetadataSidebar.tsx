"use client";

import { Calendar, User, Film, CheckCircle2, Edit2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { VideoBriefingItem } from "../../_hooks/useVideosLogic";

interface VideoMetadataSidebarProps {
  video: VideoBriefingItem;
}

export const VideoMetadataSidebar = ({ video }: VideoMetadataSidebarProps) => {
  return (
    <div className="lg:col-span-4 space-y-6">
      <div className="bg-white border border-border rounded-[16px] p-8 space-y-8">
        <h3 className="text-xl font-bold font-outfit text-primary">
          Metadata Details
        </h3>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/5 rounded-xl">
              <Calendar className="text-primary" size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">
                Created Date
              </p>
              <p className="font-bold text-primary">
                {new Date(video.created_at).toLocaleDateString()}
              </p>
              <p className="text-xs text-foreground/40 font-medium">
                {new Date(video.created_at).toLocaleTimeString()}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/5 rounded-xl">
              <User className="text-primary" size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">
                Author
              </p>
              <p className="font-bold text-primary">SUPKEM Press Office</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/5 rounded-xl">
              <Film className="text-primary" size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">
                File Path
              </p>
              <p className="text-xs font-mono font-bold text-primary break-all">
                {video.video_file}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/5 rounded-xl">
              <CheckCircle2 className="text-primary" size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">
                Visibility
              </p>
              <p className="font-bold text-primary">
                {video.is_published
                  ? "Visible to Everyone"
                  : "Internal Review Only"}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border/50">
          <Link
            href={`/admin/videos`}
            className="w-full py-4 bg-primary/5 text-primary rounded-2xl font-bold text-sm hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 group"
          >
            <Edit2 size={16} /> Edit Data in Registry
          </Link>
        </div>
      </div>

      <div className="bg-gradient-to-br from-secondary to-primary-dark rounded-[16px] p-8 text-white shadow-xl shadow-secondary/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 scale-150 rotate-12">
          <Film size={80} />
        </div>
        <div className="relative z-10 space-y-4">
          <h3 className="text-xl font-bold font-outfit tracking-tight">
            System Info
          </h3>
          <p className="text-xs opacity-80 leading-relaxed font-medium">
            This video briefing is stored securely on the council media servers.
            Last internal update was{" "}
            {new Date(video.updated_at).toLocaleDateString()}.
          </p>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
            ID: {video.id}
          </p>
        </div>
      </div>
    </div>
  );
};
