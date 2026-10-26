import { useState } from "react";

export function useSocialShare(title: string, url?: string) {
  const [copied, setCopied] = useState(false);
  const [showTikTokModal, setShowTikTokModal] = useState(false);
  const [showInstagramModal, setShowInstagramModal] = useState(false);

  const shareUrl = typeof window !== "undefined" ? url || window.location.href : url || "";
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: title, url: shareUrl });
      } catch {}
    }
  };

  const shareLinks = {
    x: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  return {
    copied,
    showTikTokModal,
    setShowTikTokModal,
    showInstagramModal,
    setShowInstagramModal,
    handleCopy,
    handleNativeShare,
    shareLinks,
  };
}
