
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Step {
  title: string;
  description: string;
  component: React.ReactNode;
  isValid: boolean;
}

interface MultiStepFormProps {
  steps: Step[];
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export const MultiStepForm: React.FC<MultiStepFormProps> = ({
  steps,
  currentStep,
  onNext,
  onPrevious,
  onSubmit,
  isSubmitting = false
}) => {
  const progress = ((currentStep + 1) / steps.length) * 100;
  const currentStepData = steps[currentStep];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{currentStepData.title}</h2>
          <span className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        <Progress value={progress} className="mb-2" />
        <p className="text-sm text-gray-600">{currentStepData.description}</p>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        {currentStepData.component}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        {currentStep > 0 ? (
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
            disabled={isSubmitting}
          >
            Previous
          </Button>
        ) : (
          <div />
        )}

        {currentStep < steps.length - 1 ? (
          <Button
            type="button"
            onClick={onNext}
            disabled={!currentStepData.isValid || isSubmitting}
            className="gradient-primary text-white"
          >
            Next
          </Button>
        ) : (
          <Button
            type="button"
            onClick={onSubmit}
            disabled={!currentStepData.isValid || isSubmitting}
            className="gradient-primary text-white"
          >
            {isSubmitting ? 'Creating Account...' : 'Create Seller Account'}
          </Button>
        )}
      </div>
    </div>
  );
};
