import { cn } from "@/lib/utils";

interface ApplicationFormHeaderProps {
  step: number;
  isMarriageService: boolean;
  isOtherService: boolean;
}

export function ApplicationFormHeader({ 
  step, 
  isMarriageService, 
  isOtherService 
}: ApplicationFormHeaderProps) {
  const maxSteps = isMarriageService ? 3 : isOtherService ? 2 : 1;

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border">
      <div className="space-y-2">
        <h1 className="text-4xl font-black font-outfit text-primary tracking-tight">
          New Application
        </h1>
        <p className="text-foreground/50 font-medium">
          Select a service and provide details to start your submission.
        </p>
      </div>
      
      {(isMarriageService || isOtherService) && (
        <div className="flex items-center gap-2 bg-primary/5 p-2 px-4 rounded-2xl border border-primary/10">
          {[1, 2, 3].map((s, idx) => {
            if (idx + 1 > maxSteps) return null;
            return (
              <div
                key={idx}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                  step === idx + 1
                    ? "bg-primary text-white scale-110 shadow-lg"
                    : step > idx + 1
                      ? "bg-green-500 text-white"
                      : "bg-white text-slate-400 border border-slate-200",
                )}
              >
                {step > idx + 1 ? "✓" : idx + 1}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
