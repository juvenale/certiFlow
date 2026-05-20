"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { CountdownTimer, ScoringDisplay, ActionButton, GhostButton, usePBQPersist } from "./pbq-shared";
import type { InvestigationPBQ, TimedConfigPBQ } from "@/data/pbq";

function cn(...args: (string | false | undefined | null)[]): string { return args.filter(Boolean).join(" "); }

export function InvestigationPBQView({ exercise, onReset }: { exercise: InvestigationPBQ; onReset: () => void }) {
  const persist = usePBQPersist(exercise.id);
  const [answers, setAnswers] = useState<Record<string, number>>(() => persist.load<Record<string, number>>() || {});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [answerDetails, setAnswerDetails] = useState<{ label: string; userAnswer: string; correct: string; isCorrect: boolean }[]>([]);

  useEffect(() => { if (!submitted) persist.save(answers); }, [answers, submitted, persist]);

  const incomplete = exercise.tasks.filter((t) => answers[t.id] === undefined).length;
  const perTask = Math.floor(exercise.scoring.max / exercise.tasks.length);

  function selectAnswer(id: string, idx: number) { if (submitted) return; setAnswers((p) => ({ ...p, [id]: idx })); }

  function grade() {
    const fb: string[] = []; const details: { label: string; userAnswer: string; correct: string; isCorrect: boolean }[] = []; let total = 0;
    for (const t of exercise.tasks) {
      const chosen = answers[t.id]; const isCorrect = chosen === t.correctAnswer;
      details.push({ label: t.label, userAnswer: chosen !== undefined ? t.choices[chosen] : "(pas de reponse)", correct: t.choices[t.correctAnswer], isCorrect });
      if (isCorrect) { total += perTask; fb.push(`${t.label}: correct.`); } else { fb.push(`${t.label}: incorrect. ${t.explanation}`); }
    }
    setScore(total); setFeedback(fb); setAnswerDetails(details); setSubmitted(true); persist.clear();
  }

  function reset() { persist.clear(); onReset(); }

  return (
    <div>
      <CountdownTimer seconds={exercise.timeLimitSeconds} onExpire={grade} incompleteCount={incomplete} />
      <div className="mb-4 rounded-card border border-border bg-muted p-4"><p className="font-bold">{exercise.role}</p><p className="mt-1 text-muted-foreground">{exercise.scenario}</p></div>
      <div className="mb-4 rounded-card border border-border bg-card p-4"><h3 className="mb-2 font-bold">Logs</h3><div className="space-y-1 font-mono text-xs">{exercise.logs.map((log, i) => (<div key={i} className="flex gap-3"><span className="text-muted-foreground">{log.time}</span><span className="font-bold">{log.source}</span><span>{log.event}</span></div>))}</div></div>
      <div className="space-y-4">
        {exercise.tasks.map((task) => (
          <div key={task.id} className="rounded-card border border-border bg-card p-4">
            <p className="mb-3 font-bold">{task.label}: {task.question}</p>
            <div className="flex flex-wrap gap-2">
              {task.choices.map((choice, idx) => (
                <button key={idx} type="button" onClick={() => selectAnswer(task.id, idx)}
                  className={cn("min-h-10 rounded-card px-4 text-sm font-bold transition border", answers[task.id] === idx ? submitted ? idx === task.correctAnswer ? "border-green-500 bg-green-50 text-green-700" : "border-red-500 bg-red-50 text-red-700" : "border-primary bg-primary/10 text-primary" : "border-border bg-muted hover:border-primary")}>{choice}</button>
              ))}
            </div>
            {submitted && answers[task.id] !== task.correctAnswer && <p className="mt-2 text-sm text-muted-foreground">{task.explanation}</p>}
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {!submitted && <ActionButton onClick={grade}>Corriger</ActionButton>}
        {submitted && <ScoringDisplay score={score} max={exercise.scoring.max} feedback={feedback} correctAnswers={answerDetails} />}
        <GhostButton onClick={reset}>Retour aux PBQ</GhostButton>
      </div>
    </div>
  );
}

export function TimedConfigPBQView({ exercise, onReset }: { exercise: TimedConfigPBQ; onReset: () => void }) {
  const persist = usePBQPersist(exercise.id);
  const [checked, setChecked] = useState<Record<string, boolean>>(() => persist.load<Record<string, boolean>>() || {});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [answerDetails, setAnswerDetails] = useState<{ label: string; userAnswer: string; correct: string; isCorrect: boolean }[]>([]);

  useEffect(() => { if (!submitted) persist.save(checked); }, [checked, submitted, persist]);

  const incomplete = exercise.steps.length - Object.keys(checked).length;

  function toggle(id: string) { if (submitted) return; setChecked((p) => ({ ...p, [id]: !p[id] })); }

  function grade() {
    const fb: string[] = []; const details: { label: string; userAnswer: string; correct: string; isCorrect: boolean }[] = []; let total = 0;
    for (const step of exercise.steps) {
      const selected = !!checked[step.id];
      details.push({ label: step.condition, userAnswer: selected ? "coche" : "non coche", correct: "coche", isCorrect: selected });
      if (selected) { total += step.points; fb.push(`${step.condition}: +${step.points} pts`); } else { fb.push(`${step.condition}: manquant. ${step.explanation}`); }
    }
    setScore(total); setFeedback(fb); setAnswerDetails(details); setSubmitted(true); persist.clear();
  }

  function reset() { persist.clear(); onReset(); }

  return (
    <div>
      <CountdownTimer seconds={exercise.timeLimitSeconds} onExpire={grade} incompleteCount={incomplete} />
      <div className="mb-4 rounded-card border border-border bg-muted p-4">
        <p className="font-bold">{exercise.role}</p><p className="mt-1 text-muted-foreground">{exercise.scenario}</p>
        <p className="mt-2 font-bold">{exercise.prompt}</p>
        <ul className="mt-2 space-y-1">{exercise.requirements.map((r, i) => <li key={i} className="flex items-start gap-2 text-sm"><ArrowRight className="mt-0.5 h-4 w-4 text-primary shrink-0" /> {r}</li>)}</ul>
      </div>
      <div className="space-y-2">
        {exercise.steps.map((step) => (
          <button key={step.id} type="button" onClick={() => toggle(step.id)}
            className={cn("w-full rounded-card border p-3 text-left font-bold transition", checked[step.id] ? "border-primary bg-primary/10" : "border-border bg-muted", submitted && checked[step.id] && "border-green-500 bg-green-50", submitted && !checked[step.id] && "border-red-500 bg-red-50")}>
            {step.condition} <span className="text-sm font-normal text-muted-foreground">({step.points} pts)</span>
            {submitted && !checked[step.id] && <p className="mt-1 text-sm font-normal text-muted-foreground">{step.explanation}</p>}
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {!submitted && <ActionButton onClick={grade}>Corriger</ActionButton>}
        {submitted && <ScoringDisplay score={score} max={exercise.scoring.max} feedback={feedback} correctAnswers={answerDetails} />}
        <GhostButton onClick={reset}>Retour aux PBQ</GhostButton>
      </div>
    </div>
  );
}
