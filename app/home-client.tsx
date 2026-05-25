"use client";

import PBQBrowser from "./pbq-browser";
import { Dashboard } from "./dashboard";
import { PortsCommandsView } from "./ports-commands";
import { CoursesView } from "./courses-view";
import { ConfusionsView } from "./confusions-view";
import { ErrorsView } from "./errors-view";
import { AssistantView } from "./assistant-view";
import { ExamView } from "./exam-view";
import { ExamHistory } from "./exam-history-view";
import { QuizView } from "./quiz-view";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  BookOpen,
  Moon,
  Bot,
  Brain,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Command,
  FileQuestion,
  GraduationCap,
  LayoutDashboard,
  RotateCcw,
  Search,
  Sun,
  Timer,
  XCircle
} from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { collectCertiflowStorage, getSupabaseClient, restoreCertiflowStorage } from "@/lib/supabase";
import { domains, examDate, flashcards, lessons, pbqItems, questions } from "@/data/certiflow";
import { messerExams, messerQuestions } from "@/data/messer-exams";
import { jajaQuestions, jajaExam } from "@/data/jaja-exam";
import { ninetyExams, ninetyQuestions } from "@/data/ninety-exams";
// ninetyExams and ninetyQuestions are pre-computed in data/ninety-exams.ts
import { studyItems, studyThemes, type StudyItem } from "@/data/study-content";
import { acronymFlashcards } from "@/data/acronym-flashcards";
import { portFlashcards } from "@/data/port-flashcards";
import { confusionItems, confusionSections } from "@/data/confusions";
import { commandToolConfusions, commandToolScenarios, commandTools } from "@/data/command-tools";
import type { User } from "@supabase/supabase-js";

type ViewId = "dashboard" | "courses" | "confusions" | "quiz" | "pbq" | "flashcards" | "ports" | "exam" | "errors" | "plan" | "assistant" | "search" | "settings";
type ExamCorrectionMode = "end" | "instant";
type ExamConfidence = "low" | "medium" | "high";
type FlashcardDeckType = "technical" | "acronyms" | "ports" | "commands";
type AppTheme = "certiflow-classic" | "soc-night" | "exam-focus" | "threat-lab" | "midnight" | "warm-focus" | "forest-ops" | "arctic";
type UnifiedFlashcard = {
  id: string;
  term: string;
  definition: string;
  details: string;
  domain: string;
  themeTitle: string;
  source: string;
};

type ExamSetup = {
  title: string;
  questions: ExamQuestion[];
};

type ExamQuestion = {
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

type ActiveExam = ExamSetup & {
  correctionMode: ExamCorrectionMode;
};

type ExamQuestionWithType = ExamQuestion & { type?: string };

type ErrorEntry = {
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

const views: Array<{ id: ViewId; label: string; icon: React.ElementType }> = [
  { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { id: "courses", label: "Cours", icon: BookOpen },
  { id: "confusions", label: "Confusions", icon: Brain },
  { id: "quiz", label: "Quiz", icon: FileQuestion },
  { id: "pbq", label: "PBQ", icon: Brain },
  { id: "flashcards", label: "Flashcards", icon: RotateCcw },
  { id: "ports", label: "Ports & commandes", icon: Command },
  { id: "exam", label: "Examens blancs", icon: Timer },
  { id: "errors", label: "Journal d'erreurs", icon: ClipboardList },
  { id: "plan", label: "Plan de révision", icon: CalendarDays },
  { id: "assistant", label: "Assistant IA", icon: Bot },
  { id: "search", label: "Recherche", icon: Search },
  { id: "settings", label: "Parametres", icon: Moon }
];

const appThemes: Array<{ id: AppTheme; label: string; note: string; swatches: string[] }> = [
  { id: "certiflow-classic", label: "CertiFlow Classic", note: "Clair et professionnel",         swatches: ["#176B87", "#06B6D4", "#10B981"] },
  { id: "soc-night",         label: "SOC Night",         note: "Sombre — longues sessions",      swatches: ["#38BDF8", "#22C55E", "#08111F"] },
  { id: "exam-focus",        label: "Exam Focus",        note: "Minimal haute concentration",    swatches: ["#2563EB", "#7C3AED", "#F9FAFB"] },
  { id: "threat-lab",        label: "Threat Lab",        note: "Immersif PBQ et logs",           swatches: ["#0F766E", "#E11D48", "#101418"] },
  { id: "midnight",          label: "Midnight",          note: "Indigo sombre — style hacker",   swatches: ["#818CF8", "#C084FC", "#0D0F1E"] },
  { id: "warm-focus",        label: "Warm Focus",        note: "Crème chaud — révision longue",  swatches: ["#C2410C", "#D97706", "#FDF8F2"] },
  { id: "forest-ops",        label: "Forest Ops",        note: "Terminal vert — full immersif",  swatches: ["#34D399", "#60A5FA", "#091510"] },
  { id: "arctic",            label: "Arctic",            note: "Bleu glacé — ultra propre",      swatches: ["#0369A1", "#0891B2", "#EEF3F8"] },
];

const plan = [
  ["Jour 1", "Diagnostic initial, CIA Triad, AAA, Zero Trust, quiz domaine 1"],
  ["Jour 2", "Threats, social engineering, malware, vulnerability management"],
  ["Jour 3", "Architecture, segmentation, cloud, crypto, PKI, PBQ réseau"],
  ["Jour 4", "Security Operations, logs, SIEM/SOAR, incident response, commandes"],
  ["Jour 5", "Governance, risk, compliance, BCP/DRP, awareness"],
  ["Jour 6", "Examen blanc complet, correction détaillée, journal d'erreurs"],
  ["Jour 7", "Révision légère, flashcards, ports, pièges classiques, repos"]
];

function readNumberStorage(key: string) {
  if (typeof window === "undefined") return 0;
  return Number(localStorage.getItem(key) || 0);
}

function readErrorsStorage() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("certiflow-errors") || "[]") as ErrorEntry[];
}

function readThemeStorage() {
  if (typeof window === "undefined") return "certiflow-classic";
  return (localStorage.getItem("certiflow-theme") || "certiflow-classic") as AppTheme;
}

type ExamSessionData = {
  activeExam: ActiveExam;
  examIndex: number;
  examAnswers: Record<string, number[]>;
  examFinished: boolean;
  examElapsedSeconds: number;
  examFlags: Record<string, boolean>;
  examConfidence: Record<string, ExamConfidence>;
  correctionMode: ExamCorrectionMode;
};

function readExamSession(): ExamSessionData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("certiflow-exam-session");
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function readQuizIndex() {
  if (typeof window === "undefined") return 0;
  return Number(localStorage.getItem("certiflow-quiz-index") || 0);
}

function calculateDaysLeft() {
  const diff = new Date(examDate).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86400000));
}

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function isPBQExamQuestion(question: ExamQuestionWithType) {
  if (question.type === "pbq") return true;
  const haystack = [question.question, question.explanation, question.choices.join(" ")].join(" ").toLowerCase();
  return ["pbq", "performance-based", "drag", "drop", "configure", "place", "match", "simulation"].some((word) => haystack.includes(word));
}

function getExamCorrectAnswers(question: ExamQuestion) {
  return question.answers?.length ? question.answers : [question.answer];
}

function isMultipleAnswerExamQuestion(question: ExamQuestion) {
  return Boolean(question.multipleAnswer || getExamCorrectAnswers(question).length > 1);
}

function sameAnswerSet(selected: number[] | undefined, correctAnswers: number[]) {
  if (!selected || selected.length !== correctAnswers.length) return false;
  const left = [...selected].sort((a, b) => a - b);
  const right = [...correctAnswers].sort((a, b) => a - b);
  return left.every((answer, index) => answer === right[index]);
}

