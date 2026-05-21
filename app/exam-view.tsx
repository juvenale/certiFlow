"use client";

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
      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black transition-colors",
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
    <div className="rounded-card border border-border bg-card p-3">
      <div className="mb-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-bold text-muted-foreground">
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full border-2 border-primary" /> Active</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-success/20" /> Répondue</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-cyan-400" /> PBQ</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-amber-400" /> Flagged</span>
        {showCorrection && (
          <>
            <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-success" /> Correct</span>
            <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-danger" /> Incorrect</span>
          </>
        )}
      </div>
      <div className="grid max-h-72 grid-cols-[repeat(auto-fill,minmax(30px,1fr))] gap-1.5 overflow-y-auto pr-1">
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
                "relative grid h-8 min-w-8 place-items-center rounded-full border text-[10px] font-black transition",
                current  && "border-primary bg-primary text-primary-foreground ring-4 ring-primary/20",
                !current && !answered && "border-border bg-muted text-muted-foreground hover:border-primary",
                !current && answered && !correct && !wrong && "border-success-muted bg-success-muted text-success-fg",
                !current && flagged  && "border-warning-muted bg-warning-muted text-warning-fg",
                !current && correct  && "bg-success text-white",
                !current && wrong    && "bg-danger text-white",
              )}>
              {i + 1}
              {pbq && <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border border-card bg-cyan-400" />}
              {flagged && !current && <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border border-card bg-amber-400" />}
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
      <div className="flex-1 p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
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
        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
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
      "mt-4 rounded-card border p-5 shadow-sm",
      correct ? "border-success-muted bg-success-muted" : priority ? "border-danger-muted bg-danger-muted" : "border-border bg-card"
    )}>
      <div className="mb-3 flex flex-wrap items-center gap-2">
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

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
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
    { name: "Sprint",   count: 30, note: "Révision rapide ciblée",  duration: "~30 min", icon: Zap,    color: "text-amber-500" },
    { name: "Standard", count: 60, note: "Bon compromis pratique",   duration: "~60 min", icon: Target, color: "text-blue-500" },
    { name: "Complet",  count: 90, note: "Simulation finale réelle", duration: "~90 min", icon: Trophy, color: "text-violet-500" },
  ] as const;

  return (
    <div className="space-y-5">
      {/* Hero */}
      <div className="rounded-card border border-border bg-card p-6 shadow-sm">
        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <div>
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">Exam Launcher</span>
            <h2 className="mt-3 text-3xl font-black">Choisis ton format d'examen</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Lance un examen fixe importé, un entraînement aléatoire ou une session ciblée. Chaque session inclut timer, grille de navigation, confidence tracking et revue post-examen.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3">
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
          <div className="rounded-card border border-border bg-muted p-4">
            <h3 className="font-black">Mode de correction</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">Choisissez avant de lancer.</p>
            <div className="mt-4 space-y-2">
              {([
                { id: "end",     label: "Correction à la fin",    note: "Proche de l'examen réel" },
                { id: "instant", label: "Correction immédiate",   note: "Idéal pour l'apprentissage" },
              ] as { id: ExamCorrectionMode; label: string; note: string }[]).map((opt) => (
                <button key={opt.id} type="button" onClick={() => setExamCorrectionMode(opt.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-card border p-3 text-left transition",
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
              <div className="mt-4 rounded-card border border-primary bg-primary/10 p-4">
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
      <div className="rounded-card border border-border bg-card p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">Modes rapides</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {modes.map(({ name, count, note, duration, icon: Icon, color }) => (
            <button key={name} type="button" onClick={() => openRandomExam(count)}
              className="group flex flex-col items-start rounded-card border border-border bg-muted p-5 text-left transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-card hover:shadow-md">
              <div className="mb-3 flex w-full items-center justify-between">
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
        <div className="rounded-card border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Résultats dans les examens — "{globalSearch}" ({filteredExamQuestions.length})
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {filteredExamQuestions.slice(0, 12).map((q) => (
              <article key={q.id} className="rounded-card border border-border bg-muted p-3">
                <div className="mb-1.5 flex flex-wrap gap-1.5">
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
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-black">Examens fixes importés</h2>
          <span className="text-sm text-muted-foreground">{allExamSuites.length} examens disponibles</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
  examAnswers, examFlags, setExamFlags, examConfidence, setExamConfidence,
  examFinished, examElapsedSeconds, examCorrectCount, examAnsweredCount,
  examFlaggedCount, examConfidenceSummary, canShowExamCorrection,
  chooseExamAnswer, finishExam, returnToExamList,
}: {
  activeExam: ActiveExam;
  activeExamQuestion: ExamQuestion;
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
  const q = activeExamQuestion;
  const total = activeExam.questions.length;
  const progressPct = Math.round(((examIndex + 1) / total) * 100);
  const answeredPct = Math.round((examAnsweredCount / total) * 100);
  const flagged = examFlags[q.id];
  const selectedChoices = examAnswers[q.id] ?? [];
  const correctAnswers = getCorrectAnswers(q);
  const isAnswered = selectedChoices.length > 0;
  const isCorrectAnswer = sameSet(selectedChoices, correctAnswers);

  const finalScore = examFinished ? Math.round((examCorrectCount / total) * 100) : 0;
  const passed = finalScore >= 75;

  return (
    <div className="space-y-4">
      {/* Session header */}
      <div className="rounded-card border border-border bg-card p-4 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">Test center</span>
              <span className={cn(
                "rounded-full px-2.5 py-0.5 text-xs font-bold",
                activeExam.correctionMode === "instant" ? "bg-warning-muted text-warning-fg" : "bg-muted text-muted-foreground"
              )}>
                {activeExam.correctionMode === "instant" ? "Correction immédiate" : "Correction à la fin"}
              </span>
              {examFinished && (
                <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-bold",
                  passed ? "bg-success-muted text-success-fg" : "bg-danger-muted text-danger-fg"
                )}>
                  {passed ? "Réussi" : "À reprendre"}
                </span>
              )}
            </div>
            <h2 className="text-lg font-black">{activeExam.title}</h2>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: Target, label: `${examIndex + 1}/${total}`, note: "Position" },
              { icon: CheckCircle2, label: examAnsweredCount, note: `${total - examAnsweredCount} restantes` },
              { icon: Clock, label: formatTime(examElapsedSeconds), note: "Temps" },
              { icon: Flag, label: examFlaggedCount, note: "Flagged" },
            ].map(({ icon: Icon, label, note }) => (
              <div key={note} className="rounded-card border border-border bg-muted px-3 py-2 text-center">
                <Icon className="mx-auto mb-0.5 h-3.5 w-3.5 text-muted-foreground" />
                <p className="text-sm font-black tabular-nums">{label}</p>
                <p className="text-[10px] text-muted-foreground">{note}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Dual progress bar */}
        <div className="mt-4 space-y-1.5">
          <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
            <span>Navigation: Q{examIndex + 1}</span>
            <span>Répondues: {answeredPct}%</span>
          </div>
          <div className="relative h-2 overflow-hidden rounded-full bg-muted">
            <div className="absolute inset-y-0 left-0 rounded-full bg-success/60 transition-all duration-300" style={{ width: `${answeredPct}%` }} />
            <div className="absolute top-0 h-full w-0.5 rounded-full bg-primary transition-all duration-300" style={{ left: `${progressPct}%` }} />
          </div>
        </div>
      </div>

      {/* Main 2-col layout */}
      <div className="grid gap-5 xl:grid-cols-[280px_1fr]">
        {/* Progress grid (sticky on XL) */}
        <div className="xl:sticky xl:top-28 xl:self-start space-y-3">
          <ExamProgressGrid
            questions={activeExam.questions}
            currentIndex={examIndex}
            answers={examAnswers}
            flags={examFlags}
            onSelect={setExamIndex}
            showCorrection={canShowExamCorrection}
          />
        </div>

        {/* Question panel */}
        <div className="space-y-4">
          <div className="rounded-card border border-border bg-card p-5 shadow-sm">
            {/* Question meta */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">Q{examIndex + 1}</span>
              <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">{q.examTitle}</span>
              {isPBQ(q) && <span className="rounded-full bg-cyan-100 px-2 py-0.5 text-[10px] font-bold text-cyan-700">PBQ</span>}
              {isMulti(q) && <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-primary">{correctAnswers.length} réponses</span>}
              {q.choices.length > 4 && <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">{q.choices.length} choix</span>}
            </div>

            {/* Confidence + flag row */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-card border border-border bg-muted p-3">
              <ConfidenceSelector
                value={examConfidence[q.id]}
                onChange={(v) => setExamConfidence((items) => ({ ...items, [q.id]: v }))}
              />
              <button type="button"
                onClick={() => setExamFlags((items) => ({ ...items, [q.id]: !items[q.id] }))}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-btn border px-3 py-1.5 text-xs font-bold transition",
                  flagged ? "border-warning-muted bg-warning-muted text-warning-fg" : "border-border bg-card text-muted-foreground hover:border-amber-400"
                )}>
                <Flag className="h-3.5 w-3.5" />
                {flagged ? "Flagged" : "Marquer"}
              </button>
            </div>

            {/* Question text */}
            <h2 className="mb-5 text-xl font-black leading-snug">{q.question}</h2>

            {/* Choices */}
            <div className="space-y-2">
              {q.choices.map((choice, i) => {
                const selected   = selectedChoices.includes(i);
                const correct    = correctAnswers.includes(i);
                const showResult = canShowExamCorrection && isAnswered;

                let letterState: "default" | "selected" | "correct" | "wrong" | "correct-unselected" = "default";
                if (showResult) {
                  if (selected && correct)  letterState = "correct";
                  else if (selected)        letterState = "wrong";
                  else if (correct)         letterState = "correct-unselected";
                } else if (selected)        letterState = "selected";

                return (
                  <button key={`${q.id}-${i}`} type="button" onClick={() => chooseExamAnswer(i)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-card border px-4 py-3 text-left text-sm transition",
                      !showResult && !selected && "border-border bg-muted hover:border-primary/50 hover:bg-card",
                      !showResult && selected  && "border-primary bg-primary/10",
                      showResult && selected && correct  && "border-success-muted bg-success-muted",
                      showResult && selected && !correct && "border-danger-muted bg-danger-muted",
                      showResult && !selected && correct && "border-success-muted bg-success-muted/50",
                      showResult && !selected && !correct && "border-border bg-muted opacity-60",
                    )}>
                    <LetterBadge letter={String.fromCharCode(65 + i)} state={letterState} />
                    <span className="leading-snug">{choice}</span>
                    {showResult && selected && correct  && <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-emerald-500" />}
                    {showResult && selected && !correct && <XCircle className="ml-auto h-4 w-4 shrink-0 text-red-500" />}
                    {showResult && !selected && correct && <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-emerald-400 opacity-70" />}
                  </button>
                );
              })}
            </div>

            {/* Instant correction panel */}
            {canShowExamCorrection && examAnswers[q.id] !== undefined && (
              <div className={cn(
                "mt-4 rounded-card border p-4",
                isCorrectAnswer ? "border-success-muted bg-success-muted" : "border-danger-muted bg-danger-muted"
              )}>
                <p className={cn("flex items-center gap-2 font-black",
                  isCorrectAnswer ? "text-success-fg" : "text-danger-fg"
                )}>
                  {isCorrectAnswer
                    ? <><CheckCircle2 className="h-4 w-4" /> Correct !</>
                    : <><XCircle className="h-4 w-4" /> Incorrect</>}
                </p>
                {!isCorrectAnswer && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {isMulti(q) ? "Bonnes réponses" : "Bonne réponse"}: {formatAnswers(q, correctAnswers)}
                  </p>
                )}
                <p className="mt-2 text-sm leading-relaxed">{q.explanation}</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" disabled={examIndex === 0}
              onClick={() => setExamIndex((v) => Math.max(0, v - 1))}
              className="inline-flex items-center gap-1 rounded-btn border border-border bg-muted px-3 py-2 text-sm font-bold transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-40">
              <ChevronLeft className="h-4 w-4" /> Précédente
            </button>
            <button type="button" disabled={examIndex === total - 1}
              onClick={() => setExamIndex((v) => Math.min(total - 1, v + 1))}
              className="inline-flex items-center gap-1 rounded-btn border border-border bg-muted px-3 py-2 text-sm font-bold transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-40">
              Suivante <ChevronRight className="h-4 w-4" />
            </button>
            <div className="flex-1" />
            <button type="button" onClick={returnToExamList}
              className="inline-flex items-center gap-1 rounded-btn border border-border bg-muted px-3 py-2 text-sm font-bold text-muted-foreground transition hover:border-primary">
              <ArrowLeft className="h-4 w-4" /> Retour
            </button>
            <button type="button" onClick={finishExam}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-btn px-4 py-2 text-sm font-bold transition",
                examAnsweredCount === total
                  ? "bg-success text-white hover:opacity-90"
                  : "bg-danger text-white hover:opacity-90"
              )}>
              {examAnsweredCount === total ? <><CheckCircle2 className="h-4 w-4" /> Terminer</> : <><AlertCircle className="h-4 w-4" /> Terminer ({total - examAnsweredCount} non répondues)</>}
            </button>
          </div>
        </div>
      </div>

      {/* Finished — results */}
      {examFinished && (
        <div className="space-y-4">
          {/* Score card */}
          <div className={cn(
            "rounded-card border-2 p-6 shadow-sm",
            passed ? "border-success-muted bg-success-muted" : "border-danger-muted bg-danger-muted"
          )}>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className={cn(
                "flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 text-3xl font-black",
                passed ? "border-success-muted bg-card text-success-fg" : "border-danger-muted bg-card text-danger-fg"
              )}>
                {finalScore}%
              </div>
              <div>
                <p className={cn("text-2xl font-black", passed ? "text-success-fg" : "text-danger-fg")}>
                  {passed ? "Félicitations — Objectif atteint !" : "À reprendre — Seuil non atteint"}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {examCorrectCount} correctes sur {total} · Seuil Security+: 75%
                </p>
              </div>
            </div>
          </div>

          {/* Breakdown metrics */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Score", value: `${finalScore}%`, sub: `${examCorrectCount}/${total}` },
              { label: "Temps", value: formatTime(examElapsedSeconds), sub: "durée totale" },
              { label: "Flags",        value: examFlaggedCount, sub: "à revoir" },
              { label: "Non répondues", value: total - examAnsweredCount, sub: "sans réponse" },
            ].map(({ label, value, sub }) => (
              <div key={label} className="rounded-card border border-border bg-card p-4 text-center shadow-sm">
                <p className="text-2xl font-black tabular-nums text-primary">{value}</p>
                <p className="text-xs font-bold">{label}</p>
                <p className="text-[10px] text-muted-foreground">{sub}</p>
              </div>
            ))}
          </div>

          {/* Confidence summary */}
          {(examConfidenceSummary.low + examConfidenceSummary.medium + examConfidenceSummary.high) > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Faible confiance", value: examConfidenceSummary.low,    color: "border-danger-muted bg-danger-muted text-danger-fg" },
                { label: "Confiance moyenne", value: examConfidenceSummary.medium, color: "border-warning-muted bg-warning-muted text-warning-fg" },
                { label: "Haute confiance",  value: examConfidenceSummary.high,   color: "border-success-muted bg-success-muted text-success-fg" },
              ].map(({ label, value, color }) => (
                <div key={label} className={cn("rounded-card border p-3 text-center", color)}>
                  <p className="text-2xl font-black tabular-nums">{value}</p>
                  <p className="text-xs font-bold">{label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Review grid + card */}
          <div className="rounded-card border border-border bg-card p-4 shadow-sm">
            <h3 className="mb-1 font-black">Révision question par question</h3>
            <p className="mb-4 text-sm text-muted-foreground">Cliquez sur une pastille pour revoir une question.</p>
            <ExamProgressGrid
              questions={activeExam.questions}
              currentIndex={examIndex}
              answers={examAnswers}
              flags={examFlags}
              onSelect={setExamIndex}
              showCorrection
            />
            <SelectedExamReviewCard
              question={activeExamQuestion}
              index={examIndex}
              selected={examAnswers[activeExamQuestion.id]}
              flagged={Boolean(examFlags[activeExamQuestion.id])}
              confidence={examConfidence[activeExamQuestion.id]}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ExamView (public export) ─────────────────────────────────────────────────
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
