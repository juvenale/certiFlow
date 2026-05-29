"use client";

import { useEffect, useState } from "react";
import { BarChart3, CalendarDays, Clock, TrendingUp, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getExamHistory, clearExamHistory, type ExamResult } from "@/lib/exam-history";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isAdmitted = data.score >= 75;
    return (
      <div className="backdrop-blur-md bg-card/85 border border-border p-3 rounded-card shadow-lg text-xs space-y-1 z-50">
        <p className="font-bold text-muted-foreground">{data.title}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-black text-sm text-foreground">{data.score}%</span>
          <span className={cn(
            "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider",
            isAdmitted ? "bg-success/15 text-success-fg" : "bg-danger/15 text-danger-fg"
          )}>
            {isAdmitted ? "Admis" : "Échoué"}
          </span>
        </div>
        <p className="text-[10px] text-muted-foreground select-none">Examen {data.name} · {data.date}</p>
      </div>
    );
  }
  return null;
};

export function ExamHistory() {
  const [history, setHistory] = useState<ExamResult[]>(getExamHistory);
  const [filterRange, setFilterRange] = useState<"7" | "30" | "all">("7");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  let filteredHistory = [...history].reverse();
  if (filterRange === "7") {
    filteredHistory = filteredHistory.slice(-7);
  } else if (filterRange === "30") {
    filteredHistory = filteredHistory.slice(-30);
  }

  const chartData = filteredHistory.map((r, i) => ({
    name: `#${history.length - (filteredHistory.length - 1 - i)}`,
    score: r.score,
    title: r.examTitle.slice(0, 30),
    date: new Date(r.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }),
  }));

  return (
    <div className="space-y-4">
      {/* Trend chart */}
      <div className="rounded-card border border-border bg-card p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Evolution des scores
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 bg-muted p-0.5 rounded-btn select-none">
              {[
                { key: "7", label: "7 derniers" },
                { key: "30", label: "30 derniers" },
                { key: "all", label: "Tout" },
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setFilterRange(opt.key as any)}
                  className={cn(
                    "px-2.5 py-1 text-xs font-bold rounded-btn transition-all duration-150",
                    filterRange === opt.key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => { clearExamHistory(); setHistory([]); }}
              className="flex items-center gap-1 rounded-btn px-2 py-1 text-xs font-bold text-muted-foreground transition hover:text-danger">
              <Trash2 className="h-3 w-3" /> Effacer
            </button>
          </div>
        </div>
        <div className="w-full">
          <ResponsiveContainer width="100%" aspect={isMobile ? 1.4 : 2.6}>
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
              <Tooltip content={<CustomTooltip />} />
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
