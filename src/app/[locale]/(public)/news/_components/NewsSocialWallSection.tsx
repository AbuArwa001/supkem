"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { SocialMediaWall } from "@/components/social/SocialMediaWall";

export function NewsSocialWallSection() {
  const t = useTranslations("NewsPage.socialWall");

  return (
    <div className="pt-8">
      <SocialMediaWall
        title={t("title")}
        subtitle={t("subtitle")}
        limit={9}
      />
    </div>
  );
}
