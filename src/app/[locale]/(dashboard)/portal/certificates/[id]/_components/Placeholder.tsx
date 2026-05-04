import { AlertCircle } from "lucide-react";

interface PlaceholderProps {
  error: string;
}

export function Placeholder({ error }: PlaceholderProps) {
  return (
    <div className="py-20 text-slate-400 font-medium">
      <AlertCircle className="mx-auto mb-4 opacity-20" size={48} />
      <p>{error}</p>
    </div>
  );
}
