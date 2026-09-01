export type QuestionType = 'short-answer' | 'mechanism' | 'compare' | 'clinical';

export interface RecallQuestion {
  question: string;
  answer: string;
  type: string;
}

export interface QuestionResult {
  question: RecallQuestion;
  userAnswer: string;
  status: 'correct' | 'revision' | 'unanswered';
}

export type Page = 'home' | 'session' | 'results' | 'about';
