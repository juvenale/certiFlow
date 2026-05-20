export type ViewId = "dashboard" | "courses" | "confusions" | "quiz" | "pbq" | "flashcards" | "ports" | "exam" | "errors" | "plan" | "assistant" | "search" | "settings";
export type ExamCorrectionMode = "end" | "instant";
export type ExamConfidence = "low" | "medium" | "high";
export type FlashcardDeckType = "technical" | "acronyms" | "ports" | "commands";
export type AppTheme = "certiflow-classic" | "soc-night" | "exam-focus" | "threat-lab" | "midnight" | "warm-focus" | "forest-ops" | "arctic";

export type UnifiedFlashcard = {
  id: string;
  term: string;
  definition: string;
  details: string;
  domain: string;
  themeTitle: string;
  source: string;
};

export type ExamSetup = {
  title: string;
  questions: ExamQuestion[];
};

export type ExamQuestion = {
  id: string;
  examId: string;
  examTitle: string;
  questionNumber: number;
  question: string;
  choices: string[];
  answer: number;
  answers?: number[];
  multipleAnswer?: boolean;
  explanation: string;
  source: string;
};

export type ActiveExam = ExamSetup & {
  correctionMode: ExamCorrectionMode;
};

export type ExamQuestionWithType = ExamQuestion & { type?: string };

export type ErrorEntry = {
  questionId: string;
  question: string;
  chosen: string;
  answer: string;
  domain: string;
  concept: string;
  count: number;
  status: "à revoir" | "compris" | "maîtrisé";
  last: string;
};

export type ExamSessionData = {
  activeExam: ActiveExam;
  examIndex: number;
  examAnswers: Record<string, number[]>;
  examFinished: boolean;
  examElapsedSeconds: number;
  examFlags: Record<string, boolean>;
  examConfidence: Record<string, ExamConfidence>;
  correctionMode: ExamCorrectionMode;
};