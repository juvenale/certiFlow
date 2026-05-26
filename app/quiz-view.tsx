"use client";

import { AlertCircle, CheckCircle2, Flag, Loader2, Sparkles, Target, XCircle, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useTimeTracker } from "./hooks/useTimeTracker";
import { cn } from "@/lib/utils";
import { QuizConfig } from "./quiz-config";

type QuizQuestion = {
  id: string;
  domain: string;
  questionNumber: number;
  question: string;
  choices: string[];
  answer: number;
  explanation: string;
  source: string;
  scenario?: string;
};

type QuizMode = "quick" | "weak" | "errors" | "custom";

const domainColors: Record<string, { bg: string; border: string; dot: string }> = {
  "General Security Concepts":                 { bg: "dom-bg-violet",  border: "dom-bd-violet",  dot: "bg-violet-500"  },
  "Threats, Vulnerabilities, and Mitigations": { bg: "dom-bg-red",     border: "dom-bd-red",     dot: "bg-red-500"     },
  "Security Architecture":                     { bg: "dom-bg-blue",    border: "dom-bd-blue",    dot: "bg-blue-500"    },
  "Security Operations":                       { bg: "dom-bg-emerald", border: "dom-bd-emerald", dot: "bg-emerald-500" },
  "Security Program Management and Oversight": { bg: "dom-bg-amber",   border: "dom-bd-amber",   dot: "bg-amber-500"   },
};
function dc(domain: string) {
  return domainColors[domain] ?? { bg: "bg-muted", border: "border-border", dot: "bg-primary" };
}

// ─── LetterBadge ─────────────────────────────────────────────────────────────
function LetterBadge({ letter, state }: {
  letter: string;
  state: "default" | "selected" | "correct" | "wrong" | "correct-unselected";
}) {
  return (
    <span className={cn(
      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black transition-colors",
      state === "default"            && "bg-muted text-muted-foreground",
      state === "selected"           && "bg-primary text-primary-foreground",
      state === "correct"            && "bg-emerald-500 text-white",
      state === "wrong"              && "bg-red-500 text-white",
      state === "correct-unselected" && "border-2 border-emerald-500 bg-transparent text-emerald-600",
    )}>
      {letter}
    </span>
  );
}

// ─── StatChip ─────────────────────────────────────────────────────────────────
function StatChip({ label, value, sub, accent }: { label: string; value: string | number; sub?: string; accent?: string }) {
  return (
    <div className={cn("rounded-card border border-border bg-card p-3 shadow-sm", accent)}>
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-xl font-black tabular-nums">{value}</p>
      {sub && <p className="mt-0.5 text-[10px] text-muted-foreground">{sub}</p>}
    </div>
  );
}

// ─── ModeCard ─────────────────────────────────────────────────────────────────
function ModeCard({ icon: Icon, label, desc, onClick, disabled }: {
  icon: React.ElementType;
  label: string;
  desc: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button type="button" onClick={onClick} disabled={disabled}
      className={cn(
        "flex items-center gap-3 rounded-card border border-border bg-muted p-3 text-left transition",
        disabled ? "cursor-not-allowed opacity-40" : "hover:border-primary hover:bg-card hover:shadow-sm"
      )}>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-btn bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-black truncate">{label}</p>
        <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{desc}</p>
      </div>
    </button>
  );
}

