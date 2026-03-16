'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  steps: string[];
  currentStep: string;
  stepOrder: string[];
}

export function StepIndicator({ steps, currentStep, stepOrder }: StepIndicatorProps) {
  const currentStepIndex = stepOrder.indexOf(currentStep);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {stepOrder.map((step, index) => (
          <div key={step} className="flex-1">
            <div className="flex items-center">
              {/* Circle */}
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold text-sm transition-all',
                  index < currentStepIndex
                    ? 'border-green-500 bg-green-500 text-white'
                    : index === currentStepIndex
                    ? 'border-primary bg-primary text-white'
                    : 'border-muted bg-muted text-muted-foreground'
                )}
              >
                {index < currentStepIndex ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Line */}
              {index < stepOrder.length - 1 && (
                <div
                  className={cn(
                    'flex-1 mx-2 h-1 rounded-full transition-all',
                    index < currentStepIndex
                      ? 'bg-green-500'
                      : 'bg-muted'
                  )}
                />
              )}
            </div>
            {/* Label */}
            <p
              className={cn(
                'text-xs font-medium mt-2 text-center transition-all',
                index <= currentStepIndex ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {steps[index]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
