"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  AlertCircle, ArrowLeft, CheckCircle2, ChevronLeft, ChevronRight,
  Clock, Flag, Target, Timer, Trophy, XCircle, Zap,
} from "lucide-react";

// ─── shared types ────────────────────────────────────────────────────────────
type ExamQuestion = {
  id: string; examId: string; examTitle: string; questionNumber: number;
  question: string; choices: string[]; answer: number; answers?: number[];
  multipleAnswer?: boolean; explanation: string; source: string; type?: string;
};
type ExamCorrectionMode = "end" | "instant";
type ExamConfidence = "low" | "medium" | "high";
type ActiveExam = { title: string; questions: ExamQuestion[]; correctionMode: ExamCorrectionMode };

// ─── pure helpers ────────────────────────────────────────────────────────────
function getCorrectAnswers(q: ExamQuestion) {
  return q.answers?.length ? q.answers : [q.answer];
}
function isMulti(q: ExamQuestion) {
  return Boolean(q.multipleAnswer || getCorrectAnswers(q).length > 1);
}
function sameSet(sel: number[] | undefined, correct: number[]) {
  if (!sel || sel.length !== correct.length) return false;
  const l = [...sel].sort((a, b) => a - b);
  const r = [...correct].sort((a, b) => a - b);
  return l.every((v, i) => v === r[i]);
}
function formatAnswers(q: ExamQuestion, idxs?: number[]) {
  if (!idxs?.length) return "Aucune réponse";
  return [...idxs].sort((a, b) => a - b)
    .map((i) => `${String.fromCharCode(65 + i)}. ${q.choices[i] ?? ""}`)
    .join(" | ");
}
function isPBQ(q: ExamQuestion) {
  const h = [q.question, q.explanation, q.choices.join(" ")].join(" ").toLowerCase();
  return q.type === "pbq" || ["pbq", "performance-based", "drag", "drop", "configure", "place", "match"].some((w) => h.includes(w));
}
function formatTime(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

// ─── LetterBadge ─────────────────────────────────────────────────────────────
function LetterBadge({ letter, state }: {
  letter: string;
  state: "default" | "selected" | "correct" | "wrong" | "correct-unselected";
}) {
  return (
    <span className={cn(
      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
      state === "default"            && "bg-muted text-muted-foreground",
      state === "selected"           && "bg-primary text-primary-foreground",
      state === "correct"            && "bg-success text-white",
      state === "wrong"              && "bg-danger text-white",
      state === "correct-unselected" && "border-2 border-success-muted bg-transparent text-success-fg",
    )}>
      {letter}
    </span>
  );
}

// ─── ConfidenceSelector ───────────────────────────────────────────────────────
function ConfidenceSelector({ value, onChange }: { value?: ExamConfidence; onChange: (v: ExamConfidence) => void }) {
  const opts: { id: ExamConfidence; label: string; active: string }[] = [
    { id: "low",    label: "Faible",  active: "border-danger bg-danger/10 text-danger-fg" },
    { id: "medium", label: "Moyen",   active: "border-warning bg-warning/10 text-warning-fg" },
    { id: "high",   label: "Élevé",   active: "border-success bg-success/10 text-success-fg" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="text-xs font-bold text-muted-foreground select-none">Niveau de confiance :</span>
      <div className="flex gap-1.5">
        {opts.map((o) => (
          <button key={o.id} type="button" onClick={() => onChange(o.id)}
            className={cn(
              "rounded-btn border px-3 py-1 text-xs font-black transition-all duration-200",
              value === o.id ? o.active : "border-border bg-card text-muted-foreground hover:border-primary/50"
            )}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── ExamProgressGrid ─────────────────────────────────────────────────────────
function ExamProgressGrid({ questions, currentIndex, answers, flags, onSelect, showCorrection }: {
  questions: ExamQuestion[];
  currentIndex: number;
  answers: Record<string, number[]>;
  flags: Record<string, boolean>;
  onSelect: (i: number) => void;
  showCorrection?: boolean;
}) {
  return (
    <div className="rounded-card border border-border bg-card p-2 shadow-sm">
      <div className="mb-2 flex flex-wrap gap-x-2 gap-y-0.5 text-[8px] font-bold text-muted-foreground justify-center">
        <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full border border-primary" /> Active</span>
        <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Répondue</span>
        <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> PBQ</span>
        <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-warning" /> Flagged</span>
        {showCorrection && (
          <>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-success" /> Correct</span>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-danger" /> Incorrect</span>
          </>
        )}
      </div>
      <div className="grid grid-cols-10 gap-1 w-full max-w-lg mx-auto overflow-y-auto p-0.5 max-h-40">
        {questions.map((q, i) => {
          const current   = i === currentIndex;
          const answered  = (answers[q.id]?.length ?? 0) > 0;
          const flagged   = flags[q.id];
          const pbq       = isPBQ(q);
          const correct   = showCorrection && answered && sameSet(answers[q.id], getCorrectAnswers(q));
          const wrong     = showCorrection && answered && !sameSet(answers[q.id], getCorrectAnswers(q));
          return (
            <button key={q.id} type="button" onClick={() => onSelect(i)}
              title={`Q${i + 1}${flagged ? " · flagged" : ""}${pbq ? " · PBQ" : ""}`}
              className={cn(
                "aspect-square w-full max-w-[32px] h-auto flex items-center justify-center rounded border text-[9px] font-mono font-bold transition relative",
                current  && "border-primary bg-primary text-primary-foreground ring-2 ring-primary/20 z-10",
                !current && !answered && "border-border bg-card text-muted-foreground hover:border-primary",
                !current && answered && !correct && !wrong && "border-primary bg-primary/10 text-primary",
                !current && flagged  && !correct && !wrong && "border-warning bg-warning/10 text-warning-fg",
                !current && correct  && "bg-success text-white border-success",
                !current && wrong    && "bg-danger text-white border-danger",
              )}>
              {i + 1}
              {pbq && <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full border border-card bg-cyan-400" />}
              {flagged && !current && <span className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 rounded-full border border-card bg-warning" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── ExamLaunchCard ───────────────────────────────────────────────────────────
function ExamLaunchCard({ title, count, note, onPrepare }: {
  title: string; count: number; note: string; onPrepare: () => void;
}) {
  const estimate = Math.max(15, Math.round(count * 1.1));
  const isMesser = note.toLowerCase().includes("messer");
  return (
    <article className="group flex flex-col rounded-card border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-md">
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="mb-3 flex items-start justify-between gap-2">
            <span className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider select-none",
              isMesser ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
            )}>
              {isMesser ? "Professor Messer" : "Auto-généré"}
            </span>
            <div className="text-right">
              <p className="text-2xl font-black tabular-nums leading-none text-primary">{count}</p>
              <p className="text-[9px] text-muted-foreground font-bold mt-0.5">questions</p>
            </div>
          </div>
          <h3 className="font-black text-sm leading-snug tracking-tight group-hover:text-primary transition-colors">{title}</h3>
        </div>
        <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground select-none">
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> ~{estimate} min</span>
          <span className="flex items-center gap-1"><Target className="h-3.5 w-3.5" /> Grille + correction</span>
        </div>
      </div>
      <div className="border-t border-border p-4 bg-muted/10">
        <button type="button" onClick={onPrepare}
          className="w-full rounded-btn bg-primary px-4 py-2.5 text-xs sm:text-sm font-bold text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.98]">
          Préparer cet examen
        </button>
      </div>
    </article>
  );
}

// ─── SelectedExamReviewCard ────────────────────────────────────────────────────
function SelectedExamReviewCard({ question, index, selected, flagged, confidence }: {
  question: ExamQuestion; index: number; selected?: number[];
  flagged: boolean; confidence?: ExamConfidence;
}) {
  const correct = sameSet(selected, getCorrectAnswers(question));
  const unanswered = selected === undefined;
  const priority = flagged || confidence === "low" || unanswered || !correct;

  return (
    <article className={cn(
      "mt-3 rounded-card border p-4 shadow-sm",
      correct ? "border-success-muted bg-success-muted/30" : priority ? "border-danger-muted bg-danger-muted/30" : "border-border bg-card"
    )}>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className={cn(
          "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-black",
          unanswered ? "bg-muted text-muted-foreground"
          : correct ? "bg-success text-white"
          : "bg-danger text-white"
        )}>
          {unanswered ? "Non répondu" : correct
            ? <><CheckCircle2 className="h-3.5 w-3.5" /> Correct</>
            : <><XCircle className="h-3.5 w-3.5" /> Incorrect</>}
        </span>
        {flagged && <span className="inline-flex items-center gap-1 rounded-full bg-warning/10 border border-warning/20 px-2 py-0.5 text-xs font-bold text-warning-fg"><Flag className="h-3 w-3" /> Flagged</span>}
        {isPBQ(question) && <span className="rounded-full bg-cyan-100 px-2.5 py-0.5 text-xs font-bold text-cyan-700">PBQ</span>}
        {isMulti(question) && <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-bold text-primary">{getCorrectAnswers(question).length} bonnes réponses</span>}
        {confidence && <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-bold",
          confidence === "low" ? "bg-danger/10 text-danger-fg" : confidence === "medium" ? "bg-warning/10 text-warning-fg" : "bg-success/10 text-success-fg"
        )}>Confiance : {confidence === "high" ? "Élevée" : confidence === "medium" ? "Moyenne" : "Faible"}</span>}
        <span className="ml-auto text-xs text-muted-foreground font-mono">Question {index + 1}</span>
      </div>

      <h4 className="text-base font-black leading-snug">{question.question}</h4>

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <div className={cn("rounded-card border p-4",
          unanswered ? "border-muted bg-muted/30" : correct ? "border-success-muted bg-success-muted/20" : "border-danger-muted bg-danger-muted/20"
        )}>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground select-none">Votre réponse</p>
          <p className="text-sm font-semibold">{formatAnswers(question, selected)}</p>
        </div>
        <div className="rounded-card border border-success-muted bg-success-muted/20 p-4">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground select-none">
            {isMulti(question) ? "Bonnes réponses" : "Bonne réponse"}
          </p>
          <p className="text-sm font-semibold">{formatAnswers(question, getCorrectAnswers(question))}</p>
        </div>
      </div>

      <div className="mt-4 rounded-card border border-border bg-card p-4">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground select-none">Explication</p>
        <p className="text-sm leading-relaxed">{question.explanation}</p>
      </div>
    </article>
  );
}

// ─── ExamLauncherView ─────────────────────────────────────────────────────────
function ExamLauncherView({
  examSetup, examCorrectionMode, setExamCorrectionMode,
  allExamSuites, allExamQuestions, filteredExamQuestions,
  normalizedSearch, globalSearch,
  openExamSetup, openRandomExam, beginExam,
}: {
  examSetup: { title: string; questions: ExamQuestion[] } | null;
  examCorrectionMode: ExamCorrectionMode;
  setExamCorrectionMode: (m: ExamCorrectionMode) => void;
  allExamSuites: any[];
  allExamQuestions: ExamQuestion[];
  filteredExamQuestions: ExamQuestion[];
  normalizedSearch: string;
  globalSearch: string;
  openExamSetup: (title: string, qs: ExamQuestion[]) => void;
  openRandomExam: (count: number) => void;
  beginExam: () => void;
}) {
  const modes = [
    { name: "Sprint",   count: 30, note: "Révision rapide ciblée",  duration: "~30 min", icon: Zap,    color: "text-warning" },
    { name: "Standard", count: 60, note: "Bon compromis pratique",   duration: "~60 min", icon: Target, color: "text-primary" },
    { name: "Complet",  count: 90, note: "Simulation finale réelle", duration: "~90 min", icon: Trophy, color: "text-primary" },
  ] as const;

  return (
    <div className="max-w-7xl mx-auto px-2 py-4 sm:p-6 space-y-8 animate-fade-in">
      {/* Hero Header */}
      <div className="rounded-card border border-border bg-card p-5 sm:p-8 shadow-sm">
        <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-primary select-none">
                Exam Launcher
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight leading-none">Choisis ton format d&apos;examen</h2>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed">
                Lance un examen fixe importé, un entraînement aléatoire ou une session ciblée. Chaque session inclut un timer, une grille de navigation, le suivi de confiance et une correction post-examen.
              </p>
            </div>
            
            {/* Quick stats board */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 select-none">
              {[
                { label: "Banque active", value: allExamQuestions.length, note: "questions" },
                { label: "Examens fixes", value: allExamSuites.length,    note: "sets prêts" },
                { label: "Mode conseillé", value: "90Q",                  note: "simulation" },
              ].map(({ label, value, note }) => (
                <div key={label} className="rounded-card border border-border bg-muted/50 p-3 sm:p-4 text-center hover:border-primary/30 transition duration-300">
                  <p className="text-xl sm:text-2xl font-black tabular-nums text-primary">{value}</p>
                  <p className="text-[10px] sm:text-xs font-bold mt-1">{label}</p>
                  <p className="text-[9px] text-muted-foreground mt-0.5 font-bold uppercase tracking-wider">{note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Correction settings box */}
          <div className="rounded-card border border-border bg-muted/40 p-4 sm:p-6 flex flex-col justify-between shadow-inner">
            <div>
              <h3 className="text-base font-black tracking-tight">Mode de correction</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-normal">Choisissez votre mode d&apos;apprentissage avant de lancer.</p>
              <div className="mt-4 space-y-2.5">
                {([
                  { id: "end",     label: "Correction à la fin",    note: "Proche des conditions de l'examen réel" },
                  { id: "instant", label: "Correction immédiate",   note: "Idéal pour apprendre activement" },
                ] as { id: ExamCorrectionMode; label: string; note: string }[]).map((opt) => (
                  <button key={opt.id} type="button" onClick={() => setExamCorrectionMode(opt.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-card border p-3.5 text-left transition duration-200 select-none shadow-sm",
                      examCorrectionMode === opt.id
                        ? "border-primary bg-primary text-primary-foreground scale-[1.01] ring-2 ring-primary/10"
                        : "border-border bg-card hover:border-primary/50 hover:bg-card/75"
                    )}>
                    <span className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                      examCorrectionMode === opt.id ? "border-primary-foreground bg-primary-foreground/30" : "border-muted-foreground"
                    )}>
                      {examCorrectionMode === opt.id && <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />}
                    </span>
                    <div>
                      <p className="text-xs sm:text-sm font-bold leading-tight">{opt.label}</p>
                      <p className={cn("text-[10px] mt-0.5 leading-snug", examCorrectionMode === opt.id ? "text-primary-foreground/75" : "text-muted-foreground")}>{opt.note}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {examSetup && (
              <div className="mt-4 rounded-card border border-primary bg-primary/5 p-4 shadow-sm animate-fade-in">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">Session prête</p>
                <p className="text-sm font-black mt-1 leading-snug">{examSetup.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{examSetup.questions.length} questions · {examCorrectionMode === "instant" ? "Correction immédiate" : "Correction finale"}</p>
                <button type="button" onClick={beginExam}
                  className="mt-3.5 w-full rounded-btn bg-primary py-2.5 text-sm font-bold text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.98] shadow-md shadow-primary/10">
                  Lancer la session →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick modes */}
      <div className="rounded-card border border-border bg-card p-5 sm:p-8 shadow-sm">
        <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground select-none">Entraînements Rapides Aléatoires</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {modes.map(({ name, count, note, duration, icon: Icon, color }) => (
            <button key={name} type="button" onClick={() => openRandomExam(count)}
              className="group flex flex-col items-start rounded-card border border-border bg-muted/40 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-card hover:shadow-md">
              <div className="mb-3 flex w-full items-center justify-between">
                <div className="rounded-lg bg-card border border-border p-2 group-hover:border-primary/20 transition-colors">
                  <Icon className={cn("h-6 w-6", color)} />
                </div>
                <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-black select-none tracking-wide text-primary shadow-sm">{count}Q</span>
              </div>
              <p className="text-lg font-black tracking-tight">{name}</p>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-normal">{note}</p>
              <p className="mt-4 text-xs font-black text-primary uppercase tracking-wider select-none">{duration}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Search results */}
      {normalizedSearch && filteredExamQuestions.length > 0 && (
        <div className="rounded-card border border-border bg-card p-5 sm:p-8 shadow-sm animate-fade-in">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground select-none">
            Résultats de recherche dans les examens — &quot;{globalSearch}&quot; ({filteredExamQuestions.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredExamQuestions.slice(0, 12).map((q) => (
              <article key={q.id} className="rounded-card border border-border bg-muted p-4 hover:border-primary/30 transition-colors duration-200">
                <div className="mb-2 flex flex-wrap gap-2 select-none">
                  <span className="rounded-full bg-card px-2.5 py-0.5 text-[9px] font-bold border border-border tracking-wider">{q.examTitle}</span>
                  <span className="rounded-full bg-card px-2.5 py-0.5 text-[9px] font-bold border border-border tracking-wider text-primary">Question {q.questionNumber}</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold leading-relaxed line-clamp-2">{q.question}</p>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Fixed exams list */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 select-none">
          <h2 className="text-xl font-black tracking-tight">Examens officiels et programmés</h2>
          <span className="text-xs font-bold bg-muted border border-border rounded-full px-3 py-1 text-muted-foreground">{allExamSuites.length} examens disponibles</span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {allExamSuites.map((exam: any) => (
            <ExamLaunchCard
              key={exam.id}
              title={exam.title}
              count={exam.questions.length}
              note={exam.source === "Professor Messer local import"
                ? "Examen fixe importé depuis Professor Messer."
                : "Examen complet auto-généré depuis la banque active."}
              onPrepare={() => openExamSetup(exam.title, exam.questions)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ExamSessionView ──────────────────────────────────────────────────────────
function ExamSessionView({
  activeExam, activeExamQuestion, examIndex, setExamIndex,
  examAnswers, examFlags, setExamFlags,
  examConfidence, setExamConfidence,
  examFinished, examElapsedSeconds,
  examCorrectCount, examAnsweredCount, examFlaggedCount,
  examConfidenceSummary, canShowExamCorrection,
  chooseExamAnswer, finishExam, returnToExamList,
}: any) {
  const [filter, setFilter] = useState("all");
  const [navOpen, setNavOpen] = useState(true);

  // Keyboard navigation & shortcuts
  useEffect(() => {
    if (examFinished) return;
    function onKey(e: KeyboardEvent) {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      
      // Answer selection
      if (["a","b","c","d","e","f"].includes(e.key.toLowerCase())) {
        e.preventDefault();
        const idx = e.key.toLowerCase().charCodeAt(0) - 97;
        if (activeExamQuestion && idx < activeExamQuestion.choices.length) {
          chooseExamAnswer(idx);
        }
      }
      
      // Question navigation
      if (e.key === "ArrowLeft" && examIndex > 0) {
        e.preventDefault();
        setExamIndex((i: number) => i - 1);
      }
      const totalQs = activeExam?.questions?.length ?? 0;
      if (e.key === "ArrowRight" && examIndex < totalQs - 1) {
        e.preventDefault();
        setExamIndex((i: number) => i + 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [examFinished, examIndex, activeExamQuestion, activeExam, chooseExamAnswer, setExamIndex]);

  const total = activeExam?.questions?.length ?? 0;
  const finalScore = examFinished ? Math.round((examCorrectCount / total) * 100) : 0;
  const passed = finalScore >= 75;

  const q = activeExamQuestion;
  const selected = q ? (examAnswers[q.id] || []) : [];
  const correctAnswers = q ? (q.answers?.length ? q.answers : [q.answer]) : [];
  const answered = selected.length > 0;
  const flagged = q ? examFlags[q.id] : false;

  const allQ = useMemo(() => activeExam?.questions ?? [], [activeExam]);
  const filteredQ = useMemo(() => {
    return allQ.filter((eq: any) => {
      if (filter === "all") return true;
      const s = examAnswers[eq.id] || [];
      const ca = eq.answers?.length ? eq.answers : [eq.answer];
      if (s.length === 0) return filter === "unanswered";
      const ok = s.length === ca.length && s.every((x: number, j: number) => x === ca[j]);
      if (filter === "errors") return !ok;
      if (filter === "correct") return ok;
      if (filter === "flagged") return examFlags[eq.id];
      return true;
    });
  }, [allQ, filter, examAnswers, examFlags]);

  // Confidence analysis
  const confidenceStats = useMemo(() => {
    let highCorrect = 0, highTotal = 0;
    let mediumCorrect = 0, mediumTotal = 0;
    let lowCorrect = 0, lowTotal = 0;

    allQ.forEach((eq: any) => {
      const conf = examConfidence[eq.id];
      const s = examAnswers[eq.id] || [];
      const ca = eq.answers?.length ? eq.answers : [eq.answer];
      const isAnsCorrect = s.length > 0 && s.length === ca.length && s.every((x: number, j: number) => x === ca[j]);
      
      if (conf === "high") {
        highTotal++;
        if (isAnsCorrect) highCorrect++;
      } else if (conf === "medium") {
        mediumTotal++;
        if (isAnsCorrect) mediumCorrect++;
      } else if (conf === "low") {
        lowTotal++;
        if (isAnsCorrect) lowCorrect++;
      }
    });

    return {
      high: { correct: highCorrect, total: highTotal, rate: highTotal ? Math.round((highCorrect / highTotal) * 100) : 0 },
      medium: { correct: mediumCorrect, total: mediumTotal, rate: mediumTotal ? Math.round((mediumCorrect / mediumTotal) * 100) : 0 },
      low: { correct: lowCorrect, total: lowTotal, rate: lowTotal ? Math.round((lowCorrect / lowTotal) * 100) : 0 }
    };
  }, [allQ, examAnswers, examConfidence]);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* TOP BAR */}
      <div className={cn("shrink-0 flex items-center justify-between px-6 py-3 border-b text-xs font-bold shadow-sm select-none transition-colors duration-300",
        examFinished ? (passed ? "bg-success-muted border-success-muted" : "bg-danger-muted border-danger-muted") : "bg-muted border-border")}>
        <div className="flex items-center gap-3">
          {examFinished ? <>{passed ? "🎉 Objectif atteint" : "⚠️ A reprendre"} · {finalScore}% ({examCorrectCount}/{total})</> : activeExam.title}
          <span className="text-muted-foreground font-normal">|</span>
          <span className="flex items-center gap-1 tabular-nums"><Timer className="h-3.5 w-3.5 shrink-0" /> {String(Math.floor(examElapsedSeconds/3600)).padStart(2,"0")}:{String(Math.floor((examElapsedSeconds%3600)/60)).padStart(2,"0")}:{String(examElapsedSeconds%60).padStart(2,"0")}</span>
        </div>
        <div className="flex items-center gap-2">
          {examFinished ? <>
            <span className="tabular-nums">{total>0?Math.round(examElapsedSeconds/total):0}s / question</span>
            <span className="text-muted-foreground font-normal">|</span>
            <span className="text-danger-fg font-black tabular-nums">{total-examCorrectCount} fautes</span>
          </> : <span>Question {examIndex+1} sur {total}</span>}
          <button onClick={() => setNavOpen((v: boolean) => !v)} title={navOpen ? "Masquer la grille" : "Afficher la grille"}
            className="rounded-btn border border-border bg-card px-2.5 py-1 text-xs font-bold hover:border-primary hover:text-primary transition-all active:scale-95 ml-2">
            {navOpen ? "◧ Masquer" : "▦ Grille"}
          </button>
          <button onClick={examFinished ? returnToExamList : finishExam} 
            className="rounded-btn border border-border bg-card px-3.5 py-1 text-xs font-black hover:border-primary hover:text-primary transition-all active:scale-95">
            {examFinished ? "Retour" : "Terminer"}
          </button>
        </div>
      </div>

      {/* SPLIT */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT: Nav */}
        {navOpen && (
        <div className="border-r border-border bg-muted/20 overflow-y-auto p-3 space-y-3 shrink-0 w-[190px] lg:w-[210px] select-none flex flex-col justify-between">
          <div className="space-y-3">
            {examFinished && (
              <>
                <button 
                  type="button"
                  onClick={() => setExamIndex(-1)}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-black border transition duration-300 select-none uppercase tracking-wider shadow-sm",
                    examIndex === -1 
                      ? "bg-primary text-white border-primary" 
                      : "bg-card text-muted-foreground border-border hover:bg-muted"
                  )}
                >
                  <Trophy className="h-4 w-4" />
                  <span>Résumé global</span>
                </button>
                <div className="flex flex-wrap gap-1 justify-center pt-1">
                  {[{k:"all",l:"Tout"},{k:"errors",l:"Erreurs"},{k:"correct",l:"Justes"},{k:"flagged",l:"Flags"}].map(({k,l}:any) => (
                    <button key={k} type="button" onClick={() => { setFilter(k); setExamIndex(-1); }} className={cn("rounded px-2 py-0.5 text-[9px] font-black transition-all duration-200 border",
                      filter===k?"bg-primary text-primary-foreground border-primary":"bg-card text-muted-foreground border-border hover:bg-muted")}>{l}</button>
                  ))}
                </div>
              </>
            )}
            <div className="grid grid-cols-5 gap-1.5 w-full mx-auto justify-items-center">
              {filteredQ.map((eq: any) => {
                const ri = allQ.indexOf(eq);
                const s = examAnswers[eq.id] || [];
                const ca = eq.answers?.length ? eq.answers : [eq.answer];
                const a = s.length > 0;
                const ok = a && s.length === ca.length && s.every((x: number, j: number) => x === ca[j]);
                const fg = examFlags[eq.id];
                const cur = ri === examIndex;
                return (
                  <button key={eq.id} type="button" onClick={() => setExamIndex(ri)}
                    className={cn("h-7 w-7 rounded-md text-[10px] font-mono font-black flex items-center justify-center border shrink-0 relative transition-all duration-200",
                      cur && "ring-2 ring-primary ring-offset-1 scale-105 z-10",
                      !examFinished && a && "bg-primary/20 text-primary border-primary",
                      !examFinished && !a && "bg-card text-muted-foreground border-border hover:border-primary/50 hover:scale-105",
                      examFinished && ok && "bg-success text-white border-success",
                      examFinished && a && !ok && "bg-danger text-white border-danger",
                      examFinished && !a && "bg-card text-muted-foreground border-border",
                    )}>{ri+1}{fg && <span className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-warning"/>}</button>
                );
              })}
            </div>
          </div>
          
          <div className="pt-2 border-t border-border flex flex-wrap gap-x-2 gap-y-1 text-[9px] text-muted-foreground justify-center select-none font-bold">
            {examFinished ? <>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded bg-success"/>Juste</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded bg-danger"/>Erreur</span>
            </> : <>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded bg-primary/30"/>Répondu</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded bg-warning"/>Flag</span>
            </>}
          </div>
        </div>
        )}

        {/* RIGHT: Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-muted/10">
          {examFinished && examIndex === -1 ? (
            <div className="animate-fade-in space-y-6 max-w-4xl mx-auto w-full">
              {/* Grand Score Card */}
              <div className="rounded-card border border-border bg-card p-6 sm:p-10 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-danger via-warning to-success" />
                <div className="space-y-3 text-center md:text-left flex-1">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider select-none",
                    passed ? "bg-success/15 text-success-fg" : "bg-danger/15 text-danger-fg"
                  )}>
                    {passed ? "🏆 Examen Validé !" : "⚠️ Seuil non atteint"}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black leading-tight mt-1">{activeExam.title}</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
                    {passed 
                      ? "Félicitations ! Vous maîtrisez la certification CompTIA Security+ SY0-701. Maintenez ce niveau d'excellence !"
                      : "Le score minimal requis est de 75%. Utilisez la grille pour analyser chaque concept non compris."}
                  </p>
                </div>

                {/* SVG circular score gauge */}
                <div className="relative shrink-0 select-none">
                  {(() => {
                    const radius = 55;
                    const strokeWidth = 10;
                    const circumference = 2 * Math.PI * radius;
                    const offset = circumference - (finalScore / 100) * circumference;
                    return (
                      <div className="relative flex items-center justify-center h-36 w-36">
                        <svg className="h-full w-full transform -rotate-90">
                          <circle cx="72" cy="72" r={radius} stroke="var(--border)" strokeWidth={strokeWidth} fill="transparent" className="opacity-45" />
                          <circle 
                            cx="72" 
                            cy="72" 
                            r={radius} 
                            stroke={passed ? "var(--success)" : finalScore >= 55 ? "var(--warning)" : "var(--danger)"} 
                            strokeWidth={strokeWidth} 
                            fill="transparent" 
                            strokeDasharray={circumference} 
                            strokeDashoffset={offset} 
                            strokeLinecap="round" 
                            className="transition-all duration-1000 ease-out"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-black tracking-tight">{finalScore}%</span>
                          <span className="text-[9px] uppercase font-black text-muted-foreground mt-0.5 tracking-wider">{passed ? "Admis" : "Échoué"}</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Stats Overview Grid */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 select-none">
                <div className="rounded-card bg-card p-5 border border-border text-center shadow-sm flex flex-col items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-success mb-2" />
                  <p className="text-3xl font-black text-success-fg tabular-nums leading-none">{examCorrectCount}</p>
                  <p className="text-xs font-bold text-foreground mt-2">Correctes</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">questions validées</p>
                </div>
                <div className="rounded-card bg-card p-5 border border-border text-center shadow-sm flex flex-col items-center justify-center">
                  <XCircle className="h-5 w-5 text-danger mb-2" />
                  <p className="text-3xl font-black text-danger-fg tabular-nums leading-none">{total - examCorrectCount - (total - examAnsweredCount)}</p>
                  <p className="text-xs font-bold text-foreground mt-2">Incorrectes</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">erreurs trouvées</p>
                </div>
                <div className="rounded-card bg-card p-5 border border-border text-center shadow-sm flex flex-col items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-muted-foreground mb-2" />
                  <p className="text-3xl font-black text-muted-foreground tabular-nums leading-none">{total - examAnsweredCount}</p>
                  <p className="text-xs font-bold text-foreground mt-2">Sautées</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">non répondues</p>
                </div>
                <div className="rounded-card bg-card p-5 border border-border text-center shadow-sm flex flex-col items-center justify-center">
                  <Flag className="h-5 w-5 text-warning mb-2" />
                  <p className="text-3xl font-black text-warning-fg tabular-nums leading-none">{examFlaggedCount}</p>
                  <p className="text-xs font-bold text-foreground mt-2">Marquées</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">drapeaux activés</p>
                </div>
              </div>

              {/* Confidence Analysis Card */}
              <div className="rounded-card border border-border bg-card p-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Analyse croisée de confiance</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Cet indicateur analyse votre taux de précision en fonction du niveau de confiance déclaré durant la session.
                </p>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "Confiance Élevée", stats: confidenceStats.high, color: "text-success-fg", bg: "bg-success/10", border: "border-success-muted" },
                    { label: "Confiance Moyenne", stats: confidenceStats.medium, color: "text-warning-fg", bg: "bg-warning/10", border: "border-warning-muted" },
                    { label: "Confiance Faible", stats: confidenceStats.low, color: "text-danger-fg", bg: "bg-danger/10", border: "border-danger-muted" }
                  ].map((item) => (
                    <div key={item.label} className={cn("rounded-card border p-4 sm:p-5 flex flex-col justify-between shadow-inner bg-muted/20", item.border)}>
                      <div>
                        <span className={cn("px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider select-none", item.color, item.bg)}>
                          {item.label}
                        </span>
                        <p className="mt-4 text-2xl font-black tabular-nums leading-none">{item.stats.rate}%</p>
                        <p className="text-[10px] text-muted-foreground font-bold mt-1.5">Précision</p>
                      </div>
                      <p className="mt-3 text-xs font-black text-foreground">
                        {item.stats.correct} / {item.stats.total} <span className="text-[10px] text-muted-foreground font-normal">correctes</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pedagogical recommendations */}
              <div className="rounded-card border-l-4 border-l-primary border border-border bg-card p-6 shadow-sm space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground select-none">Conseils pédagogiques personnalisés</h3>
                <div className="text-xs sm:text-sm space-y-2 leading-relaxed text-foreground">
                  {passed ? (
                    <p>
                      🎉 **Excellent travail !** Vous maîtrisez le programme de l&apos;examen Security+ SY0-701. Vos statistiques indiquent une préparation solide. Nous vous recommandons de réviser légèrement vos fiches de flashcards sur les ports/protocoles et de vous exercer sur des PBQ de type terminal pour valider définitivement vos acquis pratiques.
                    </p>
                  ) : (
                    <p>
                      💡 **Plan d&apos;action conseillé :**
                      <br />
                      1. **Révisez vos erreurs** : Cliquez sur les cases rouges dans la Sidebar pour revoir chaque question manquée.
                      <br />
                      2. **Analysez votre confiance** : Si vous constatez un faible taux de réussite sur les questions étiquetées *Confiance Élevée*, cela signale des pièges ou des concepts mal compris.
                      <br />
                      3. **Pratiquez en Mode Erreur** : Retournez sur le tableau de bord et lancez un **Quiz en Mode Erreur** pour cibler spécifiquement les questions manquées.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : !q ? (
            <div className="rounded-card border border-border bg-card p-12 text-center shadow-inner max-w-lg mx-auto select-none mt-12">
              <Trophy className="mx-auto h-12 w-12 text-muted-foreground mb-3 animate-pulse" />
              <p className="text-base font-bold">Sélectionnez une question</p>
              <p className="mt-1 text-sm text-muted-foreground">Utilisez la grille latérale pour afficher les détails ou voir le résumé global.</p>
            </div>
          ) : examFinished ? (
            <div className="animate-fade-in space-y-5 max-w-3xl mx-auto w-full">
              {/* Question correction details */}
              <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                <div className="flex flex-wrap items-center gap-2 mb-4 select-none">
                  {(() => { try { if (typeof window === "undefined") return null; const errors = JSON.parse(localStorage.getItem("certiflow-errors") || "[]"); const found = errors.find((e: any) => e.questionId === q.id); if (found) return <span className="rounded-full bg-danger/10 border border-danger/25 px-2.5 py-0.5 text-[9px] font-black text-danger-fg uppercase tracking-wider">Ratée {found.count}x</span>; } catch {} return null; })()}
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-muted-foreground font-mono">Question {examIndex+1}</span>
                  {flagged && <span className="rounded-full bg-warning/10 border border-warning/20 px-2.5 py-0.5 text-[9px] font-black text-warning-fg uppercase tracking-wider">Flagged</span>}
                  {examConfidence[q.id] && (
                    <span className={cn(
                      "rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider border",
                      examConfidence[q.id] === "high" ? "bg-success/10 border-success-muted text-success-fg" :
                      examConfidence[q.id] === "medium" ? "bg-warning/10 border-warning-muted text-warning-fg" :
                      "bg-danger/10 border-danger-muted text-danger-fg"
                    )}>
                      Confiance : {examConfidence[q.id] === "high" ? "Élevée" : examConfidence[q.id] === "medium" ? "Moyenne" : "Faible"}
                    </span>
                  )}
                </div>
                <p className="text-base sm:text-lg font-black leading-relaxed text-foreground">{q.question}</p>
              </div>

              {/* Choices comparison details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-danger-muted bg-danger-muted/30 p-5 shadow-sm">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-danger-fg select-none">Votre choix</p>
                  <p className="text-sm font-semibold">{selected.length ? selected.map((i: number) => q.choices[i]).join(" | ") : "Aucune réponse"}</p>
                </div>
                <div className="rounded-xl border border-success-muted bg-success-muted/30 p-5 shadow-sm">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-success-fg select-none">Bonne réponse</p>
                  <p className="text-sm font-semibold">{correctAnswers.map((i: number) => q.choices[i]).join(" | ")}</p>
                </div>
              </div>

              {/* Correction explanation */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm border-l-4 border-l-success">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground select-none">Explication</p>
                <p className="text-sm leading-relaxed text-foreground">{q.explanation}</p>
              </div>

              {/* Correction Navigation Footer */}
              <div className="flex items-center justify-between pt-2 select-none gap-4">
                <button type="button" onClick={() => setExamIndex((i: number) => Math.max(0, i-1))} disabled={examIndex===0}
                  className="rounded-btn border border-border bg-card px-4 py-2.5 text-xs font-black hover:border-primary transition duration-200 disabled:opacity-30 flex items-center gap-1 shadow-sm">
                  ← Précédent
                </button>
                <button type="button" onClick={() => setExamIndex((i: number) => Math.min(total-1, i+1))} disabled={examIndex>=total-1}
                  className="rounded-btn border border-border bg-card px-4 py-2.5 text-xs font-black hover:border-primary transition duration-200 disabled:opacity-30 flex items-center gap-1 shadow-sm">
                  Suivant →
                </button>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in space-y-5 max-w-3xl mx-auto w-full">
              {/* Question session box */}
              <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-4 select-none">
                  {(() => { try { if (typeof window === "undefined") return null; const errors = JSON.parse(localStorage.getItem("certiflow-errors") || "[]"); const found = errors.find((e: any) => e.questionId === q.id); if (found) return <span className="rounded-full bg-danger/10 border border-danger/25 px-2.5 py-0.5 text-[9px] font-black text-danger-fg uppercase tracking-wider">Ratée {found.count}x</span>; } catch {} return null; })()}
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-muted-foreground font-mono">Question {examIndex+1} sur {total}</span>
                  {flagged && <span className="rounded-full bg-warning/10 border border-warning/20 px-2.5 py-0.5 text-[9px] font-black text-warning-fg uppercase tracking-wider">Flagged</span>}
                  <button type="button" onClick={() => setExamFlags((items: any) => ({...items, [q.id]: !items[q.id]}))}
                    className="ml-auto rounded-btn border border-border bg-card px-3 py-1 text-[10px] font-black hover:border-warning hover:text-warning-fg transition duration-200 shadow-sm flex items-center gap-1 active:scale-95">
                    <Flag className={cn("h-3 w-3 shrink-0", flagged && "fill-warning text-warning-fg")} />
                    <span>{flagged ? "Déflaguer" : "Flag"}</span>
                  </button>
                </div>
                
                <p className="text-base sm:text-lg font-black leading-relaxed mb-6 text-foreground">{q.question}</p>
                
                <div className="grid gap-3 select-none">
                  {q.choices.slice(0,6).map((choice: string, i: number) => {
                    const sel = selected.includes(i);
                    return (
                      <button key={i} type="button" onClick={() => chooseExamAnswer(i)}
                        className={cn("flex items-center gap-4 rounded-xl border px-5 py-4 text-left text-xs sm:text-sm transition duration-200 hover:border-primary active:scale-[0.99] w-full shadow-sm",
                          sel ? "border-primary bg-primary/5 font-black text-primary" : "border-border bg-card text-foreground")}>
                        <span className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black transition-colors duration-200",
                          sel ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>{String.fromCharCode(65+i)}</span>
                        <span className="leading-snug flex-1">{choice}</span>
                        <kbd className="ml-auto hidden sm:inline-block text-[9px] font-mono bg-muted px-2 py-0.5 rounded border border-border text-muted-foreground uppercase font-black">
                          {String.fromCharCode(65+i)}
                        </kbd>
                      </button>
                    );
                  })}
                </div>
                
                {/* Confidence tracker and shortcuts notice */}
                <div className="mt-6 pt-5 border-t border-border flex flex-wrap gap-3 items-center justify-between select-none">
                  <ConfidenceSelector 
                    value={examConfidence[q.id]}
                    onChange={(val) => setExamConfidence((prev: any) => ({ ...prev, [q.id]: val }))}
                  />
                  <span className="text-[9px] text-muted-foreground font-mono font-bold hidden sm:inline select-none bg-muted px-2 py-0.5 rounded border border-border uppercase">
                    Raccourcis : [A]..[F] · [←] Précédent · [→] Suivant
                  </span>
                </div>
              </div>
              
              {/* Session unified navigation buttons */}
              <div className="flex items-center justify-between pt-2 select-none gap-4">
                <button type="button" onClick={() => setExamIndex((i: number) => Math.max(0, i-1))} disabled={examIndex===0}
                  className="rounded-btn border border-border bg-card px-5 py-2.5 text-xs font-black hover:border-primary hover:text-primary transition duration-200 disabled:opacity-30 shadow-sm active:scale-95">
                  ← Précédent
                </button>
                <button type="button" onClick={() => setExamIndex((i: number) => Math.min(total-1, i+1))} disabled={examIndex>=total-1}
                  className="rounded-btn border border-border bg-card px-5 py-2.5 text-xs font-black hover:border-primary hover:text-primary transition duration-200 disabled:opacity-30 shadow-sm active:scale-95">
                  Suivant →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ExamView(props: {
  // launcher
  examSetup: { title: string; questions: ExamQuestion[] } | null;
  examCorrectionMode: ExamCorrectionMode;
  setExamCorrectionMode: (m: ExamCorrectionMode) => void;
  allExamSuites: any[];
  allExamQuestions: ExamQuestion[];
  filteredExamQuestions: ExamQuestion[];
  normalizedSearch: string;
  globalSearch: string;
  openExamSetup: (title: string, qs: ExamQuestion[]) => void;
  openRandomExam: (count: number) => void;
  beginExam: () => void;
  // session
  activeExam: ActiveExam | null;
  activeExamQuestion: ExamQuestion | undefined;
  examIndex: number;
  setExamIndex: (i: number | ((p: number) => number)) => void;
  examAnswers: Record<string, number[]>;
  examFlags: Record<string, boolean>;
  setExamFlags: (fn: (p: Record<string, boolean>) => Record<string, boolean>) => void;
  examConfidence: Record<string, ExamConfidence>;
  setExamConfidence: (fn: (p: Record<string, ExamConfidence>) => Record<string, ExamConfidence>) => void;
  examFinished: boolean;
  examElapsedSeconds: number;
  examCorrectCount: number;
  examAnsweredCount: number;
  examFlaggedCount: number;
  examConfidenceSummary: { low: number; medium: number; high: number };
  canShowExamCorrection: boolean;
  chooseExamAnswer: (i: number) => void;
  finishExam: () => void;
  returnToExamList: () => void;
}) {
  if (props.activeExam) {
    return (
      <ExamSessionView
        activeExam={props.activeExam}
        activeExamQuestion={props.activeExamQuestion}
        examIndex={props.examIndex}
        setExamIndex={props.setExamIndex}
        examAnswers={props.examAnswers}
        examFlags={props.examFlags}
        setExamFlags={props.setExamFlags}
        examConfidence={props.examConfidence}
        setExamConfidence={props.setExamConfidence}
        examFinished={props.examFinished}
        examElapsedSeconds={props.examElapsedSeconds}
        examCorrectCount={props.examCorrectCount}
        examAnsweredCount={props.examAnsweredCount}
        examFlaggedCount={props.examFlaggedCount}
        examConfidenceSummary={props.examConfidenceSummary}
        canShowExamCorrection={props.canShowExamCorrection}
        chooseExamAnswer={props.chooseExamAnswer}
        finishExam={props.finishExam}
        returnToExamList={props.returnToExamList}
      />
    );
  }

  return (
    <ExamLauncherView
      examSetup={props.examSetup}
      examCorrectionMode={props.examCorrectionMode}
      setExamCorrectionMode={props.setExamCorrectionMode}
      allExamSuites={props.allExamSuites}
      allExamQuestions={props.allExamQuestions}
      filteredExamQuestions={props.filteredExamQuestions}
      normalizedSearch={props.normalizedSearch}
      globalSearch={props.globalSearch}
      openExamSetup={props.openExamSetup}
      openRandomExam={props.openRandomExam}
      beginExam={props.beginExam}
    />
  );
}
