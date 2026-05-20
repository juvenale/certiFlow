"use client";

import { useState, useMemo } from "react";
import { AlertTriangle, ArrowRight, Brain, CheckCircle2, FileQuestion, FileText, Flame, GraduationCap, RotateCcw, Shield, Target, Timer, TrendingUp, XCircle, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { domainStats as allDomainStats } from "@/data/domain-stats";

interface ErrorEntry { domain: string; questionId: string; question: string; count: number; status: string }
type ReadinessLevel = "ready" | "almost" | "not-ready";

function useReadinessData(answered: number, correct: number) {
  return useMemo(() => {
    let errors: ErrorEntry[] = [];
    try { errors = JSON.parse(localStorage.getItem("certiflow-errors") || "[]"); } catch {}

    // Domain-level stats
    const domainMap: Record<string, { attempted: Set<string>; wrong: ErrorEntry[]; correct: number }> = {};
    for (const d of allDomainStats) domainMap[d.name] = { attempted: new Set(), wrong: [], correct: 0 };

    const overallAccuracy = answered > 0 ? correct / answered : 0;

    for (const e of errors) {
      const dm = domainMap[e.domain];
      if (dm) { dm.attempted.add(e.questionId); dm.wrong.push(e); }
    }

    const domainScores = allDomainStats.map(ds => {
      const dm = domainMap[ds.name];
      const attempted = dm?.attempted.size || 0;
      const estCorrect = Math.floor(attempted * overallAccuracy);
      const coverage = ds.totalQuestions > 0 ? (attempted / ds.totalQuestions) * 100 : 0;
      const accuracy = attempted > 0 ? (estCorrect / attempted) * 100 : 0;
      const progress = Math.min(100, Math.round(coverage * 0.5 + accuracy * 0.5));
      const wrongCount = dm?.wrong.length || 0;
      return { ...ds, attempted, correct: estCorrect, progress, coverage, accuracy, wrongCount };
    });

    const globalScore = domainScores.length > 0
      ? Math.round(domainScores.reduce((s, d) => s + d.progress * d.weight, 0) / 100)
      : 0;

    const level: ReadinessLevel = globalScore >= 75 ? "ready" : globalScore >= 55 ? "almost" : "not-ready";

    // Top weak areas by error count
    const weakAreas = [...domainScores]
      .sort((a, b) => b.wrongCount - a.wrongCount)
      .slice(0, 3);

    // Critical reviews due
    const criticalErrors = errors.filter(e => e.status !== "maitrise" && e.count >= 2).slice(0, 10);

    return { globalScore, level, domainScores, weakAreas, criticalErrors };
  }, [answered, correct]);
}

export function ReadinessView({ answered, correct, avgProgress, onNavigate }: {
  answered: number; correct: number; avgProgress: number;
  onNavigate: (view: string) => void;
}) {
  const data = useReadinessData(answered, correct);

  const levelConfig = {
    "ready": { color: "border-emerald-500 bg-emerald-50", badge: "bg-emerald-500", text: "Pret", icon: CheckCircle2, desc: "Tu maitrises les concepts. Continue les revisions legeres." },
    "almost": { color: "border-amber-500 bg-amber-50", badge: "bg-amber-500", text: "Presque pret", icon: TrendingUp, desc: "Renforce les points faibles pour consolider." },
    "not-ready": { color: "border-red-500 bg-red-50", badge: "bg-red-500", text: "Pas pret", icon: AlertTriangle, desc: "Intensifie la pratique sur tous les domaines." },
  }[data.level];

  return (
    <div className="animate-fade-in space-y-5">
      {/* Global Score */}
      <div className={cn("rounded-card border-2 p-6 shadow-sm", levelConfig.color)}>
        <div className="flex items-center gap-4">
          <div className={cn("flex h-16 w-16 items-center justify-center rounded-full", levelConfig.badge)}>
            <levelConfig.icon className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-black">Score de preparation: {data.globalScore}%</h2>
            <p className="text-sm text-muted-foreground mt-1">{levelConfig.desc}</p>
            <div className="mt-2 h-2 rounded-full bg-white/50 overflow-hidden">
              <div className={cn("h-full rounded-full transition-all duration-1000", data.level === "ready" ? "bg-emerald-500" : data.level === "almost" ? "bg-amber-500" : "bg-red-500")}
                style={{ width: `${data.globalScore}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Domain Breakdown */}
      <div className="rounded-card border border-border bg-card p-5 shadow-sm">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-wider"><Shield className="h-4 w-4" /> Repartition par domaine</h2>
        <div className="space-y-3">
          {data.domainScores.map(ds => (
            <div key={ds.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">{ds.name}</span>
                <span className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{ds.progress}%</span>
                  <span>Poids {ds.weight}%</span>
                  <span>{ds.attempted}/{ds.totalQuestions} q</span>
                </span>
              </div>
              <div className="flex gap-1 h-2 rounded-full bg-muted overflow-hidden">
                <div className={cn("h-full rounded-full transition-all", ds.progress >= 75 ? "bg-emerald-500" : ds.progress >= 50 ? "bg-amber-500" : "bg-red-500")}
                  style={{ width: `${ds.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weak Areas */}
      {data.weakAreas.length > 0 && (
        <div className="rounded-card border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-wider"><Target className="h-4 w-4" /> Objectifs faibles</h2>
          <div className="grid gap-3">
            {data.weakAreas.map(area => (
              <button key={area.id} onClick={() => onNavigate("quiz")}
                className="flex items-center gap-3 rounded-card border border-border bg-muted p-3 text-left transition-all hover:border-primary hover:shadow-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-btn bg-red-100">
                  <XCircle className="h-4 w-4 text-red-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">{area.name}</p>
                  <p className="text-xs text-muted-foreground">{area.wrongCount} erreurs, {area.progress}% de progression, couverture {Math.round(area.coverage)}%</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid gap-3 md:grid-cols-2">
        <button onClick={() => onNavigate("quiz")}
          className="flex items-center gap-3 rounded-card border border-border bg-violet-50 p-4 transition-all hover:shadow-md hover:border-violet-300">
          <FileQuestion className="h-6 w-6 text-violet-500" />
          <div className="text-left"><p className="font-bold">Pratiquer 15 questions faibles</p><p className="text-xs text-muted-foreground">Quiz cible sur tes erreurs</p></div>
        </button>
        <button onClick={() => onNavigate("pbq")}
          className="flex items-center gap-3 rounded-card border border-border bg-cyan-50 p-4 transition-all hover:shadow-md hover:border-cyan-300">
          <Brain className="h-6 w-6 text-cyan-500" />
          <div className="text-left"><p className="font-bold">Pratiquer PBQ</p><p className="text-xs text-muted-foreground">Performance-based questions</p></div>
        </button>
        <button onClick={() => onNavigate("exam")}
          className="flex items-center gap-3 rounded-card border border-border bg-rose-50 p-4 transition-all hover:shadow-md hover:border-rose-300">
          <Timer className="h-6 w-6 text-rose-500" />
          <div className="text-left"><p className="font-bold">Passer l examen complet</p><p className="text-xs text-muted-foreground">90 questions en conditions reelles</p></div>
        </button>
        <button onClick={() => onNavigate("plan")}
          className="flex items-center gap-3 rounded-card border border-border bg-amber-50 p-4 transition-all hover:shadow-md hover:border-amber-300">
          <FileText className="h-6 w-6 text-amber-500" />
          <div className="text-left"><p className="font-bold">Ouvrir le plan</p><p className="text-xs text-muted-foreground">Plan de revision intensif</p></div>
        </button>
      </div>
    </div>
  );
}
