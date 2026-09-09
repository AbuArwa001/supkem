"use client";

import React, { useEffect, useState } from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";

interface SocialChannel {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
}

const DEFAULT_FOOTER_CHANNELS: SocialChannel[] = [
  {
    id: "facebook",
    name: "Facebook",
    url: "https://www.facebook.com/p/Supreme-Council-of-Kenya-Muslims-100079747610399/",
    enabled: true,
  },
  {
    id: "x",
    name: "X (Twitter)",
    url: "https://x.com/SUPKEM1",
    enabled: true,
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com/supkem_kenya/",
    enabled: true,
  },
  {
    id: "youtube",
    name: "YouTube",
    url: "https://youtube.com/@SUPKEM",
    enabled: true,
  },
  {
    id: "tiktok",
    name: "TikTok",
    url: "https://www.tiktok.com/@supkem_kenya",
    enabled: true,
  },
];

export const FooterSocialLinks = () => {
  const [channels, setChannels] = useState<SocialChannel[]>(DEFAULT_FOOTER_CHANNELS);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/social-settings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!isMounted) return;
        if (data?.settings?.channels && Array.isArray(data.settings.channels)) {
          setChannels(data.settings.channels);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const activeChannels = channels.filter((c) => c.enabled !== false);

  const renderIcon = (id: string) => {
    switch (id) {
      case "facebook":
        return <Facebook className="w-5 h-5" />;
      case "x":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case "instagram":
        return <Instagram className="w-5 h-5" />;
      case "youtube":
        return <Youtube className="w-5 h-5" />;
      case "tiktok":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.02c0 2.45-.82 4.84-2.39 6.64-1.57 1.8-3.8 2.87-6.17 2.98-2.37.11-4.73-.72-6.42-2.34-1.69-1.62-2.58-3.92-2.48-6.3.1-2.38 1.11-4.63 2.86-6.14 1.75-1.51 4.12-2.22 6.44-1.95v4.06c-1.19-.15-2.41.19-3.32.96-.91.77-1.43 1.94-1.41 3.14.02 1.2.58 2.34 1.51 3.08.93.74 2.18 1.01 3.33.72 1.15-.29 2.12-1.12 2.61-2.23.23-.52.34-1.09.34-1.67V.02z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center gap-3">
      {activeChannels.map((ch) => (
        <a
          key={ch.id}
          href={ch.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`SUPKEM ${ch.name}`}
          className="text-white/80 hover:text-secondary transition-all p-1.5 hover:scale-110"
        >
          {renderIcon(ch.id)}
        </a>
      ))}
    </div>
  );
};
