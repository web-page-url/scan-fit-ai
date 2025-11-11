'use client';

import { Button } from './ui/button';

interface AnalyzeButtonProps {
  onClick: () => void;
  disabled: boolean;
  isAnalyzing: boolean;
}

export function AnalyzeButton({ onClick, disabled, isAnalyzing }: AnalyzeButtonProps) {
  return (
    <div className="flex justify-center my-8">
      <Button
        onClick={onClick}
        disabled={disabled || isAnalyzing}
        size="lg"
        className="px-8 py-4 text-lg"
      >
        {isAnalyzing ? 'Scanning & Fitting...' : 'Scan & Fit'}
      </Button>
    </div>
  );
}