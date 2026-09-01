import { createClient } from '@supabase/supabase-js';
import type { RecallQuestion } from '@/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const EDGE_FUNCTION_URL = `${supabaseUrl}/functions/v1/generate-recall`;

export async function generateRecallQuestions(material: string): Promise<{ questions: RecallQuestion[] } | { error: string }> {
  try {
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({ material }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      return { error: data?.error || `Request failed (${response.status}). Please try again.` };
    }

    const data = await response.json();
    if (!data.questions || !Array.isArray(data.questions) || data.questions.length === 0) {
      return { error: data.error || 'No questions were generated. Please try again.' };
    }
    return { questions: data.questions };
  } catch {
    return { error: 'Could not connect to the AI service. Please check your connection and try again.' };
  }
}
