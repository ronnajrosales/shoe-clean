import type { Step } from "@/types"
import { cn } from "@/lib/utils"

const steps: { key: Step; label: string }[] = [
  { key: "upload", label: "Upload" },
  { key: "analyzing", label: "Analyze" },
  { key: "result", label: "Results" },
  { key: "schedule", label: "Schedule" },
  { key: "confirm", label: "Confirm" },
]

interface StepperProps {
  current: Step
}

export function Stepper({ current }: StepperProps) {
  const currentIndex = steps.findIndex((s) => s.key === current)
  const displaySteps = steps.filter((s) => s.key !== "analyzing")

  return (
    <div className="flex items-center justify-center gap-1 w-full px-4">
      {displaySteps.map((step, i) => {
        const stepIndex = steps.findIndex((s) => s.key === step.key)
        const isComplete = stepIndex < currentIndex
        const isCurrent = step.key === current || 
          (current === "analyzing" && step.key === "upload")

        return (
          <div key={step.key} className="flex items-center gap-1">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-all duration-300",
                  isComplete && "bg-emerald-500",
                  isCurrent && !isComplete && "bg-foreground",
                  !isComplete && !isCurrent && "bg-border"
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium hidden sm:inline transition-colors",
                  isComplete && "text-emerald-600",
                  isCurrent && "text-foreground",
                  !isComplete && !isCurrent && "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
            {i < displaySteps.length - 1 && (
              <div
                className={cn(
                  "h-px w-8 sm:w-12 transition-colors duration-300",
                  isComplete ? "bg-emerald-500" : "bg-border"
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
