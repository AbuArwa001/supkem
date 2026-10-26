"use client";

import React, { useEffect, useState } from "react";
import {
  DEFAULT_FOOTER_CHANNELS,
  FooterSocialChannel,
  renderFooterSocialIcon,
} from "./footerSocialData";

export const FooterSocialLinks = () => {
  const [channels, setChannels] = useState<FooterSocialChannel[]>(DEFAULT_FOOTER_CHANNELS);

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
          {renderFooterSocialIcon(ch.id)}
        </a>
      ))}
    </div>
  );
};
