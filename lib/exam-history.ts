export interface ExamResult {
  id: string;
  examTitle: string;
  date: string;
  totalQuestions: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  score: number;
  timeSeconds: number;
  flagged: number;
  confidenceLow: number;
  confidenceMedium: number;
  confidenceHigh: number;
}

const STORAGE_KEY = "certiflow-exam-history";

export function getExamHistory(): ExamResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveExamResult(result: ExamResult): void {
  if (typeof window === "undefined") return;
  try {
    const history = getExamHistory();
    history.unshift(result);
    // Keep last 50 exams
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 50)));
  } catch {}
}

export function clearExamHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
