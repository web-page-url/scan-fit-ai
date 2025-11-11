'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';

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
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="flex gap-2">
          <Button
            variant={inputMode === 'text' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setInputMode('text')}
          >
            Text Input
          </Button>
          <Button
            variant={inputMode === 'file' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setInputMode('file')}
          >
            Upload File
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {inputMode === 'text' ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-64 p-3 bg-background border border-primary/30 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        ) : (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            className={`w-full h-64 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
              isDragging
                ? 'border-primary bg-primary/10'
                : 'border-primary/30 hover:border-primary/50'
            }`}
            onClick={() => document.getElementById(`file-input-${title}`)?.click()}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">📄</div>
              <p className="text-foreground/70">
                {selectedFile ? `Selected: ${selectedFile.name}` : 'Drop your file here or click to browse'}
              </p>
              <p className="text-sm text-foreground/50 mt-1">
                Supports PDF, DOCX, TXT (max 5MB)
              </p>
            </div>
            <input
              id={`file-input-${title}`}
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}