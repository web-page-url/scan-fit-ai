'use client';

import { useRouter } from 'next/navigation';
import { useAppStore } from '../../lib/stores/app-store';
import { AppShell } from '../../app/components/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '../../app/components/ui/card';
import { Button } from '../../app/components/ui/button';
import { exportResume } from '../actions/analyze';

export default function Results() {
  const router = useRouter();
  const { analysis, resume } = useAppStore();

  if (!analysis) {
    router.push('/');
    return null;
  }

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'High': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-red-400';
      default: return 'text-foreground';
    }
  };

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-4">Analysis Results</h1>
          <p className="text-foreground/80">{analysis.summary}</p>
        </div>

        {/* Match Score */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Overall Match Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${analysis.match_score}, 100`}
                    className="text-primary/20"
                  />
                  <path
                    d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${analysis.match_score}, 100`}
                    className="text-primary glow"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">{analysis.match_score}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Strengths */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green-400">✅ Strengths</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Missing Keywords */}
          <Card>
            <CardHeader>
              <CardTitle className="text-red-400">❌ Missing Keywords</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.missing_keywords.map((keyword, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>{keyword}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* ATS Recommendations */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>🔧 ATS Optimization Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysis.ats_recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                  <span className={`text-sm font-medium ${getConfidenceColor(rec.confidence)}`}>
                    {rec.confidence}
                  </span>
                  <span>{rec.text}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rewrite Suggestions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>✏️ Resume Rewrite Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysis.rewrite_suggestions.map((suggestion, index) => (
                <div key={index} className="p-3 bg-background/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${getConfidenceColor(suggestion.confidence)}`}>
                      {suggestion.confidence} Priority
                    </span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">Accept</Button>
                      <Button size="sm" variant="ghost">Reject</Button>
                    </div>
                  </div>
                  <p>{suggestion.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Priority Actions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>🎯 Top Priority Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2">
              {analysis.priority_actions.map((action, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="bg-primary text-background rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span>{action}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Button onClick={() => router.push('/')}>Analyze Another</Button>
          <Button
            variant="secondary"
            onClick={async () => {
              const formData = new FormData();
              formData.append('resume', resume);
              const result = await exportResume(formData);
              // For now, just show placeholder
              alert('Export functionality would download the file here');
            }}
          >
            Export as PDF
          </Button>
          <Button
            variant="secondary"
            onClick={async () => {
              const formData = new FormData();
              formData.append('resume', resume);
              const result = await exportResume(formData);
              // For now, just show placeholder
              alert('Export functionality would download the file here');
            }}
          >
            Export as DOCX
          </Button>
        </div>
      </div>
    </AppShell>
  );
}