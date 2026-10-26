import { PlayCircle } from "lucide-react";

interface VideoDescriptionProps {
    heading: string;
    description?: string;
    defaultDesc: string;
}

export function VideoDescription({ heading, description, defaultDesc }: VideoDescriptionProps) {
    return (
        <div className="bg-white rounded-[16px] p-8 lg:p-12 shadow-xl shadow-black/5 border border-slate-100">
            <h2 className="text-2xl font-black font-outfit text-primary mb-6 flex items-center gap-3">
                <PlayCircle className="text-secondary" />
                {heading}
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed font-medium whitespace-pre-wrap">
                {description || defaultDesc}
            </p>
        </div>
    );
}
