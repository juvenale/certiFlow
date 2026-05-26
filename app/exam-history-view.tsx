"use client";

import { useState } from "react";
import { BarChart3, CalendarDays, Clock, TrendingUp, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getExamHistory, clearExamHistory, type ExamResult } from "@/lib/exam-history";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function ExamHistory() {
  const [history, setHistory] = useState<ExamResult[]>(getExamHistory);

  if (!history.length) {
    return (
      <div className="rounded-card border border-border bg-muted p-5 text-center">
        <BarChart3 className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-3 font-bold">Aucun examen termine</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Termine un examen blanc pour voir ton historique et suivre tes progres.
        </p>
      </div>
    );
  }

  const chartData = [...history].reverse().map((r, i) => ({
    name: `#${history.length - i}`,
    score: r.score,
    title: r.examTitle.slice(0, 30),
  }));

  return (
    <div className="space-y-4">
      {/* Trend chart */}
      <div className="rounded-card border border-border bg-card p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
            <TrendingUp className="h-4 w-4" /> Evolution des scores
          </h3>
          <button type="button" onClick={() => { clearExamHistory(); setHistory([]); }}
            className="flex items-center gap-1 rounded-btn px-2 py-1 text-xs font-bold text-muted-foreground transition hover:text-danger">
            <Trash2 className="h-3 w-3" /> Effacer
          </button>
        </div>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 8, bottom: 0, left: -24 }}>
              <defs>
                <linearGradient id="examGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.35}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)" }} />
              <Area type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={3} fill="url(#examGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Results list */}
      <div className="space-y-2">
        {history.map((r) => (
          <div key={r.id} className="rounded-card border border-border bg-card p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-bold truncate">{r.examTitle}</p>
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarDays className="h-3 w-3" />
                  {new Date(r.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                  <Clock className="ml-1 h-3 w-3" />
                  {formatTime(r.timeSeconds)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className={cn("text-lg font-black tabular-nums", r.score >= 75 ? "text-success-fg" : r.score >= 55 ? "text-warning-fg" : "text-danger-fg")}>
                  {r.score}%
                </span>
                <span className="text-xs text-muted-foreground">
                  {r.correct}/{r.totalQuestions}
                </span>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              <div className="rounded-card bg-muted p-2 text-center">
                <p className="text-xs font-black text-success-fg">{r.correct}</p>
                <p className="text-[10px] text-muted-foreground">Correctes</p>
              </div>
              <div className="rounded-card bg-muted p-2 text-center">
                <p className="text-xs font-black text-danger-fg">{r.incorrect}</p>
                <p className="text-[10px] text-muted-foreground">Incorrectes</p>
              </div>
              <div className="rounded-card bg-muted p-2 text-center">
                <p className="text-xs font-black text-muted-foreground">{r.unanswered}</p>
                <p className="text-[10px] text-muted-foreground">Non rep.</p>
              </div>
              <div className="rounded-card bg-muted p-2 text-center">
                <p className="text-xs font-black text-warning-fg">{r.flagged}</p>
                <p className="text-[10px] text-muted-foreground">Marquees</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
