'use client';

import { useAppStore } from '../../lib/stores/app-store';
import { Button } from './ui/button';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useAppStore();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-primary/20 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary glow">ScanFit</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </Button>
        </div>
      </header>
      <main className="container mx-auto p-4">
        {children}
      </main>
      <footer className="border-t border-primary/20 p-4 mt-8">
        <div className="container mx-auto text-center text-sm text-foreground/70">
          <p>ScanFit — Let AI scan your resume, fit your dream job. ⚡</p>
          <p className="mt-2">ScanFit does not save your data. All analyses are private and temporary.</p>
        </div>
      </footer>
    </div>
  );
}