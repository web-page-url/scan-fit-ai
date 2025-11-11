import { create } from 'zustand';
import { AppState } from '../types';

export const useAppStore = create<AppState>((set) => ({
  jobDescription: '',
  resume: '',
  analysis: null,
  isAnalyzing: false,
  theme: 'dark',
  setJobDescription: (text: string) => set({ jobDescription: text }),
  setResume: (text: string) => set({ resume: text }),
  setAnalysis: (analysis) => set({ analysis }),
  setIsAnalyzing: (loading: boolean) => set({ isAnalyzing: loading }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
}));