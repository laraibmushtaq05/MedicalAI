import { useState } from 'react';
import Header from '@/components/Header';
import HomePage from '@/components/HomePage';
import SessionPage from '@/components/SessionPage';
import ResultsPage from '@/components/ResultsPage';
import AboutSection from '@/components/AboutSection';
import type { Page, RecallQuestion, QuestionResult } from '@/types';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [questions, setQuestions] = useState<RecallQuestion[]>([]);
  const [topic, setTopic] = useState('');
  const [results, setResults] = useState<QuestionResult[]>([]);

  function handleQuestionsGenerated(qs: RecallQuestion[], t: string) {
    setQuestions(qs);
    setTopic(t);
    setPage('session');
  }

  function handleSessionComplete(r: QuestionResult[]) {
    setResults(r);
    setPage('results');
  }

  function handleNewSession() {
    setQuestions([]);
    setResults([]);
    setTopic('');
    setPage('home');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header currentPage={page} onNavigate={setPage} />

      <main className="flex-1">
        {page === 'home' && <HomePage onQuestionsGenerated={handleQuestionsGenerated} />}
        {page === 'session' && (
          <SessionPage
            questions={questions}
            topic={topic}
            onComplete={handleSessionComplete}
            onBack={handleNewSession}
          />
        )}
        {page === 'results' && (
          <ResultsPage results={results} topic={topic} onNewSession={handleNewSession} />
        )}
        {page === 'about' && <AboutSection onBack={() => setPage('home')} />}
      </main>

      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            MedRecall AI — Active recall for MBBS students
          </p>
          <p className="text-xs text-gray-400">
            Study tool only · Not for clinical use
          </p>
        </div>
      </footer>
    </div>
  );
}
