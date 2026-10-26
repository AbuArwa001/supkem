import Image from "next/image";
import { SocialPost } from "./types";
import { Play, Layers, Sparkles } from "lucide-react";

interface SocialPostMediaProps {
  post: SocialPost;
}

export function SocialPostMedia({ post }: SocialPostMediaProps) {
  const images = post.images || [];

  if (images.length > 0) {
    return (
      <div className="relative w-full h-64 bg-slate-900 overflow-hidden mt-2">
        <Image
          src={images[0]}
          alt={post.content.slice(0, 50) || "SUPKEM Social Post"}
          fill
          unoptimized
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {images.length > 1 && (
          <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 border border-white/20 shadow-lg">
            <Layers className="w-3.5 h-3.5 text-amber-300" />
            <span>1 / {images.length}</span>
          </div>
        )}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white/90 text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Click to expand</span>
        </div>
      </div>
    );
  }

  if (post.mediaType === "video" && (post.videoThumbnail || images.length === 0)) {
    return (
      <div className="relative w-full h-64 bg-black overflow-hidden mt-2">
        {post.videoThumbnail && (
          <Image
            src={post.videoThumbnail}
            alt="Video post"
            fill
            unoptimized
            className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-red-600/95 text-white flex items-center justify-center shadow-xl transform transition-transform group-hover:scale-110">
            <Play className="w-6 h-6 fill-current ml-0.5" />
          </div>
        </div>
        {post.videoDuration && (
          <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-lg bg-black/80 text-white text-xs font-bold border border-white/20">
            {post.videoDuration}
          </div>
        )}
      </div>
    );
  }

  return null;
}
