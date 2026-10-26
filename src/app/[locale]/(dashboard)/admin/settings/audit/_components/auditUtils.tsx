import React from "react";
import { Badge } from "@/components/ui/badge";

export function getActionBadge(action: string) {
  switch (action) {
    case "CREATE":
      return <Badge className="bg-emerald-500 hover:bg-emerald-600">Created</Badge>;
    case "UPDATE":
      return <Badge className="bg-blue-500 hover:bg-blue-600">Updated</Badge>;
    case "DELETE":
      return <Badge className="bg-rose-500 hover:bg-rose-600">Deleted</Badge>;
    case "LOGIN":
      return <Badge className="bg-violet-500 hover:bg-violet-600">Login</Badge>;
    case "CONFIG":
      return <Badge className="bg-amber-500 hover:bg-amber-600">Config</Badge>;
    case "SECURITY":
      return <Badge className="bg-indigo-500 hover:bg-indigo-600">Security</Badge>;
    default:
      return <Badge variant="outline">{action}</Badge>;
  }
}
