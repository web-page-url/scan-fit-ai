import { ButtonHTMLAttributes, forwardRef } from 'react';

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'cyber' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', glow = true, ...props }, ref) => {
    const baseClasses = `
      relative inline-flex items-center justify-center font-mono font-bold uppercase tracking-wider
      transition-all duration-300 ease-out focus:outline-none disabled:opacity-50 disabled:pointer-events-none
      transform hover:scale-105 active:scale-95
      before:absolute before:inset-0 before:rounded-lg before:transition-opacity before:duration-300
      after:absolute after:inset-0 after:rounded-lg after:opacity-0 after:transition-all after:duration-300
      hover:after:opacity-100
    `;

    const variants = {
      primary: `
        bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600
        text-black border-2 border-cyan-400
        shadow-lg shadow-cyan-500/50
        hover:shadow-cyan-400/80 hover:shadow-xl
        before:bg-gradient-to-r before:from-cyan-400 before:to-blue-500 before:opacity-20
        after:bg-gradient-to-r after:from-cyan-300 after:to-purple-400 after:shadow-lg after:shadow-cyan-300/60
        hover:border-cyan-300
      `,
      secondary: `
        bg-gradient-to-r from-purple-600 via-pink-500 to-red-500
        text-white border-2 border-purple-400
        shadow-lg shadow-purple-500/50
        hover:shadow-purple-400/80 hover:shadow-xl
        before:bg-gradient-to-r before:from-purple-400 before:to-pink-500 before:opacity-20
        after:bg-gradient-to-r after:from-purple-300 after:to-red-400 after:shadow-lg after:shadow-purple-300/60
        hover:border-purple-300
      `,
      ghost: `
        bg-transparent text-cyan-400 border-2 border-cyan-400/50
        hover:bg-cyan-400/10 hover:border-cyan-400 hover:text-cyan-300
        shadow-md shadow-cyan-500/20
        hover:shadow-cyan-400/40 hover:shadow-lg
        before:bg-cyan-400/10
        after:border after:border-cyan-300 after:shadow-cyan-300/50
      `,
      cyber: `
        bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500
        text-black border-2 border-green-400
        shadow-lg shadow-green-500/50
        hover:shadow-green-400/80 hover:shadow-xl
        before:bg-gradient-to-r before:from-green-400 before:to-cyan-500 before:opacity-20
        after:bg-gradient-to-r after:from-green-300 after:to-blue-400 after:shadow-lg after:shadow-green-300/60
        hover:border-green-300
        animate-pulse
      `,
      danger: `
        bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500
        text-black border-2 border-red-400
        shadow-lg shadow-red-500/50
        hover:shadow-red-400/80 hover:shadow-xl
        before:bg-gradient-to-r before:from-red-400 before:to-orange-500 before:opacity-20
        after:bg-gradient-to-r after:from-red-300 after:to-yellow-400 after:shadow-lg after:shadow-red-300/60
        hover:border-red-300
      `,
    };

    const sizes = {
      sm: 'h-9 px-4 text-xs rounded-md',
      md: 'h-11 px-6 text-sm rounded-lg',
      lg: 'h-14 px-8 text-base rounded-xl',
    };

    const glowEffect = glow ? `
      filter drop-shadow(0 0 8px currentColor)
      hover:drop-shadow(0 0 16px currentColor)
    ` : '';

    return (
      <button
        className={cn(baseClasses, variants[variant], sizes[size], glowEffect, className)}
        ref={ref}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {props.children}
        </span>

        {/* Circuit pattern overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="w-full h-full bg-circuit-pattern animate-pulse"></div>
        </div>

        {/* Glitch effect on hover */}
        <div className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300 pointer-events-none">
          <div className="w-full h-full bg-glitch-pattern animate-glitch"></div>
        </div>
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };