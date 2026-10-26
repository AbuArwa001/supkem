import React from "react";
import { FileText, Award, Mail, Building2, Layers, Users, Compass } from "lucide-react";

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  type: "application" | "certificate" | "letter" | "organization" | "service" | "user" | "navigation";
  url: string;
  status?: string;
  serial_number?: string;
  display_id?: string;
}

export interface GroupedResults {
  applications: SearchResultItem[];
  certificates: SearchResultItem[];
  letters: SearchResultItem[];
  organizations: SearchResultItem[];
  services: SearchResultItem[];
  users: SearchResultItem[];
}

export function getSearchResultItemIcon(type: SearchResultItem["type"]): React.ReactNode {
  switch (type) {
    case "application":
      return <FileText className="w-4 h-4 text-amber-600" />;
    case "certificate":
      return <Award className="w-4 h-4 text-emerald-600" />;
    case "letter":
      return <Mail className="w-4 h-4 text-blue-600" />;
    case "organization":
      return <Building2 className="w-4 h-4 text-teal-600" />;
    case "service":
      return <Layers className="w-4 h-4 text-purple-600" />;
    case "user":
      return <Users className="w-4 h-4 text-indigo-600" />;
    case "navigation":
    default:
      return <Compass className="w-4 h-4 text-emerald-700" />;
  }
}
