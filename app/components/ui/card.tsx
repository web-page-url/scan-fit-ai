import { HTMLAttributes, forwardRef } from 'react';

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'cyber' | 'hologram' | 'neon';
  glow?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', glow = true, ...props }, ref) => {
    const baseClasses = `
      relative overflow-hidden font-mono
      transition-all duration-500 ease-out
      hover:scale-[1.02] hover:-translate-y-1
      before:absolute before:inset-0 before:transition-opacity before:duration-500
    `;

    const variants = {
      default: `
        bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90
        backdrop-blur-xl border border-cyan-500/30
        shadow-2xl shadow-cyan-500/20
        hover:shadow-cyan-400/40 hover:shadow-3xl
        hover:border-cyan-400/50
        before:bg-gradient-to-br before:from-cyan-500/10 before:to-blue-500/10 before:opacity-0
        hover:before:opacity-100
      `,
      cyber: `
        bg-gradient-to-br from-slate-950/95 via-purple-950/90 to-slate-950/95
        backdrop-blur-2xl border-2 border-purple-500/40
        shadow-2xl shadow-purple-500/30
        hover:shadow-purple-400/60 hover:shadow-3xl
        hover:border-purple-400/60
        before:bg-gradient-to-br before:from-purple-500/15 before:to-pink-500/15 before:opacity-0
        hover:before:opacity-100
      `,
      hologram: `
        bg-gradient-to-br from-emerald-950/90 via-teal-950/90 to-cyan-950/90
        backdrop-blur-2xl border border-emerald-400/50
        shadow-2xl shadow-emerald-500/25
        hover:shadow-emerald-400/50 hover:shadow-3xl
        hover:border-emerald-400/70
        before:bg-gradient-to-br before:from-emerald-400/20 before:to-cyan-400/20 before:opacity-0
        hover:before:opacity-100
      `,
      neon: `
        bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95
        backdrop-blur-2xl border-2 border-pink-500/40
        shadow-2xl shadow-pink-500/30
        hover:shadow-pink-400/60 hover:shadow-3xl
        hover:border-pink-400/60
        before:bg-gradient-to-br before:from-pink-500/15 before:to-purple-500/15 before:opacity-0
        hover:before:opacity-100
      `,
    };

    const glowEffect = glow ? `
      filter drop-shadow(0 0 10px currentColor)
      hover:drop-shadow(0 0 20px currentColor)
    ` : '';

    return (
      <div
        ref={ref}
        className={cn(baseClasses, variants[variant], glowEffect, 'rounded-xl p-6', className)}
        {...props}
      >
        {/* Animated border effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

        {/* Circuit pattern background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="w-full h-full bg-circuit-pattern animate-pulse"></div>
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="w-full h-full bg-grid-pattern"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {props.children}
        </div>

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-400/50"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-400/50"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-cyan-400/50"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-400/50"></div>
      </div>
    );
  }
);

Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mb-6 relative', className)}
      {...props}
    >
      {/* Header accent line */}
      <div className="absolute bottom-0 left-0 w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400"></div>
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-xl font-bold font-mono uppercase tracking-wider',
        'bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent',
        'drop-shadow-lg hover:drop-shadow-xl transition-all duration-300',
        className
      )}
      {...props}
    />
  )
);

CardTitle.displayName = 'CardTitle';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-slate-300 leading-relaxed', className)}
      {...props}
    />
  )
);

CardContent.displayName = 'CardContent';

export { Card, CardHeader, CardTitle, CardContent };