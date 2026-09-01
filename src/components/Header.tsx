import { BrainCircuit, Info } from 'lucide-react';
import type { Page } from '@/types';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center shadow-sm group-hover:bg-brand-700 transition-colors">
            <BrainCircuit className="w-5 h-5 text-white" strokeWidth={2.2} />
          </div>
          <div className="text-left">
            <h1 className="text-base font-bold text-gray-900 leading-none tracking-tight">MedRecall AI</h1>
            <p className="text-[11px] text-gray-500 leading-none mt-0.5">Active Recall for MBBS</p>
          </div>
        </button>

        <nav className="flex items-center gap-1">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              currentPage === 'home' || currentPage === 'session' || currentPage === 'results'
                ? 'text-brand-700 bg-brand-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Study
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              currentPage === 'about'
                ? 'text-brand-700 bg-brand-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Info className="w-4 h-4" />
            About
          </button>
        </nav>
      </div>
    </header>
  );
}
