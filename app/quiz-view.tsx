"use client";

import { AlertCircle, CheckCircle2, Settings2, Target, XCircle, Zap } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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

type QuizMode = "quick" | "weak" | "errors";

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

// ─── ConfigPanel ───────────────────────────────────────────────────────────

function ConfigPanel() {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("certiflow-quiz-config") || "null");
      return saved || { poolSize: 0, randomOrder: true, correction: "instant" };
    } catch { return { poolSize: 0, randomOrder: true, correction: "instant" }; }
  });

  function update(partial: Partial<typeof config>) {
    const next = { ...config, ...partial };
    setConfig(next);
    localStorage.setItem("certiflow-quiz-config", JSON.stringify(next));
  }

  return (
    <div className="rounded-card border border-border bg-card p-4 shadow-sm">
      <button type="button" onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Session</span>
        </div>
        <span className="text-xs text-muted-foreground">{open ? "Masquer" : "Configurer"}</span>
      </button>
      {open && (
        <div className="mt-4 space-y-4 border-t border-border pt-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Taille du pool</p>
            <div className="flex flex-wrap gap-1.5">
              {[{ v: 0, l: "Toutes" }, { v: 10, l: "10" }, { v: 20, l: "20" }, { v: 30, l: "30" }, { v: 50, l: "50" }].map(({ v, l }) => (
                <button key={v} type="button" onClick={() => update({ poolSize: v })}
                  className="rounded-btn border px-3 py-1.5 text-xs font-bold transition hover:border-primary"
                  style={{
                    borderColor: config.poolSize === v ? "var(--primary)" : "var(--border)",
                    background: config.poolSize === v ? "var(--primary)" : "var(--muted)",
                    color: config.poolSize === v ? "var(--primary-foreground)" : "var(--muted-foreground)",
                  }}>{l}</button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Ordre aleatoire</p>
              <p className="text-[10px] text-muted-foreground">Melange a chaque session</p>
            </div>
            <button type="button" onClick={() => update({ randomOrder: !config.randomOrder })}
              className="relative h-6 w-11 rounded-full transition-colors"
              style={{ background: config.randomOrder ? "var(--success)" : "var(--border)" }}>
              <span className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform"
                style={{ transform: config.randomOrder ? "translateX(20px)" : "translateX(4px)" }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
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
  startQuiz: (mode: QuizMode) => void;
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

            <ConfigPanel />

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
              <button type="button" onClick={nextQuestion}
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

            <button type="button" onClick={nextQuestion}
              className="inline-flex items-center gap-1.5 rounded-btn bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-90">
              Question suivante →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
