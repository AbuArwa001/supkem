import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SocialPost } from "./types";
import { PlatformIcon } from "./SocialPlatformIcons";

interface LightboxMediaColumnProps {
  post: SocialPost;
  images: string[];
  activeImageIndex: number;
  hasMultipleImages: boolean;
  youtubeVideoId: string | null;
  onPrevImage: () => void;
  onNextImage: () => void;
}

export function LightboxMediaColumn({
  post,
  images,
  activeImageIndex,
  hasMultipleImages,
  youtubeVideoId,
  onPrevImage,
  onNextImage,
}: LightboxMediaColumnProps) {
  return (
    <div className="relative w-full md:w-3/5 min-h-[320px] md:min-h-[540px] bg-black flex items-center justify-center overflow-hidden">
      {youtubeVideoId ? (
        <div className="relative w-full h-full min-h-[360px] md:min-h-[540px] flex items-center justify-center bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=1&rel=0`}
            title={post.content.slice(0, 50)}
            className="w-full h-full min-h-[360px] md:min-h-[540px] border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : images.length > 0 ? (
        <div className="relative w-full h-full min-h-[360px] md:min-h-[540px] flex items-center justify-center">
          <Image
            src={images[activeImageIndex]}
            alt={post.content.slice(0, 50)}
            fill
            unoptimized
            className="object-contain"
            priority
          />

          {hasMultipleImages && (
            <>
              <button
                onClick={onPrevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-transform hover:scale-110 shadow-xl"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={onNextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-transform hover:scale-110 shadow-xl"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-xl">
                {activeImageIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="p-12 text-center text-slate-400">
          <PlatformIcon platform={post.platform} className="w-16 h-16 mx-auto mb-4 opacity-40" />
          <p className="text-sm font-medium">Text Announcement</p>
        </div>
      )}
    </div>
  );
}
