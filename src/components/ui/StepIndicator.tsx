interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export function StepIndicator({ currentStep, totalSteps, steps }: StepIndicatorProps) {
  const progressPercent = (currentStep / totalSteps) * 100;
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-gold">
          Step {currentStep} of {totalSteps}
        </p>
        <span className="text-xs text-gray-500">{Math.round(progressPercent)}%</span>
      </div>
      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-charcoal-50/30">
        <div
          className="h-full rounded-full bg-gold transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {steps.map((step, index) => {
          const stepNum = index + 1;
          const isComplete = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          return (
            <div
              key={step}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                isCurrent
                  ? 'bg-gold text-charcoal'
                  : isComplete
                    ? 'bg-gold/20 text-gold'
                    : 'bg-charcoal-50/30 text-gray-500'
              }`}
            >
              {isComplete && <span>✓</span>}
              <span>{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
