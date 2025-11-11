'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

interface InputPanelProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  onFileChange?: (file: File | null) => void;
  placeholder: string;
}

export function InputPanel({ title, value, onChange, onFileChange, placeholder }: InputPanelProps) {
  const [inputMode, setInputMode] = useState<'text' | 'file'>('text');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      onFileChange?.(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileChange?.(file);
    }
  };

  return (
    <Card className="flex-1" variant="cyber" glow={false}>
      <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-cyan-400 font-bold text-lg">{title}</CardTitle>
            {selectedFile && (
              <div className="flex items-center gap-2 px-3 py-2 bg-green-500/20 border border-green-400/50 rounded-lg animate-pulse">
                <span className="text-green-400">📎</span>
                <span className="text-green-300 font-mono text-sm">{selectedFile.name}</span>
              </div>
            )}
          </div>
      </CardHeader>
      <CardContent>
          {/* Mode Toggle Buttons - More Prominent */}
          <div className="flex gap-4 p-2 mb-4 bg-slate-800/50 rounded-lg border border-cyan-500/30">
            <Button
              variant={inputMode === 'text' ? 'primary' : 'secondary'}
              size="md"
              onClick={() => setInputMode('text')}
              className="flex-1 font-bold px-6 py-3 text-sm"
              glow={false}
            >
              ✏️ TEXT INPUT
            </Button>
            <Button
              variant={inputMode === 'file' ? 'primary' : 'secondary'}
              size="md"
              onClick={() => setInputMode('file')}
              className="flex-1 font-bold px-6 py-3 text-sm"
              glow={false}
            >
              📁 UPLOAD FILE
            </Button>
          </div>
        {inputMode === 'text' ? (
          <div className="relative">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className={cn(
                "w-full h-64 p-4 font-mono text-sm",
                "bg-slate-900/50 border-2 border-cyan-500/30 rounded-lg",
                "text-cyan-100 placeholder-slate-400",
                "focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20",
                "resize-none transition-all duration-300",
                "hover:border-cyan-400/50",
                "backdrop-blur-sm"
              )}
            />
            <div className="absolute bottom-2 right-2 text-xs text-slate-400">
              {value.length} characters
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {/* File Upload Instructions */}
            <div className="text-center p-3 bg-cyan-500/10 border border-cyan-400/30 rounded-lg">
              <p className="text-cyan-300 font-mono text-sm font-bold">📁 FILE UPLOAD MODE</p>
              <p className="text-slate-300 text-xs mt-1">Drag & drop or click to browse</p>
            </div>

            <div
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              className={cn(
                "w-full h-64 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer",
                "transition-all duration-300 backdrop-blur-sm",
                "bg-gradient-to-br from-slate-900/30 to-purple-900/30",
                isDragging
                  ? 'border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/20 scale-105'
                  : 'border-purple-500/40 hover:border-cyan-400/60 hover:bg-cyan-400/5'
              )}
              onClick={() => document.getElementById(`file-input-${title}`)?.click()}
            >
              <div className="text-center relative">
                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full bg-circuit-pattern animate-pulse"></div>
                </div>

                <div className="relative z-10">
                  <div className="text-5xl mb-3 animate-bounce">📄</div>
                  <p className="text-cyan-300 font-mono text-sm mb-2">
                    {selectedFile ? `📎 ${selectedFile.name}` : 'DROP FILE HERE OR CLICK TO BROWSE'}
                  </p>
                  <p className="text-purple-400/70 text-xs font-mono">
                    SUPPORTS: PDF • DOCX • TXT (MAX 5MB)
                  </p>

                  {/* Upload progress indicator */}
                  {selectedFile && (
                    <div className="mt-3 w-full bg-slate-800 rounded-full h-2">
                      <div className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              </div>
              <input
                id={`file-input-${title}`}
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}