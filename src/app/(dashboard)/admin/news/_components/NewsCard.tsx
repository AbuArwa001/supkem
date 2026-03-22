import React from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Edit2, Trash2 } from "lucide-react";
import Image from "next/image";
import { NewsItem } from "@/services/news-service";
import { API_BASE_URL } from "@/lib/api";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  item: NewsItem;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}

/**
 * Individual news card component.
 */
export function NewsCard({ item, index, onEdit, onDelete }: NewsCardProps) {
  const imageUrl = item.featured_image
    ? item.featured_image.startsWith("http")
      ? item.featured_image
      : `${API_BASE_URL}${item.featured_image.startsWith("/") ? "" : "/"}${item.featured_image}`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white border border-border rounded-[32px] overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all group flex flex-col h-full"
    >
      <div className="aspect-video relative bg-primary/5 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <ImageIcon className="text-primary/20" size={48} />
        )}
        <div className="absolute top-4 right-4">
          <span
            className={cn(
              "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
              item.is_published
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700",
            )}
          >
            {item.is_published ? "Published" : "Draft"}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-4 flex-1 flex flex-col">
        <div className="space-y-2">
          <h3 className="text-xl font-bold font-outfit text-primary line-clamp-2 leading-snug">
            {item.title}
          </h3>
          <p className="text-sm text-foreground/60 line-clamp-3 leading-relaxed">
            {item.content}
          </p>
        </div>

        <div className="pt-6 mt-auto border-t border-border/50 flex items-center justify-between">
          <p className="text-xs font-bold text-foreground/30 uppercase tracking-widest">
            {new Date(item.created_at).toLocaleDateString()}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className="p-2 bg-primary/5 text-primary rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm active:scale-90"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={onDelete}
              className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-90"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
