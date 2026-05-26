"use client";

import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
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

// ─── pure helpers (mirrored from page.tsx) ───────────────────────────────────
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
    { id: "low",    label: "Faible",  active: "border-danger-muted bg-danger-muted text-danger-fg" },
    { id: "medium", label: "Moyen",   active: "border-warning-muted bg-warning-muted text-warning-fg" },
    { id: "high",   label: "Élevé",   active: "border-success-muted bg-success-muted text-success-fg" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-bold text-muted-foreground">Confiance:</span>
      {opts.map((o) => (
        <button key={o.id} type="button" onClick={() => onChange(o.id)}
          className={cn(
            "rounded-btn border px-2.5 py-1 text-xs font-bold transition",
            value === o.id ? o.active : "border-border bg-muted text-muted-foreground hover:border-primary"
          )}>
          {o.label}
        </button>
      ))}
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
    <div className="rounded-card border border-border bg-card p-1 shadow-sm">
      <div className="mb-1.5 flex flex-wrap gap-x-2 gap-y-0 text-[8px] font-bold text-muted-foreground">
        <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full border-2 border-primary" /> Active</span>
        <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-success/20" /> Répondue</span>
        <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> PBQ</span>
        <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Flagged</span>
        {showCorrection && (
          <>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-success" /> Correct</span>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-danger" /> Incorrect</span>
          </>
        )}
      </div>
      <div className="grid grid-cols-10 gap-1.5 w-full max-w-lg mx-auto overflow-y-auto p-1 max-h-40">
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
                "aspect-square w-full max-w-[36px] h-auto flex items-center justify-center rounded border text-[9px] font-mono font-bold transition",
                current  && "border-primary bg-primary text-primary-foreground ring-2 ring-primary/20 z-10",
                !current && !answered && "border-border bg-muted text-muted-foreground hover:border-primary",
                !current && answered && !correct && !wrong && "border-success-muted bg-success-muted text-success-fg",
                !current && flagged  && "border-warning-muted bg-warning-muted text-warning-fg",
                !current && correct  && "bg-success text-white",
                !current && wrong    && "bg-danger text-white",
              )}>
              {i + 1}
              {pbq && <span className="absolute -top-0.5 -right-0.5 h-1 w-1 rounded-full border border-card bg-cyan-400" />}
              {flagged && !current && <span className="absolute -bottom-0.5 -right-0.5 h-1 w-1 rounded-full border border-card bg-warning" />}
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
    <article className="group flex flex-col rounded-card border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md">
      <div className="flex-1 p-2.5">
        <div className="mb-2 flex items-start justify-between gap-1.5">
          <span className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider",
            isMesser ? "bg-muted text-muted-foreground" : "bg-muted text-primary"
          )}>
            {isMesser ? "Professor Messer" : "Auto-généré"}
          </span>
          <div className="text-right">
            <p className="text-2xl font-black tabular-nums text-primary">{count}</p>
            <p className="text-[10px] text-muted-foreground">questions</p>
          </div>
        </div>
        <h3 className="font-black leading-snug">{title}</h3>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> ~{estimate} min</span>
          <span className="flex items-center gap-1"><Target className="h-3 w-3" /> Grille + correction</span>
        </div>
      </div>
      <div className="border-t border-border p-3">
        <button type="button" onClick={onPrepare}
          className="w-full rounded-btn bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition hover:opacity-90">
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
      "mt-2 rounded-card border p-2.5 shadow-sm",
      correct ? "border-success-muted bg-success-muted" : priority ? "border-danger-muted bg-danger-muted" : "border-border bg-card"
    )}>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className={cn(
          "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-black",
          unanswered ? "bg-muted text-muted-foreground"
          : correct ? "bg-success text-white"
          : "bg-danger text-white"
        )}>
          {unanswered ? "Non répondu" : correct
            ? <><CheckCircle2 className="h-3.5 w-3.5" /> Correct</>
            : <><XCircle className="h-3.5 w-3.5" /> Incorrect</>}
        </span>
        {flagged && <span className="inline-flex items-center gap-1 rounded-full bg-warning-muted px-2 py-0.5 text-xs font-bold text-warning-fg"><Flag className="h-3 w-3" /> Flagged</span>}
        {isPBQ(question) && <span className="rounded-full bg-cyan-100 px-2 py-0.5 text-xs font-bold text-cyan-700">PBQ</span>}
        {isMulti(question) && <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-bold text-primary">{getCorrectAnswers(question).length} bonnes réponses</span>}
        {confidence && <span className={cn("rounded-full px-2 py-0.5 text-xs font-bold",
          confidence === "low" ? "bg-danger-muted text-danger-fg" : confidence === "medium" ? "bg-warning-muted text-warning-fg" : "bg-success-muted text-success-fg"
        )}>Confiance: {confidence}</span>}
        <span className="ml-auto text-xs text-muted-foreground">Q{index + 1}</span>
      </div>

      <h4 className="text-base font-black leading-snug">{question.question}</h4>

      <div className="mt-2 grid gap-1.5 lg:grid-cols-2">
        <div className={cn("rounded-card border p-3",
          unanswered ? "border-muted bg-muted/50" : correct ? "border-success-muted bg-success-muted" : "border-danger-muted bg-danger-muted"
        )}>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Votre réponse</p>
          <p className="text-sm font-semibold">{formatAnswers(question, selected)}</p>
        </div>
        <div className="rounded-card border border-success-muted bg-success-muted p-3">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {isMulti(question) ? "Bonnes réponses" : "Bonne réponse"}
          </p>
          <p className="text-sm font-semibold">{formatAnswers(question, getCorrectAnswers(question))}</p>
        </div>
      </div>

      <div className="mt-3 rounded-card border border-border bg-card p-3">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Explication</p>
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
    <div className="space-y-5">
      {/* Hero */}
      <div className="rounded-card border border-border bg-card p-2.5 shadow-sm">
        <div className="grid gap-1.5 xl:grid-cols-[1fr_320px]">
          <div>
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">Exam Launcher</span>
            <h2 className="mt-3 text-3xl font-black">Choisis ton format d'examen</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Lance un examen fixe importé, un entraînement aléatoire ou une session ciblée. Chaque session inclut timer, grille de navigation, confidence tracking et revue post-examen.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-1.5">
              {[
                { label: "Banque active", value: allExamQuestions.length, note: "questions" },
                { label: "Examens fixes", value: allExamSuites.length,    note: "sets prêts" },
                { label: "Mode conseillé", value: "90Q",                  note: "simulation finale" },
              ].map(({ label, value, note }) => (
                <div key={label} className="rounded-card border border-border bg-muted p-3 text-center">
                  <p className="text-2xl font-black tabular-nums text-primary">{value}</p>
                  <p className="text-xs font-bold">{label}</p>
                  <p className="text-[10px] text-muted-foreground">{note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Correction settings */}
          <div className="rounded-card border border-border bg-muted p-2.5">
            <h3 className="font-black">Mode de correction</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">Choisissez avant de lancer.</p>
            <div className="mt-2 space-y-2">
              {([
                { id: "end",     label: "Correction à la fin",    note: "Proche de l'examen réel" },
                { id: "instant", label: "Correction immédiate",   note: "Idéal pour l'apprentissage" },
              ] as { id: ExamCorrectionMode; label: string; note: string }[]).map((opt) => (
                <button key={opt.id} type="button" onClick={() => setExamCorrectionMode(opt.id)}
                  className={cn(
                    "flex w-full items-center gap-1.5 rounded-card border p-3 text-left transition",
                    examCorrectionMode === opt.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card hover:border-primary/50"
                  )}>
                  <span className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
                    examCorrectionMode === opt.id ? "border-primary-foreground bg-primary-foreground/30" : "border-muted-foreground"
                  )}>
                    {examCorrectionMode === opt.id && <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />}
                  </span>
                  <div>
                    <p className="text-sm font-bold">{opt.label}</p>
                    <p className={cn("text-xs", examCorrectionMode === opt.id ? "text-primary-foreground/70" : "text-muted-foreground")}>{opt.note}</p>
                  </div>
                </button>
              ))}
            </div>
            {examSetup && (
              <div className="mt-2 rounded-card border border-primary bg-primary/10 p-2.5">
                <p className="text-sm font-black">{examSetup.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{examSetup.questions.length} questions · {examCorrectionMode === "instant" ? "correction immédiate" : "correction finale"}</p>
                <button type="button" onClick={beginExam}
                  className="mt-3 w-full rounded-btn bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition hover:opacity-90">
                  Lancer la session →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick modes */}
      <div className="rounded-card border border-border bg-card p-2.5 shadow-sm">
        <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">Modes rapides</h2>
        <div className="grid gap-1.5 md:grid-cols-3">
          {modes.map(({ name, count, note, duration, icon: Icon, color }) => (
            <button key={name} type="button" onClick={() => openRandomExam(count)}
              className="group flex flex-col items-start rounded-card border border-border bg-muted p-2.5 text-left transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-card hover:shadow-md">
              <div className="mb-2 flex w-full items-center justify-between">
                <Icon className={cn("h-6 w-6", color)} />
                <span className="rounded-full border border-border bg-card px-2.5 py-0.5 text-xs font-black">{count}Q</span>
              </div>
              <p className="text-lg font-black">{name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{note}</p>
              <p className="mt-3 text-xs font-bold text-primary">{duration}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Search results */}
      {normalizedSearch && filteredExamQuestions.length > 0 && (
        <div className="rounded-card border border-border bg-card p-2.5 shadow-sm">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Résultats dans les examens — "{globalSearch}" ({filteredExamQuestions.length})
          </h2>
          <div className="grid gap-1.5 md:grid-cols-2">
            {filteredExamQuestions.slice(0, 12).map((q) => (
              <article key={q.id} className="rounded-card border border-border bg-muted p-3">
                <div className="mb-2 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-card px-2 py-0.5 text-[10px] font-bold border border-border">{q.examTitle}</span>
                  <span className="rounded-full bg-card px-2 py-0.5 text-[10px] font-bold border border-border">Q{q.questionNumber}</span>
                </div>
                <p className="text-sm font-semibold line-clamp-2">{q.question}</p>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Fixed exams */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-black">Examens fixes importés</h2>
          <span className="text-sm text-muted-foreground">{allExamSuites.length} examens disponibles</span>
        </div>
        <div className="grid gap-1.5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
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
  if (!activeExamQuestion) return <p className="p-4">Aucune question.</p>;
  
  const q = activeExamQuestion;
  const total = activeExam.questions.length;
  const selected = examAnswers[q.id] || [];
  const correctAnswers = q.answers?.length ? q.answers : [q.answer];
  const answered = selected.length > 0;
  const flagged = examFlags[q.id];
  const finalScore = examFinished ? Math.round((examCorrectCount / total) * 100) : 0;
  const passed = finalScore >= 75;

  const allQ = activeExam.questions;
  const filteredQ = allQ.filter((eq: any, i: number) => {
    if (filter === "all") return true;
    const s = examAnswers[eq.id] || [];
    const ca = eq.answers?.length ? eq.answers : [eq.answer];
    if (s.length === 0) return filter === "unanswered";
    const ok = s.length === ca.length && s.every((a: number, j: number) => a === ca[j]);
    if (filter === "errors") return !ok;
    if (filter === "correct") return ok;
    if (filter === "flagged") return examFlags[eq.id];
    return true;
  });

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* TOP BAR */}
      <div className={cn("shrink-0 flex items-center justify-between px-4 py-2 border-b text-xs font-bold",
        examFinished ? (passed ? "bg-success-muted border-success-muted" : "bg-danger-muted border-danger-muted") : "bg-muted border-border")}>
        <div className="flex items-center gap-3">
          {examFinished ? <>{passed ? "Objectif atteint" : "A reprendre"} · {finalScore}% ({examCorrectCount}/{total})</> : activeExam.title}
          <span className="text-muted-foreground">|</span>
          <span>{String(Math.floor(examElapsedSeconds/3600)).padStart(2,"0")}:{String(Math.floor((examElapsedSeconds%3600)/60)).padStart(2,"0")}:{String(examElapsedSeconds%60).padStart(2,"0")}</span>
        </div>
        <div className="flex items-center gap-2">
          {examFinished ? <>
            <span>{total>0?Math.round(examElapsedSeconds/total):0}s/q</span>
            <span className="text-muted-foreground">|</span>
            <span>{total-examCorrectCount} fautes</span>
          </> : <span>Q{examIndex+1}/{total}</span>}
          <button onClick={() => setNavOpen((v: boolean) => !v)} title={navOpen ? "Masquer la grille" : "Afficher la grille"}
            className="rounded-btn border px-2 py-0.5 text-xs font-bold hover:border-primary">
            {navOpen ? "◧" : "▦"}
          </button>
          <button onClick={examFinished ? returnToExamList : finishExam} className="rounded-btn border px-2.5 py-1 text-xs font-bold hover:border-primary">
            {examFinished ? "Retour" : "Terminer"}
          </button>
        </div>
      </div>

      {/* SPLIT */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT: Nav */}
        {navOpen && (
        <div className="border-r border-border bg-muted/30 overflow-y-auto p-2 space-y-1.5 shrink-0 w-[180px] lg:w-[200px]">
          {examFinished && (
            <div className="flex flex-wrap gap-0.5">
              {[{k:"all",l:"Tout"},{k:"errors",l:"Erreurs"},{k:"correct",l:"Justes"},{k:"flagged",l:"Flags"}].map(({k,l}:any) => (
                <button key={k} onClick={() => setFilter(k)} className={cn("rounded px-1.5 py-0.5 text-[9px] font-bold",
                  filter===k?"bg-primary text-primary-foreground":"bg-card text-muted-foreground border border-border")}>{l}</button>
              ))}
            </div>
          )}
          <div className="grid grid-cols-5 gap-1 w-full max-w-[210px] mx-auto">
            {filteredQ.map((eq: any, idx: number) => {
              const ri = allQ.indexOf(eq);
              const s = examAnswers[eq.id] || [];
              const ca = eq.answers?.length ? eq.answers : [eq.answer];
              const a = s.length > 0;
              const ok = a && s.length === ca.length && s.every((x: number, j: number) => x === ca[j]);
              const fg = examFlags[eq.id];
              const cur = ri === examIndex;
              return (
                <button key={eq.id} onClick={() => setExamIndex(ri)}
                  className={cn("h-7 w-7 rounded-md text-[10px] font-mono font-bold flex items-center justify-center border shrink-0 relative",
                    cur && "ring-2 ring-foreground ring-offset-1 scale-105 z-10",
                    !examFinished && a && "bg-primary text-white border-primary",
                    !examFinished && !a && "bg-card text-muted-foreground border-border hover:scale-105",
                    examFinished && ok && "bg-success text-white border-success",
                    examFinished && a && !ok && "bg-danger text-white border-danger",
                    examFinished && !a && "bg-card text-muted-foreground border-border",
                  )}>{ri+1}{fg && <span className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-warning"/>}</button>
              );
            })}
          </div>
          <div className="pt-1.5 border-t border-border flex flex-wrap gap-x-2 gap-y-0.5 text-[9px] text-muted-foreground">
            {examFinished ? <>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded bg-success"/>Juste</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded bg-danger"/>Erreur</span>
            </> : <>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded bg-primary"/>Repondu</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded bg-warning"/>Flag</span>
            </>}
          </div>
        </div>
        )}

        {/* RIGHT: Content */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {examFinished ? <>
            <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                {(() => { try { if (typeof window === "undefined") return null; const errors = JSON.parse(localStorage.getItem("certiflow-errors") || "[]"); const found = errors.find((e: any) => e.questionId === q.id); if (found) return <span className="rounded-full bg-danger-muted px-2 py-0.5 text-[10px] font-bold text-danger-fg">Ratee {found.count}x</span>; } catch {} return null; })()}
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold">Q{examIndex+1}</span>
                {flagged && <span className="rounded-full bg-warning-muted px-2 py-0.5 text-[10px] font-bold text-warning-fg">Flagged</span>}
              </div>
              <p className="text-sm font-semibold leading-relaxed">{q.question}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="rounded-lg border border-danger-muted bg-danger-muted/50 p-3">
                <p className="mb-1 text-[10px] font-bold uppercase text-danger-fg">Votre choix</p>
                <p className="text-xs">{selected.length ? selected.map((i: number) => q.choices[i]).join(" | ") : "Aucune reponse"}</p>
              </div>
              <div className="rounded-lg border border-success-muted bg-success-muted/50 p-3">
                <p className="mb-1 text-[10px] font-bold uppercase text-success-fg">Bonne reponse</p>
                <p className="text-xs">{correctAnswers.map((i: number) => q.choices[i]).join(" | ")}</p>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <p className="mb-1 text-[10px] font-bold uppercase text-muted-foreground">Explication</p>
              <p className="text-xs leading-relaxed">{q.explanation}</p>
            </div>
          </> : <>
            <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                {(() => { try { if (typeof window === "undefined") return null; const errors = JSON.parse(localStorage.getItem("certiflow-errors") || "[]"); const found = errors.find((e: any) => e.questionId === q.id); if (found) return <span className="rounded-full bg-danger-muted px-2 py-0.5 text-[10px] font-bold text-danger-fg">Ratee {found.count}x</span>; } catch {} return null; })()}
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold">Q{examIndex+1}/{total}</span>
                {flagged && <span className="rounded-full bg-warning-muted px-2 py-0.5 text-[10px] font-bold text-warning-fg">Flagged</span>}
                <button onClick={() => setExamFlags((items: any) => ({...items, [q.id]: !items[q.id]}))}
                  className="ml-auto rounded-btn border px-2 py-0.5 text-[10px] font-bold hover:border-warning">{flagged?"Deflaguer":"Flag"}</button>
              </div>
              <p className="text-sm font-semibold leading-relaxed mb-4">{q.question}</p>
              <div className="grid gap-1.5">
                {q.choices.slice(0,6).map((choice: string, i: number) => {
                  const sel = selected.includes(i);
                  return (
                    <button key={i} onClick={() => chooseExamAnswer(i)}
                      className={cn("flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-xs transition hover:border-primary",
                        sel ? "border-primary bg-primary/10 font-bold" : "border-border bg-card")}>
                      <span className={cn("flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold",
                        sel ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>{String.fromCharCode(65+i)}</span>
                      {choice}
                    </button>
                  );
                })}
              </div>
            </div>
          </>}
          <div className="flex items-center justify-between pt-1">
            <button onClick={() => setExamIndex((i: number) => Math.max(0, i-1))} disabled={examIndex===0}
              className="rounded-btn border px-3 py-1.5 text-xs font-bold hover:border-primary disabled:opacity-30">← Precedent</button>
            <button onClick={() => setExamIndex((i: number) => Math.min(total-1, i+1))} disabled={examIndex>=total-1}
              className="rounded-btn border px-3 py-1.5 text-xs font-bold hover:border-primary disabled:opacity-30">Suivant →</button>
          </div>
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
  if (props.activeExam && props.activeExamQuestion) {
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
