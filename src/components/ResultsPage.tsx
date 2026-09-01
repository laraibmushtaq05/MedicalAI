import { CheckCircle2, RotateCcw, Sparkles, BookOpen, TrendingUp } from 'lucide-react';
import type { QuestionResult } from '@/types';

interface ResultsPageProps {
  results: QuestionResult[];
  topic: string;
  onNewSession: () => void;
}

const TYPE_LABELS: Record<string, string> = {
  'short-answer': 'Short Answer',
  'mechanism': 'Mechanism',
  'compare': 'Compare',
  'clinical': 'Clinical',
};

export default function ResultsPage({ results, topic, onNewSession }: ResultsPageProps) {
  const correctCount = results.filter((r) => r.status === 'correct').length;
  const revisionCount = results.filter((r) => r.status === 'revision').length;
  const totalCount = results.length;
  const score = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

  const revisionItems = results.filter((r) => r.status === 'revision');

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Score card */}
      <div className="card p-6 sm:p-8 text-center animate-fade-in-up mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-medium mb-4 border border-brand-100">
          <TrendingUp className="w-3.5 h-3.5" />
          Session Complete
        </div>
        <div className="text-5xl font-bold text-gray-900 mb-1">{score}%</div>
        <p className="text-sm text-gray-500 mb-6">
          You got {correctCount} of {totalCount} questions right
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
          <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">
            <div className="flex items-center justify-center mb-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-emerald-700">{correctCount}</div>
            <div className="text-xs text-emerald-600 font-medium">Got It</div>
          </div>
          <div className="rounded-xl bg-amber-50 border border-amber-100 p-4">
            <div className="flex items-center justify-center mb-1">
              <RotateCcw className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-2xl font-bold text-amber-700">{revisionCount}</div>
            <div className="text-xs text-amber-600 font-medium">Need Revision</div>
          </div>
        </div>
      </div>

      {/* Revision summary */}
      {revisionItems.length > 0 && (
        <div className="card p-6 sm:p-7 animate-fade-in-up mb-6" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-semibold text-gray-900">Needs Revision</h2>
            <span className="text-xs text-gray-400 ml-auto">{revisionItems.length} questions</span>
          </div>
          <div className="space-y-3">
            {revisionItems.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-amber-100 bg-amber-50/50 p-4 animate-fade-in-up"
                style={{ animationDelay: `${0.1 + i * 0.05}s` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-100 text-amber-700 mb-1.5">
                      {TYPE_LABELS[item.question.type] || 'Short Answer'}
                    </span>
                    <p className="text-sm font-medium text-gray-900 mb-2 leading-snug">
                      {item.question.question}
                    </p>
                    <div className="rounded-lg bg-white border border-amber-100 p-3">
                      <p className="text-xs text-gray-600 leading-relaxed">
                        <span className="font-semibold text-gray-700">Answer: </span>
                        {item.question.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mastered summary */}
      {correctCount > 0 && (
        <div className="card p-6 sm:p-7 animate-fade-in-up mb-6" style={{ animationDelay: '0.15s' }}>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-semibold text-gray-900">Mastered</h2>
            <span className="text-xs text-gray-400 ml-auto">{correctCount} questions</span>
          </div>
          <div className="space-y-2">
            {results.filter((r) => r.status === 'correct').map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50/40 border border-emerald-50"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 leading-snug">{item.question.question}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New session button */}
      <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <button onClick={onNewSession} className="btn-primary text-base">
          <Sparkles className="w-5 h-5" />
          Generate New Session
        </button>
      </div>
    </div>
  );
}
