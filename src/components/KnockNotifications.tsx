"use client";

import { useState, useRef } from "react";
import {
  KnockProvider,
  KnockFeedProvider,
  NotificationIconButton,
  NotificationFeedPopover,
} from "@knocklabs/react";
import "@knocklabs/react/dist/index.css";
import { useAuth } from "@/hooks/useAuth";

export const KnockNotifications = () => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef<HTMLButtonElement>(null);

  const publicKey = process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY;
  const feedChannelId = process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID;

  if (!user || !user.id || !publicKey || !feedChannelId) {
    return null;
  }

  return (
    <div className="knock-notification-wrapper flex items-center justify-center">
      <KnockProvider apiKey={publicKey} userId={user.id.toString()}>
        <KnockFeedProvider feedId={feedChannelId}>
          <div className="relative z-50">
            <NotificationIconButton
              ref={notifButtonRef}
              onClick={() => setIsVisible(!isVisible)}
            />
            <NotificationFeedPopover
              buttonRef={notifButtonRef}
              isVisible={isVisible}
              onClose={() => setIsVisible(false)}
            />
          </div>
        </KnockFeedProvider>
      </KnockProvider>
    </div>
  );
};
