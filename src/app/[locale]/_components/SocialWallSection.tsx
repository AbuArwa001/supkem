"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { SocialMediaWall } from "@/components/social/SocialMediaWall";

export function SocialWallSection() {
  const t = useTranslations("Home.socialWall");

  return (
    <SocialMediaWall
      title={t("title")}
      subtitle={t("subtitle")}
    />
  );
}
