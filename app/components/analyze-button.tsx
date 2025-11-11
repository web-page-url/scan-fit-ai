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
        variant="cyber"
        className="px-12 py-6 text-lg font-bold tracking-wider"
        glow={false}
      >
        <span className="flex items-center gap-3">
          {isAnalyzing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>ANALYZING...</span>
            </>
          ) : (
            <>
              <span>⚡</span>
              <span>SCAN & FIT</span>
              <span>⚡</span>
            </>
          )}
        </span>
      </Button>
    </div>
  );
}