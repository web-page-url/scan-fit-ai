'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIAnalysisResponse } from '../../lib/types';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

async function parseFile(file: File): Promise<string> {
  const fileType = file.type;

  if (fileType === 'text/plain') {
    return await file.text();
  }

  if (fileType === 'application/pdf') {
    const arrayBuffer = await file.arrayBuffer();
    const data = await pdfParse(Buffer.from(arrayBuffer));
    return data.text;
  }

  if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  }

  throw new Error('Unsupported file type. Please upload PDF, DOCX, or TXT files.');
}

function validateFile(file: File): void {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = [
    'text/plain',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (file.size > maxSize) {
    throw new Error('File size must be less than 5MB');
  }

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Only PDF, DOCX, and TXT files are supported');
  }
}

export async function exportResume(formData: FormData): Promise<{ pdfUrl: string; docxUrl: string }> {
  const resumeText = formData.get('resume') as string;

  // For now, return placeholder URLs - in production, you'd generate actual files
  // and return download URLs or stream the files
  return {
    pdfUrl: '#',
    docxUrl: '#'
  };
}

export async function analyzeResume(formData: FormData): Promise<AIAnalysisResponse> {
  const jobDescriptionInput = formData.get('jobDescription') as string | File;
  const resumeInput = formData.get('resume') as string | File;

  let jobDescription: string;
  let resume: string;

  // Parse job description
  if (jobDescriptionInput instanceof File) {
    validateFile(jobDescriptionInput);
    jobDescription = await parseFile(jobDescriptionInput);
  } else {
    jobDescription = jobDescriptionInput || '';
  }

  // Parse resume
  if (resumeInput instanceof File) {
    validateFile(resumeInput);
    resume = await parseFile(resumeInput);
  } else {
    resume = resumeInput || '';
  }

  if (!jobDescription.trim() || !resume.trim()) {
    throw new Error('Both job description and resume are required');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `You are an expert resume analyst for ScanFit, an AI-powered job matching platform. Your task is to analyze a resume against a job description and provide detailed, actionable insights.

JOB DESCRIPTION:
${jobDescription}

RESUME:
${resume}

Please analyze the match between this resume and job description. Provide your response as valid JSON with the following exact structure:

{
  "match_score": number (0-100, representing overall fit percentage),
  "missing_keywords": ["keyword1", "keyword2", ...] (key skills/terms from job description not found in resume),
  "strengths": ["strength1", "strength2", ...] (matching skills/experiences found in resume),
  "ats_recommendations": [
    {"text": "recommendation text", "confidence": "High|Medium|Low"},
    {"text": "another recommendation", "confidence": "High|Medium|Low"}
  ] (ATS optimization suggestions with confidence levels),
  "rewrite_suggestions": [
    {"text": "suggested rewrite for resume section", "confidence": "High|Medium|Low"},
    {"text": "another suggestion", "confidence": "High|Medium|Low"}
  ] (specific resume improvement suggestions),
  "priority_actions": ["action1", "action2", ...] (top 5 ranked improvement steps by impact),
  "summary": "A natural language overview of the analysis (2-3 sentences)"
}

Guidelines:
- Be specific and actionable in recommendations
- Focus on ATS compatibility, keyword matching, and resume formatting
- Confidence levels: High (critical issues), Medium (helpful improvements), Low (nice-to-have)
- Ensure all arrays contain relevant, non-generic items
- Keep suggestions concise but detailed enough to be useful`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean the response (remove markdown code blocks if present)
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();

    const analysis = JSON.parse(cleanedText) as AIAnalysisResponse;

    // Basic validation
    if (typeof analysis.match_score !== 'number' || analysis.match_score < 0 || analysis.match_score > 100) {
      throw new Error('Invalid match score');
    }

    return analysis;
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to analyze resume. Please try again.');
  }
}