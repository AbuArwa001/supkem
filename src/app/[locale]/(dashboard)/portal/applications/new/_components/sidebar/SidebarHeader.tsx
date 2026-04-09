import { Building2 } from "lucide-react";

interface SidebarHeaderProps {
  isIndividualService: boolean;
}

export function SidebarHeader({ isIndividualService }: SidebarHeaderProps) {
  return (
    <div className="flex items-center gap-3 text-primary">
      <Building2 size={24} className="opacity-50" />
      <h3 className="text-xl font-black font-outfit">
        {isIndividualService ? "Registrar / Mosque" : "Applying Entity"}
      </h3>
    </div>
  );
}
