'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAppStore } from '../lib/stores/app-store';
import { analyzeResume } from './actions/analyze';
import { AppShell } from '../app/components/app-shell';
import { InputPanel } from '../app/components/input-panel';
import { AnalyzeButton } from '../app/components/analyze-button';
import { ProgressLoader } from '../app/components/progress-loader';
import LightRays from '../app/components/light-rays';

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
        <div className="text-center mb-12 relative">
          {/* WebGL Background Effects */}
          <div className="absolute inset-0 z-0">
            <LightRays
              raysOrigin="top-center"
              raysColor="#00ffff"
              raysSpeed={1.5}
              lightSpread={0.8}
              rayLength={1.2}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0.1}
              distortion={0.05}
              className="opacity-60"
            />
          </div>

          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold font-mono mb-6 tracking-wider">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                SCAN
              </span>
              <span className="text-cyan-300">FIT</span>
            </h1>

            <p className="text-xl text-cyan-100 max-w-3xl mx-auto leading-relaxed font-mono">
              <span className="text-purple-300">AI-POWERED</span> JOB & RESUME MATCHER
            </p>

            <p className="text-base text-slate-300 max-w-2xl mx-auto mt-4 leading-relaxed">
              Upload or paste your job description and resume. Our advanced AI will analyze compatibility,
              highlight strengths and weaknesses, and provide actionable suggestions to boost your job application success.
            </p>

            {/* Decorative elements */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-cyan-400"></div>
              <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-purple-400"></div>
            </div>
          </div>
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
          disabled={(!jobDescription.trim() && !jobDescriptionFile) || (!resume.trim() && !resumeFile)}
          isAnalyzing={isAnalyzing}
        />
      </div>

      <ProgressLoader isVisible={isAnalyzing} />
    </AppShell>
  );
}
