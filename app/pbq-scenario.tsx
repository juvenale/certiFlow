"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, ArrowRight, Bug, CheckCircle2, ChevronDown, ChevronRight, Flag, Info, Search, Shield, Skull, Siren, XCircle, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { CountdownTimer, ScoringDisplay, ActionButton, GhostButton, Badge, usePBQPersist } from "./pbq-shared";
import type { SIEMPBQ, InvestigationPBQ } from "@/data/pbq";

// ── SIEM: Interactive Log Analysis ────────────────────────────────────

type MarkedIOC = { index: number; type: "ioc" | "ioa" | "suspicious" | "critical" };
type SeverityLevel = "low" | "medium" | "high" | "critical";

export function SIEMInteractive({ exercise, onReset }: { exercise: SIEMPBQ; onReset: () => void }) {
  const persist = usePBQPersist(exercise.id + "-v2");
  const [selectedLogs, setSelectedLogs] = useState<Set<number>>(() => {
    const saved = persist.load<number[]>();
    return new Set(saved || []);
  });
  const [markedIOCs, setMarkedIOCs] = useState<MarkedIOC[]>(() => persist.load<MarkedIOC[]>() || []);
  const [expandedLog, setExpandedLog] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [incidentDeclared, setIncidentDeclared] = useState(false);
  const [severity, setSeverity] = useState<SeverityLevel | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [answerDetails, setAnswerDetails] = useState<{ label: string; userAnswer: string; correct: string; isCorrect: boolean }[]>([]);

  useEffect(() => {
    if (!submitted) persist.save({ selectedLogs: Array.from(selectedLogs), markedIOCs, answers, incidentDeclared, severity });
  }, [selectedLogs, markedIOCs, answers, incidentDeclared, severity, submitted, persist]);

  const incompleteQ = exercise.questions.filter(q => answers[q.id] === undefined).length;

  function toggleLog(index: number) {
    if (submitted) return;
    setSelectedLogs(prev => { const n = new Set(prev); if (n.has(index)) n.delete(index); else n.add(index); return n; });
  }

  function markIOC(index: number, type: MarkedIOC["type"]) {
    if (submitted) return;
    setMarkedIOCs(prev => {
      const existing = prev.find(m => m.index === index);
      if (existing?.type === type) return prev.filter(m => m.index !== index);
      return [...prev.filter(m => m.index !== index), { index, type }];
    });
  }

  function getIOCMark(index: number) { return markedIOCs.find(m => m.index === index); }

  function selectAnswer(qId: string, idx: number) { if (submitted) return; setAnswers(p => ({ ...p, [qId]: idx })); }

  const iocColors: Record<string, string> = {
    ioc: "border-red-500 bg-red-50 text-red-700",
    ioa: "border-amber-500 bg-amber-50 text-amber-700",
    suspicious: "border-violet-500 bg-violet-50 text-violet-700",
    critical: "border-red-700 bg-red-100 text-red-800 font-bold",
  };

  const iocLabels: Record<string, string> = { ioc: "IOC", ioa: "IOA", suspicious: "Suspect", critical: "Critique" };

  const severityColors: Record<SeverityLevel, string> = { low: "bg-slate-500", medium: "bg-amber-500", high: "bg-orange-500", critical: "bg-red-500" };

  const perQuestion = Math.floor(exercise.scoring.max / (exercise.questions.length + 2)); // +2 for IOC/interaction bonus

  function grade() {
    const fb: string[] = [];
    const details: { label: string; userAnswer: string; correct: string; isCorrect: boolean }[] = [];
    let total = 0;

    // Score QCM
    for (const q of exercise.questions) {
      const chosen = answers[q.id];
      const isCorrect = chosen === q.correctAnswer;
      details.push({ label: q.text, userAnswer: chosen !== undefined ? q.choices[chosen] : "(pas de reponse)", correct: q.choices[q.correctAnswer], isCorrect });
      if (isCorrect) { total += perQuestion; fb.push(`${q.text}: correct.`); }
      else { fb.push(`${q.text}: incorrect. ${q.explanation}`); }
    }

    // Score interaction: declaring incident
    if (incidentDeclared) { total += perQuestion; details.push({ label: "Incident declare", userAnswer: "oui", correct: "oui", isCorrect: true }); fb.push("Incident declare: +" + perQuestion); }
    else { details.push({ label: "Incident declare", userAnswer: "non", correct: "oui", isCorrect: false }); fb.push("Incident non declare."); }

    // Score severity
    if (severity === "critical" || severity === "high") { total += perQuestion; details.push({ label: "Severite", userAnswer: severity || "non definie", correct: "high/critical", isCorrect: true }); }
    else { details.push({ label: "Severite", userAnswer: severity || "non definie", correct: "high/critical", isCorrect: false }); }

    const correctIOC = markedIOCs.filter(m => m.type === "ioc" || m.type === "critical").length;
    if (correctIOC >= 2) { total += Math.floor(perQuestion / 2); fb.push(`IOCs identifies: ${correctIOC}`); }

    setScore(total); setFeedback(fb); setAnswerDetails(details); setSubmitted(true);
    persist.clear();
  }

  function reset() { persist.clear(); onReset(); }

  return (
    <div>
      <CountdownTimer seconds={exercise.timeLimitSeconds} onExpire={grade} incompleteCount={incompleteQ} />
      <div className="mb-4 rounded-card border border-border bg-muted p-4">
        <p className="font-bold">{exercise.role}</p>
        <p className="mt-1 text-muted-foreground">{exercise.scenario}</p>
      </div>

      {/* Interactive Log Table */}
      <div className="mb-4 rounded-card border border-border overflow-hidden">
        <div className="bg-muted px-4 py-2 flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
          <Search className="h-3 w-3" /> Logs SIEM ({exercise.logs.length} entrees)
          {!submitted && <span className="ml-auto text-xs font-normal">Clique pour selectionner · Clic-droit pour marquer IOC</span>}
        </div>
        <div className="divide-y divide-border">
          {exercise.logs.map((log, i) => {
            const isSelected = selectedLogs.has(i);
            const iocMark = getIOCMark(i);
            const isExpanded = expandedLog === i;
            return (
              <div key={i}>
                <div onClick={() => { if (!submitted) { toggleLog(i); setExpandedLog(isExpanded ? null : i); } }}
                  className={cn("flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-all text-sm",
                    isSelected ? "bg-primary/5 border-l-2 border-l-primary" : "hover:bg-muted",
                    iocMark ? iocColors[iocMark.type].replace(/border-\S+/g, "").replace(/bg-\S+/g, "").replace(/text-\S+/g, "") + " border-l-2 " + cn(iocMark.type === "critical" ? "border-l-red-700" : iocMark.type === "ioc" ? "border-l-red-500" : iocMark.type === "ioa" ? "border-l-amber-500" : "border-l-violet-500") : "")}>
                  <span className="font-mono text-xs text-muted-foreground w-10 shrink-0">{log.time}</span>
                  <span className="font-bold w-16 shrink-0">{log.source}</span>
                  <span className="w-16 shrink-0 text-muted-foreground text-xs">{log.user}</span>
                  <span className="flex-1 font-mono text-xs truncate">{log.event}</span>
                  <span className="text-xs text-muted-foreground w-24 shrink-0 text-right">{log.destination}</span>
                  {iocMark && <Badge className={cn("shrink-0 text-[10px] px-1.5 py-0", iocColors[iocMark.type])}>{iocLabels[iocMark.type]}</Badge>}
                  {isExpanded ? <ChevronDown className="h-3 w-3 text-muted-foreground" /> : <ChevronRight className="h-3 w-3 text-muted-foreground" />}
                </div>

                {/* Expanded detail + IOC marking */}
                {isExpanded && !submitted && (
                  <div className="px-4 py-2 bg-muted/50 border-t border-border animate-fade-in">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-semibold text-muted-foreground">Marquer comme:</span>
                      {(["ioc", "ioa", "suspicious", "critical"] as const).map(type => (
                        <button key={type} onClick={() => markIOC(i, type)}
                          className={cn("rounded-btn px-2 py-0.5 font-bold transition-all border", iocMark?.type === type ? iocColors[type] + " border-current" : "border-border bg-card hover:border-primary")}>
                          {iocLabels[type]}
                        </button>
                      ))}
                      <span className="ml-4 text-muted-foreground">
                        {log.event.includes("login_success") && log.destination === "Germany" ? "Impossible travel detecte" :
                         log.event.includes("MFA_disabled") ? "MFA desactive = escalade potentielle" :
                         log.event.includes("Domain Admins") ? "Ajout groupe admin = critique" :
                         log.event.includes("EncodedCommand") ? "PowerShell encode = malveillant" :
                         log.event.includes("dns_query") ? "DNS suspect vers domaine inconnu" : ""}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions toolbar */}
      {!submitted && (
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <button onClick={() => setIncidentDeclared(!incidentDeclared)}
            className={cn("flex items-center gap-2 rounded-card border px-4 py-2 text-sm font-bold transition-all",
              incidentDeclared ? "border-red-500 bg-red-50 text-red-700" : "border-border bg-card hover:border-red-300")}>
            <Siren className="h-4 w-4" /> {incidentDeclared ? "Incident declare" : "Declarer incident"}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">Severite:</span>
            {(["low", "medium", "high", "critical"] as SeverityLevel[]).map(lvl => (
              <button key={lvl} onClick={() => setSeverity(lvl)}
                className={cn("w-8 h-8 rounded-full transition-all border-2 font-bold text-xs",
                  severity === lvl ? "border-foreground scale-110" : "border-transparent hover:scale-105",
                  severityColors[lvl])} title={lvl}>
                {severity === lvl && "✓"}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-3 w-3" />
            {selectedLogs.size} logs selectionnes · {markedIOCs.length} IOCs marques
          </div>
        </div>
      )}

      {/* QCM Questions */}
      <div className="space-y-3">
        {exercise.questions.map(q => (
          <div key={q.id} className="rounded-card border border-border bg-card p-4">
            <p className="mb-3 font-bold text-sm">{q.text}</p>
            <div className="flex flex-wrap gap-2">
              {q.choices.map((choice, idx) => (
                <button key={idx} type="button" onClick={() => selectAnswer(q.id, idx)}
                  className={cn("min-h-10 rounded-card px-4 text-sm font-bold transition border",
                    answers[q.id] === idx
                      ? submitted
                        ? idx === q.correctAnswer ? "border-green-500 bg-green-50 text-green-700" : "border-red-500 bg-red-50 text-red-700"
                        : "border-primary bg-primary/10 text-primary"
                      : "border-border bg-muted hover:border-primary")}>
                  {choice}
                </button>
              ))}
            </div>
            {submitted && answers[q.id] !== q.correctAnswer && <p className="mt-2 text-xs text-muted-foreground">{q.explanation}</p>}
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

