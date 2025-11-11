'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAppStore } from '../lib/stores/app-store';
import { analyzeResume } from './actions/analyze';
import { AppShell } from '../app/components/app-shell';
import { InputPanel } from '../app/components/input-panel';
import { AnalyzeButton } from '../app/components/analyze-button';
import { ProgressLoader } from '../app/components/progress-loader';

export default function Home() {
  const router = useRouter();
  const {
    jobDescription,
    resume,
    setJobDescription,
    setResume,
    setAnalysis,
    setIsAnalyzing,
    isAnalyzing,
  } = useAppStore();

  const [jobDescriptionFile, setJobDescriptionFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleAnalyze = async () => {
    if ((!jobDescription.trim() && !jobDescriptionFile) || (!resume.trim() && !resumeFile)) {
      alert('Please provide both job description and resume');
      return;
    }

    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      if (jobDescriptionFile) {
        formData.append('jobDescription', jobDescriptionFile);
      } else {
        formData.append('jobDescription', jobDescription);
      }

      if (resumeFile) {
        formData.append('resume', resumeFile);
      } else {
        formData.append('resume', resume);
      }

      const analysis = await analyzeResume(formData);
      setAnalysis(analysis);
      router.push('/results');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4 glow">
            ScanFit: AI-Powered Job & Resume Matcher
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Upload or paste your job description and resume. Our AI will analyze the match,
            highlight strengths and weaknesses, and provide actionable suggestions to boost your chances.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <InputPanel
            title="Job Description"
            value={jobDescription}
            onChange={setJobDescription}
            onFileChange={setJobDescriptionFile}
            placeholder="Paste the job description here, or upload a PDF/DOCX file..."
          />
          <InputPanel
            title="Resume"
            value={resume}
            onChange={setResume}
            onFileChange={setResumeFile}
            placeholder="Paste your resume text here, or upload a PDF/DOCX/TXT file..."
          />
        </div>

        <AnalyzeButton
          onClick={handleAnalyze}
          disabled={!jobDescription.trim() || !resume.trim()}
          isAnalyzing={isAnalyzing}
        />
      </div>

      <ProgressLoader isVisible={isAnalyzing} />
    </AppShell>
  );
}
