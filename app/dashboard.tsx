"use client";

import { useEffect, useState, useMemo } from "react";
import {
  AlarmClock, ArrowRight, BookOpen, Brain, CheckCircle2, Clock,
  FileQuestion, Flame, LayoutDashboard, Lightbulb, RotateCcw,
  Shield, Target, Timer, TrendingUp, Zap, BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";
import { domainStats as allDomainStats } from "@/data/domain-stats";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type DomainStat = { id: string; name: string; weight: number; totalQuestions: number; attempted: number; correct: number; progress: number };

interface ErrorEntry { domain: string; questionId: string; question?: string; concept?: string; status: string; count: number }
interface QuizHistoryEntry { id: string; date: string; domain: string; correct: boolean; concept: string }

function useDomainProgress(answered: number, correct: number) {
  return useMemo(() => {
    let ds: Record<string, { answered: number; correct: number }> = {};
    try { ds = JSON.parse(localStorage.getItem("certiflow-domain-stats") || "{}"); } catch {}

    // Fallback: if no per-domain stats yet, seed from errors (wrong answers only)
    const hasDomainStats = Object.keys(ds).length > 0;
    if (!hasDomainStats) {
      let errors: ErrorEntry[] = [];
      try { errors = JSON.parse(localStorage.getItem("certiflow-errors") || "[]"); } catch {}
      const overallAccuracy = answered > 0 ? correct / answered : 0;
      for (const e of errors) {
        if (!ds[e.domain]) ds[e.domain] = { answered: 0, correct: 0 };
        ds[e.domain].answered += e.count;
        ds[e.domain].correct += Math.floor(e.count * overallAccuracy);
      }
    }

    return allDomainStats.map((d) => {
      const stat = ds[d.name] ?? { answered: 0, correct: 0 };
      const coverage = d.totalQuestions > 0 ? (stat.answered / d.totalQuestions) * 100 : 0;
      const accuracy = stat.answered > 0 ? (stat.correct / stat.answered) * 100 : 0;
      const progress = Math.min(100, Math.round(coverage * 0.5 + accuracy * 0.5));
      return { id: d.id, name: d.name, weight: d.weight, totalQuestions: d.totalQuestions, attempted: stat.answered, correct: stat.correct, progress };
    });
  }, [answered, correct]);
}

function readQuizHistory() {
  try { return JSON.parse(localStorage.getItem("certiflow-quiz-history") || "[]") as QuizHistoryEntry[]; }
  catch { return []; }
}

function useSmartAnalytics(answered: number, correct: number) {
  return useMemo(() => {
    let errors: ErrorEntry[] = [];
    try { errors = JSON.parse(localStorage.getItem("certiflow-errors") || "[]"); } catch {}
    const history = readQuizHistory();

    const weekLabels = Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - index));
      return date.toISOString().slice(0, 10);
    });

    const weeklyProgress = weekLabels.map((iso) => {
      const items = history.filter((item) => item.date.slice(0, 10) === iso);
      const good = items.filter((item) => item.correct).length;
      const score = items.length ? Math.round((good / items.length) * 100) : null;
      return {
        date: new Date(`${iso}T00:00:00`).toLocaleDateString("fr-FR", { weekday: "short" }),
        questions: items.length,
        score: score ?? 0,
      };
    });

    const domainAccuracy = allDomainStats.map((domain) => {
      const items = history.filter((item) => item.domain === domain.name);
      const correctItems = items.filter((item) => item.correct).length;
      return {
        domain: domain.name.replace("Threats, Vulnerabilities, and Mitigations", "Threats & Vulns").replace("Security Program Management and Oversight", "Program Mgmt"),
        weight: domain.weight,
        questions: items.length,
        accuracy: items.length ? Math.round((correctItems / items.length) * 100) : 0,
      };
    });

    const weakConcepts = [...errors]
      .filter((item) => item.status !== "maîtrisé")
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map((item) => ({
        concept: item.concept || item.question?.slice(0, 60) || item.questionId,
        domain: item.domain,
        count: item.count,
      }));

    const weeklyQuestions = weeklyProgress.reduce((sum, item) => sum + item.questions, 0);
    const recentScores = weeklyProgress.filter((item) => item.questions > 0).map((item) => item.score);
    const trend = recentScores.length >= 2 ? recentScores[recentScores.length - 1] - recentScores[0] : 0;
    const globalAccuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;

    return { weeklyProgress, domainAccuracy, weakConcepts, weeklyQuestions, trend, globalAccuracy };
  }, [answered, correct]);
}

