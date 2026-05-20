"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, ArrowRight, Bug, CheckCircle2, ChevronDown, ChevronRight, Flag, Shield, Siren, Skull, Target, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { CountdownTimer, ScoringDisplay, ActionButton, GhostButton, Badge, usePBQPersist } from "./pbq-shared";
import type { InvestigationPBQ } from "@/data/pbq";

export function InvestigationInteractive({ exercise, onReset }: { exercise: InvestigationPBQ; onReset: () => void }) {
  const persist = usePBQPersist(exercise.id + "-v2");
  const [selectedLogs, setSelectedLogs] = useState<Set<number>>(() => { const s = persist.load<number[]>(); return new Set(s || []); });
  const [markedEvidence, setMarkedEvidence] = useState<Record<number, string>>(() => persist.load<Record<number, string>>() || {});
  const [expandedLog, setExpandedLog] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>(() => persist.load<Record<string, number>>() || {});
  const [containmentAction, setContainmentAction] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [answerDetails, setAnswerDetails] = useState<{ label: string; userAnswer: string; correct: string; isCorrect: boolean }[]>([]);
  const [investigationStep, setInvestigationStep] = useState(0);

  useEffect(() => { if (!submitted) persist.save({ selectedLogs: Array.from(selectedLogs), markedEvidence, answers, containmentAction }); }, [selectedLogs, markedEvidence, answers, containmentAction, submitted, persist]);

  const incomplete = exercise.tasks.filter(t => answers[t.id] === undefined).length;

  function toggleLog(i: number) { if (submitted) return; setSelectedLogs(p => { const n = new Set(p); if (n.has(i)) n.delete(i); else n.add(i); return n; }); }

  const containmentOptions = [
    { id: "isolate", label: "Isoler WS-104", desc: "Deconnecter la machine du reseau", correct: true },
    { id: "reboot", label: "Redemarrer FILESRV01", desc: "Peut effacer des preuves", correct: false },
    { id: "delete", label: "Supprimer fichiers chiffres", desc: "Perte de donnees definitive", correct: false },
    { id: "firewall", label: "Bloquer IP au firewall", desc: "Contient la communication C2", correct: true },
  ];

  const perTask = Math.floor(exercise.scoring.max / (exercise.tasks.length + 1));

  function grade() {
    const fb: string[] = []; const details: { label: string; userAnswer: string; correct: string; isCorrect: boolean }[] = []; let total = 0;
    for (const t of exercise.tasks) {
      const chosen = answers[t.id]; const isCorrect = chosen === t.correctAnswer;
      details.push({ label: t.label, userAnswer: chosen !== undefined ? t.choices[chosen] : "(pas de reponse)", correct: t.choices[t.correctAnswer], isCorrect });
      if (isCorrect) { total += perTask; fb.push(`${t.label}: correct.`); } else { fb.push(`${t.label}: incorrect. ${t.explanation}`); }
    }
    const goodContainment = containmentOptions.filter(o => o.correct && containmentAction === o.id).length;
    total += goodContainment * perTask;
    details.push({ label: "Action de containment", userAnswer: containmentAction || "aucune", correct: "Isoler + Bloquer IP", isCorrect: goodContainment > 0 });
    setScore(total); setFeedback(fb); setAnswerDetails(details); setSubmitted(true); persist.clear();
  }

  function reset() { persist.clear(); onReset(); }

  return (
    <div>
      <CountdownTimer seconds={exercise.timeLimitSeconds} onExpire={grade} incompleteCount={incomplete} />
      <div className="mb-4 rounded-card border border-border bg-muted p-4">
        <p className="font-bold">{exercise.role}</p>
        <p className="mt-1 text-muted-foreground">{exercise.scenario}</p>
      </div>

      {/* Investigation Steps */}
      <div className="mb-4 flex gap-1">
        {["Logs", "Containment", "Analyse", "Resolution"].map((label, i) => (
          <button key={i} onClick={() => setInvestigationStep(i)}
            className={cn("flex-1 rounded-btn px-2 py-1.5 text-xs font-bold transition-all text-center",
              investigationStep === i ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-border")}>
            {i + 1}. {label}
          </button>
        ))}
      </div>

      {/* Step 1: Logs */}
      {investigationStep === 0 && (
        <div className="rounded-card border border-border overflow-hidden mb-4">
          <div className="bg-muted px-4 py-2 flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <Bug className="h-3 w-3" /> Logs ({exercise.logs.length} entrees)
          </div>
          <div className="divide-y divide-border">
            {exercise.logs.map((log, i) => {
              const isSelected = selectedLogs.has(i);
              const evidence = markedEvidence[i];
              return (
                <div key={i}>
                  <div onClick={() => { toggleLog(i); setExpandedLog(expandedLog === i ? null : i); }}
                    className={cn("flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-all text-sm",
                      isSelected ? "bg-primary/5 border-l-2 border-l-primary" : "hover:bg-muted")}>
                    <span className="font-mono text-xs text-muted-foreground w-12 shrink-0">{log.time}</span>
                    <span className="font-bold w-20 shrink-0">{log.source}</span>
                    <span className="flex-1 text-xs">{log.event}</span>
                    {evidence && <Badge className="bg-red-100 text-red-700 text-[10px] px-1.5 py-0">{evidence}</Badge>}
                    {expandedLog === i ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                  </div>
                  {expandedLog === i && !submitted && (
                    <div className="px-4 py-2 bg-muted/50 border-t border-border flex flex-wrap gap-2 text-xs animate-fade-in">
                      {["IOC", "Suspicious", "Key evidence"].map(tag => (
                        <button key={tag} onClick={() => setMarkedEvidence(p => ({ ...p, [i]: p[i] === tag ? "" : tag }))}
                          className={cn("rounded-btn px-2 py-0.5 font-bold border transition-all", markedEvidence[i] === tag ? "border-red-500 bg-red-50 text-red-700" : "border-border bg-card hover:border-red-300")}>
                          {tag}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 2: Containment */}
      {investigationStep === 1 && (
        <div className="rounded-card border border-border bg-card p-4 mb-4">
          <h3 className="mb-3 font-bold flex items-center gap-2"><Siren className="h-4 w-4 text-red-500" /> Actions de containment</h3>
          <div className="grid gap-2">
            {containmentOptions.map(opt => (
              <button key={opt.id} onClick={() => setContainmentAction(opt.id)}
                className={cn("text-left rounded-card border p-3 transition-all text-sm font-semibold",
                  containmentAction === opt.id ? "border-primary bg-primary/10" : "border-border bg-muted hover:border-primary")}>
                <div className="flex items-center gap-2">
                  {containmentAction === opt.id && <CheckCircle2 className="h-4 w-4 text-primary" />}
                  {opt.label}
                </div>
                <p className="text-xs text-muted-foreground mt-1 font-normal">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: QCM Analysis */}
      {investigationStep === 2 && (
        <div className="space-y-3 mb-4">
          {exercise.tasks.map(task => (
            <div key={task.id} className="rounded-card border border-border bg-card p-4">
              <p className="mb-3 font-bold text-sm">{task.label}: {task.question}</p>
              <div className="flex flex-wrap gap-2">
                {task.choices.map((choice, idx) => (
                  <button key={idx} onClick={() => setAnswers(p => ({ ...p, [task.id]: idx }))}
                    className={cn("min-h-10 rounded-card px-4 text-sm font-bold transition border", answers[task.id] === idx ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted hover:border-primary")}>
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step 4: Summary */}
      {investigationStep === 3 && (
        <div className="rounded-card border border-border bg-card p-4 mb-4">
          <h3 className="mb-3 font-bold flex items-center gap-2"><Target className="h-4 w-4 text-primary" /> Resume de l enquete</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Logs selectionnes</span><span className="font-bold">{selectedLogs.size}/{exercise.logs.length}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Preuves marquees</span><span className="font-bold">{Object.values(markedEvidence).filter(Boolean).length}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Containment</span><span className="font-bold">{containmentAction || "non defini"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Questions</span><span className="font-bold">{Object.keys(answers).length}/{exercise.tasks.length}</span></div>
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {!submitted && <ActionButton onClick={grade}>Corriger</ActionButton>}
        {submitted && <ScoringDisplay score={score} max={exercise.scoring.max} feedback={feedback} correctAnswers={answerDetails} />}
        <GhostButton onClick={reset}>Retour aux PBQ</GhostButton>
      </div>
    </div>
  );
}
