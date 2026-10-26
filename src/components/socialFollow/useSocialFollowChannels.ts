"use client";

import { useEffect, useMemo, useState } from "react";
import { SOCIAL_CHANNELS, SocialChannelItem } from "./socialFollowChannels";

interface ChannelSetting {
  id?: string;
  name?: string;
  enabled?: boolean;
  url?: string;
}

function matchesChannel(dc: ChannelSetting, item: SocialChannelItem): boolean {
  if (dc.id && dc.id === item.id) return true;
  const dcFirst = dc.name?.toLowerCase().split(" ")[0];
  const itemFirst = item.name.toLowerCase().split(" ")[0];
  if (dcFirst && item.name.toLowerCase().includes(dcFirst)) return true;
  if (itemFirst && dc.name?.toLowerCase().includes(itemFirst)) return true;
  return false;
}

export function useSocialFollowChannels(): SocialChannelItem[] {
  const [dynamicChannels, setDynamicChannels] = useState<ChannelSetting[] | null>(null);

  useEffect(() => {
    fetch("/api/social-settings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.settings?.channels) {
          setDynamicChannels(data.settings.channels);
        }
      })
      .catch(() => {});
  }, []);

  return useMemo(() => {
    if (!dynamicChannels) return SOCIAL_CHANNELS;
    return SOCIAL_CHANNELS
      .filter((item) => {
        const found = dynamicChannels.find((dc) => matchesChannel(dc, item));
        return found ? found.enabled !== false : false;
      })
      .map((item) => {
        const found = dynamicChannels.find((dc) => matchesChannel(dc, item));
        return found?.url ? { ...item, url: found.url } : item;
      });
  }, [dynamicChannels]);
}
