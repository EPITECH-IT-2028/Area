import { Step } from "@/app/dashboard/viewModels/createAreaViewModel";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepProgressProps {
  currentStep: Step;
}

const PHASES = [
  {
    id: "trigger",
    label: "Trigger",
    steps: ["select-action-service", "select-action", "configure-action"],
  },
  {
    id: "action",
    label: "Action",
    steps: ["select-reaction-service", "select-reaction", "configure-reaction"],
  },
  {
    id: "review",
    label: "Review",
    steps: ["review"],
  },
];

export function StepProgress({ currentStep }: StepProgressProps) {
  const currentPhaseIndex = PHASES.findIndex((phase) =>
    phase.steps.includes(currentStep),
  );

  return (
    <div className="relative flex w-full justify-between">
      <div className="absolute top-1/2 left-0 -z-10 h-0.5 w-full -translate-y-1/2 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{
            width: `${(currentPhaseIndex / (PHASES.length - 1)) * 100}%`,
          }}
        />
      </div>

      {PHASES.map((phase, index) => {
        const isCompleted = index < currentPhaseIndex;
        const isCurrent = index === currentPhaseIndex;

        return (
          <div
            key={phase.id}
            className="flex flex-col items-center gap-2 bg-background px-2"
          >
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all duration-300",
                isCompleted
                  ? "border-primary bg-primary text-primary-foreground"
                  : isCurrent
                    ? "border-primary bg-background text-primary"
                    : "border-muted-foreground/30 bg-background text-muted-foreground",
              )}
            >
              {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
            </div>
            <span
              className={cn(
                "text-xs font-medium transition-colors duration-300",
                isCompleted || isCurrent
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {phase.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
