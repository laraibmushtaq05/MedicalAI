import { useState } from 'react';
import {
  Eye,
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  Loader2,
  AlertCircle,
  ChevronLeft,
  Lightbulb,
} from 'lucide-react';
import type { RecallQuestion, QuestionResult } from '@/types';

interface SessionPageProps {
  questions: RecallQuestion[];
  topic: string;
  onComplete: (results: QuestionResult[]) => void;
  onBack: () => void;
}

const TYPE_LABELS: Record<string, string> = {
  'short-answer': 'Short Answer',
  'mechanism': 'Explain the Mechanism',
  'compare': 'Compare / Differentiate',
  'clinical': 'Clinical Application',
};

const TYPE_COLORS: Record<string, string> = {
  'short-answer': 'bg-blue-50 text-blue-700 border-blue-100',
  'mechanism': 'bg-purple-50 text-purple-700 border-purple-100',
  'compare': 'bg-teal-50 text-teal-700 border-teal-100',
  'clinical': 'bg-orange-50 text-orange-700 border-orange-100',
};

export default function SessionPage({ questions, topic, onComplete, onBack }: SessionPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>(() => questions.map(() => ''));
  const [revealed, setRevealed] = useState<boolean[]>(() => questions.map(() => false));
  const [statuses, setStatuses] = useState<('correct' | 'revision' | 'unanswered')[]>(
    () => questions.map(() => 'unanswered')
  );

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  function handleAnswerChange(value: string) {
    const next = [...userAnswers];
    next[currentIndex] = value;
    setUserAnswers(next);
  }

  function handleReveal() {
    const next = [...revealed];
    next[currentIndex] = true;
    setRevealed(next);
  }

  function handleMarkStatus(status: 'correct' | 'revision') {
    const next = [...statuses];
    next[currentIndex] = status;
    setStatuses(next);

    if (isLast) {
      const results: QuestionResult[] = questions.map((q, i) => ({
        question: q,
        userAnswer: userAnswers[i],
        status: i === currentIndex ? status : statuses[i],
      }));
      onComplete(results);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function handlePrevious() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  const currentRevealed = revealed[currentIndex];
  const currentStatus = statuses[currentIndex];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          New Session
        </button>
        <span className="text-sm font-medium text-gray-500">
          Question {currentIndex + 1} of {questions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-gray-100 overflow-hidden mb-8">
        <div
          className="h-full bg-brand-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question card */}
      <div key={currentIndex} className="card p-6 sm:p-8 animate-fade-in-up">
        {/* Type badge */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
              TYPE_COLORS[question.type] || TYPE_COLORS['short-answer']
            }`}
          >
            <Lightbulb className="w-3 h-3 mr-1" />
            {TYPE_LABELS[question.type] || 'Short Answer'}
          </span>
        </div>

        {/* Question */}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-snug mb-5 font-serif">
          {question.question}
        </h2>

        {/* Answer textarea */}
        <label className="text-sm font-medium text-gray-600 mb-2 block">
          Your answer
        </label>
        <textarea
          value={userAnswers[currentIndex]}
          onChange={(e) => handleAnswerChange(e.target.value)}
          placeholder="Write your answer here..."
          className="input-field min-h-[120px] resize-y leading-relaxed"
          disabled={currentRevealed}
        />

        {/* Reveal button */}
        {!currentRevealed && (
          <button
            onClick={handleReveal}
            className="btn-secondary w-full mt-4"
          >
            <Eye className="w-5 h-5" />
            Reveal Answer
          </button>
        )}

        {/* Model answer */}
        {currentRevealed && (
          <div className="mt-4 animate-fade-in">
            <div className="rounded-xl bg-brand-50 border border-brand-100 p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600" />
                <h3 className="text-sm font-semibold text-brand-800">Model Answer</h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {question.answer}
              </p>
            </div>
          </div>
        )}

        {/* Rating buttons */}
        {currentRevealed && (
          <div className="grid grid-cols-2 gap-3 mt-5 animate-fade-in-up">
            <button
              onClick={() => handleMarkStatus('revision')}
              className="btn-warning"
            >
              <RotateCcw className="w-5 h-5" />
              Need Revision
            </button>
            <button
              onClick={() => handleMarkStatus('correct')}
              className="btn-success"
            >
              <CheckCircle2 className="w-5 h-5" />
              I Got It
            </button>
          </div>
        )}

        {/* Previous button */}
        {currentIndex > 0 && !currentRevealed && (
          <button
            onClick={handlePrevious}
            className="text-sm text-gray-400 hover:text-gray-600 mt-4 transition-colors flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous question
          </button>
        )}
      </div>

      {/* Question dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === currentIndex
                ? 'bg-brand-600 w-6'
                : statuses[i] === 'correct'
                ? 'bg-emerald-400'
                : statuses[i] === 'revision'
                ? 'bg-amber-400'
                : 'bg-gray-200'
            }`}
            aria-label={`Go to question ${i + 1}`}
          />
        ))}
      </div>

      {/* Topic indicator */}
      <p className="text-center text-xs text-gray-400 mt-4 truncate max-w-full">
        Topic: {topic}
      </p>
    </div>
  );
}