// ─── QuizView ─────────────────────────────────────────────────────────────────
export function QuizView({
  score, answered, correct,
  effectiveQuizQuestions, totalQuestions,
  questionIndex, currentQuestion, currentQuestionChoices, currentQuestionAnswer,
  selectedAnswer, weakestDomain, errorsCount,
  startQuiz, chooseAnswer, nextQuestion,
}: {
  score: number;
  answered: number;
  correct: number;
  effectiveQuizQuestions: QuizQuestion[];
  totalQuestions: number;
  questionIndex: number;
  currentQuestion: QuizQuestion;
  currentQuestionChoices: string[];
  currentQuestionAnswer: number;
  selectedAnswer: number | null;
  weakestDomain: string;
  errorsCount: number;
  startQuiz: (mode: QuizMode, filters?: any) => void;
  chooseAnswer: (index: number) => void;
  nextQuestion: () => void;
}) {
  const pos = questionIndex % effectiveQuizQuestions.length;
  const progressPct = effectiveQuizQuestions.length > 1
    ? Math.round(((pos + 1) / effectiveQuizQuestions.length) * 100)
    : 100;
  const isCorrect = selectedAnswer === currentQuestionAnswer;
  const colors = dc(currentQuestion.domain);
  const revealed = selectedAnswer !== null;
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const timer = useTimeTracker(currentQuestion.id, "QCM");


  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (["a","b","c","d"].includes(e.key.toLowerCase())) {
        e.preventDefault();
        const idx = e.key.toLowerCase().charCodeAt(0) - 97;
        if (idx < currentQuestionChoices.length && !revealed) chooseAnswer(idx);
      }
      if (e.key === "Enter" && revealed) {
        e.preventDefault();
        timer.saveAndProgress();
        setAiExplanation(null);
        setIsFlagged(false);
        nextQuestion();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [revealed, currentQuestionChoices, chooseAnswer, nextQuestion]);

  const handleAskAI = async () => {
    setIsAiLoading(true); setAiExplanation(null);
    try {
      const res = await fetch("/api/assistant", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "expliquer", context: { type: "QCM", statement: currentQuestion.question,
          userAnswer: selectedAnswer !== null ? currentQuestionChoices[selectedAnswer] : "",
          correctAnswer: currentQuestionChoices[currentQuestionAnswer],
          explanationStatique: currentQuestion.explanation } }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error);
      setAiExplanation(data.answer);
    } catch { setAiExplanation("IA indisponible."); }
    finally { setIsAiLoading(false); }
  };

  // Check if this question was previously failed
  const previousErrorCount = (() => {
    try { if (typeof window === "undefined") return 0;
      const errors = JSON.parse(localStorage.getItem("certiflow-errors") || "[]");
      const found = errors.find((e: any) => e.questionId === currentQuestion.id);
      return found ? found.count : 0;
    } catch { return 0; }
  })();

  return (
    <div className="space-y-4">
      {/* Stats header */}
      <div className="grid grid-cols-3 gap-3">
        <StatChip
          label="Score session"
          value={score + "%"}
          sub={answered ? `${correct}/${answered} correctes` : "Aucune réponse"}
          accent={score >= 75 ? "border-success-muted bg-success-muted" : score >= 50 ? "border-warning-muted bg-warning-muted" : undefined}
        />
        <StatChip label="Questions actives" value={effectiveQuizQuestions.length} sub={`sur ${totalQuestions} au total`} />
        <StatChip label="Position" value={`${pos + 1} / ${effectiveQuizQuestions.length}`} sub={`${progressPct}% parcouru`} />
      </div>


      {/* Quiz sur mesure */}
      <details className="group rounded-card border border-border bg-card p-4 shadow-sm mb-3">
        <summary className="cursor-pointer text-xs font-bold uppercase tracking-wider text-muted-foreground list-none flex items-center justify-between">
          <span>Quiz sur mesure (domaines, sous-domaines, themes)</span>
          <span className="text-xs group-open:hidden">Deplier</span>
          <span className="text-xs hidden group-open:inline">Replier</span>
        </summary>
        <div className="mt-3 border-t border-border pt-3">
          <QuizConfig onStartQuiz={(filters) => { startQuiz("custom", filters); }} />
        </div>
      </details>
      {/* Mode selector */}
      <div className="rounded-card border border-border bg-card p-4 shadow-sm">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Changer de mode</p>
        <div className="grid gap-2 sm:grid-cols-3">
          <ModeCard icon={Zap}          label="Quiz rapide"    desc="Questions aléatoires"               onClick={() => startQuiz("quick")} />
          <ModeCard icon={Target}       label="Domaine faible" desc={weakestDomain}                      onClick={() => startQuiz("weak")} />
          <ModeCard icon={AlertCircle}  label="Mode erreurs"   desc={errorsCount ? `${errorsCount} erreur${errorsCount > 1 ? "s" : ""} enregistrée${errorsCount > 1 ? "s" : ""}` : "Aucune erreur"}
            onClick={() => startQuiz("errors")} disabled={errorsCount === 0} />
        </div>
      </div>

      {/* Progress bar */}
      <div className="rounded-card border border-border bg-card px-4 py-3 shadow-sm">
        <div className="mb-1.5 flex justify-between text-[10px] font-bold text-muted-foreground">
          <span>Question {pos + 1} sur {effectiveQuizQuestions.length}</span>
          <span>{progressPct}% parcouru</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="rounded-card border border-border bg-card shadow-sm overflow-hidden">
        {/* Domain header */}
        <div className={cn("border-b border-border px-5 py-3", colors.bg)}>
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("h-2 w-2 shrink-0 rounded-full", colors.dot)} />
            <span className="text-xs font-bold text-muted-foreground">{currentQuestion.domain}</span>
            <span className="ml-auto text-[10px] text-muted-foreground">
              Q{currentQuestion.questionNumber} · {currentQuestion.source}
            </span>
          </div>
        </div>

        <div className="p-5">
          {/* Scenario */}
          {"scenario" in currentQuestion && typeof currentQuestion.scenario === "string" && (
            <p className="mb-4 rounded-card border border-border bg-muted p-3 text-sm italic text-muted-foreground">
              {currentQuestion.scenario}
            </p>
          )}

          {/* Question text */}
          <h2 className="mb-5 text-xl font-black leading-snug">{currentQuestion.question}</h2>

          {/* Choices */}
          <div className="grid gap-2">
            {currentQuestionChoices.map((choice, index) => {
              const isAnswer = index === currentQuestionAnswer;
              const isSelected = selectedAnswer === index;

              let letterState: "default" | "selected" | "correct" | "wrong" | "correct-unselected" = "default";
              if (revealed) {
                if (isSelected && isAnswer)   letterState = "correct";
                else if (isSelected)          letterState = "wrong";
                else if (isAnswer)            letterState = "correct-unselected";
              }

              return (
                <button
                  key={`${currentQuestion.id}-${index}`}
                  type="button"
                  onClick={() => chooseAnswer(index)}
                  disabled={revealed}
                  className={cn(
                    "flex items-center gap-3 rounded-card border px-4 py-3 text-left transition-colors",
                    !revealed && "border-border hover:border-primary hover:bg-muted/50",
                    revealed && isAnswer && "border-success-muted bg-success-muted",
                    revealed && isSelected && !isAnswer && "border-danger-muted bg-danger-muted",
                    revealed && !isSelected && !isAnswer && "border-border opacity-40",
                  )}
                >
                  <LetterBadge letter={String.fromCharCode(65 + index)} state={letterState} />
                  <span className={cn(
                    "text-sm leading-snug",
                    revealed && isAnswer && "font-bold text-success-fg",
                    revealed && isSelected && !isAnswer && "font-bold text-danger-fg",
                  )}>
                    {choice}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Skip button */}
          {!revealed && (
            <div className="mt-4 flex justify-end">
              <button type="button" onClick={() => { timer.saveAndProgress(); nextQuestion(); }}
                className="text-xs font-bold text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
                Passer cette question →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Correction panel */}
      {revealed && (
        <div className={cn(
          "rounded-card border shadow-sm overflow-hidden",
          isCorrect ? "border-success-muted" : "border-danger-muted"
        )}>
          {/* Correction header */}
          <div className={cn(
            "flex items-center gap-2 border-b px-5 py-3 font-black",
            isCorrect
              ? "border-success-muted bg-success-muted text-success-fg"
              : "border-danger-muted bg-danger-muted text-danger-fg"
          )}>
            {isCorrect
              ? <CheckCircle2 className="h-4 w-4" />
              : <XCircle className="h-4 w-4" />}
            {isCorrect ? "Correct !" : "À revoir"}
          </div>

          <div className="space-y-3 bg-card p-5">
            {/* Split answer panels (only on wrong) */}
            {!isCorrect && (
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="rounded-card border border-danger-muted bg-danger-muted p-3">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-danger-fg">Votre choix</p>
                  <p className="text-sm font-semibold">
                    {String.fromCharCode(65 + selectedAnswer)}. {currentQuestionChoices[selectedAnswer] ?? ""}
                  </p>
                </div>
                <div className="rounded-card border border-success-muted bg-success-muted p-3">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-success-fg">Bonne réponse</p>
                  <p className="text-sm font-semibold">
                    {String.fromCharCode(65 + currentQuestionAnswer)}. {currentQuestionChoices[currentQuestionAnswer] ?? ""}
                  </p>
                </div>
              </div>
            )}

            {/* Explanation */}
            <div className="rounded-card border border-border bg-muted p-3">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Explication</p>
              <p className="text-sm leading-relaxed">{currentQuestion.explanation}</p>
            </div>

            {aiExplanation && (
              <div className="rounded-card border-l-2 border-primary bg-muted p-2.5 text-xs leading-relaxed">
                <p className="mb-1 font-bold text-primary">Analyse de l'IA :</p>
                <div className="whitespace-pre-line">{aiExplanation}</div>
              </div>
            )}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <button type="button" onClick={() => setIsFlagged((v: boolean) => !v)}
                  className="inline-flex items-center gap-1 rounded-btn border px-2 py-1 text-[10px] font-bold transition hover:border-warning hover:text-warning-fg"
                  style={{ borderColor: isFlagged ? "var(--warning)" : "var(--border)", color: isFlagged ? "var(--warning)" : "var(--muted-foreground)" }}>
                  <Flag className="h-3 w-3" /> {isFlagged ? "Flagged" : "Flag"}
                </button>
                <button type="button" onClick={handleAskAI} disabled={isAiLoading}
                  className="inline-flex items-center gap-1 rounded-btn border border-primary/30 bg-primary/10 px-2.5 py-1.5 text-[10px] font-bold text-primary transition hover:bg-primary/20 disabled:opacity-50">
                  {isAiLoading ? <><Loader2 className="h-3 w-3 animate-spin" /> Analyse...</> : <><Sparkles className="h-3 w-3" /> IA</>}
                </button>
              </div>
              <button type="button" onClick={() => { timer.saveAndProgress(); setAiExplanation(null); setIsFlagged(false); nextQuestion(); }}
                className="inline-flex items-center gap-1.5 rounded-btn bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-90">
              Question suivante →
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
