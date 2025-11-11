export interface AIAnalysisResponse {
  match_score: number;
  missing_keywords: string[];
  strengths: string[];
  ats_recommendations: Array<{
    text: string;
    confidence: 'High' | 'Medium' | 'Low';
  }>;
  rewrite_suggestions: Array<{
    text: string;
    confidence: 'High' | 'Medium' | 'Low';
  }>;
  priority_actions: string[];
  summary: string;
}

export interface AppState {
  jobDescription: string;
  resume: string;
  analysis: AIAnalysisResponse | null;
  isAnalyzing: boolean;
  theme: 'dark' | 'light';
  setJobDescription: (text: string) => void;
  setResume: (text: string) => void;
  setAnalysis: (analysis: AIAnalysisResponse | null) => void;
  setIsAnalyzing: (loading: boolean) => void;
  toggleTheme: () => void;
}