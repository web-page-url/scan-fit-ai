'use client';

interface ProgressLoaderProps {
  isVisible: boolean;
}

export function ProgressLoader({ isVisible }: ProgressLoaderProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center z-50">
      {/* Animated background */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-20 animate-pulse"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="text-center relative z-10">
        {/* Main loading ring */}
        <div className="relative w-40 h-40 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-cyan-400 border-r-purple-400 rounded-full animate-spin"></div>
          <div className="absolute inset-4 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-neon-pulse flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Scanning line effect */}
        <div className="relative w-64 h-1 mx-auto mb-6 bg-slate-800 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-data-stream"></div>
        </div>

        {/* Text content */}
        <h3 className="text-2xl font-bold font-mono text-cyan-400 mb-3 tracking-wider">
          ANALYZING RESUME & JOB MATCH
        </h3>
        <p className="text-purple-300 font-mono text-sm mb-4">
          AI is scanning your documents...
        </p>

        {/* Progress indicators */}
        <div className="flex justify-center gap-4 text-xs font-mono">
          <span className="text-cyan-400 animate-pulse">EXTRACTING TEXT</span>
          <span className="text-purple-400 animate-pulse delay-300">ANALYZING CONTENT</span>
          <span className="text-pink-400 animate-pulse delay-700">GENERATING INSIGHTS</span>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-400/50"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-purple-400/50"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyan-400/50"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-purple-400/50"></div>
      </div>
    </div>
  );
}