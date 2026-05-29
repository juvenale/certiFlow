"use client";

import { useState, useEffect, useRef } from "react";
import { AlertTriangle, CheckCircle2, Info, Timer, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex min-h-8 items-center rounded-card bg-muted px-3 text-sm font-bold text-muted-foreground", className)}>{children}</span>;
}

export function ActionButton({ children, className, onClick, disabled }: { children: React.ReactNode; className?: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={cn("inline-flex min-h-10 items-center justify-center rounded-card bg-primary px-4 font-bold text-primary-foreground disabled:opacity-50 transition hover:opacity-90", className)}>
      {children}
    </button>
  );
}

export function GhostButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex min-h-10 items-center justify-center rounded-card bg-muted px-4 font-bold transition hover:bg-border">
      {children}
    </button>
  );
}

export function CountdownTimer({ seconds, onExpire, incompleteCount }: { seconds: number; onExpire: () => void; incompleteCount?: number }) {
  const [remaining, setRemaining] = useState(seconds);
  const expired = useRef(false);
  const halfTime = Math.floor(seconds / 2);

  useEffect(() => {
    if (remaining <= 0) {
      if (!expired.current) { expired.current = true; onExpire(); }
      return;
    }
    const id = setInterval(() => setRemaining((r) => r - 1), 1000);
    return () => clearInterval(id);
  }, [remaining, onExpire]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const pct = (remaining / seconds) * 100;
  const urgent = remaining <= 30;
  const halfway = remaining <= halfTime;

  return (
    <div>
      <div className="mb-2 flex items-center gap-3 rounded-card border border-border bg-muted p-3">
        <Timer className={cn("h-5 w-5", urgent ? "text-red-500 animate-pulse" : "text-primary")} />
        <div className="flex-1">
          <div className="h-2 rounded-full bg-border">
            <div className={cn("h-2 rounded-full transition-all", urgent ? "bg-red-500" : "bg-primary")} style={{ width: `${pct}%` }} />
          </div>
        </div>
        <span className={cn("font-mono font-bold tabular-nums", urgent && "text-red-500")}>{mins}:{secs.toString().padStart(2, "0")}</span>
      </div>
      {halfway && !urgent && <p className="mb-2 flex items-center gap-2 text-sm text-yellow-600"><AlertTriangle className="h-4 w-4" /> {"Mi-temps: vérifiez les contraintes."}</p>}
      {urgent && incompleteCount !== undefined && incompleteCount > 0 && <p className="mb-2 flex items-center gap-2 text-sm text-red-500 animate-pulse"><AlertTriangle className="h-4 w-4" /> {incompleteCount} champ(s) incomplet(s) !</p>}
    </div>
  );
}

type AnswerDetail = { label: string; userAnswer: string; correct: string; isCorrect: boolean };

export function ScoringDisplay({ score, max, feedback, correctAnswers }: { score: number; max: number; feedback: string[]; correctAnswers?: AnswerDetail[] }) {
  const pct = Math.round((score / max) * 100);
  const grade = pct >= 90 ? "Excellent" : pct >= 75 ? "Bien" : pct >= 50 ? "A revoir" : "Insuffisant";
  return (
    <div className="mt-6 space-y-4">
      <div className="rounded-card border border-border bg-muted p-4">
        <div className="flex items-center gap-2">
          {pct >= 75 ? <CheckCircle2 className="h-6 w-6 text-green-500" /> : <XCircle className="h-6 w-6 text-red-500" />}
          <h3 className="text-xl font-black">{grade}</h3>
        </div>
        <p className="mt-1 text-2xl font-black">{score}/{max} <span className="text-lg font-normal text-muted-foreground">({pct}%)</span></p>
      </div>
      {correctAnswers && correctAnswers.length > 0 && (
        <div className="rounded-card border border-border bg-card p-4">
          <h4 className="mb-3 font-bold">Details des reponses</h4>
          <div className="space-y-2">
            {correctAnswers.map((item, i) => (
              <div key={i} className={cn("flex items-start gap-2 rounded-card p-2 text-sm", item.isCorrect ? "bg-success/10" : "bg-danger/10")}>
                {item.isCorrect ? <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500 shrink-0" /> : <XCircle className="mt-0.5 h-4 w-4 text-red-500 shrink-0" />}
                <div>
                  <span className="font-bold">{item.label}: </span>
                  <span className={item.isCorrect ? "text-success" : "text-danger"}>{item.userAnswer || "(vide)"}</span>
                  {!item.isCorrect && <span className="text-success"> - attendu: {item.correct}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {feedback.length > 0 && (
        <div className="rounded-card border border-border bg-card p-4">
          <h4 className="mb-2 font-bold">Feedback</h4>
          <ul className="space-y-1">
            {feedback.map((msg, i) => <li key={i} className="flex items-start gap-2 text-sm"><Info className="mt-0.5 h-4 w-4 text-primary shrink-0" /> {msg}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export function usePBQPersist(key: string) {
  const [saved, setSaved] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(`pbq-${key}`);
    }
    return null;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const val = localStorage.getItem(`pbq-${key}`);
    setTimeout(() => {
      setSaved((prev) => (prev !== val ? val : prev));
    }, 0);
  }, [key]);

  function save(data: unknown) { if (typeof window !== "undefined") { localStorage.setItem(`pbq-${key}`, JSON.stringify(data)); setSaved(JSON.stringify(data)); } }
  function load<T>(): T | null { if (typeof window === "undefined") return null; const raw = localStorage.getItem(`pbq-${key}`); return raw ? JSON.parse(raw) : null; }
  function clear() { if (typeof window !== "undefined") { localStorage.removeItem(`pbq-${key}`); setSaved(null); } }

  return { saved, save, load, clear };
}