function formatExamAnswers(question: ExamQuestion, indexes: number[] | undefined) {
  if (!indexes?.length) return "Aucune réponse sélectionnée";
  return [...indexes]
    .sort((a, b) => a - b)
    .map((index) => `${String.fromCharCode(65 + index)}. ${question.choices[index] ?? ""}`)
    .join(" | ");
}

export function HomeClient() {
  const [view, setView] = useState<ViewId>("dashboard");
  const [appTheme, setAppTheme] = useState<AppTheme>(readThemeStorage);
  const [answered, setAnswered] = useState(() => readNumberStorage("certiflow-answered"));
  const [correct, setCorrect] = useState(() => readNumberStorage("certiflow-correct"));
  const [errors, setErrors] = useState<ErrorEntry[]>(readErrorsStorage);
  const [daysLeft] = useState(calculateDaysLeft);
  const [questionIndex, setQuestionIndex] = useState(() => readQuizIndex());
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [flashIndex, setFlashIndex] = useState(0);
  const [flashBack, setFlashBack] = useState(false);
  const [pbqAnswers, setPbqAnswers] = useState<Record<number, string>>({});
  const [pbqScore, setPbqScore] = useState<number | null>(null);
  const [assistantPrompt, setAssistantPrompt] = useState("");
  const [assistantAnswer, setAssistantAnswer] = useState("");
  const [examSetup, setExamSetup] = useState<ExamSetup | null>(null);
  const [activeExam, setActiveExam] = useState<ActiveExam | null>(() => readExamSession()?.activeExam ?? null);
  const [examCorrectionMode, setExamCorrectionMode] = useState<ExamCorrectionMode>(() => readExamSession()?.correctionMode ?? "end");
  const [examIndex, setExamIndex] = useState(() => readExamSession()?.examIndex ?? 0);
  const [examAnswers, setExamAnswers] = useState<Record<string, number[]>>(() => readExamSession()?.examAnswers ?? {});
  const [examFinished, setExamFinished] = useState(() => readExamSession()?.examFinished ?? false);
  const [examStartedAt, setExamStartedAt] = useState<number | null>(() => { const s = readExamSession(); return (s?.activeExam && !s.examFinished) ? Date.now() - (s.examElapsedSeconds ?? 0) * 1000 : null; });
  const [examElapsedSeconds, setExamElapsedSeconds] = useState(() => readExamSession()?.examElapsedSeconds ?? 0);
  const [examFlags, setExamFlags] = useState<Record<string, boolean>>(() => readExamSession()?.examFlags ?? {});
  const [examConfidence, setExamConfidence] = useState<Record<string, ExamConfidence>>(() => readExamSession()?.examConfidence ?? {});
  const [examHistoryOpen, setExamHistoryOpen] = useState(false);
  const [shuffledErrorPool, setShuffledErrorPool] = useState<typeof questions>([]);
  const [selectedDomain, setSelectedDomain] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("certiflow-domain") || "all" : "all"));
  const [selectedTheme, setSelectedTheme] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("certiflow-theme-filter") || "all" : "all"));
  const [globalSearch, setGlobalSearch] = useState("");
  const [flashcardDeck, setFlashcardDeck] = useState<FlashcardDeckType | null>(() => (typeof window !== "undefined" ? (localStorage.getItem("certiflow-flashcard-deck") as FlashcardDeckType | null) : null));
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [cloudBusy, setCloudBusy] = useState(false);
  const [cloudStatus, setCloudStatus] = useState("Connecte-toi pour synchroniser téléphone et PC.");
  const supabase = useMemo(() => getSupabaseClient(), []);

  useEffect(() => {
    document.documentElement.dataset.theme = appTheme;
    localStorage.setItem("certiflow-theme", appTheme);
  }, [appTheme]);

  useEffect(() => {
    if (!supabase) {
      setCloudStatus("Supabase n'est pas encore configuré sur ce déploiement.");
      return;
    }

    supabase.auth.getUser().then(({ data }) => {
      setAuthUser(data.user ?? null);
      if (data.user) setCloudStatus(`Connecté: ${data.user.email ?? "compte Supabase"}`);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user ?? null);
      setCloudStatus(session?.user ? `Connecté: ${session.user.email ?? "compte Supabase"}` : "Déconnecté.");
    });

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    localStorage.setItem("certiflow-answered", String(answered));
    localStorage.setItem("certiflow-correct", String(correct));
    localStorage.setItem("certiflow-errors", JSON.stringify(errors));
  }, [answered, correct, errors]);

  useEffect(() => {
    if (!activeExam || examFinished || !examStartedAt) return;
    const id = window.setInterval(() => {
      setExamElapsedSeconds(Math.floor((Date.now() - examStartedAt) / 1000));
    }, 1000);
    return () => window.clearInterval(id);
  }, [activeExam, examFinished, examStartedAt]);

  useEffect(() => {
    localStorage.setItem("certiflow-quiz-index", String(questionIndex));
  }, [questionIndex]);

  useEffect(() => {
    localStorage.setItem("certiflow-domain", selectedDomain);
    localStorage.setItem("certiflow-theme-filter", selectedTheme);
    if (flashcardDeck) localStorage.setItem("certiflow-flashcard-deck", flashcardDeck);
    else localStorage.removeItem("certiflow-flashcard-deck");
  }, [selectedDomain, selectedTheme, flashcardDeck]);

  useEffect(() => {
    if (activeExam) {
      localStorage.setItem("certiflow-exam-session", JSON.stringify({
        activeExam,
        examIndex,
        examAnswers,
        examFinished,
        examElapsedSeconds,
        examFlags,
        examConfidence,
        correctionMode: activeExam.correctionMode,
      }));
    } else {
      localStorage.removeItem("certiflow-exam-session");
    }
  }, [activeExam, examIndex, examAnswers, examFinished, examElapsedSeconds, examFlags, examConfidence]);

  
  // Study streak
  const studyStreak = (() => {
    let streak = 0;
    const today = new Date().toISOString().split("T")[0];
    let history = [];
    try { history = JSON.parse(localStorage.getItem("certiflow-quiz-history") || "[]"); } catch {}
    const dates = new Set(history.map((h: { date?: string }) => h.date?.slice(0, 10)));
    if (dates.has(today)) streak++;
    for (let i = 1; i <= 365; i++) {
      const d = new Date(); d.setDate(d.getDate() - i);
      if (dates.has(d.toISOString().split("T")[0])) streak++;
      else break;
    }
    if (streak === 0) {
      const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
      if (dates.has(yesterday.toISOString().split("T")[0])) streak = -1;
    }
    return streak;
  })();
