'use client';

interface ProgressLoaderProps {
  isVisible: boolean;
}

export function ProgressLoader({ isVisible }: ProgressLoaderProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-4 bg-primary/10 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="scan-line absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        <h3 className="text-xl font-semibold text-primary mb-2">Analyzing Resume & Job Match</h3>
        <p className="text-foreground/70">AI is scanning your documents...</p>
      </div>
    </div>
  );
}