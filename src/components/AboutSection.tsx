import { BrainCircuit, ShieldCheck, GraduationCap, Sparkles, ChevronLeft } from 'lucide-react';

interface AboutSectionProps {
  onBack: () => void;
}

export default function AboutSection({ onBack }: AboutSectionProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Study
      </button>

      <div className="card p-6 sm:p-8 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center shadow-sm">
            <BrainCircuit className="w-6 h-6 text-white" strokeWidth={2.2} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">About MedRecall AI</h2>
            <p className="text-sm text-gray-500">A student-built study tool</p>
          </div>
        </div>

        <div className="space-y-5 text-gray-700 leading-relaxed">
          <p>
            MedRecall AI is a study tool built by an MBBS student, for MBBS students. It addresses a
            real problem: medical students have a massive volume of study material and often struggle
            with <strong>active recall</strong> — the practice of retrieving information from memory,
            which is one of the most effective evidence-based study techniques.
          </p>

          <p>
            Instead of passively re-reading notes, you paste your material and get a short, focused
            revision session with exam-style questions. You write your own answer, reveal the model
            answer, and mark whether you got it or need revision. At the end, you see a summary of
            what to review next.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
            <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center mb-3">
              <GraduationCap className="w-5 h-5 text-brand-700" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">For MBBS Students</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Questions are tailored to preclinical and basic medical sciences.
            </p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
            <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5 text-accent-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">AI-Powered</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Generates questions from your own notes, not a generic question bank.
            </p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Study Tool Only</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Not for diagnosis or treatment advice. For exam revision only.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-100">
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>Disclaimer:</strong> MedRecall AI is a study aid for medical students. It does not
            provide medical diagnosis or treatment advice. Always consult clinical guidelines and
            qualified medical professionals for patient care decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
