"use client";

import React from "react";
import { DeadlineItem, SidebarDeadlines } from "./sidebar/SidebarDeadlines";
import { SidebarQuickLinks } from "./sidebar/SidebarQuickLinks";
import { SidebarSystemHealth } from "./sidebar/SidebarSystemHealth";

export type { DeadlineItem as Deadline };

export interface SidebarProps {
  deadlines: DeadlineItem[];
}

export function Sidebar({ deadlines }: SidebarProps) {
  return (
    <div className="space-y-8">
      <SidebarDeadlines deadlines={deadlines} />
      <SidebarQuickLinks />
      <SidebarSystemHealth />
    </div>
  );
}
