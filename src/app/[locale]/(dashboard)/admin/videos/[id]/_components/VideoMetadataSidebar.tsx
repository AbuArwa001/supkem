"use client";

import { Calendar, User, Film, CheckCircle2, Edit2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { VideoBriefingItem } from "../../_hooks/useVideosLogic";
import { useTranslations } from "next-intl";

interface VideoMetadataSidebarProps {
  video: VideoBriefingItem;
}

function MetaItem({ icon: Icon, label, value, sub, isMono }: { icon: any; label: string; value: React.ReactNode; sub?: string; isMono?: boolean }) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-3 bg-primary/5 rounded-xl"><Icon className="text-primary" size={20} /></div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">{label}</p>
        <div className={`font-bold text-primary ${isMono ? "text-xs font-mono break-all" : ""}`}>{value}</div>
        {sub && <p className="text-xs text-foreground/40 font-medium">{sub}</p>}
      </div>
    </div>
  );
}

export const VideoMetadataSidebar = ({ video }: VideoMetadataSidebarProps) => {
  const t = useTranslations("Dashboard.admin.videos.detail");

  return (
    <div className="lg:col-span-4 space-y-6">
      <div className="bg-white border border-border rounded-[16px] p-8 space-y-8">
        <h3 className="text-xl font-bold font-outfit text-primary">{t("metadataDetails")}</h3>

        <div className="space-y-6">
          <MetaItem
            icon={Calendar} label={t("createdDate")}
            value={new Date(video.created_at).toLocaleDateString()}
            sub={new Date(video.created_at).toLocaleTimeString()}
          />
          <MetaItem icon={User} label={t("author")} value={t("pressOffice")} />
          <MetaItem icon={Film} label={t("filePath")} value={video.video_file} isMono />
          <MetaItem
            icon={CheckCircle2} label={t("visibility")}
            value={video.is_published ? t("visibleToEveryone") : t("internalReviewOnly")}
          />
        </div>

        <div className="pt-6 border-t border-border/50">
          <Link
            href={`/admin/videos`}
            className="w-full py-4 bg-primary/5 text-primary rounded-2xl font-bold text-sm hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 group"
          >
            <Edit2 size={16} /> {t("editData")}
          </Link>
        </div>
      </div>

      <div className="bg-gradient-to-br from-secondary to-primary-dark rounded-[16px] p-8 text-white shadow-xl shadow-secondary/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 scale-150 rotate-12"><Film size={80} /></div>
        <div className="relative z-10 space-y-4">
          <h3 className="text-xl font-bold font-outfit tracking-tight">{t("systemInfo")}</h3>
          <p className="text-xs opacity-80 leading-relaxed font-medium">
            {t("systemInfoDesc", { date: new Date(video.updated_at).toLocaleDateString() })}
          </p>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{t("id", { id: video.id })}</p>
        </div>
      </div>
    </div>
  );
};
