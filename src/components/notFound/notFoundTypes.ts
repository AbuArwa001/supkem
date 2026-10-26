import { LucideIcon } from "lucide-react";

export interface NotFoundDestination {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  badge: string;
  accent: string;
  keywords: string[];
}

export interface NotFoundDictionaryLocale {
  badge: string;
  title: string;
  description: string;
  searchPlaceholder: string;
  pressEnter: string;
  returnHome: string;
  goBack: string;
  quickNavigation: string;
  requestedUrl: string;
  copyUrl: string;
  urlCopied: string;
  reportIssue: string;
  noMatches: string;
  destinations: NotFoundDestination[];
}
