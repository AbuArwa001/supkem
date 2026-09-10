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
import { useRouter } from "@/i18n/routing";

interface KnockNotificationsProps {
  /** Base path used when a notification is clicked.
   *  Admins pass "/admin/applications", portal users get the default. */
  basePath?: string;
}

export const KnockNotifications = ({
  basePath = "/portal/applications",
}: KnockNotificationsProps) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef<HTMLButtonElement>(null);

  const publicKey = process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY;
  const feedChannelId = process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID;

  if (!user || !user.id || !publicKey || !feedChannelId) {
    return null;
  }

  const handleNotificationClick = (notification: any) => {
    setIsVisible(false);
    const appId = notification?.data?.application_id;
    if (appId) {
      router.push(`${basePath}/${appId}` as any);
    } else {
      router.push(basePath as any);
    }
  };

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
              onNotificationClick={handleNotificationClick}
            />
          </div>
        </KnockFeedProvider>
      </KnockProvider>
    </div>
  );
};
