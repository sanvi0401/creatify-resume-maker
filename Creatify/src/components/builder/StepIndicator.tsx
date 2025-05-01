interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="mt-8 flex justify-center space-x-2">
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`h-2 w-2 rounded-full transition-colors duration-200 ${
            index === currentStep ? 'bg-emerald-400' : 'bg-zinc-600'
          }`}
        />
      ))}
    </div>
  );
}