const score = answered ? Math.round((correct / answered) * 100) : 0;
  const avgProgress = Math.round(domains.reduce((sum, domain) => sum + domain.progress, 0) / domains.length);
  const weakest = [...domains].sort((a, b) => a.progress - b.progress)[0];
  const selectedThemeData = studyThemes.find((theme) => theme.id === selectedTheme);
  const themeTerms = selectedThemeData?.items.map((item) => item.term.toLowerCase()) ?? [];
  const normalizedSearch = globalSearch.trim().toLowerCase();
  const filteredStudyItems = studyItems.filter((item) => {
    const domainMatch = selectedDomain === "all" || item.domain === selectedDomain;
    const themeMatch = selectedTheme === "all" || item.themeId === selectedTheme;
    const searchMatch = !normalizedSearch || [item.term, item.definition, item.details, item.themeTitle, item.domain].join(" ").toLowerCase().includes(normalizedSearch);
    return domainMatch && themeMatch && searchMatch;
  });
  const filteredThemes = studyThemes
    .map((theme) => ({ ...theme, items: filteredStudyItems.filter((item) => item.themeId === theme.id) }))
    .filter((theme) => theme.items.length > 0);
  const commandConfusionItems = commandToolConfusions.map((item) => ({
    id: item.id,
    sectionId: "command-tools",
    sectionTitle: item.sectionTitle,
    domain: item.domain,
    comparison: item.comparison,
    english: "Command/tool distinction",
    difference: item.difference,
    source: item.source
  }));
  const allConfusionItems = [...confusionItems, ...commandConfusionItems];
  const filteredConfusionItems = allConfusionItems.filter((item) => {
    const domainMatch = selectedDomain === "all" || item.domain === selectedDomain;
    const searchMatch = !normalizedSearch || [item.comparison, item.english, item.difference, item.sectionTitle, item.domain].join(" ").toLowerCase().includes(normalizedSearch);
    return domainMatch && searchMatch;
  });
  const allConfusionSections = [
    ...confusionSections,
    {
      id: "command-tools",
      number: 18,
      title: "Commandes et outils",
      domain: "Security Operations",
      items: commandConfusionItems
    }
  ];
  const filteredConfusionSections = allConfusionSections
    .map((section) => ({ ...section, items: filteredConfusionItems.filter((item) => item.sectionId === section.id) }))
    .filter((section) => section.items.length > 0);
  const filteredQuizQuestions = questions.filter((question) => {
    const haystack = [question.domain, question.question, question.choices.join(" "), question.explanation].join(" ").toLowerCase();
    const domainMatch = selectedDomain === "all" || question.domain === selectedDomain;
    const themeMatch = selectedTheme === "all" || themeTerms.some((term) => haystack.includes(term));
    const searchMatch = !normalizedSearch || haystack.includes(normalizedSearch);
    return domainMatch && themeMatch && searchMatch;
  });
  const effectiveQuizQuestions = filteredQuizQuestions.length ? filteredQuizQuestions : questions;
  const quizQuestions = shuffledErrorPool.length ? shuffledErrorPool : effectiveQuizQuestions;
  const currentQuestion = effectiveQuizQuestions[questionIndex % effectiveQuizQuestions.length];
  const currentQuestionChoices = currentQuestion.choices.slice(0, 4);
  const currentQuestionAnswer = Math.min(Math.max(currentQuestion.answer, 0), currentQuestionChoices.length - 1);
  const fallbackFlashcards: UnifiedFlashcard[] = flashcards.map((card) => ({
    id: `fallback-${card.term}`,
    themeId: "mvp",
    themeTitle: card.domain,
    domain: card.domain,
    term: card.term,
    definition: card.fr,
    details: card.definition,
    source: "flashcard cours local import" as const
  }));
  const technicalFlashcards: UnifiedFlashcard[] = (filteredStudyItems.length ? filteredStudyItems : fallbackFlashcards).map((item) => ({
    id: item.id,
    term: item.term,
    definition: item.definition,
    details: item.details,
    domain: item.domain,
    themeTitle: item.themeTitle,
    source: item.source
  }));
  const acronymDeck: UnifiedFlashcard[] = acronymFlashcards
    .filter((item) => {
      const domainMatch = selectedDomain === "all" || item.domain === selectedDomain;
      const searchMatch = !normalizedSearch || [item.acronym, item.english, item.explanation, item.details, item.themeTitle].join(" ").toLowerCase().includes(normalizedSearch);
      return domainMatch && searchMatch;
    })
    .map((item) => ({
      id: item.id,
      term: item.acronym,
      definition: item.english,
      details: `${item.explanation} ${item.details}`,
      domain: item.domain,
      themeTitle: item.themeTitle,
      source: item.source
    }));
  const portDeck: UnifiedFlashcard[] = portFlashcards
    .filter((item) => {
      const haystack = [item.port, item.protocol, item.english, item.details, item.secureAlternative].join(" ").toLowerCase();
      return !normalizedSearch || haystack.includes(normalizedSearch);
    })
    .map((item) => ({
      id: item.id,
      term: item.protocol,
      definition: `${item.port} | ${item.english}`,
      details: `${item.details} Alternative sécurisée: ${item.secureAlternative}`,
      domain: item.domain,
      themeTitle: "Ports et protocoles",
      source: item.source
    }));
  const commandDeck: UnifiedFlashcard[] = commandTools
    .filter((item) => {
      const haystack = [item.name, item.english, item.purpose, item.examTip].join(" ").toLowerCase();
      return !normalizedSearch || haystack.includes(normalizedSearch);
    })
    .map((item) => ({
      id: item.id,
      term: item.name,
      definition: item.english,
      details: `${item.purpose} À connaître: ${item.examTip}`,
      domain: item.domain,
      themeTitle: "Commandes et outils",
      source: item.source
    }));
  const effectiveFlashcards =
    flashcardDeck === "acronyms" ? acronymDeck :
    flashcardDeck === "ports" ? portDeck :
    flashcardDeck === "commands" ? commandDeck :
    technicalFlashcards;
  const currentFlashcard = effectiveFlashcards.length ? effectiveFlashcards[flashIndex % effectiveFlashcards.length] : technicalFlashcards[0];
  const activeView = views.find((item) => item.id === view) ?? views[0];
  const activeTheme = appThemes.find((item) => item.id === appTheme) ?? appThemes[0];
  const activeExamQuestion = activeExam?.questions[examIndex];
  const allExamSuites = [...(ninetyExams as any[]), ...messerExams];
  const allExamQuestions = [...(ninetyQuestions as ExamQuestion[]), ...messerQuestions];
  const examAnsweredCount = activeExam ? activeExam.questions.filter((question) => (examAnswers[question.id]?.length ?? 0) > 0).length : 0;
  const examCorrectCount = activeExam ? activeExam.questions.filter((question) => sameAnswerSet(examAnswers[question.id], getExamCorrectAnswers(question))).length : 0;
  const examFlaggedCount = activeExam ? activeExam.questions.filter((question) => examFlags[question.id]).length : 0;
  const examConfidenceSummary = activeExam ? activeExam.questions.reduce(
    (summary, question) => {
      const confidence = examConfidence[question.id];
      if (confidence) summary[confidence] += 1;
      return summary;
    },
    { low: 0, medium: 0, high: 0 } as Record<ExamConfidence, number>
  ) : { low: 0, medium: 0, high: 0 };
  const canShowExamCorrection = Boolean(activeExam && (examFinished || activeExam.correctionMode === "instant"));
  const filteredExamQuestions = allExamQuestions.filter((question) => {
    const haystack = [question.examTitle, question.question, question.choices.join(" "), question.explanation].join(" ").toLowerCase();
    return !normalizedSearch || haystack.includes(normalizedSearch);
  });
  const filteredCommandTools = commandTools.filter((item) => {
    const haystack = [item.name, item.english, item.purpose, item.examTip].join(" ").toLowerCase();
    return !normalizedSearch || haystack.includes(normalizedSearch);
  });
  const filteredCommandScenarios = commandToolScenarios.filter((item) => {
    const haystack = [item.scenario, item.likelyTool].join(" ").toLowerCase();
    return !normalizedSearch || haystack.includes(normalizedSearch);
  });
  const quickCourseResults = normalizedSearch ? studyItems.filter((item) => [item.term, item.definition, item.details, item.themeTitle].join(" ").toLowerCase().includes(normalizedSearch)).slice(0, 5) : [];
  const quickConfusionResults = normalizedSearch ? allConfusionItems.filter((item) => [item.comparison, item.english, item.difference, item.sectionTitle].join(" ").toLowerCase().includes(normalizedSearch)).slice(0, 5) : [];
  const quickCommandResults = normalizedSearch ? commandTools.filter((item) => [item.name, item.english, item.purpose, item.examTip].join(" ").toLowerCase().includes(normalizedSearch)).slice(0, 5) : [];
  const quickQuizResults = normalizedSearch ? questions.filter((question) => [question.question, question.choices.join(" "), question.explanation].join(" ").toLowerCase().includes(normalizedSearch)).slice(0, 5) : [];
  const quickExamResults = normalizedSearch ? allExamQuestions.filter((question) => [question.examTitle, question.question, question.choices.join(" "), question.explanation].join(" ").toLowerCase().includes(normalizedSearch)).slice(0, 5) : [];

  useEffect(() => {
    setFlashIndex(0);
    setQuestionIndex(0);
  }, [selectedDomain, selectedTheme, globalSearch]);

  function chooseAnswer(index: number) {
    if (selectedAnswer !== null) return;
    const isCorrect = index === currentQuestionAnswer;
    setSelectedAnswer(index);
    setAnswered((value) => value + 1);

    // Per-domain stat tracking (used by dashboard auto-update)
    try {
      const key = "certiflow-domain-stats";
      const ds: Record<string, { answered: number; correct: number }> =
        JSON.parse(localStorage.getItem(key) || "{}");
      const dom = currentQuestion.domain;
      ds[dom] = { answered: (ds[dom]?.answered ?? 0) + 1, correct: (ds[dom]?.correct ?? 0) + (isCorrect ? 1 : 0) };
      localStorage.setItem(key, JSON.stringify(ds));

      const historyKey = "certiflow-quiz-history";
      const history: Array<{ id: string; date: string; domain: string; correct: boolean; concept: string }> =
        JSON.parse(localStorage.getItem(historyKey) || "[]");
      history.push({
        id: currentQuestion.id,
        date: new Date().toISOString(),
        domain: currentQuestion.domain,
        correct: isCorrect,
        concept: `Question ${currentQuestion.questionNumber}`,
      });
      localStorage.setItem(historyKey, JSON.stringify(history.slice(-1000)));
    } catch {}

    if (isCorrect) {
      setCorrect((value) => value + 1);
      return;
    }

    setErrors((items) => {
      const found = items.find((item) => item.questionId === currentQuestion.id);
      if (found) {
        return items.map((item) =>
          item.questionId === currentQuestion.id
            ? { ...item, count: item.count + 1, status: "à revoir", last: new Date().toLocaleDateString("fr-FR") }
            : item
        );
      }

      return [
        ...items,
        {
          questionId: currentQuestion.id,
          question: currentQuestion.question,
          chosen: currentQuestionChoices[index] ?? "",
          answer: currentQuestionChoices[currentQuestionAnswer] ?? "",
          domain: currentQuestion.domain,
          concept: `Question ${currentQuestion.questionNumber}`,
          count: 1,
          status: "à revoir",
          last: new Date().toLocaleDateString("fr-FR")
        }
      ];
    });
  }

  function nextQuestion() {
    setSelectedAnswer(null);
    setQuestionIndex((value) => (value + 1) % effectiveQuizQuestions.length);
  }

  function startQuiz(mode: "quick" | "weak" | "errors") {
    setSelectedAnswer(null);
    if (mode === "weak") {
      const found = effectiveQuizQuestions.findIndex((question) => question.domain === weakest.name);
      setQuestionIndex(found >= 0 ? found : 0);
    } else if (mode === "errors" && errors.length) {
      const found = effectiveQuizQuestions.findIndex((question) => question.id === errors[0].questionId);
      setQuestionIndex(found >= 0 ? found : 0);
    } else {
      setQuestionIndex(Math.floor(Math.random() * effectiveQuizQuestions.length));
    }
    setView("quiz");
  }

  function gradePbq() {
    setPbqScore(pbqItems.reduce((sum, item, index) => sum + (pbqAnswers[index] === item.answer ? 1 : 0), 0));
  }

  function updateErrorStatus(questionId: string, status: ErrorEntry["status"]) {
    setErrors((prev) => prev.map((e) => e.questionId === questionId ? { ...e, status } : e));
  }

  function deleteError(questionId: string) {
    setErrors((prev) => prev.filter((e) => e.questionId !== questionId));
  }

  function askAssistant() {
    const prompt = assistantPrompt.toLowerCase();
    if (prompt.includes("siem") || prompt.includes("soar")) {
      setAssistantAnswer("SIEM (Security Information and Event Management) collecte et corrèle les logs. SOAR (Security Orchestration, Automation and Response) automatise la réponse avec des playbooks. Piège classique: SIEM alerte, SOAR orchestre.");
    } else if (prompt.includes("ids") || prompt.includes("ips")) {
      setAssistantAnswer("IDS (Intrusion Detection System) détecte et alerte. IPS (Intrusion Prevention System) est placé inline et peut bloquer. Si la question dit prévention ou blocage automatique, pense IPS.");
    } else if (prompt.includes("mfa") || prompt.includes("iam")) {
      setAssistantAnswer("IAM (Identity and Access Management) gère identités, authentification et autorisation. MFA ajoute plusieurs facteurs pour réduire l'impact d'un mot de passe compromis.");
    } else {
      setAssistantAnswer("Identifie le concept, repère le contrôle attendu, puis élimine les options trop larges ou trop tardives. Security+ demande souvent la meilleure réponse opérationnelle, pas juste une réponse possible.");
    }
  }

  function shuffleQuestions(items: ExamQuestion[]) {
    return [...items].sort(() => Math.random() - 0.5);
  }

  function openExamSetup(title: string, examQuestions: ExamQuestion[]) {
    setExamSetup({ title, questions: examQuestions });
    setExamCorrectionMode("end");
    setActiveExam(null);
    setExamAnswers({});
    setExamIndex(0);
    setExamFinished(false);
    setExamStartedAt(null);
    setExamElapsedSeconds(0);
    setExamFlags({});
    setExamConfidence({});
  }

  function openRandomExam(count: number) {
    const pool = filteredExamQuestions.length ? filteredExamQuestions : allExamQuestions;
    openExamSetup(`Examen aléatoire ${count}`, shuffleQuestions(pool).slice(0, Math.min(count, pool.length)));
  }

  function beginExam() {
    if (!examSetup) return;
    setActiveExam({ ...examSetup, correctionMode: examCorrectionMode });
    setExamAnswers({});
    setExamIndex(0);
    setExamFinished(false);
    setExamStartedAt(Date.now());
    setExamElapsedSeconds(0);
    setExamFlags({});
    setExamConfidence({});
  }

  function chooseExamAnswer(index: number) {
    if (!activeExamQuestion || examFinished) return;
    const correctAnswers = getExamCorrectAnswers(activeExamQuestion);
    const isMultiple = isMultipleAnswerExamQuestion(activeExamQuestion);
    const selected = examAnswers[activeExamQuestion.id] ?? [];
    if (activeExam?.correctionMode === "instant" && selected.length >= correctAnswers.length) return;
    const nextSelected = isMultiple
      ? selected.includes(index)
        ? selected.filter((item) => item !== index)
        : selected.length >= correctAnswers.length
          ? selected
          : [...selected, index]
      : [index];
    setExamAnswers((answers) => ({ ...answers, [activeExamQuestion.id]: nextSelected }));
  }

  function finishExam() {
    if (examStartedAt) {
      setExamElapsedSeconds(Math.floor((Date.now() - examStartedAt) / 1000));
    }
    setExamStartedAt(null);
    setExamFinished(true);
  }

  function returnToExamList() {
    setActiveExam(null);
    setExamSetup(null);
    setExamAnswers({});
    setExamIndex(0);
    setExamFinished(false);
    setExamStartedAt(null);
    setExamElapsedSeconds(0);
    setExamFlags({});
    setExamConfidence({});
  }

  function startFlashcardDeck(deck: FlashcardDeckType) {
    setFlashcardDeck(deck);
    setFlashIndex(0);
    setFlashBack(false);
  }

  async function handleAuth(mode: "signin" | "signup") {
    if (!supabase) {
      setCloudStatus("Supabase n'est pas configuré. Vérifie les variables Netlify.");
      return;
    }
    if (!authEmail || authPassword.length < 6) {
      setCloudStatus("Entre un email et un mot de passe d'au moins 6 caractères.");
      return;
    }

    setAuthBusy(true);
    setCloudStatus(mode === "signin" ? "Connexion en cours..." : "Création du compte...");
    const result = mode === "signin"
      ? await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword })
      : await supabase.auth.signUp({ email: authEmail, password: authPassword });
    setAuthBusy(false);

    if (result.error) {
      setCloudStatus(result.error.message);
      return;
    }

    setAuthUser(result.data.user ?? null);
    setCloudStatus(mode === "signin" ? "Connecté. Tu peux sauvegarder ou restaurer ta progression." : "Compte créé. Vérifie ton email si Supabase demande une confirmation.");
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setAuthUser(null);
    setCloudStatus("Déconnecté.");
  }

  async function saveCloudProgress() {
    if (!supabase || !authUser) {
      setCloudStatus("Connecte-toi avant de sauvegarder en ligne.");
      return;
    }

    setCloudBusy(true);
    setCloudStatus("Sauvegarde en ligne...");
    const storage = collectCertiflowStorage();
    const now = new Date().toISOString();

    await (supabase as any).from("profiles").upsert({
      id: authUser.id,
      email: authUser.email,
      display_name: authUser.email?.split("@")[0] ?? "CertiFlow user",
      updated_at: now,
    });

    const { error } = await (supabase as any).from("user_settings").upsert({
      user_id: authUser.id,
      theme: appTheme,
      exam_date: examDate,
      settings: {
        version: 1,
        savedAt: now,
        storage,
      },
      updated_at: now,
    });

    setCloudBusy(false);
    setCloudStatus(error ? error.message : `Progression sauvegardée en ligne à ${new Date().toLocaleTimeString("fr-FR")}.`);
  }

  async function restoreCloudProgress() {
    if (!supabase || !authUser) {
      setCloudStatus("Connecte-toi avant de restaurer une progression.");
      return;
    }

    setCloudBusy(true);
    setCloudStatus("Restauration depuis Supabase...");
    const { data, error } = await (supabase as any)
      .from("user_settings")
      .select("settings")
      .eq("user_id", authUser.id)
      .maybeSingle();
    setCloudBusy(false);

    if (error) {
      setCloudStatus(error.message);
      return;
    }

    const storage = (data?.settings as { storage?: Record<string, string> } | null)?.storage;
    if (!storage) {
      setCloudStatus("Aucune sauvegarde en ligne trouvée pour ce compte.");
      return;
    }

    restoreCertiflowStorage(storage);
    setCloudStatus("Progression restaurée. Rechargement...");
    window.location.reload();
  }

  function exportData() {
    const data = collectCertiflowStorage();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `certiflow-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importData(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as Record<string, string>;
        for (const [key, value] of Object.entries(data)) {
          if (key.startsWith("certiflow-")) localStorage.setItem(key, value);
        }
        window.location.reload();
      } catch { /* malformed file — silently ignore */ }
    };
    reader.readAsText(file);
  }

  function resetAllData() {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("certiflow-")) keys.push(key);
    }
    keys.forEach((key) => localStorage.removeItem(key));
    window.location.reload();
  }

  return (
    <main className="app-shell min-h-screen text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[286px_1fr]">
        <aside className="glass-panel border-b border-border p-4 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:border-b-0 lg:border-r">
          <div className="mb-6">
            <div className="rounded-card border border-border bg-white p-2 shadow-sm">
              <img
                src="/certiflow-logo.png"
                alt="CertiFlow certification workflow"
                className="h-16 w-full rounded-card object-contain"
              />
            </div>
            <div className="mt-3 rounded-card border border-border bg-muted p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-black">Security+ SY0-701</p>
                <Badge>{daysLeft} jours</Badge>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-border">
                <div className="h-full rounded-full bg-primary" style={{ width: `${avgProgress}%` }} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Focus: {weakest.name}</p>
            </div>
          </div>

          <nav className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1" aria-label="Navigation principale">
            {views.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setView(item.id)}
                  className={cn(
                    "group flex min-h-11 items-center gap-3 rounded-card px-3 text-left text-sm font-semibold text-muted-foreground transition-all duration-200 relative overflow-hidden",
                    view === item.id ? "bg-primary/10 text-primary font-bold shadow-sm" : "hover:bg-muted hover:text-foreground hover:translate-x-0.5"
                  )}
                >
                  <Icon className={cn("h-4 w-4 shrink-0 transition-transform duration-200", view === item.id && "scale-110")} />
                  {item.label}
                  {view === item.id && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />}
                </button>
              );
            })}
          </nav>

          <div className="mt-6 rounded-card border border-border bg-muted p-3">
            <label className="text-xs font-black uppercase text-muted-foreground" htmlFor="theme-select">Thème visuel</label>
            <select
              id="theme-select"
              value={appTheme}
              onChange={(event) => setAppTheme(event.target.value as AppTheme)}
              className="mt-2 min-h-11 w-full rounded-card border border-border bg-card px-3 font-semibold"
            >
              {appThemes.map((theme) => <option key={theme.id} value={theme.id}>{theme.label}</option>)}
            </select>
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">{activeTheme.note}</p>
              <div className="flex gap-1">
                {activeTheme.swatches.map((color) => <span key={color} className="h-4 w-4 rounded-full border border-border" style={{ background: color }} />)}
              </div>
            </div>
          </div>
        </aside>

        <section className="mx-auto w-full max-w-7xl p-4 lg:p-8">
          <header className="hero-panel mb-6 rounded-card border border-border p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="mb-1 text-xs font-black uppercase text-muted-foreground">Préparation intensive</p>
              <h1 className="text-3xl font-black tracking-normal sm:text-4xl">{activeView.label}</h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Espace de révision Security+ avec cours, labs PBQ, examens blancs et rappels anti-pièges.
              </p>
            </div>
            <div className="w-full rounded-card border border-border bg-card/80 p-4 text-center shadow-sm sm:w-40">
              <strong className="block text-3xl text-primary">{daysLeft}</strong>
              <span className="text-sm text-muted-foreground">jours restants</span>
            </div>
            </div>
          </header>

          <div className="glass-panel sticky top-0 z-20 mb-6 grid gap-3 rounded-card border border-border p-4 shadow-sm">
            <label className="text-sm font-bold" htmlFor="global-search">Rechercher un terme, concept, question...</label>
            <div className="grid gap-3 lg:grid-cols-[1fr_220px_220px_auto]">
              <input
                id="global-search"
                value={globalSearch}
                onChange={(event) => setGlobalSearch(event.target.value)}
                placeholder="Zero Trust, SIEM, RTO, phishing..."
                className="min-h-11 rounded-card border border-border bg-background px-3"
              />
              <select value={selectedDomain} onChange={(event) => { setSelectedDomain(event.target.value); setSelectedTheme("all"); }} className="min-h-11 rounded-card border border-border bg-background px-3">
                <option value="all">Tous les domaines</option>
                {domains.map((domain) => <option key={domain.id} value={domain.name}>{domain.name}</option>)}
              </select>
              <select value={selectedTheme} onChange={(event) => setSelectedTheme(event.target.value)} className="min-h-11 rounded-card border border-border bg-background px-3">
                <option value="all">Tous les thèmes</option>
                {studyThemes
                  .filter((theme) => selectedDomain === "all" || theme.domain === selectedDomain)
                  .map((theme) => <option key={theme.id} value={theme.id}>{theme.title}</option>)}
              </select>
              <ActionButton onClick={() => setView("search")}>Recherche</ActionButton>
            </div>
            {normalizedSearch && view !== "search" && (
              <div className="grid gap-2 text-sm md:grid-cols-5">
                <button type="button" onClick={() => setView("courses")} className="rounded-card bg-muted p-3 text-left font-semibold">Cours: {quickCourseResults.length} résultats rapides</button>
                <button type="button" onClick={() => setView("confusions")} className="rounded-card bg-muted p-3 text-left font-semibold">Confusions: {quickConfusionResults.length} résultats rapides</button>
                <button type="button" onClick={() => setView("ports")} className="rounded-card bg-muted p-3 text-left font-semibold">Commandes: {quickCommandResults.length} résultats rapides</button>
                <button type="button" onClick={() => setView("quiz")} className="rounded-card bg-muted p-3 text-left font-semibold">Quiz: {quickQuizResults.length} résultats rapides</button>
                <button type="button" onClick={() => setView("exam")} className="rounded-card bg-muted p-3 text-left font-semibold">Examens: {quickExamResults.length} résultats rapides</button>
              </div>
            )}
          </div>

          {view === "dashboard" && (
            <Dashboard
              daysLeft={daysLeft}
              domains={domains}
              score={score}
              answered={answered}
              correct={correct}
              avgProgress={avgProgress}
              weakest={weakest}
              onNavigate={(v: string) => setView(v as ViewId)}
            />
          )}

{view === "courses" && (
            <CoursesView
              key={`${selectedDomain}-${selectedTheme}-${normalizedSearch}`}
              filteredThemes={filteredThemes}
              filteredStudyItems={filteredStudyItems}
              onFlashcard={(themeId) => { setSelectedTheme(themeId); setView("flashcards"); }}
              onPractice={(term) => { setGlobalSearch(term); setView("quiz"); }}
            />
          )}

          {view === "confusions" && (
            <ConfusionsView
              key={`${selectedDomain}-${normalizedSearch}`}
              filteredSections={filteredConfusionSections}
              filteredItems={filteredConfusionItems}
            />
          )}

          {view === "quiz" && (
            <QuizView
              score={score}
              answered={answered}
              correct={correct}
              effectiveQuizQuestions={quizQuestions}
              totalQuestions={questions.length}
              questionIndex={questionIndex}
              currentQuestion={currentQuestion}
              currentQuestionChoices={currentQuestionChoices}
              currentQuestionAnswer={currentQuestionAnswer}
              selectedAnswer={selectedAnswer}
              weakestDomain={weakest.name}
              errorsCount={errors.length}
              startQuiz={startQuiz}
              chooseAnswer={chooseAnswer}
              nextQuestion={nextQuestion}
            />
          )}

          {view === "pbq" && <PBQBrowser />}

          {view === "flashcards" && (
            <Panel title="Flashcards bilingues">
              {!flashcardDeck ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <article className="rounded-card border border-border bg-muted p-5">
                    <h2 className="text-xl font-black">Acronymes</h2>
                    <p className="mt-2 text-muted-foreground">Sigles Security+ avec signification anglaise, explication française et pièges d'examen.</p>
                    <Badge>{acronymDeck.length} cartes</Badge>
                    <ActionButton className="mt-4" onClick={() => startFlashcardDeck("acronyms")}>Lancer</ActionButton>
                  </article>
                  <article className="rounded-card border border-border bg-muted p-5">
                    <h2 className="text-xl font-black">Ports / protocoles</h2>
                    <p className="mt-2 text-muted-foreground">Ports, protocoles, rôle et risques à mémoriser pour l'examen.</p>
                    <Badge>{portDeck.length} cartes</Badge>
                    <ActionButton className="mt-4" onClick={() => startFlashcardDeck("ports")}>Lancer</ActionButton>
                  </article>
                  <article className="rounded-card border border-border bg-muted p-5">
                    <h2 className="text-xl font-black">Commandes / outils</h2>
                    <p className="mt-2 text-muted-foreground">Commandes, outils, usage pratique et points à reconnaître à l'examen.</p>
                    <Badge>{commandDeck.length} cartes</Badge>
                    <ActionButton className="mt-4" onClick={() => startFlashcardDeck("commands")}>Lancer</ActionButton>
                  </article>
                  <article className="rounded-card border border-border bg-muted p-5">
                    <h2 className="text-xl font-black">Termes techniques</h2>
                    <p className="mt-2 text-muted-foreground">Concepts importants issus des cours, filtrables par domaine, thème et recherche.</p>
                    <Badge>{technicalFlashcards.length} cartes</Badge>
                    <ActionButton className="mt-4" onClick={() => startFlashcardDeck("technical")}>Lancer</ActionButton>
                  </article>
                </div>
              ) : (
                <>
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge>{effectiveFlashcards.length} cartes</Badge>
                <Badge>{flashcardDeck === "acronyms" ? "Acronymes" : flashcardDeck === "ports" ? "Ports / protocoles" : flashcardDeck === "commands" ? "Commandes / outils" : "Termes techniques"}</Badge>
                {selectedDomain !== "all" && <Badge>{selectedDomain}</Badge>}
                {selectedThemeData && <Badge>{selectedThemeData.title}</Badge>}
                <GhostButton onClick={() => { setFlashcardDeck(null); setFlashBack(false); }}>Changer de paquet</GhostButton>
              </div>
              {effectiveFlashcards.length ? (
                <>
              <button
                type="button"
                onClick={() => setFlashBack((value) => !value)}
                className="grid min-h-72 w-full place-items-center rounded-card bg-muted p-6 text-center"
              >
                {flashBack ? (
                  <div>
                    <h2 className="text-3xl font-black text-primary">{currentFlashcard.term}</h2>
                    <p className="mt-3 text-xl font-bold">{currentFlashcard.definition}</p>
                    <p className="mt-3">{currentFlashcard.details}</p>
                    <p className="mt-3 text-sm text-muted-foreground">{currentFlashcard.domain} | {currentFlashcard.themeTitle}</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-6xl font-black text-primary">{currentFlashcard.term}</p>
                    <p className="mt-4 text-muted-foreground">Clique pour retourner la carte</p>
                  </div>
                )}
              </button>
              <div className="mt-4 flex gap-2">
                <GhostButton onClick={() => { setFlashIndex((value) => (value - 1 + effectiveFlashcards.length) % effectiveFlashcards.length); setFlashBack(false); }}>Précédente</GhostButton>
                <ActionButton onClick={() => { setFlashIndex((value) => (value + 1) % effectiveFlashcards.length); setFlashBack(false); }}>Suivante</ActionButton>
              </div>
                </>
              ) : (
                <div className="rounded-card bg-muted p-5">
                  <p className="font-bold">Aucune carte ne correspond aux filtres actuels.</p>
                  <p className="mt-2 text-muted-foreground">Essaie de vider la recherche ou de changer de domaine.</p>
                </div>
              )}
                </>
              )}
            </Panel>
          )}

          {view === "ports" && (
            <PortsCommandsView />
          )}

          {view === "exam" && (
            <>
              {!activeExam && (
                <div className="mb-3 flex justify-end">
                  <button type="button" onClick={() => setExamHistoryOpen((v) => !v)}
                    className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-card px-4 py-2 text-sm font-bold transition hover:border-primary hover:text-primary">
                    <BarChart3 className="h-4 w-4" />
                    {examHistoryOpen ? "Examens disponibles" : "Historique"}
                  </button>
                </div>
              )}
              {examHistoryOpen && !activeExam ? <ExamHistory /> : (
            <ExamView
              examSetup={examSetup}
              examCorrectionMode={examCorrectionMode}
              setExamCorrectionMode={setExamCorrectionMode}
              allExamSuites={allExamSuites}
              allExamQuestions={allExamQuestions}
              filteredExamQuestions={filteredExamQuestions}
              normalizedSearch={normalizedSearch}
              globalSearch={globalSearch}
              openExamSetup={openExamSetup}
              openRandomExam={openRandomExam}
              beginExam={beginExam}
              activeExam={activeExam}
              activeExamQuestion={activeExamQuestion}
              examIndex={examIndex}
              setExamIndex={setExamIndex}
              examAnswers={examAnswers}
              examFlags={examFlags}
              setExamFlags={setExamFlags}
              examConfidence={examConfidence}
              setExamConfidence={setExamConfidence}
              examFinished={examFinished}
              examElapsedSeconds={examElapsedSeconds}
              examCorrectCount={examCorrectCount}
              examAnsweredCount={examAnsweredCount}
              examFlaggedCount={examFlaggedCount}
              examConfidenceSummary={examConfidenceSummary}
              canShowExamCorrection={canShowExamCorrection}
              chooseExamAnswer={chooseExamAnswer}
              finishExam={finishExam}
              returnToExamList={returnToExamList}
            />
              )}
            </>
          )}

          {view === "errors" && (
            <ErrorsView
              errors={errors}
              onClear={() => setErrors([])}
              onStatusChange={updateErrorStatus}
              onDelete={deleteError}
            />
          )}

          {view === "plan" && (
            <div className="grid gap-4">
              <Panel title="Plan jusqu'au 28 mai 2026">
                <p className="mb-4 text-sm text-muted-foreground">Priorite actuelle selon tes scores: <strong className="text-danger-fg">{weakest.name} ({weakest.progress}%)</strong>. Le plan s'intensifie a mesure que la date approche.</p>
                <div className="grid gap-3">
                  {plan.map(([day, task]) => (
                    <div key={day} className="grid gap-1 rounded-card border border-border bg-muted p-4 md:grid-cols-[100px_1fr]">
                      <strong>{day}</strong>
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel title="Fiche revision express">
                <p className="mb-4 text-sm text-muted-foreground">Synthese de tes points faibles a reviser en priorite. Exporte cette fiche pour la relire hors connexion.</p>
                <button type="button" onClick={() => {
                  const lines = [];
                  lines.push("=== FICHE REVISION CERTIFLOW — " + new Date().toLocaleDateString("fr-FR") + " ===");
                  lines.push("");
                  lines.push("Score global: " + (answered > 0 ? Math.round((correct / answered) * 100) : 0) + "% (" + correct + "/" + answered + ")");
                  lines.push("Streak: " + studyStreak + " jours");
                  lines.push("");
                  lines.push("--- DOMAINES FAIBLES ---");
                  domains.filter(d => d.progress < 60).forEach(d => lines.push("  " + d.name + ": " + d.progress + "%"));
                  lines.push("");
                  lines.push("--- TOP ERREURS ---");
                  errors.filter(e => e.status !== "maîtrisé").sort((a, b) => b.count - a.count).slice(0, 10).forEach((e, i) => lines.push("  " + (i+1) + ". [" + e.domain + "] " + (e.concept || e.question).slice(0, 80) + " (" + e.count + "x)"));
                  lines.push("");
                  lines.push("--- CONFUSIONS A REVISER ---");
                  const haystack = errors.map(e => (e.concept || e.question).toLowerCase()).join(" ");
                  confusionItems.filter(c => haystack.includes(c.comparison.toLowerCase())).slice(0, 5).forEach(c => lines.push("  " + c.comparison + " vs " + c.english + ": " + c.difference.slice(0, 100)));
                  lines.push("");
                  lines.push("--- PORTS A MEMORISER ---");
                  portFlashcards.filter(p => ["HTTPS", "SSH", "DNS", "DHCP", "FTP", "SMTP", "RDP", "LDAP"].some(s => p.protocol.toUpperCase().includes(s))).forEach(p => lines.push("  " + p.protocol + " → " + p.port + " | " + p.english));
                  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url; a.download = "certiflow-fiche-revision-" + new Date().toISOString().slice(0, 10) + ".txt";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                  className="inline-flex min-h-10 items-center justify-center rounded-card bg-primary px-5 font-bold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:opacity-95">
                  Exporter fiche revision (TXT)
                </button>
              </Panel>
            </div>
          )}
          {view === "search" && (
            <div className="grid gap-4">
              <Panel title="Recherche globale">
                <p className="text-muted-foreground">Recherche active: {globalSearch ? `"${globalSearch}"` : "aucun terme saisi"}. Les filtres domaine/thème restent appliqués aux cours, flashcards et quiz.</p>
              </Panel>

              <Panel title={`Cours et flashcards (${filteredStudyItems.length})`}>
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {filteredStudyItems.slice(0, 18).map((item) => (
                    <article key={item.id} className="rounded-card border border-border bg-muted p-4">
                      <div className="mb-2 flex flex-wrap gap-2">
                        <Badge>{item.domain}</Badge>
                        <Badge>{item.themeTitle}</Badge>
                      </div>
                      <h3 className="text-lg font-black text-primary">{item.term}</h3>
                      <p className="mt-2">{item.definition}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{item.details}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <GhostButton onClick={() => { setSelectedTheme(item.themeId); setView("courses"); }}>Étudier</GhostButton>
                        <GhostButton onClick={() => { setSelectedTheme(item.themeId); setView("flashcards"); }}>Flashcards</GhostButton>
                      </div>
                    </article>
                  ))}
                </div>
              </Panel>

              <Panel title={`Confusions fréquentes (${filteredConfusionItems.length})`}>
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {filteredConfusionItems.slice(0, 18).map((item) => (
                    <article key={item.id} className="rounded-card border border-border bg-muted p-4">
                      <div className="mb-2 flex flex-wrap gap-2">
                        <Badge>{item.domain}</Badge>
                        <Badge>{item.sectionTitle}</Badge>
                      </div>
                      <h3 className="text-lg font-black text-primary">{item.comparison}</h3>
                      <p className="mt-2"><strong>Signification / English: </strong>{item.english}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{item.difference}</p>
                      <GhostButton onClick={() => { setSelectedDomain(item.domain); setView("confusions"); }}>Étudier</GhostButton>
                    </article>
                  ))}
                </div>
              </Panel>

              <Panel title={`Commandes et outils (${filteredCommandTools.length})`}>
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {filteredCommandTools.slice(0, 18).map((item) => (
                    <article key={item.id} className="rounded-card border border-border bg-muted p-4">
                      <div className="mb-2 flex flex-wrap gap-2">
                        <Badge>{item.domain}</Badge>
                        <Badge>Commande / outil</Badge>
                      </div>
                      <h3 className="text-lg font-black text-primary">{item.name}</h3>
                      <p className="mt-2"><strong>English: </strong>{item.english}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{item.purpose}</p>
                      <p className="mt-2 text-sm"><strong>Examen: </strong>{item.examTip}</p>
                      <GhostButton onClick={() => setView("ports")}>Étudier</GhostButton>
                    </article>
                  ))}
                </div>
              </Panel>

              <Panel title={`Scénarios commandes (${filteredCommandScenarios.length})`}>
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {filteredCommandScenarios.slice(0, 18).map((item) => (
                    <article key={item.id} className="rounded-card border border-border bg-muted p-4">
                      <Badge>{item.domain}</Badge>
                      <h3 className="mt-2 text-lg font-black">{item.scenario}</h3>
                      <p className="mt-2 text-primary font-bold">{item.likelyTool}</p>
                      <GhostButton onClick={() => setView("ports")}>Étudier</GhostButton>
                    </article>
                  ))}
                </div>
              </Panel>

              <Panel title={`Quiz (${filteredQuizQuestions.length})`}>
                <div className="grid gap-3 md:grid-cols-2">
                  {filteredQuizQuestions.slice(0, 12).map((question) => (
                    <article key={question.id} className="rounded-card border border-border bg-muted p-4">
                      <div className="mb-2 flex flex-wrap gap-2">
                        <Badge>{question.domain}</Badge>
                        <Badge>Question {question.questionNumber}</Badge>
                      </div>
                      <p className="font-semibold">{question.question}</p>
                      <GhostButton onClick={() => { setQuestionIndex(effectiveQuizQuestions.findIndex((item) => item.id === question.id)); setSelectedAnswer(null); setView("quiz"); }}>Pratiquer</GhostButton>
                    </article>
                  ))}
                </div>
              </Panel>

              <Panel title={`Examens blancs (${filteredExamQuestions.length})`}>
                <div className="grid gap-3 md:grid-cols-2">
                  {filteredExamQuestions.slice(0, 12).map((question) => (
                    <article key={question.id} className="rounded-card border border-border bg-muted p-4">
                      <div className="mb-2 flex flex-wrap gap-2">
                        <Badge>{question.examTitle}</Badge>
                        <Badge>Question {question.questionNumber}</Badge>
                      </div>
                      <p className="font-semibold">{question.question}</p>
                      <GhostButton onClick={() => { openExamSetup(`${question.examTitle} - question ${question.questionNumber}`, [question]); setView("exam"); }}>Pratiquer</GhostButton>
                    </article>
                  ))}
                </div>
              </Panel>
            </div>
          )}

          {view === "settings" && (
            <div className="grid gap-4">
              <Panel title="Compte & synchronisation">
                <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
                  <div className="rounded-card border border-border bg-muted p-4">
                    <p className="text-sm font-bold text-muted-foreground">État Supabase</p>
                    <p className="mt-2 font-semibold">{cloudStatus}</p>
                    {authUser && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        Compte actif: <strong>{authUser.email}</strong>
                      </p>
                    )}
                  </div>

                  <div className="rounded-card border border-border bg-muted p-4">
                    {!authUser ? (
                      <div className="grid gap-3">
                        <input
                          type="email"
                          value={authEmail}
                          onChange={(event) => setAuthEmail(event.target.value)}
                          placeholder="Email"
                          className="min-h-11 rounded-card border border-border bg-card px-3 outline-none focus:border-primary"
                        />
                        <input
                          type="password"
                          value={authPassword}
                          onChange={(event) => setAuthPassword(event.target.value)}
                          placeholder="Mot de passe"
                          className="min-h-11 rounded-card border border-border bg-card px-3 outline-none focus:border-primary"
                        />
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            disabled={authBusy || !supabase}
                            onClick={() => handleAuth("signin")}
                            className="inline-flex min-h-10 items-center justify-center rounded-card bg-primary px-5 font-bold text-primary-foreground disabled:opacity-50"
                          >
                            Se connecter
                          </button>
                          <button
                            type="button"
                            disabled={authBusy || !supabase}
                            onClick={() => handleAuth("signup")}
                            className="inline-flex min-h-10 items-center justify-center rounded-card border border-border bg-card px-5 font-bold disabled:opacity-50"
                          >
                            Créer un compte
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid gap-3">
                        <p className="text-sm text-muted-foreground">
                          Sauvegarde ta progression en ligne, puis restaure-la sur ton téléphone ou ton PC avec le même compte.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            disabled={cloudBusy}
                            onClick={saveCloudProgress}
                            className="inline-flex min-h-10 items-center justify-center rounded-card bg-primary px-5 font-bold text-primary-foreground disabled:opacity-50"
                          >
                            Sauvegarder en ligne
                          </button>
                          <button
                            type="button"
                            disabled={cloudBusy}
                            onClick={restoreCloudProgress}
                            className="inline-flex min-h-10 items-center justify-center rounded-card border border-border bg-card px-5 font-bold disabled:opacity-50"
                          >
                            Restaurer sur cet appareil
                          </button>
                          <button
                            type="button"
                            onClick={signOut}
                            className="inline-flex min-h-10 items-center justify-center rounded-card border border-border bg-card px-5 font-bold"
                          >
                            Déconnexion
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Panel>

              <Panel title="Données actuelles">
                <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    { label: "Questions répondues", value: answered },
                    { label: "Réponses correctes", value: correct },
                    { label: "Erreurs enregistrées", value: errors.length },
                    { label: "Session examen", value: activeExam ? (examFinished ? "Terminée" : "En cours") : "Aucune" },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-card border border-border bg-muted p-4">
                      <strong className="block text-2xl font-black tabular-nums text-primary">{value}</strong>
                      <span className="text-sm text-muted-foreground">{label}</span>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel title="Sauvegarde et restauration">
                <p className="mb-4 text-muted-foreground text-sm">Exporte ta progression complète (quiz, erreurs, examen, filtres) dans un fichier JSON. Importe-le sur un autre appareil ou après un nettoyage du navigateur.</p>
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={exportData}
                    className="inline-flex min-h-10 items-center justify-center rounded-card bg-primary px-5 font-bold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:opacity-95">
                    Exporter (JSON)
                  </button>
                  <label className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded-card border border-border bg-muted px-5 font-bold transition hover:border-primary hover:text-primary">
                    Importer (JSON)
                    <input type="file" accept=".json" className="sr-only" onChange={importData} />
                  </label>
                </div>
              </Panel>

              <Panel title="Réinitialisation">
                <p className="mb-4 text-muted-foreground text-sm">Efface toutes les données CertiFlow enregistrées dans ce navigateur. Ta progression, tes erreurs et ta session d&apos;examen seront supprimées.</p>
                <button type="button"
                  onClick={() => { if (window.confirm("Effacer toutes tes données CertiFlow ? Cette action est irréversible.")) resetAllData(); }}
                  className="inline-flex min-h-10 items-center justify-center rounded-card bg-red-600 px-5 font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:opacity-90">
                  Réinitialiser toutes les données
                </button>
              </Panel>
            </div>
          )}

          {view === "assistant" && <AssistantView />}
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value, note }: { label: string; value: string | number; note: string }) {
  return (
    <div className="group rounded-card border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:shadow-md">
      <strong className="block text-3xl font-black tabular-nums bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{value}</strong>
      <span className="text-sm font-semibold text-muted-foreground">{label}</span>
      <p className="mt-2 text-xs text-muted-foreground/70">{note}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-card border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-btn bg-primary/10 shadow-sm">
          <GraduationCap className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-black leading-tight">{title}</h2>
        </div>
      </div>
      {children}
    </section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex min-h-8 items-center rounded-card border border-border bg-muted px-3 text-sm font-bold text-muted-foreground">{children}</span>;
}

function ActionButton({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={cn("inline-flex min-h-10 items-center justify-center rounded-card bg-primary px-4 font-bold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:opacity-95", className)}>
      {children}
    </button>
  );
}

function GhostButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex min-h-10 items-center justify-center rounded-card border border-border bg-muted px-4 font-bold transition hover:border-primary hover:text-primary">
      {children}
    </button>
  );
}

function Info({ label, text }: { label: string; text: string }) {
  return (
    <p className="mt-3 text-sm leading-6">
      <strong>{label}: </strong>
      {text}
    </p>
  );
}
