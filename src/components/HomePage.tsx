import { useState } from 'react';
import { Sparkles, Loader2, FileText, BookOpen, AlertCircle, ChevronRight } from 'lucide-react';
import { generateRecallQuestions } from '@/lib/supabase';
import type { RecallQuestion } from '@/types';

interface HomePageProps {
  onQuestionsGenerated: (questions: RecallQuestion[], topic: string) => void;
}

const EXAMPLES = [
  'Parkinson disease is associated with degeneration of dopaminergic neurons in the substantia nigra pars compacta...',
  'The nephron filters blood through the glomerulus, where filtration occurs based on size and charge selectivity...',
  'Beta-1 adrenergic receptors increase heart rate and contractility via Gs protein and cAMP pathway...',
];

export default function HomePage({ onQuestionsGenerated }: HomePageProps) {
  const [material, setMaterial] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    if (material.trim().length < 10) {
      setError('Please enter at least a sentence of study material or a topic.');
      return;
    }
    setError(null);
    setLoading(true);
    const result = await generateRecallQuestions(material.trim());
    setLoading(false);
    if ('error' in result) {
      setError(result.error);
    } else {
      onQuestionsGenerated(result.questions, material.trim().slice(0, 80));
    }
  }

  function handleExample(example: string) {
    setMaterial(example);
    setError(null);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && !loading) {
      handleGenerate();
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Hero */}
      <div className="text-center mb-10 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-medium mb-5 border border-brand-100">
          <Sparkles className="w-3.5 h-3.5" />
          AI-Powered Active Recall
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-3">
          Turn your study material into<br className="hidden sm:block" /> active-recall revision sessions
        </h2>
        <p className="text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
          Paste your notes or enter a medical topic. Get 5–10 exam-style questions, one at a time,
          with model answers to check yourself.
        </p>
      </div>

      {/* Input card */}
      <div className="card p-5 sm:p-7 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <label htmlFor="material" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <FileText className="w-4 h-4 text-brand-600" />
          Your study material or topic
        </label>
        <textarea
          id="material"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste your notes here, or enter a medical topic (e.g., 'Renal physiology — glomerular filtration, tubular reabsorption, RAAS system')..."
          className="input-field min-h-[160px] resize-y leading-relaxed"
          disabled={loading}
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-400">{material.length} characters</span>
          <span className="text-xs text-gray-400">⌘+Enter to generate</span>
        </div>

        {error && (
          <div className="flex items-start gap-2.5 mt-4 p-3 rounded-lg bg-red-50 border border-red-100 animate-fade-in">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={loading || material.trim().length < 10}
          className="btn-primary w-full mt-5 text-base"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Recall Session...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Recall Session
            </>
          )}
        </button>
      </div>

      {/* Examples */}
      <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-gray-400" />
          <p className="text-sm font-medium text-gray-500">Try an example:</p>
        </div>
        <div className="space-y-2">
          {EXAMPLES.map((ex, i) => (
            <button
              key={i}
              onClick={() => handleExample(ex)}
              className="w-full text-left p-3.5 rounded-xl bg-white border border-gray-200 hover:border-brand-300 hover:bg-brand-50/30 transition-all group"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-gray-600 group-hover:text-gray-900 line-clamp-2">{ex}</p>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-brand-500 flex-shrink-0 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        {[
          { step: '1', title: 'Paste material', desc: 'Enter your notes or a topic' },
          { step: '2', title: 'Answer questions', desc: 'Write your answer, then reveal' },
          { step: '3', title: 'Review summary', desc: 'See what needs revision' },
        ].map((item) => (
          <div key={item.step} className="text-center p-4">
            <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center mx-auto mb-2.5">
              {item.step}
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h3>
            <p className="text-xs text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