function useDailyCheckpoint(answered: number, correct: number) {
  const today = new Date().toISOString().split("T")[0];
  const key = `certiflow-daily-${today}`;

  const [checkpoint] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(key) || "null");
      if (stored) return stored as { startAnswered: number; startCorrect: number };
      const cp = { startAnswered: answered, startCorrect: correct };
      localStorage.setItem(key, JSON.stringify(cp));
      return cp;
    } catch {
      return { startAnswered: answered, startCorrect: correct };
    }
  });

  return {
    todayAnswered: Math.max(0, answered - checkpoint.startAnswered),
    todayCorrect: Math.max(0, correct - checkpoint.startCorrect),
  };
}

function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color: string }) {
  return (
    <div className="rounded-card border border-border bg-card p-4 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={cn("mt-1 text-2xl font-black tabular-nums", color)}>{value}</p>
      {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function Dashboard({
  daysLeft, domains, score, answered, correct, avgProgress, weakest, onNavigate
}: {
  daysLeft: number;
  domains: { id: string; name: string; weight: number; progress: number }[];
  score: number;
  answered: number;
  correct: number;
  avgProgress: number;
  weakest: { name: string; progress: number };
  onNavigate: (view: string) => void;
}) {
  const [now, setNow] = useState(Date.now());
  const examTime = new Date("2026-05-25T09:00:00").getTime();
  const examStart = new Date("2026-04-01").getTime();
  const domainProgress = useDomainProgress(answered, correct);
  const { todayAnswered, todayCorrect } = useDailyCheckpoint(answered, correct);
  const analytics = useSmartAnalytics(answered, correct);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const remaining = Math.max(0, examTime - now);
  const d = Math.floor(remaining / 86400000);
  const h = Math.floor((remaining % 86400000) / 3600000);
  const m = Math.floor((remaining % 3600000) / 60000);
  const s = Math.floor((remaining % 60000) / 1000);
  const isLast48h = d <= 2;

  const totalSpan = Math.max(1, examTime - examStart);
  const elapsed = Math.max(0, now - examStart);
  const timelineProgress = Math.min(100, Math.round((elapsed / totalSpan) * 100));

  const realAvg = domainProgress.length > 0
    ? Math.round(domainProgress.reduce((sum, dp) => sum + dp.progress * dp.weight, 0) / 100)
    : avgProgress;

  const globalAccuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
  const readinessScore = Math.round(
    realAvg * 0.5 +
    Math.min(100, globalAccuracy) * 0.3 +
    Math.min(100, analytics.weeklyQuestions * 2) * 0.1 +
    Math.max(0, Math.min(100, 70 + analytics.trend)) * 0.1
  );
  const todayAccuracy = todayAnswered > 0 ? Math.round((todayCorrect / todayAnswered) * 100) : null;
  const weakDomains = [...domainProgress].sort((a, b) => a.progress - b.progress);
  const weakestDomain = weakDomains[0];

  const readiness = readinessScore >= 75 ? "ready" : readinessScore >= 55 ? "almost" : "not-ready";
  const readinessConfig = {
    ready:      { color: "bg-success", bg: "bg-success-muted border-success-muted", text: "Pret pour l'examen",  icon: CheckCircle2, desc: "Continue les revisions legeres" },
    almost:     { color: "bg-warning", bg: "bg-warning-muted border-warning-muted", text: "Presque pret",        icon: TrendingUp,   desc: "Renforce les domaines faibles" },
    "not-ready":{ color: "bg-danger",  bg: "bg-danger-muted border-danger-muted",   text: "Pas encore pret",     icon: AlarmClock,   desc: "Intensifie les revisions" },
  }[readiness];

  // Smart recommendation
  const rec = isLast48h
    ? { text: "Mode cram actif — suivez le plan ci-dessous", cta: "Voir le plan", nav: "dashboard", color: "border-danger-muted bg-danger-muted" }
    : readiness === "ready"
    ? { text: "Validez votre niveau avec un examen blanc complet", cta: "Examen blanc", nav: "exam", color: "border-success-muted bg-success-muted" }
    : weakestDomain && weakestDomain.progress < 50
    ? { text: `Priorite: ${weakestDomain.name} (${weakestDomain.progress}% — le plus faible)`, cta: "Ouvrir le quiz", nav: "quiz", color: "border-warning-muted bg-warning-muted" }
    : { text: "Pratiquez des PBQ pour consolider la pratique clinique", cta: "Ouvrir PBQ", nav: "pbq", color: "border-primary/20 bg-primary/5" };

  const tasks = [
    { icon: FileQuestion, label: "QCM aujourd'hui",   target: 40, done: Math.min(40, todayAnswered), color: "bg-violet-500", nav: "quiz" },
    { icon: Brain,        label: "PBQ",                target: 3,  done: 0,                          color: "bg-cyan-500",   nav: "pbq" },
    { icon: RotateCcw,    label: "Flashcards",         target: 20, done: 0,                          color: "bg-emerald-500",nav: "flashcards" },
    { icon: Zap,          label: "Ports & commandes",  target: 10, done: 0,                          color: "bg-amber-500",  nav: "ports" },
    { icon: Timer,        label: "Examen blanc",        target: 1,  done: 0,                          color: "bg-rose-500",   nav: "exam" },
  ];

  const cramPlan = [
    { time: "J-2 matin",      task: "Examens blancs 90q x2 + correction" },
    { time: "J-2 apres-midi", task: "Revision PBQ + ports + flashcards" },
    { time: "J-2 soir",       task: "Dernier examen blanc + journal erreurs" },
    { time: "J-1 matin",      task: "Flashcards tous domaines (100)" },
    { time: "J-1 apres-midi", task: "Revision confusions + commandes" },
    { time: "J-1 soir",       task: "Repos, relecture plan, coucher tot" },
  ];

  function pad(n: number) { return String(n).padStart(2, "0"); }

  return (
    <div className="animate-fade-in space-y-5">

      {/* Stats summary */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Score global" value={`${globalAccuracy}%`}
          sub={`${correct}/${answered} questions`}
          color={globalAccuracy >= 75 ? "text-success-fg" : globalAccuracy >= 55 ? "text-warning-fg" : "text-danger-fg"} />
        <StatCard label="Readiness" value={`${readinessScore}%`}
          sub={`${weakDomains.filter(d => d.progress < 50).length} domaine(s) critique(s)`}
          color={readinessScore >= 75 ? "text-success-fg" : readinessScore >= 55 ? "text-warning-fg" : "text-danger-fg"} />
        <StatCard label="Aujourd'hui" value={todayAnswered}
          sub={todayAccuracy !== null ? `${todayAccuracy}% precision` : "Aucune question encore"}
          color="text-primary" />
        <StatCard label="Jours restants" value={d}
          sub={`${h}h ${pad(m)}m ${pad(s)}s`}
          color={d <= 3 ? "text-danger-fg" : d <= 7 ? "text-warning-fg" : "text-foreground"} />
      </div>

      {/* Countdown + timeline */}
      <div className="rounded-card border border-border bg-card p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Compte a rebours — 25 mai 2026</span>
          </div>
          <span className="text-xs text-muted-foreground">{timelineProgress}% du temps ecoule</span>
        </div>
        <div className="mb-3 h-2 rounded-full bg-muted overflow-hidden">
          <div className={cn("h-full rounded-full transition-all duration-1000",
              timelineProgress > 90 ? "bg-danger" : timelineProgress > 75 ? "bg-warning" : "bg-primary")}
            style={{ width: `${timelineProgress}%` }} />
        </div>
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-4xl font-black tabular-nums text-gradient">{d}</span>
          <span className="text-lg font-semibold text-muted-foreground">jours</span>
          <span className="text-2xl font-black tabular-nums ml-3">{pad(h)}</span>
          <span className="text-muted-foreground font-bold">:</span>
          <span className="text-2xl font-black tabular-nums">{pad(m)}</span>
          <span className="text-muted-foreground font-bold">:</span>
          <span className="text-2xl font-black tabular-nums">{pad(s)}</span>
        </div>
      </div>

      {/* Readiness + Recommendation */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className={cn("rounded-card border p-5 shadow-sm", readinessConfig.bg)}>
          <div className="flex items-center gap-3">
            <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-full", readinessConfig.color)}>
              <readinessConfig.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-lg font-black">{readinessConfig.text}</p>
              <p className="text-sm text-muted-foreground">{readinessConfig.desc} — readiness {readinessScore}%</p>
            </div>
          </div>
          <div className="mt-4 h-2 rounded-full bg-white/60 overflow-hidden">
            <div className={cn("h-full rounded-full transition-all duration-700", readinessConfig.color)}
              style={{ width: `${readinessScore}%` }} />
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>0%</span><span className="font-bold">Seuil: 75%</span><span>100%</span>
          </div>
        </div>

        <div className={cn("rounded-card border p-5 shadow-sm flex flex-col justify-between", rec.color)}>
          <div className="flex items-start gap-3">
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1">Recommandation</p>
              <p className="font-semibold">{rec.text}</p>
            </div>
          </div>
          <button type="button" onClick={() => onNavigate(rec.nav)}
            className="mt-4 flex items-center justify-center gap-2 rounded-btn bg-foreground px-4 py-2 text-sm font-bold text-background transition hover:opacity-90">
            {rec.cta} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Quick Access */}
      <div className="rounded-card border border-border bg-card p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-bold text-muted-foreground uppercase tracking-wider">Acces rapide</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {[
            { id: "quiz",       icon: FileQuestion, label: "Quiz",       color: "bg-violet-500" },
            { id: "pbq",        icon: Brain,        label: "PBQ",        color: "bg-cyan-500" },
            { id: "flashcards", icon: RotateCcw,    label: "Flashcards", color: "bg-emerald-500" },
            { id: "exam",       icon: Timer,        label: "Examens",    color: "bg-rose-500" },
            { id: "courses",    icon: BookOpen,     label: "Cours",      color: "bg-amber-500" },
            { id: "errors",     icon: Target,       label: "Erreurs",    color: "bg-red-500" },
          ].map((item) => (
            <button type="button" key={item.id} onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center gap-1.5 rounded-card border border-border bg-muted p-3 transition-all duration-200 hover:border-primary hover:shadow-md hover:-translate-y-0.5 active:scale-95">
              <div className={cn("flex h-9 w-9 items-center justify-center rounded-btn", item.color)}>
                <item.icon className="h-4 w-4 text-white" />
              </div>
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Smart Analytics */}
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-card border border-border bg-card p-5 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
              <TrendingUp className="h-4 w-4" /> Courbe d'evolution
            </h2>
            <span className={cn("rounded-full px-2 py-1 text-xs font-bold",
              analytics.trend >= 0 ? "bg-success-muted text-success-fg" : "bg-danger-muted text-danger-fg")}>
              {analytics.trend >= 0 ? "+" : ""}{analytics.trend} pts cette semaine
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.weeklyProgress} margin={{ top: 10, right: 8, bottom: 0, left: -24 }}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)" }}
                  formatter={(value, name) => [name === "score" ? `${value}%` : value, name === "score" ? "Score" : "Questions"]}
                />
                <Area type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={3} fill="url(#scoreGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <div className="rounded-card bg-muted p-3">
              <p className="text-xs font-bold uppercase text-muted-foreground">Questions semaine</p>
              <p className="text-xl font-black tabular-nums">{analytics.weeklyQuestions}</p>
            </div>
            <div className="rounded-card bg-muted p-3">
              <p className="text-xs font-bold uppercase text-muted-foreground">Moyenne domaines</p>
              <p className="text-xl font-black tabular-nums">{realAvg}%</p>
            </div>
            <div className="rounded-card bg-muted p-3">
              <p className="text-xs font-bold uppercase text-muted-foreground">Precision globale</p>
              <p className="text-xl font-black tabular-nums">{globalAccuracy}%</p>
            </div>
          </div>
        </div>

        <div className="rounded-card border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
            <Target className="h-4 w-4" /> Concepts faibles
          </h2>
          {analytics.weakConcepts.length ? (
            <div className="space-y-3">
              {analytics.weakConcepts.map((item) => (
                <button
                  key={`${item.domain}-${item.concept}`}
                  type="button"
                  onClick={() => onNavigate("errors")}
                  className="w-full rounded-card border border-border bg-muted p-3 text-left transition hover:border-primary"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold leading-snug">{item.concept}</p>
                    <span className="shrink-0 rounded-full bg-danger px-2 py-0.5 text-xs font-black text-white">{item.count}x</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{item.domain}</p>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-card bg-success-muted p-4">
              <p className="font-bold text-success-fg">Aucun concept faible majeur pour l'instant.</p>
              <p className="mt-1 text-sm text-muted-foreground">Continue les quiz pour alimenter les statistiques.</p>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-card border border-border bg-card p-5 shadow-sm">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
          <BarChart3 className="h-4 w-4" /> Scores par domaine
        </h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.domainAccuracy} margin={{ top: 10, right: 8, bottom: 24, left: -24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="domain" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} interval={0} angle={-12} textAnchor="end" height={52} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)" }}
                formatter={(value, name) => [`${value}${name === "accuracy" ? "%" : ""}`, name === "accuracy" ? "Score" : "Questions"]}
              />
              <Bar dataKey="accuracy" radius={[6, 6, 0, 0]} fill="var(--primary)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Domain Progress */}
      <div className="rounded-card border border-border bg-card p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-bold text-muted-foreground uppercase tracking-wider">
          Progression par domaine
          <span className="ml-2 font-normal normal-case">({allDomainStats.reduce((s, d) => s + d.totalQuestions, 0)} questions au total)</span>
        </h2>
        <div className="space-y-4">
          {domainProgress.map((dp, idx) => {
            const coverage = dp.totalQuestions > 0 ? Math.round((dp.attempted / dp.totalQuestions) * 100) : 0;
            const accuracy = dp.attempted > 0 ? Math.round((dp.correct / dp.attempted) * 100) : 0;
            const isWeakest = idx === weakDomains.findIndex(w => w.id === dp.id && w === weakDomains[0]);
            const isCritical = dp.progress < 50;
            return (
              <div key={dp.id} className={cn("space-y-1.5 rounded-card p-3 transition-colors",
                  isCritical ? "bg-danger-muted border border-danger-muted" : "")}>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={cn("h-2 w-2 shrink-0 rounded-full",
                      dp.progress >= 75 ? "bg-success" : dp.progress >= 50 ? "bg-warning" : "bg-danger")} />
                    <span className={cn("truncate text-sm font-semibold", isCritical && "text-danger-fg")}>{dp.name}</span>
                    {isCritical && <span className="shrink-0 rounded-full border border-danger-muted bg-danger-muted px-2 py-0.5 text-xs font-bold text-danger-fg">Prioritaire</span>}
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="text-xs text-muted-foreground tabular-nums">{dp.weight}% exam</span>
                    <span className={cn("text-sm font-black tabular-nums",
                      dp.progress >= 75 ? "text-success-fg" : dp.progress >= 50 ? "text-warning-fg" : "text-danger-fg")}>
                      {dp.progress}%
                    </span>
                    {isCritical && (
                      <button type="button" onClick={() => onNavigate("quiz")}
                        className="flex items-center gap-1 rounded-btn bg-danger px-2 py-1 text-xs font-bold text-white transition hover:opacity-90">
                        Reviser <ArrowRight className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className={cn("h-full rounded-full transition-all duration-700",
                    dp.progress >= 75 ? "bg-success" : dp.progress >= 50 ? "bg-warning" : "bg-danger")}
                    style={{ width: `${dp.progress}%` }} />
                </div>
                <div className="flex gap-x-4 text-xs text-muted-foreground">
                  <span>Couverture: {coverage}% ({dp.attempted}/{dp.totalQuestions})</span>
                  {dp.attempted > 0 && <span>Precision: {accuracy}%</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Plan */}
      <div className="rounded-card border border-border bg-card p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-bold text-muted-foreground uppercase tracking-wider">Plan du jour (90 min)</h2>
        <div className="space-y-2">
          {tasks.map((task) => {
            const pct = Math.min(100, (task.done / task.target) * 100);
            const done = pct >= 100;
            return (
              <button type="button" key={task.label} onClick={() => onNavigate(task.nav)}
                className="group flex w-full items-center gap-3 rounded-card border border-transparent p-2 text-left transition hover:border-border hover:bg-muted">
                <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-btn", done ? "bg-success" : task.color)}>
                  {done ? <CheckCircle2 className="h-4 w-4 text-white" /> : <task.icon className="h-4 w-4 text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-sm">
                    <span className={cn("font-semibold", done && "line-through text-muted-foreground")}>{task.label}</span>
                    <span className={cn("tabular-nums text-xs", done ? "text-success-fg font-bold" : "text-muted-foreground")}>
                      {task.done}/{task.target}
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className={cn("h-full rounded-full transition-all", done ? "bg-success" : task.color)}
                      style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Cram Plan */}
      {isLast48h && (
        <div className="rounded-card border-2 border-danger-muted bg-danger-muted p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <Flame className="h-5 w-5 animate-bounce text-danger-fg" />
            <h2 className="text-sm font-bold text-danger-fg uppercase tracking-wider">Plan Cram 48h — Execution!</h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {cramPlan.map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-card bg-card/80 p-3 shadow-sm">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-danger text-xs font-bold text-white">{i + 1}</span>
                <div>
                  <p className="text-xs font-bold text-danger-fg">{item.time}</p>
                  <p className="text-sm">{item.task}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
