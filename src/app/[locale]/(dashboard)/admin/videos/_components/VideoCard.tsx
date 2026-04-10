"use client";

import { motion } from "framer-motion";
import { Edit2, Trash2, Video as VideoIcon, PlayCircle } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { API_BASE_URL } from "@/lib/api";
import { VideoBriefingItem } from "../_hooks/useVideosLogic";

interface VideoCardProps {
  item: VideoBriefingItem;
  index: number;
  onEdit: (item: VideoBriefingItem) => void;
  onDelete: (id: string) => void;
}

export const VideoCard = ({
  item,
  index,
  onEdit,
  onDelete,
}: VideoCardProps) => {
  const videoUrl = item.video_file.startsWith("http")
    ? item.video_file
    : `${API_BASE_URL}${item.video_file.startsWith("/") ? "" : "/"}${item.video_file}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white border border-border rounded-[16px] overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all group flex flex-col"
    >
      <Link
        href={`/admin/videos/${item.id}`}
        className="aspect-video relative bg-primary/5 flex items-center justify-center overflow-hidden cursor-pointer"
      >
        {item.video_file ? (
          <video
            src={videoUrl}
            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
        ) : (
          <VideoIcon className="text-primary/20" size={48} />
        )}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <PlayCircle size={20} className="ml-1" />
          </div>
        </div>
        <div className="absolute top-4 right-4 relative z-10">
          <span
            className={cn(
              "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md",
              item.is_published
                ? "bg-green-500/90 text-white"
                : "bg-amber-500/90 text-white",
            )}
          >
            {item.is_published ? "Published" : "Draft"}
          </span>
        </div>
      </Link>

      <div className="p-6 space-y-4 flex-1 flex flex-col">
        <div className="space-y-2">
          <Link href={`/admin/videos/${item.id}`}>
            <h3 className="text-xl font-bold font-outfit text-primary line-clamp-2 hover:underline cursor-pointer">
              {item.title}
            </h3>
          </Link>
          <p className="text-sm text-foreground/60 line-clamp-2">
            {item.description || "No description provided."}
          </p>
        </div>

        <div className="pt-6 mt-auto border-t border-border/50 flex items-center justify-between">
          <p className="text-xs font-bold text-foreground/30 uppercase tracking-widest">
            {new Date(item.created_at).toLocaleDateString()}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(item)}
              className="p-2 bg-primary/5 text-primary rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
