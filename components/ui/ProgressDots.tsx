interface ProgressDotsProps {
  currentStep: number;
  totalSteps?: number;
  className?: string;
}

export function ProgressDots({ currentStep, totalSteps = 4, className = "" }: ProgressDotsProps) {
  return (
    <div className={`flex items-center justify-center gap-1.5 ${className}`}>
      {[...Array(totalSteps)].map((_, i) => {
        const isCompleted = i < currentStep;
        const isCurrent = i === currentStep;
        return (
          <div
            key={i}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${isCompleted ? "bg-[var(--success)]" : ""}
              ${isCurrent ? "bg-[var(--primary)] scale-125" : ""}
              ${!isCompleted && !isCurrent ? "bg-[var(--border)]" : ""}
            `}
          />
        );
      })}
    </div>
  );
}
